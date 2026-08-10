const STORAGE_KEY = 'norelle-language';

const english = {
  '首页': 'Home',
  '定价': 'Pricing',
  '隐私': 'Privacy',
  '条款': 'Terms',
  '服务条款': 'Terms of Service',
  '隐私政策': 'Privacy Policy',
  '退款政策': 'Refund Policy',
  '打开导航': 'Open navigation',
  '菜单': 'Menu',
  '让电池停在': 'Keep your battery',
  '刚刚好。': 'right where it should be.',
  'ChargePilot 把充电上限、主动放电、温度保护和实时功率放进一个清晰的原生界面。接上电源，也不必一直充到 100%。': 'ChargePilot brings charge limits, active discharge, temperature protection, and real-time power into one clear native interface. Stay plugged in without sitting at 100%.',
  '下载 ChargePilot': 'Download ChargePilot',
  '了解功能': 'Explore features',
  '不是更多数据。是更好的充电决定。': 'Not more data. Better charging decisions.',
  '可执行的充电上限': 'Charge limits that take action',
  '将电量稳定在你设定的范围，并在需要出门时临时充满。': 'Hold the battery within your chosen range, with a temporary full-charge option when you need to head out.',
  '温度与健康保护': 'Temperature and health protection',
  '监控电池温度，在过热时暂停充电，减少高温与满电叠加的压力。': 'Monitor battery temperature and pause charging when it gets too hot, reducing the stress of heat at a full charge.',
  '实时能量流': 'Real-time energy flow',
  '看清适配器输入、系统消耗、电池功率和健康趋势，而不是猜测。': 'See adapter input, system load, battery power, and health trends instead of guessing.',
  '按生活节奏自动化': 'Automation for your routine',
  '为工作日、睡眠和出行设置定时策略，让充电管理自动发生。': 'Schedule charging strategies for workdays, sleep, and travel, then let them run automatically.',
  '引导式电池校准': 'Guided battery calibration',
  '跟随清晰步骤完成校准，修正长期使用后不准确的电量估算。': 'Follow clear steps to calibrate your battery and correct inaccurate estimates after long-term use.',
  '快捷指令与菜单栏': 'Shortcuts and menu bar controls',
  '无需打开主窗口，即可查看状态、切换策略或接入自动化流程。': 'Check status, switch strategies, or run automations without opening the main window.',
  '你看到的，就是实际运行的 ChargePilot。': 'What you see is the real ChargePilot.',
  '所有关键状态集中在原生 macOS 界面中。数据清晰、操作直接，也不会用夸张的估算替代真实硬件读数。': 'Every key status lives in a native macOS interface, with clear data, direct controls, and real hardware readings instead of inflated estimates.',
  '电池状态': 'Battery status',
  '健康': 'Healthy',
  '当前温度': 'Current temperature',
  '循环次数': 'Cycle count',
  '最大容量': 'Maximum capacity',
  '电池数据，留在你的 Mac。': 'Your battery data stays on your Mac.',
  '核心监控与策略在本机运行。ChargePilot 不需要账号才能完成基本电池管理，也不会出售你的个人数据。': 'Core monitoring and strategies run locally. ChargePilot needs no account for essential battery management and never sells your personal data.',
  '阅读隐私政策': 'Read the privacy policy',
  '让 Mac 电池少一点焦虑，多一点掌控。原生、轻量，专注于可靠的充电管理。': 'Less battery anxiety, more control. Native, lightweight, and focused on dependable charging management.',
  '少一点电池焦虑。': 'Less battery anxiety.',
  '多一点掌控。': 'More control.',
  '两种方式，同一套完整功能。先试用一年方案，或一次购买永久使用。': 'Two options, the same complete feature set. Try the annual plan first or purchase a lifetime license.',
  '7 天免费试用': '7-day free trial',
  '14 天退款保障': '14-day refund guarantee',
  'Paddle 安全结账': 'Secure checkout by Paddle',
  '正在确认支付环境…': 'Checking payment environment…',
  'Paddle 正式支付 · 将产生真实扣款': 'Paddle production checkout · Real charges will apply',
  'Sandbox 测试环境 · 不会真实扣款': 'Sandbox test environment · No real charge',
  '结账暂时无法完成，请稍后重试。': 'Checkout is temporarily unavailable. Please try again later.',
  '价格已根据你所在的地区显示，最终税费以结账页为准。': 'Prices are localized for your region. Final taxes are shown at checkout.',
  '价格加载失败。请刷新页面，或稍后再试。': 'Prices failed to load. Refresh the page or try again later.',
  '免费版': 'Free',
  '永久免费': 'Free forever',
  '先掌握电池状态': 'Start with battery visibility',
  '监控、菜单栏与健康概览永久免费，无需账号。': 'Monitoring, menu bar controls, and health overview stay free—no account required.',
  '免费': 'Free',
  '年度订阅': 'Annual subscription',
  '推荐': 'Recommended',
  '先免费使用 7 天': 'Start with 7 days free',
  '适合希望持续获得新功能和兼容性更新的用户。': 'For users who want ongoing features and compatibility updates.',
  '每年': 'per year',
  '免费试用': 'Start free trial',
  '7 天内不收费，试用结束后按年续订。': 'No charge for 7 days, then renews annually.',
  '永久授权': 'Lifetime license',
  '一次付费': 'One-time payment',
  '一次购买，长期使用': 'Buy once, use long term',
  '适合不希望订阅，直接拥有当前主要版本的用户。': 'For users who prefer to own the current major version without a subscription.',
  '一次性': 'one time',
  '购买永久授权': 'Buy lifetime license',
  '不含试用；未来重大版本可能单独提供升级。': 'No trial included; future major versions may offer separate upgrades.',
  '付款、税费与收据由 Paddle 安全处理。年度订阅可随时取消；购买适用我们的': 'Payments, taxes, and receipts are securely handled by Paddle. Annual subscriptions can be canceled anytime; purchases are covered by our',
  '隐私政策': 'Privacy Policy',
  '退款政策': 'Refund Policy',
  '生效日期': 'Effective date',
  '联系我们': 'Contact us',
  'ChargePilot 以本地优先为原则。我们只处理提供产品、完成交易和保障安全所必需的信息。': 'ChargePilot is local first. We process only the information needed to provide the product, complete transactions, and keep the service secure.',
  '1. 适用范围': '1. Scope',
  '本政策适用于 ChargePilot macOS 应用、官方网站和相关客户支持服务，不适用于你通过链接访问的第三方网站。': 'This policy applies to the ChargePilot macOS app, official website, and related customer support. It does not apply to third-party websites you visit through links.',
  '2. 我们处理的信息': '2. Information we process',
  '3. 使用目的与法律依据': '3. Purposes and legal bases',
  '我们处理信息用于提供授权和核心功能、完成购买与退款、答复支持请求、防止欺诈、修复错误并履行法律义务。处理依据包括履行合同、合法利益、法律义务以及在适用时取得的同意。': 'We process information to provide licensing and core features, complete purchases and refunds, answer support requests, prevent fraud, fix errors, and meet legal obligations. Our legal bases include contract performance, legitimate interests, legal obligations, and consent where applicable.',
  '4. 第三方与共享': '4. Third parties and sharing',
  '我们不会出售你的个人信息。为完成交易，我们使用 Paddle 作为 Merchant of Record；其处理活动受 Paddle 自身隐私政策约束。我们也可能在法律要求、保护用户安全或业务重组时披露必要信息。': 'We do not sell personal information. Paddle acts as our Merchant of Record for transactions and processes data under its own privacy policy. We may also disclose necessary information when required by law, to protect users, or during a business reorganization.',
  '5. 数据保留': '5. Data retention',
  '本机电池数据由你控制，可随应用数据一并删除。交易记录会按税务、会计和争议处理要求保留。支持记录仅在解决问题及满足合理法律义务所需期间保留。': 'You control local battery data and can remove it with the app data. Transaction records are retained for tax, accounting, and dispute requirements. Support records are kept only as long as needed to resolve issues and meet reasonable legal obligations.',
  '6. 数据安全与跨境传输': '6. Security and international transfers',
  '我们采用合理的访问控制、加密传输和最小化原则。互联网传输无法保证绝对安全。Paddle 等服务商可能在你所在国家以外处理数据，并依据适用机制保护跨境数据。': 'We use reasonable access controls, encrypted transmission, and data minimization. Internet transmission cannot be absolutely secure. Providers such as Paddle may process data outside your country using applicable safeguards.',
  '7. 你的权利': '7. Your rights',
  '视所在地法律，你可以请求访问、更正、删除、限制处理或获取个人信息副本，也可以反对某些处理或撤回同意。我们可能需要验证身份后处理请求。': 'Depending on local law, you may request access, correction, deletion, restriction, or a copy of your personal information, object to certain processing, or withdraw consent. We may need to verify your identity.',
  '8. 儿童隐私': '8. Children’s privacy',
  'ChargePilot 不面向 13 岁以下儿童，我们不会有意收集其个人信息。如果你认为儿童向我们提供了信息，请联系我们删除。': 'ChargePilot is not directed to children under 13, and we do not knowingly collect their personal information. Contact us if you believe a child has provided information so we can delete it.',
  '9. 政策更新': '9. Policy updates',
  '我们可能更新本政策，并在本页公布新版本和生效日期。重大变化会通过合理方式提示。': 'We may update this policy and publish the new version and effective date here. Material changes will be communicated reasonably.',
  '10. 联系我们': '10. Contact us',
  '本条款规定你使用 ChargePilot 软件、网站及相关服务时双方的权利与责任。': 'These terms define the rights and responsibilities that apply when you use ChargePilot software, websites, and related services.',
  '1. 接受条款': '1. Acceptance',
  '下载、安装、购买或使用 ChargePilot，即表示你已阅读并同意本条款。如果你不同意，请停止使用本产品。': 'By downloading, installing, purchasing, or using ChargePilot, you confirm that you have read and accepted these terms. If you disagree, stop using the product.',
  '2. 产品与许可': '2. Product and license',
  'ChargePilot 是用于 macOS 的电池与充电管理软件。购买个人版后，我们授予你一项有限、非独占、不可转让的个人使用许可。你不得转售、出租、破解、规避授权机制或将软件用于违法活动。': 'ChargePilot is battery and charging management software for macOS. A personal purchase grants a limited, non-exclusive, non-transferable license for personal use. You may not resell, rent, crack, bypass licensing, or use the software unlawfully.',
  '3. 兼容性与硬件控制': '3. Compatibility and hardware control',
  '部分充电控制依赖 Mac 机型、macOS 版本和固件能力。我们会尽力检测兼容性并安全执行操作，但无法保证所有功能在每台设备上均可用。你应在执行校准、主动放电或其他硬件相关操作前阅读界面提示。': 'Some charging controls depend on Mac model, macOS version, and firmware. We work to detect compatibility and operate safely but cannot guarantee every feature on every device. Review in-app guidance before calibration, active discharge, or other hardware operations.',
  '4. 价格与支付': '4. Pricing and payment',
  '当前价格以定价页及 Paddle 结账页显示为准。Paddle 作为我们的 Merchant of Record 处理付款、税费、发票和部分退款流程。除结账页另有说明外，个人版为一次性授权，不会自动续费。': 'Current prices are shown on the pricing and Paddle checkout pages. Paddle is our Merchant of Record and handles payments, taxes, invoices, and parts of the refund process. Unless checkout states otherwise, personal licenses are one-time and do not renew automatically.',
  '5. 更新与可用性': '5. Updates and availability',
  '我们可能发布错误修复、功能更新或兼容性更新，也可能调整或停止不再可持续的功能。我们不会承诺服务永久无中断，但会采取合理措施维持产品可用。': 'We may release fixes, features, and compatibility updates, and may adjust or discontinue unsustainable functionality. We do not promise uninterrupted availability forever, but take reasonable steps to keep the product available.',
  '6. 知识产权': '6. Intellectual property',
  'ChargePilot 的软件、界面、品牌、文档和网站内容归 ChargePilot 及其许可方所有。本条款不会将任何知识产权转让给你。': 'ChargePilot software, interfaces, branding, documentation, and website content belong to ChargePilot and its licensors. These terms transfer no intellectual property to you.',
  '7. 免责声明与责任限制': '7. Disclaimers and limitation of liability',
  '产品按“现状”和“可用”状态提供。在法律允许的最大范围内，我们不对间接损失、利润损失或数据丢失负责。因本产品产生的累计责任不超过你为 ChargePilot 实际支付的金额。法律规定不得排除的权利不受本条限制。': 'The product is provided “as is” and “as available.” To the fullest extent permitted by law, we are not liable for indirect loss, lost profit, or data loss. Aggregate liability will not exceed the amount you paid for ChargePilot. Rights that cannot legally be excluded remain unaffected.',
  '8. 终止': '8. Termination',
  '如果你严重违反本条款，我们可以终止许可。终止后你应停止使用并删除软件。付款后的退款权利仍按退款政策和适用法律处理。': 'We may terminate the license for a material breach. After termination, stop using and delete the software. Refund rights remain governed by the refund policy and applicable law.',
  '9. 条款变更': '9. Changes to these terms',
  '我们可能因产品或法律变化更新本条款。重大变更会在网站公布并更新生效日期；继续使用即代表接受更新后的条款。': 'We may update these terms for product or legal changes. Material changes will be published with a new effective date; continued use means acceptance of the updated terms.',
  '如果 ChargePilot 不适合你的设备或工作方式，可在符合以下条件时申请退款。': 'If ChargePilot does not suit your device or workflow, you may request a refund under the conditions below.',
  '1. 14 天退款保障': '1. 14-day refund guarantee',
  '对于通过 Paddle 首次购买的 ChargePilot 个人版，你可以在付款之日起 14 个自然日内申请全额退款。适用法律提供更长退款期的，以当地法律为准。': 'For a first ChargePilot personal purchase through Paddle, you may request a full refund within 14 calendar days. A longer period required by applicable law takes precedence.',
  '2. 如何申请': '2. How to request a refund',
  '3. 处理时间': '3. Processing time',
  '我们通常会在收到完整信息后 3 个工作日内审核。批准后，Paddle 会将款项退回原支付方式。银行或支付渠道通常还需要 5 至 10 个工作日完成入账。': 'We usually review complete requests within 3 business days. Once approved, Paddle returns funds to the original payment method; banks and payment providers may take another 5–10 business days.',
  '4. 退款限制': '4. Refund limitations',
  '超过 14 天的申请通常不予退款，但软件在受支持设备上存在无法解决的重大故障、重复扣款、未经授权的交易或适用法律另有要求时除外。滥用退款、欺诈购买或违反服务条款的订单可能被拒绝。': 'Requests after 14 days are generally not refundable, except for unresolved major defects on supported devices, duplicate charges, unauthorized transactions, or where required by law. Refund abuse, fraud, or terms violations may be denied.',
  '5. 退款后的授权': '5. License after refund',
  '退款完成后，对应授权会被撤销，你应停止使用付费功能并删除相关授权副本。退款不会影响退款前依法享有的权利。': 'After a refund, the related license is revoked. Stop using paid features and delete related license copies. A refund does not affect rights already accrued under law.',
  '6. 价格调整': '6. Price changes',
  '促销或后续价格变动不构成对既往订单的退款理由。重复购买请及时联系我们，我们会核实后处理。': 'Promotions or later price changes do not justify refunds for earlier orders. Contact us promptly about duplicate purchases so we can verify and resolve them.',
  '7. 争议与法定权利': '7. Disputes and statutory rights',
  '感谢购买': 'Thank you for your purchase',
  '支付已由 Paddle 处理。下载并打开 App 后，在 Pro 激活界面输入结账邮箱，通过邮件验证码即可激活包年订阅或永久授权。': 'Paddle has processed your payment. Download and open the app, enter your checkout email on the Pro activation screen, and use the email verification code to activate your annual or lifetime license.',
  '返回首页': 'Back to home',
};

const titleTranslations = {
  'ChargePilot — 掌控 Mac 的每一次充电': 'ChargePilot — Take control of every charge',
  '定价 — ChargePilot': 'Pricing — ChargePilot',
  '隐私政策 — ChargePilot': 'Privacy Policy — ChargePilot',
  '服务条款 — ChargePilot': 'Terms of Service — ChargePilot',
  '退款政策 — ChargePilot': 'Refund Policy — ChargePilot',
};

const originalText = new WeakMap();
let language = readInitialLanguage();
let applying = false;

function readInitialLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'zh' || saved === 'en') return saved;
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

export function getLanguage() {
  return language;
}

export function t(text) {
  return language === 'en' ? english[text] ?? text : text;
}

function translateTextNode(node) {
  const source = originalText.get(node) ?? node.nodeValue;
  if (!originalText.has(node)) originalText.set(node, source);
  const trimmed = source.trim();
  if (!trimmed) return;
  const translated = language === 'en' ? english[trimmed] ?? trimmed : trimmed;
  const leading = source.match(/^\s*/)?.[0] ?? '';
  const trailing = source.match(/\s*$/)?.[0] ?? '';
  node.nodeValue = `${leading}${translated}${trailing}`;
}

function translateAttributes(root) {
  root.querySelectorAll('[aria-label], [alt], [title]').forEach((element) => {
    for (const attribute of ['aria-label', 'alt', 'title']) {
      const value = element.getAttribute(attribute);
      if (!value) continue;
      const key = `data-i18n-${attribute}`;
      const source = element.getAttribute(key) ?? value;
      if (!element.hasAttribute(key)) element.setAttribute(key, source);
      element.setAttribute(attribute, language === 'en' ? english[source] ?? source : source);
    }
  });
}

function ensureLanguageSwitch() {
  const host = document.querySelector('.header-inner');
  if (!host || host.querySelector('[data-language-switch]')) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'language-switch';
  button.dataset.languageSwitch = '';
  button.addEventListener('click', () => setLanguage(language === 'zh' ? 'en' : 'zh'));
  const navigation = host.querySelector('[data-navigation]');
  host.insertBefore(button, navigation);
}

export function applyLanguage(root = document.body) {
  if (!root || applying) return;
  applying = true;
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.parentElement?.closest('script, style, noscript, [data-language-switch]')
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT;
    },
  });
  while (walker.nextNode()) translateTextNode(walker.currentNode);
  translateAttributes(root);
  const sourceTitle = document.documentElement.dataset.originalTitle ?? document.title;
  document.documentElement.dataset.originalTitle = sourceTitle;
  document.title = language === 'en' ? titleTranslations[sourceTitle] ?? sourceTitle : sourceTitle;
  ensureLanguageSwitch();
  const button = document.querySelector('[data-language-switch]');
  if (button) {
    const label = language === 'zh' ? 'EN' : '中';
    if (button.textContent !== label) button.textContent = label;
    button.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换到中文');
  }
  applying = false;
}

export function setLanguage(next) {
  language = next;
  localStorage.setItem(STORAGE_KEY, next);
  applyLanguage();
}

export function initializeI18n() {
  applyLanguage();
  const observer = new MutationObserver(() => {
    if (!applying) requestAnimationFrame(() => applyLanguage());
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
