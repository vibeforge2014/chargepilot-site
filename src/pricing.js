import { initializePaddle } from '@paddle/paddle-js';
import { paddleConfig, pricingOptions } from './pricing-config.js';
import { t } from './i18n.js';

const status = document.querySelector('[data-pricing-status]');
const buttons = document.querySelectorAll('[data-checkout]');
const environmentBadge = document.querySelector('[data-environment-badge]');
const environmentLabel = document.querySelector('[data-environment-label]');
let paddle;

if (environmentLabel) {
  environmentLabel.textContent = paddleConfig.environment === 'production'
    ? t('Paddle 正式支付 · 将产生真实扣款')
    : t('Sandbox 测试环境 · 不会真实扣款');
}

if (environmentBadge) {
  environmentBadge.dataset.environment = paddleConfig.environment;
}

function setStatus(message, state = 'loading') {
  if (!status) return;
  status.textContent = message;
  status.dataset.state = state;
}

function renderPrices(preview) {
  const lineItems = preview?.data?.details?.lineItems ?? [];
  const formattedByPriceId = new Map(
    lineItems.map((item) => [item.price.id, item.formattedTotals.total])
  );

  for (const option of pricingOptions) {
    const formattedTotal = formattedByPriceId.get(option.priceId);
    if (!formattedTotal) throw new Error(`Paddle did not return a total for ${option.name}.`);

    const target = document.querySelector(`[data-price="${option.id}"]`);
    if (target) target.textContent = formattedTotal;
  }
}

function openCheckout(optionId) {
  const option = pricingOptions.find((item) => item.id === optionId);
  if (!paddle || !option) return;

  const successUrl = new URL('welcome/', window.location.href).href;
  paddle.Checkout.open({
    items: [{ priceId: option.priceId, quantity: 1 }],
    settings: {
      displayMode: 'overlay',
      variant: 'one-page',
      successUrl
    }
  });
}

async function initializePricing() {
  try {
    paddle = await initializePaddle({
      environment: paddleConfig.environment,
      token: paddleConfig.clientToken,
      eventCallback(event) {
        if (event.name === 'checkout.error' || event.name === 'checkout.payment.error') {
          setStatus(t('结账暂时无法完成，请稍后重试。'), 'error');
        }
      }
    });

    if (!paddle) throw new Error('Paddle.js did not initialize.');

    // No country is passed intentionally. On static GitHub Pages there is no
    // server request context, so Paddle detects the visitor country from IP.
    const preview = await paddle.PricePreview({
      items: pricingOptions.map((option) => ({ priceId: option.priceId, quantity: 1 }))
    });

    renderPrices(preview);
    buttons.forEach((button) => {
      button.disabled = false;
      button.addEventListener('click', () => openCheckout(button.dataset.checkout));
    });
    setStatus(t('价格已根据你所在的地区显示，最终税费以结账页为准。'), 'ready');
  } catch (error) {
    console.error(
      'Paddle pricing initialization failed:',
      error instanceof Error ? error.message : JSON.stringify(error)
    );
    setStatus(t('价格加载失败。请刷新页面，或稍后再试。'), 'error');
  }
}

initializePricing();
