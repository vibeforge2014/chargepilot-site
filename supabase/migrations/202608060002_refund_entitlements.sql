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
    select true, 'annual'::text, subscription.status, subscription.current_billing_period_ends_at
    from paddle_subscriptions subscription
    join product_entitlements entitlement
      on entitlement.source_type = 'subscription'
      and entitlement.source_id = subscription.subscription_id
      and entitlement.status = 'active'
    where subscription.customer_id in (select customer_id from customer_ids)
      and subscription.status in ('active', 'trialing')
      and (entitlement.valid_until is null or entitlement.valid_until >= now())
    order by subscription.current_billing_period_ends_at desc nulls first limit 1
  )
  select * from lifetime union all select * from annual where not exists (select 1 from lifetime)
  union all select false, null::text, null::text, null::timestamptz
  where not exists (select 1 from lifetime) and not exists (select 1 from annual)
  limit 1;
$$;

revoke all on function public.paid_access_for_email(text) from public, anon, authenticated;
grant execute on function public.paid_access_for_email(text) to service_role;
