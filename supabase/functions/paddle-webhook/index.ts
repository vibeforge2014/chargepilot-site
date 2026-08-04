import { Environment, EventName, Paddle } from 'npm:@paddle/paddle-node-sdk';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { paddleEnvironment, required } from '../_shared/config.ts';

const environment = paddleEnvironment();
const paddle = new Paddle(required('PADDLE_API_KEY'), {
  environment: environment === 'sandbox' ? Environment.sandbox : Environment.production
});
const db = createClient(required('SUPABASE_URL'), required('SUPABASE_SERVICE_ROLE_KEY'));
const annualPriceId = required('PADDLE_ANNUAL_PRICE_ID');
const lifetimePriceId = required('PADDLE_LIFETIME_PRICE_ID');
const annualProductId = required('PADDLE_ANNUAL_PRODUCT_ID');
const lifetimeProductId = required('PADDLE_LIFETIME_PRODUCT_ID');

async function customer(event: any) {
  const row = event.data;
  const occurredAt = event.occurredAt ?? event.occurred_at;
  const { data: existing } = await db.from('paddle_customers').select('last_event_at,user_id').eq('customer_id', row.id).maybeSingle();
  if (existing && new Date(existing.last_event_at) > new Date(occurredAt)) return;
  const { error } = await db.from('paddle_customers').upsert({
    customer_id: row.id, email: row.email, user_id: existing?.user_id ?? null,
    paddle_created_at: row.createdAt, paddle_updated_at: row.updatedAt,
    last_event_at: occurredAt, updated_at: new Date().toISOString()
  });
  if (error) throw error;
}

async function subscription(event: any) {
  const value = event.data;
  const item = value.items?.find((entry: any) => entry.price?.id === annualPriceId || entry.price?.productId === annualProductId);
  if (!item) return;
  const occurredAt = event.occurredAt ?? event.occurred_at;
  const { data: existing } = await db.from('paddle_subscriptions').select('last_event_at').eq('subscription_id', value.id).maybeSingle();
  if (existing && new Date(existing.last_event_at) > new Date(occurredAt)) return;
  const status = value.status;
  const { error } = await db.from('paddle_subscriptions').upsert({
    subscription_id: value.id, customer_id: value.customerId, status,
    price_id: item.price.id, product_id: item.price.productId,
    current_billing_period_starts_at: value.currentBillingPeriod?.startsAt,
    current_billing_period_ends_at: value.currentBillingPeriod?.endsAt,
    scheduled_change_action: value.scheduledChange?.action,
    scheduled_change_at: value.scheduledChange?.effectiveAt,
    paddle_created_at: value.createdAt, paddle_updated_at: value.updatedAt,
    last_event_at: occurredAt, updated_at: new Date().toISOString()
  });
  if (error) throw error;
  const entitlementStatus = ['active', 'trialing'].includes(status) ? 'active' : 'inactive';
  const { error: entitlementError } = await db.from('product_entitlements').upsert({
    entitlement_id: `subscription:${value.id}:${annualProductId}`,
    customer_id: value.customerId, source_type: 'subscription', source_id: value.id,
    product_id: annualProductId, price_id: annualPriceId, status: entitlementStatus,
    valid_from: value.startedAt ?? value.createdAt,
    valid_until: value.currentBillingPeriod?.endsAt ?? null, updated_at: new Date().toISOString()
  }, { onConflict: 'source_type,source_id,product_id' });
  if (entitlementError) throw entitlementError;
}

async function transaction(event: any) {
  const value = event.data;
  const lines = value.details?.lineItems ?? [];
  const priceIds = lines.map((line: any) => line.price?.id).filter(Boolean);
  const productIds = lines.map((line: any) => line.price?.productId ?? line.product?.id).filter(Boolean);
  const occurredAt = event.occurredAt ?? event.occurred_at;
  const { data: existing } = await db.from('paddle_transactions').select('last_event_at').eq('transaction_id', value.id).maybeSingle();
  if (existing && new Date(existing.last_event_at) > new Date(occurredAt)) return;
  const { error } = await db.from('paddle_transactions').upsert({
    transaction_id: value.id, customer_id: value.customerId, subscription_id: value.subscriptionId,
    status: value.status, origin: value.origin, currency_code: value.currencyCode,
    total_amount: value.details?.totals?.total, completed_at: value.billedAt ?? occurredAt,
    price_ids: priceIds, product_ids: productIds, paddle_created_at: value.createdAt,
    paddle_updated_at: value.updatedAt, last_event_at: occurredAt, updated_at: new Date().toISOString()
  });
  if (error) throw error;
  const isLifetime = priceIds.includes(lifetimePriceId) || productIds.includes(lifetimeProductId);
  if (value.status === 'completed' && !value.subscriptionId && isLifetime) {
    const { error: entitlementError } = await db.from('product_entitlements').upsert({
      entitlement_id: `lifetime_transaction:${value.id}:${lifetimeProductId}`,
      customer_id: value.customerId, source_type: 'lifetime_transaction', source_id: value.id,
      product_id: lifetimeProductId, price_id: lifetimePriceId, status: 'active',
      valid_from: value.billedAt ?? occurredAt, valid_until: null, updated_at: new Date().toISOString()
    }, { onConflict: 'source_type,source_id,product_id' });
    if (entitlementError) throw entitlementError;
  }
}

Deno.serve(async (request) => {
  const signature = request.headers.get('paddle-signature') ?? '';
  const rawBody = await request.text();
  if (!signature || !rawBody) return Response.json({ error: 'Missing signature or body' }, { status: 400 });
  try {
    const event = await paddle.webhooks.unmarshal(rawBody, required('PADDLE_WEBHOOK_SECRET'), signature);
    switch (event.eventType) {
      case EventName.CustomerCreated:
      case EventName.CustomerUpdated: await customer(event); break;
      case EventName.SubscriptionCreated:
      case EventName.SubscriptionUpdated:
      case EventName.SubscriptionCanceled: await subscription(event); break;
      case EventName.TransactionCompleted: await transaction(event); break;
      default: break;
    }
    return Response.json({ received: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
});
