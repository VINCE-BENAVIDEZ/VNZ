/* =========================================================
   CREDENTIALS PAGE — rendering + behavior
   You normally don't need to edit this file.
   Add or change credentials in:  assets/js/credentials-data.js
   ========================================================= */
const listEl = document.querySelector("#credentialList");
const filtersEl = document.querySelector("#credentialFilters");
const countEl = document.querySelector("#credentialCount");

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

/* ---------- media box (certificate picture, fitted inside the frame) ---------- */
function renderMedia(item, number) {
  const label = `<span class="media-index mono">CREDENTIAL / ${number}</span>`;
  const media = item.media;
  if (media && media.type === "image" && media.src) {
    return `<div class="entry-media has-media">${label}<img src="${escapeHTML(media.src)}" alt="${escapeHTML(media.alt || item.title)}" loading="lazy" decoding="async"></div>`;
  }
  return `<div class="entry-media ${escapeHTML(item.art || "art-web")}">${label}
      <span class="media-glyph">${escapeHTML(item.glyph || "🎓")}</span>
      <span class="media-caption mono">CERTIFICATE / IMG.</span></div>`;
}

/* ---------- one credential entry ---------- */
function renderEntry(item, index) {
  const number = String(index + 1).padStart(2, "0");
  const paragraphs = (Array.isArray(item.description) ? item.description : [item.description])
    .filter(Boolean).map(text => `<p>${escapeHTML(text)}</p>`).join("");
  const tags = (item.tags || []).map(tag => `<span>${escapeHTML(tag)}</span>`).join("");
  const link = item.link
    ? `<a class="view-all-btn entry-view-btn" href="${escapeHTML(item.link)}" target="_blank" rel="noreferrer"><span>Verify credential</span><i data-lucide="arrow-up-right"></i></a>`
    : "";
  const row = (label, value) => value ? `<div class="meta-row"><dt>${label}</dt><dd>${escapeHTML(value)}</dd></div>` : "";

  return `
    <article class="project-entry reveal" id="${escapeHTML(item.id)}">
      <div class="entry-left">
        ${renderMedia(item, number)}
        <dl class="entry-meta">
          <div class="meta-row meta-title"><dt>Title</dt><dd>${escapeHTML(item.title)}</dd></div>
          ${row("Type", item.type)}
          ${row("Issued by", item.issuer)}
          ${row("Date issued", item.date)}
          ${row("Credential ID", item.credentialId)}
        </dl>
      </div>
      <div class="entry-right">
        <div class="entry-label mono">DESCRIPTION</div>
        <div class="entry-desc">${paragraphs}</div>
        ${tags ? `<div class="tag-list entry-tags">${tags}</div>` : ""}
        ${link}
      </div>
    </article>`;
}

/* ---------- list + filters ---------- */
function renderEntries(filter = "All") {
  const visible = CREDENTIAL_ENTRIES
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => filter === "All" || item.type === filter);

  listEl.innerHTML = visible.length
    ? visible.map(({ item, index }) => renderEntry(item, index)).join("")
    : `<p class="project-empty mono">NOTHING HERE YET — NEW CREDENTIALS ARE COMING SOON.</p>`;

  if (window.lucide) lucide.createIcons();
  observeReveals();
}

function renderFilters() {
  const types = [...new Set(CREDENTIAL_ENTRIES.map(item => item.type).filter(Boolean))];
  filtersEl.innerHTML =
    `<button class="filter-btn active" data-filter="All">All <span>${String(CREDENTIAL_ENTRIES.length).padStart(2, "0")}</span></button>` +
    types.map(type => `<button class="filter-btn" data-filter="${escapeHTML(type)}">${escapeHTML(type)}</button>`).join("");
}

filtersEl.addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  filtersEl.querySelectorAll(".filter-btn").forEach(item => item.classList.toggle("active", item === button));
  renderEntries(button.dataset.filter);
});

/* ---------- shared site behavior (same as index.html) ---------- */
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
  if (window.lucide) lucide.createIcons();
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.innerHTML = '<i data-lucide="menu"></i>';
  if (window.lucide) lucide.createIcons();
}));

window.addEventListener("scroll", () => {
  document.querySelector(".site-header").classList.toggle("scrolled", window.scrollY > 25);
}, { passive: true });

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

function observeReveals() {
  document.querySelectorAll(".reveal:not(.visible)").forEach(element => revealObserver.observe(element));
}

/* ---------- start ---------- */
document.querySelector("#year").textContent = new Date().getFullYear();
countEl.textContent = String(CREDENTIAL_ENTRIES.length).padStart(2, "0");
renderFilters();
renderEntries();
if (window.lucide) lucide.createIcons();

// Deep link: credential.html#credential-id scrolls to that credential.
if (location.hash) {
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target) window.setTimeout(() => target.scrollIntoView({ block: "start" }), 120);
}
