create table public.paddle_adjustments (
  adjustment_id text primary key,
  transaction_id text not null,
  subscription_id text,
  customer_id text,
  action text not null,
  type text not null,
  status text not null,
  reason text,
  currency_code text,
  paddle_created_at timestamptz,
  paddle_updated_at timestamptz,
  last_event_at timestamptz not null default '-infinity',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index paddle_adjustments_transaction_id_idx
  on public.paddle_adjustments(transaction_id);

alter table public.paddle_adjustments enable row level security;
