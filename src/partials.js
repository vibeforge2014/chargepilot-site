export const header = `
  <header class="site-header">
    <div class="shell header-inner">
      <a class="brand" href="index.html" aria-label="ChargePilot 首页"><span class="brand-mark">C</span>ChargePilot</a>
      <button class="menu-button" type="button" aria-label="打开导航" aria-expanded="false" data-menu-button>菜单</button>
      <nav class="nav" aria-label="主导航" data-navigation>
        <a href="index.html">首页</a><a href="pricing.html">定价</a><a href="privacy-policy.html">隐私</a><a href="terms-of-service.html">条款</a><a class="nav-cta" href="downloads/ChargePilot-0.2.0.zip">下载 v0.2.0</a>
      </nav>
    </div>
  </header>`;

export const footer = `
  <footer class="site-footer">
    <div class="shell">
      <div class="footer-grid">
        <div><a class="brand" href="index.html"><span class="brand-mark">C</span>ChargePilot</a><p class="footer-tagline">让 Mac 电池少一点焦虑，多一点掌控。原生、轻量，专注于可靠的充电管理。</p></div>
        <nav class="footer-links" aria-label="页脚导航"><a href="pricing.html">定价</a><a href="terms-of-service.html">服务条款</a><a href="privacy-policy.html">隐私政策</a><a href="refund-policy.html">退款政策</a></nav>
      </div>
      <p class="copyright">© <span data-year></span> ChargePilot. macOS is a trademark of Apple Inc.</p>
    </div>
  </footer>`;

document.querySelector("[data-header]")?.replaceWith(document.createRange().createContextualFragment(header));
document.querySelector("[data-footer]")?.replaceWith(document.createRange().createContextualFragment(footer));
