create table public.paddle_customers (
  customer_id text primary key,
  user_id uuid references auth.users(id),
  email text not null,
  paddle_created_at timestamptz,
  paddle_updated_at timestamptz,
  last_event_at timestamptz not null default '-infinity',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index paddle_customers_user_id_unique on public.paddle_customers(user_id) where user_id is not null;
create index paddle_customers_email_idx on public.paddle_customers(lower(email));

create table public.paddle_subscriptions (
  subscription_id text primary key,
  customer_id text not null references public.paddle_customers(customer_id),
  status text not null,
  price_id text not null,
  product_id text not null,
  current_billing_period_starts_at timestamptz,
  current_billing_period_ends_at timestamptz,
  scheduled_change_action text,
  scheduled_change_at timestamptz,
  paddle_created_at timestamptz,
  paddle_updated_at timestamptz,
  last_event_at timestamptz not null default '-infinity',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.paddle_transactions (
  transaction_id text primary key,
  customer_id text references public.paddle_customers(customer_id),
  subscription_id text,
  status text not null,
  origin text,
  currency_code text,
  total_amount text,
  completed_at timestamptz,
  price_ids text[] not null default '{}',
  product_ids text[] not null default '{}',
  paddle_created_at timestamptz,
  paddle_updated_at timestamptz,
  last_event_at timestamptz not null default '-infinity',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_entitlements (
  entitlement_id text primary key,
  user_id uuid references auth.users(id),
  customer_id text not null references public.paddle_customers(customer_id),
  source_type text not null check (source_type in ('subscription', 'lifetime_transaction')),
  source_id text not null,
  product_id text not null,
  price_id text not null,
  status text not null check (status in ('active', 'inactive', 'revoked')),
  valid_from timestamptz not null,
  valid_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(source_type, source_id, product_id)
);

alter table public.paddle_customers enable row level security;
alter table public.paddle_subscriptions enable row level security;
alter table public.paddle_transactions enable row level security;
alter table public.product_entitlements enable row level security;

create or replace function public.paid_access_for_email(requested_email text)
returns table(has_access boolean, access_type text, subscription_status text, valid_until timestamptz)
language sql security definer set search_path = public stable as $$
  with customer_ids as (
    select customer_id from paddle_customers where lower(email) = lower(requested_email)
  ), lifetime as (
    select true as has_access, 'lifetime'::text as access_type, null::text as subscription_status, null::timestamptz as valid_until
    from product_entitlements
    where customer_id in (select customer_id from customer_ids)
      and source_type = 'lifetime_transaction' and status = 'active' and valid_until is null
    limit 1
  ), annual as (
    select true, 'annual'::text, status, current_billing_period_ends_at
    from paddle_subscriptions
    where customer_id in (select customer_id from customer_ids) and status in ('active', 'trialing')
    order by current_billing_period_ends_at desc nulls first limit 1
  )
  select * from lifetime union all select * from annual where not exists (select 1 from lifetime)
  union all select false, null::text, null::text, null::timestamptz
  where not exists (select 1 from lifetime) and not exists (select 1 from annual)
  limit 1;
$$;
revoke all on function public.paid_access_for_email(text) from public, anon, authenticated;
grant execute on function public.paid_access_for_email(text) to service_role;
