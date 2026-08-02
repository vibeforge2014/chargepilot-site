import "./styles.css";

const menuButton = document.querySelector("[data-menu-button]");
const navigation = document.querySelector("[data-navigation]");

menuButton?.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  navigation?.toggleAttribute("data-open", !expanded);
});

const currentFile = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("[data-navigation] a").forEach((link) => {
  if (link.getAttribute("href") === currentFile) link.setAttribute("aria-current", "page");
});

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
