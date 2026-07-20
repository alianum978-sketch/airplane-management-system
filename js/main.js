/* =========================================================================
   AirManager — shared utilities
   Loaded on every page before the page-specific controller script.
   ========================================================================= */

const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));

/** Turn "on time" / "checked-in" into a safe CSS class suffix: ontime / checkedin */
function statusToClass(status) {
  return String(status).toLowerCase().replace(/[^a-z0-9]/g, "");
}

function statusBadge(status) {
  const cls = statusToClass(status);
  return `<span class="badge-status badge-${cls}">${escapeHtml(status)}</span>`;
}

function classBadge(cls) {
  const key = String(cls).toLowerCase();
  return `<span class="badge-class ${key}">${escapeHtml(capitalize(cls))}</span>`;
}

function capitalize(str) {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}

function initials(name) {
  return String(name)
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

/* ------------------------------ Sidebar ---------------------------------- */

function initSidebar() {
  const sidebar = $("#sidebar");
  const toggle = $("#sidebarToggle");
  const closeBtn = $("#sidebarCloseBtn");
  const backdrop = $("#sidebarBackdrop");
  if (!sidebar) return;

  const open = () => {
    sidebar.classList.add("show");
    backdrop.classList.add("show");
  };
  const close = () => {
    sidebar.classList.remove("show");
    backdrop.classList.remove("show");
  };

  toggle?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);
}

/* -------------------------------- Clock ----------------------------------- */

function initClock() {
  const el = $("#liveClock");
  if (!el) return;
  const tick = () => {
    const now = new Date();
    el.innerHTML = `<i class="bi bi-clock me-1"></i>${now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })}`;
  };
  tick();
  setInterval(tick, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  initSidebar();
  initClock();
});
