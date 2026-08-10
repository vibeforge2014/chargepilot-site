import "./styles.css";
import { applyLanguage } from "./i18n.js";

/* ----------------------------------------------------------------------------
 * Shared page setup: runs on first load AND after every PJAX navigation.
 * Each piece is idempotent — safe to call repeatedly as <main> gets replaced.
 * -------------------------------------------------------------------------- */
function setActiveNav() {
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-navigation] a").forEach((link) => {
    if (link.getAttribute("href") === currentFile) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function bindMenu() {
  const menuButton = document.querySelector("[data-menu-button]");
  const navigation = document.querySelector("[data-navigation]");
  if (!menuButton || !navigation) return;
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    navigation.toggleAttribute("data-open", !expanded);
  }, { once: true });
}

function stampYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

function setupPage() {
  setActiveNav();
  stampYear();
  applyLanguage();
}

setupPage();
bindMenu();

/* ----------------------------------------------------------------------------
 * PJAX: navigate between same-depth pages without a full page reload.
 *
 * Whitelist: index, privacy-policy, terms-of-service, refund-policy.
 * These share an identical <body> (no class) and a single <main>, so swapping
 * <main> + <title> is enough. Pages are excluded when they need more:
 *   • pricing.html  — relies on body.pricing-page AND pricing.js re-running the
 *                     Paddle SDK on load (its re-entry safety is unverified).
 *   • welcome/      — a subpath and the Paddle checkout success-redirect target.
 * External links, downloads, and modified clicks always fall through to the
 * browser.
 * -------------------------------------------------------------------------- */
const PJAX_PAGES = new Set(["index.html", "", "privacy-policy.html", "terms-of-service.html", "refund-policy.html"]);

function sameOrigin(url) {
  return new URL(url, window.location.href).origin === window.location.origin;
}

function shouldPJAX(href) {
  // Never PJAX onto or off of a page whose <body> carries a page-specific class
  // (pricing-page pulls in pricing.js + the Paddle SDK). Always full-load instead.
  if (document.body.classList.contains("pricing-page")) return false;
  if (!sameOrigin(href)) return false;
  const u = new URL(href, window.location.href);
  // only top-level pages, same depth (no subpaths like /welcome/)
  if (u.pathname.includes("/welcome/")) return false;
  const file = u.pathname.split("/").pop() || "";
  return PJAX_PAGES.has(file);
}

function isModifiedClick(event) {
  return event.defaultPrevented
    || event.button !== 0
    || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

/* Thin top progress bar — appears only while a fetch is in flight. */
const progressBar = document.createElement("div");
progressBar.className = "pjax-progress";
document.body.appendChild(progressBar);
// force a reflow so the initial width transition registers
void progressBar.offsetWidth;

let loadingTimer;

function startProgress() {
  window.clearTimeout(loadingTimer);
  progressBar.classList.add("is-loading");
  // hold at ~70% to suggest in-flight work without a hard stall
  loadingTimer = window.setTimeout(() => progressBar.classList.add("is-near"), 2400);
}

function stopProgress() {
  window.clearTimeout(loadingTimer);
  progressBar.classList.add("is-done");
  window.setTimeout(() => {
    progressBar.classList.remove("is-loading", "is-near", "is-done");
  }, 220);
}

async function navigate(href, { push = true } = {}) {
  startProgress();
  try {
    const res = await fetch(href, { headers: { "X-Requested-With": "PJAX" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const nextMain = doc.querySelector("main");
    const currentMain = document.querySelector("main");
    if (!nextMain || !currentMain) throw new Error("missing <main>");

    // fade old content out, swap, fade new in
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) currentMain.classList.add("is-leaving");

    await new Promise((r) => setTimeout(r, reduceMotion ? 0 : 110));

    currentMain.replaceWith(nextMain);
    document.title = doc.title || document.title;
    document.documentElement.dataset.originalTitle = document.title;
    // keep page-level body class in sync with the incoming page so scoped
    // theme styles (e.g. .pricing-page) never leak across navigations
    document.body.className = doc.body ? doc.body.className : "";

    if (!reduceMotion) {
      nextMain.classList.add("is-entering");
      requestAnimationFrame(() => requestAnimationFrame(() => nextMain.classList.remove("is-entering")));
    }

    if (push) window.history.pushState({ path: href }, "", href);
    window.scrollTo(0, 0);

    // close the mobile menu if it was open
    const nav = document.querySelector("[data-navigation]");
    const menuBtn = document.querySelector("[data-menu-button]");
    nav?.removeAttribute("data-open");
    menuBtn?.setAttribute("aria-expanded", "false");

    setupPage();
  } catch (err) {
    // never leave the user stuck — fall back to a full load
    console.error("PJAX navigation failed, falling back:", err);
    window.location.href = href;
  } finally {
    stopProgress();
  }
}

// intercept clicks on same-site links
document.addEventListener("click", (event) => {
  if (isModifiedClick(event)) return;
  const link = event.target instanceof Element ? event.target.closest("a") : null;
  if (!link) return;
  const href = link.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
  // let excluded pages and external links behave normally
  if (!shouldPJAX(link.href)) return;
  event.preventDefault();
  if (link.href === window.location.href) return;
  navigate(link.href);
});

// handle back / forward
window.addEventListener("popstate", (event) => {
  const path = (event.state && event.state.path) || window.location.href;
  navigate(path, { push: false });
});
