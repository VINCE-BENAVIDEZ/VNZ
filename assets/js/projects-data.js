/* =========================================================
   PROJECTS PAGE — YOUR PROJECT LIST
   ---------------------------------------------------------
   To ADD a project:  copy the TEMPLATE below, paste it at the
   end of the list (after the last project's closing "}," ),
   and fill in your details. That's it — the page, the filter
   buttons, and the project count update automatically.

   To REMOVE a project: delete its whole { ... }, block.
   To REORDER: move the blocks up or down.

   TEMPLATE (copy everything from "{" to "},"):

  {
    id: "my-project",                 // unique, no spaces (used for links like projects.html#my-project)
    title: "My Project Title",
    type: "Web Development",          // the filter buttons are created from these values
    objective: "What the project is meant to achieve.",
    date: "March 2026",
    thanks: "People or teams you want to thank",
    description: [                    // each line is one paragraph
      "First paragraph about the project.",
      "Second paragraph (optional)."
    ],
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://example.com",      // optional — shows a VIEW PROJECT button ("" to hide it)
    glyph: "{ }",                     // symbol shown when there is no image/video yet
    art: "art-web",                   // background style: art-web, art-ai, art-research, art-art, art-cards, art-code
    media: {                          // optional — delete this whole block to show the placeholder
      type: "video",                  //   "video"   -> your own file:   src: "assets/video/demo.mp4"
      src: "assets/video/demo.mp4",   //   "youtube" -> use  id: "VIDEO_ID"  (the part after v= in the URL)
      poster: "assets/img/demo.jpg"   //   "image"   -> use  src: "assets/img/shot.png"
    }
  },

   MEDIA EXAMPLES:
     media: { type: "image",   src: "assets/img/shot.png", alt: "Screenshot of the app" }
     media: { type: "video",   src: "assets/video/demo.mp4", poster: "assets/img/poster.jpg" }
     media: { type: "youtube", id: "dQw4w9WgXcQ" }
   ========================================================= */

const PROJECT_ENTRIES = [
  {
    id: "pet-identify",
    title: "PET-IDENTIFYPH",
    type: "Web Development",
    objective: "Help pet owners keep accessible identification records and support the safe return of lost pets.",
    date: "2026",
    thanks: "Add the people who helped you here",
    description: [
      "A digital pet identification system connecting physical identity with useful online pet information.",
      "A platform concept designed to help pet owners maintain accessible identification records and support the safe return of lost pets."
    ],
    tags: ["HTML", "CSS", "JavaScript", "Google Maps"],
    link: "https://vince-benavidez.github.io/PETIFY-PH",
    glyph: "{ }",
    art: "art-web"
  },
  {
    id: "link-safety",
    title: "Web Link Safety Assurance",
    type: "Computer Research",
    objective: "Explore practical, lightweight ways to spot suspicious links and prevent online threats.",
    date: "2026",
    thanks: "Add the people who helped you here",
    description: [
      "A proposed browser extension concept for identifying suspicious links and helping prevent online threats.",
      "A research project exploring practical, lightweight methods for detecting phishing links, malicious redirects, and deceptive URLs."
    ],
    tags: ["Cybersecurity", "Browser Extension", "Research"],
    link: "https://example.com",
    glyph: "🔒",
    art: "art-research"
  },
  {
    id: "ai-automation",
    title: "A.I Automation Lab",
    type: "Artificial Intelligence",
    objective: "Turn repetitive digital workflows into simple, reusable tools.",
    date: "2026",
    thanks: "Add the people who helped you here",
    description: [
      "Small experiments that turn repetitive digital workflows into simple, reusable tools.",
      "A collection of programming experiments focused on useful automation, API integrations, and thoughtful interfaces."
    ],
    tags: ["JavaScript", "Automation", "APIs"],
    link: "https://github.com/",
    glyph: "A.I",
    art: "art-code"
  },
  {
    id: "sapsappy",
    title: "Sapsappy",
    type: "Artificial Intelligence",
    objective: "Give people a place to express suppressed emotions and feelings through poetry.",
    date: "July 2022",
    thanks: "Add the people who helped you here",
    description: [
      "A poetry created for the soul purpose of expressing suppressed emotions and feelings of a individual.",
      "A conceptual exploration of how AI features can be integrated into everyday interfaces without overwhelming the user."
    ],
    tags: ["AI", "UX", "Prototyping"],
    link: "https://example.com",
    glyph: "🪶",
    art: "art-ai"
  },
  {
    id: "binsyongie-app",
    title: "Binsyongie-App",
    type: "App Development",
    objective: "Experiment with digital composition, visual language, and creative direction in an app.",
    date: "2026",
    thanks: "Add the people who helped you here",
    description: [
      "A growing collection of visual experiments with form, color, typography, and digital composition.",
      "A personal visual playground for experimenting with digital composition, visual language, and creative direction."
    ],
    tags: ["Design", "Development", "Programming"],
    link: "https://example.com",
    glyph: "📱",
    art: "art-art"
  },
  {
    id: "cardistry-motion",
    title: "Cardistry / Motion Studies",
    type: "Cardistry",
    objective: "Practice flow, rhythm, precision, and expressive movement with playing cards.",
    date: "2026",
    thanks: "Add the people who helped you here",
    description: [
      "A visual practice exploring flow, rhythm, precision, and expressive movement with playing cards.",
      "A record of cardistry practice, original flourishes, performance clips, and experiments in movement."
    ],
    tags: ["Cardistry", "Flourishes", "Performance"],
    link: "https://example.com",
    glyph: "♠",
    art: "art-cards"
  }
];
