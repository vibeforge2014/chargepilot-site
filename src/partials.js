const rootPrefix = window.location.pathname.endsWith('/welcome/') || window.location.pathname.endsWith('/welcome/index.html')
  ? '../'
  : '';

export const header = `
  <header class="site-header">
    <div class="shell">
      <div class="header-inner">
        <a class="brand" href="${rootPrefix}index.html" aria-label="ChargePilot 首页"><img class="brand-mark" src="${rootPrefix}images/chargepilot-logo.png" alt="">ChargePilot</a>
        <button class="menu-button" type="button" aria-label="打开导航" aria-expanded="false" data-menu-button>菜单</button>
        <nav class="nav" aria-label="主导航" data-navigation>
          <a href="${rootPrefix}index.html">首页</a><a href="${rootPrefix}pricing.html">定价</a><a href="${rootPrefix}privacy-policy.html">隐私</a><a href="${rootPrefix}terms-of-service.html">条款</a><a class="nav-cta" href="https://github.com/vibeforge2014/chargepilot/releases/download/v0.2.2/ChargePilot-0.2.2.dmg">下载 v0.2.2</a>
        </nav>
      </div>
    </div>
  </header>`;

export const footer = `
  <footer class="site-footer">
    <div class="shell">
      <div class="footer-grid">
        <div><a class="brand" href="${rootPrefix}index.html"><img class="brand-mark" src="${rootPrefix}images/chargepilot-logo.png" alt="">ChargePilot</a><p class="footer-tagline">让 Mac 电池少一点焦虑，多一点掌控。原生、轻量，专注于可靠的充电管理。</p></div>
        <nav class="footer-links" aria-label="页脚导航"><a href="${rootPrefix}pricing.html">定价</a><a href="${rootPrefix}terms-of-service.html">服务条款</a><a href="${rootPrefix}privacy-policy.html">隐私政策</a><a href="${rootPrefix}refund-policy.html">退款政策</a></nav>
      </div>
      <p class="copyright">© <span data-year></span> ChargePilot. macOS is a trademark of Apple Inc.</p>
    </div>
  </footer>`;

document.querySelector("[data-header]")?.replaceWith(document.createRange().createContextualFragment(header));
document.querySelector("[data-footer]")?.replaceWith(document.createRange().createContextualFragment(footer));
