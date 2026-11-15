/* =========================================================
   VINCE BENAVIDEZ — PORTFOLIO
   Edit the PROJECTS array and CONFIG values below to customize.
   The contact form uses mailto: and does not require a backend.
   ========================================================= */

const CONFIG = {
  name: "Vince Benavidez",
  email: "hello@example.com", // Replace with your real email.
  github: "https://github.com/", // Replace with your profile.
  linkedin: "https://www.linkedin.com/" // Replace with your profile.
};

// Add, remove, or edit projects here. Each card opens a detail modal.
const PROJECTS = [
  {
    id: "pet-identify",
    title: "Pet Identify",
    category: "Web Development",
    description: "A digital pet identification concept connecting physical identity with useful online pet information.",
    tags: ["HTML", "CSS", "JavaScript", "Google Maps"],
    glyph: "✳", art: "art-web",
    details: "A platform concept designed to help pet owners maintain accessible identification records and support the safe return of lost pets. Expand this note with your role, process, technical architecture, and measurable outcomes.",
    link: "https://example.com"
  },
  {
    id: "link-safety",
    title: "Web Link Safety Assurance",
    category: "Computer Research",
    description: "A proposed browser extension concept for identifying suspicious links and helping prevent online threats.",
    tags: ["Cybersecurity", "Browser Extension", "Research"],
    glyph: "⌁", art: "art-research",
    details: "A research project exploring practical, lightweight methods for detecting phishing links, malicious redirects, and deceptive URLs. Add your methodology, evaluation, findings, and research document.",
    link: "https://example.com"
  },
  {
    id: "creative-automation",
    title: "Creative Automation Lab",
    category: "Programming",
    description: "Small experiments that turn repetitive digital workflows into simple, reusable tools.",
    tags: ["JavaScript", "Automation", "APIs"],
    glyph: "{ }", art: "art-code",
    details: "A collection of programming experiments focused on useful automation, API integrations, and thoughtful interfaces. Replace this placeholder with a specific tool or repository.",
    link: "https://github.com/"
  },
  {
    id: "ai-interface",
    title: "Human × AI Interface",
    category: "Artificial Intelligence",
    description: "An exploration of calm, human-centered interfaces for interacting with intelligent systems.",
    tags: ["AI", "UX", "Prototyping"],
    glyph: "◎", art: "art-ai",
    details: "A conceptual exploration of how AI features can be integrated into everyday interfaces without overwhelming the user. Describe the model or API used if you build a working implementation.",
    link: "https://example.com"
  },
  {
    id: "visual-studies",
    title: "Visual Studies",
    category: "Digital Art",
    description: "A growing collection of visual experiments with form, color, typography, and digital composition.",
    tags: ["Digital Art", "Composition", "Design"],
    glyph: "◌", art: "art-art",
    details: "A personal visual playground for experimenting with digital composition, visual language, and creative direction. Replace this with images and captions for your selected artworks.",
    link: "https://example.com"
  },
  {
    id: "cardistry-motion",
    title: "Cardistry / Motion Studies",
    category: "Cardistry",
    description: "A visual practice exploring flow, rhythm, precision, and expressive movement with playing cards.",
    tags: ["Cardistry", "Flourishes", "Performance"],
    glyph: "♠", art: "art-cards",
    details: "A record of cardistry practice, original flourishes, performance clips, and experiments in movement. Add embedded video links, photographs, and the names of your routines.",
    link: "https://example.com"
  }
];

const projectGrid = document.querySelector("#projectGrid");
const filters = document.querySelector("#projectFilters");
const modal = document.querySelector("#projectModal");
const toast = document.querySelector("#toast");

function renderProjects(filter = "All") {
  const visible = PROJECTS.filter(project => filter === "All" || project.category === filter);
  projectGrid.innerHTML = visible.map((project, index) => `
    <article class="project-card" tabindex="0" role="button" aria-label="View ${escapeHTML(project.title)} project" data-project="${escapeHTML(project.id)}">
      <div class="project-art ${escapeHTML(project.art)}">
        <span class="art-index">PROJECT / ${String(index + 1).padStart(2, "0")}</span>
        <span class="art-glyph">${escapeHTML(project.glyph)}</span>
      </div>
      <div class="project-card-body">
        <div class="project-card-top"><span class="project-category">${escapeHTML(project.category)}</span><i data-lucide="arrow-up-right"></i></div>
        <h3>${escapeHTML(project.title)}</h3>
        <p>${escapeHTML(project.description)}</p>
        <div class="project-tags">${project.tags.slice(0, 3).map(tag => `<span>${escapeHTML(tag)}</span>`).join("")}</div>
      </div>
    </article>`).join("");
  if (window.lucide) lucide.createIcons();
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

function openProject(id) {
  const project = PROJECTS.find(item => item.id === id);
  if (!project) return;
  document.querySelector("#modalArt").className = `modal-art ${project.art}`;
  document.querySelector("#modalArt").innerHTML = `<span>${escapeHTML(project.glyph)}</span>`;
  document.querySelector("#modalCategory").textContent = `PROJECT / ${project.category.toUpperCase()}`;
  document.querySelector("#modalTitle").textContent = project.title;
  document.querySelector("#modalDescription").textContent = project.description;
  document.querySelector("#modalDetails").textContent = project.details;
  document.querySelector("#modalTags").innerHTML = project.tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join("");
  const link = document.querySelector("#modalLink");
  link.href = project.link || "#";
  link.style.display = project.link ? "inline-flex" : "none";
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  document.querySelector(".modal-close").focus();
}

function closeProject() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

filters.addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  filters.querySelectorAll(".filter-btn").forEach(item => item.classList.toggle("active", item === button));
  renderProjects(button.dataset.filter);
});

projectGrid.addEventListener("click", event => {
  const card = event.target.closest("[data-project]");
  if (card) openProject(card.dataset.project);
});
projectGrid.addEventListener("keydown", event => {
  if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-project]")) {
    event.preventDefault();
    openProject(event.target.dataset.project);
  }
});
modal.addEventListener("click", event => {
  if (event.target.matches("[data-close-modal]")) closeProject();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("open")) closeProject();
});

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

// Update active navigation based on the visible section.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => sectionObserver.observe(section));

// Reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

// Header treatment on scroll.
window.addEventListener("scroll", () => {
  document.querySelector(".site-header").classList.toggle("scrolled", window.scrollY > 25);
}, { passive: true });

// Contact form: compose an email locally. Replace CONFIG.email above.
document.querySelector("#contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get("name").trim();
  const email = form.get("email").trim();
  const message = form.get("message").trim();
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
  showToast("Your email application is opening.");
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3000);
}

// Lightweight ambient particle network for the hero.
(function initParticles() {
  const canvas = document.querySelector("#particleCanvas");
  const ctx = canvas.getContext("2d");
  let width = 0, height = 0, particles = [];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width; height = rect.height;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(65, Math.floor(width / 17));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22,
      r: Math.random() * 1.3 + .4
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p, i) => {
      if (!reducedMotion) { p.x += p.vx; p.y += p.vy; }
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(166,184,255,.58)"; ctx.fill();
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j], dx = p.x - q.x, dy = p.y - q.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 125) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(132,157,231,${(1 - distance / 125) * .13})`;
          ctx.lineWidth = .7; ctx.stroke();
        }
      }
    });
    if (!reducedMotion) requestAnimationFrame(draw);
  }
  resize(); draw();
  window.addEventListener("resize", resize);
})();

document.querySelector("#year").textContent = new Date().getFullYear();
renderProjects();
if (window.lucide) lucide.createIcons();
