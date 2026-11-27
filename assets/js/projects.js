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

  // Photo: shown whole, fitted inside the frame
  if (media && media.type === "image" && media.src) {
    return `<div class="entry-media has-media">${label}<img src="${escapeHTML(media.src)}" alt="${escapeHTML(media.alt || project.title)}" loading="lazy" decoding="async"></div>`;
  }

  // Video: the player itself fills the frame (no placeholder/preview card)
  const isVideo = media && (media.type === "video" || media.type === "youtube");
  if (isVideo) {
    const resolved = resolveMedia(media.type, media.src || media.id);
    if (resolved) {
      const player = resolved.type === "iframe"
        ? `<iframe class="media-player" src="${escapeHTML(resolved.src)}" title="${escapeHTML(project.title)} video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy" referrerpolicy="no-referrer"></iframe>`
        : `<video class="media-player" src="${escapeHTML(resolved.src)}" controls playsinline preload="metadata"${media.poster ? ` poster="${escapeHTML(media.poster)}"` : ""}></video>`;
      return `<div class="entry-media has-media">${label}${player}</div>`;
    }
  }

  // No media at all: keep the glyph placeholder
  return `<div class="entry-media ${escapeHTML(project.art || "art-web")}">${label}
      <span class="media-glyph">${escapeHTML(project.glyph || "✳")}</span>
      <span class="media-caption mono">PROJECT VIDEO / IMG.</span></div>`;
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

/* ---------- list + filters + search ---------- */
const searchForm = document.querySelector("#projectSearch");
const searchInput = document.querySelector("#searchInput");
const searchClear = document.querySelector("#searchClear");
const searchStatus = document.querySelector("#searchStatus");

let activeFilter = "All";
let searchQuery = "";

// Everything searchable in one project, taken straight from projects-data.js
function searchText(project) {
  return [
    project.title, project.type, project.objective, project.date,
    project.thanks, project.id,
    ...(Array.isArray(project.description) ? project.description : [project.description]),
    ...(project.tags || [])
  ].join(" ").toLowerCase();
}

// Every word typed must appear somewhere in the project (order doesn't matter)
function matchesQuery(project, query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const text = searchText(project);
  return words.every(word => text.includes(word));
}

function renderEntries(filter = activeFilter) {
  activeFilter = filter;
  const visible = PROJECT_ENTRIES
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => (activeFilter === "All" || project.type === activeFilter) && matchesQuery(project, searchQuery));

  const searching = searchQuery.trim().length > 0;
  listEl.innerHTML = visible.length
    ? visible.map(({ project, index }) => renderEntry(project, index)).join("")
    : `<p class="project-empty mono">${searching
        ? "NO PROJECTS MATCH YOUR SEARCH — TRY A DIFFERENT KEYWORD."
        : "NOTHING HERE YET — NEW WORK IN THIS CATEGORY IS COMING SOON."}</p>`;

  searchStatus.textContent = searching
    ? `${String(visible.length).padStart(2, "0")} RESULT${visible.length === 1 ? "" : "S"} FOR “${searchQuery.trim().toUpperCase()}”`
    : "";

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

/* ---------- search box (always open) ---------- */
searchInput.addEventListener("input", () => {
  searchQuery = searchInput.value;
  searchForm.classList.toggle("has-text", searchQuery.length > 0);
  renderEntries();
});

function clearSearch() {
  searchInput.value = "";
  searchQuery = "";
  searchForm.classList.remove("has-text");
  renderEntries();
}

searchClear.addEventListener("click", () => { clearSearch(); searchInput.focus(); });
searchForm.addEventListener("submit", event => event.preventDefault());
searchInput.addEventListener("keydown", event => {
  if (event.key === "Escape") clearSearch();
});

/* ---------- play video / youtube / google drive inside the media box ---------- */
/* Turns any pasted link into something the browser can actually play.
   - Google Drive share/preview links  -> Drive embed iframe
   - YouTube links or plain video IDs  -> YouTube embed iframe
   - Vimeo links                       -> Vimeo embed iframe
   - Direct files (.mp4 .webm .ogg .mov) -> native <video>
   - Any other https link              -> generic iframe                     */
function resolveMedia(kind, rawSrc) {
  const src = String(rawSrc || "").trim();
  if (!src) return null;

  // Google Drive: .../file/d/FILE_ID/view | /preview | open?id=FILE_ID | uc?id=FILE_ID
  const drive = src.match(/drive\.google\.com\/file\/d\/([\w-]+)/) ||
                src.match(/drive\.google\.com\/(?:open|uc)\?(?:[^#]*&)?id=([\w-]+)/);
  if (drive) return { type: "iframe", src: `https://drive.google.com/file/d/${drive[1]}/preview` };

  // YouTube (full URL, short URL, embed URL)
  const yt = src.match(/(?:youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { type: "iframe", src: `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0` };
  if (kind === "youtube" && /^[\w-]{11}$/.test(src))
    return { type: "iframe", src: `https://www.youtube-nocookie.com/embed/${src}?rel=0` };

  // Vimeo
  const vimeo = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { type: "iframe", src: `https://player.vimeo.com/video/${vimeo[1]}` };

  // Direct video file
  if (/\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(src)) return { type: "video", src };

  // Anything else that is a web page: embed it
  if (/^https?:\/\//i.test(src)) return { type: "iframe", src };

  // Relative path without extension info: try as a video file
  return { type: "video", src };
}

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

/* ---------- back-to-top button ---------- */
const backToTop = document.querySelector("#backToTop");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 400);
}, { passive: true });
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

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
