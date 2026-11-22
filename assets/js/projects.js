/* =========================================================
   PROJECTS PAGE — rendering + behavior
   You normally don't need to edit this file.
   Add or change projects in:  assets/js/projects-data.js
   ========================================================= */
const listEl = document.querySelector("#projectList");
const filtersEl = document.querySelector("#projectFilters");
const countEl = document.querySelector("#projectCount");

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

const PLAY_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>';

/* ---------- media box (project video / image) ---------- */
function renderMedia(project, number) {
  const media = project.media;
  const label = `<span class="media-index mono">PROJECT / ${number}</span>`;

  if (media && media.type === "image" && media.src) {
    return `<div class="entry-media has-media">${label}<img src="${escapeHTML(media.src)}" alt="${escapeHTML(media.alt || project.title)}" loading="lazy" decoding="async"></div>`;
  }

  const isVideo = media && (media.type === "video" || media.type === "youtube");
  const playBtn = isVideo
    ? `<button class="play-btn" type="button" aria-label="Play video: ${escapeHTML(project.title)}">${PLAY_ICON}</button>`
    : "";
  const poster = isVideo && media.poster
    ? `<img class="media-poster" src="${escapeHTML(media.poster)}" alt="" loading="lazy" decoding="async">`
    : "";
  const placeholder = poster ? "" : `
      <span class="media-glyph">${escapeHTML(project.glyph || "✳")}</span>
      <span class="media-caption mono">${isVideo ? "PROJECT VIDEO" : "PROJECT VIDEO / IMG."}</span>`;
  const data = isVideo
    ? ` data-media-type="${escapeHTML(media.type)}" data-src="${escapeHTML(media.src || media.id || "")}" data-poster="${escapeHTML(media.poster || "")}"`
    : "";

  return `<div class="entry-media ${escapeHTML(project.art || "art-web")}${poster ? " has-media" : ""}"${data}>${label}${poster}${placeholder}${playBtn}</div>`;
}

/* ---------- one project entry ---------- */
function renderEntry(project, index) {
  const number = String(index + 1).padStart(2, "0");
  const paragraphs = (Array.isArray(project.description) ? project.description : [project.description])
    .filter(Boolean).map(text => `<p>${escapeHTML(text)}</p>`).join("");
  const tags = (project.tags || []).map(tag => `<span>${escapeHTML(tag)}</span>`).join("");
  const link = project.link
    ? `<a class="view-all-btn entry-view-btn" href="${escapeHTML(project.link)}" target="_blank" rel="noreferrer"><span>View project</span><i data-lucide="arrow-up-right"></i></a>`
    : "";

  return `
    <article class="project-entry reveal" id="${escapeHTML(project.id)}">
      <div class="entry-left">
        ${renderMedia(project, number)}
        <dl class="entry-meta">
          <div class="meta-row meta-title"><dt>Title</dt><dd>${escapeHTML(project.title)}</dd></div>
          <div class="meta-row"><dt>Type</dt><dd>${escapeHTML(project.type)}</dd></div>
          <div class="meta-row"><dt>Objective</dt><dd>${escapeHTML(project.objective)}</dd></div>
          <div class="meta-row"><dt>Date created</dt><dd>${escapeHTML(project.date)}</dd></div>
          <div class="meta-row"><dt>Thanks to</dt><dd>${escapeHTML(project.thanks)}</dd></div>
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
  const visible = PROJECT_ENTRIES
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => filter === "All" || project.type === filter);

  listEl.innerHTML = visible.length
    ? visible.map(({ project, index }) => renderEntry(project, index)).join("")
    : `<p class="project-empty mono">NOTHING HERE YET — NEW WORK IN THIS CATEGORY IS COMING SOON.</p>`;

  if (window.lucide) lucide.createIcons();
  observeReveals();
}

function renderFilters() {
  const types = [...new Set(PROJECT_ENTRIES.map(project => project.type).filter(Boolean))];
  filtersEl.innerHTML =
    `<button class="filter-btn active" data-filter="All">All <span>${String(PROJECT_ENTRIES.length).padStart(2, "0")}</span></button>` +
    types.map(type => `<button class="filter-btn" data-filter="${escapeHTML(type)}">${escapeHTML(type)}</button>`).join("");
}

filtersEl.addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  filtersEl.querySelectorAll(".filter-btn").forEach(item => item.classList.toggle("active", item === button));
  renderEntries(button.dataset.filter);
});

/* ---------- play video / youtube inside the media box ---------- */
listEl.addEventListener("click", event => {
  const playButton = event.target.closest(".play-btn");
  if (!playButton) return;
  const box = playButton.closest(".entry-media");
  const kind = box.dataset.mediaType;
  const src = box.dataset.src;
  if (!src) return;

  let player;
  if (kind === "youtube") {
    player = document.createElement("iframe");
    player.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(src)}?autoplay=1&rel=0`;
    player.title = "Project video";
    player.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    player.allowFullscreen = true;
  } else {
    player = document.createElement("video");
    player.src = src;
    player.controls = true;
    player.autoplay = true;
    player.playsInline = true;
    if (box.dataset.poster) player.poster = box.dataset.poster;
  }
  player.className = "media-player";
  box.classList.add("playing");
  box.appendChild(player);
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
countEl.textContent = String(PROJECT_ENTRIES.length).padStart(2, "0");
renderFilters();
renderEntries();
if (window.lucide) lucide.createIcons();

// Deep link: projects.html#project-id scrolls to that project.
if (location.hash) {
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target) window.setTimeout(() => target.scrollIntoView({ block: "start" }), 120);
}
