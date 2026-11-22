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
    date: "March 2026",
    thanks: "People or teams you want to thank",


   MEDIA EXAMPLES:
     media: { type: "image",   src: "assets/img/shot.png", alt: "Screenshot of the app" }
     media: { type: "video",   src: "assets/video/demo.mp4", poster: "assets/img/poster.jpg" }
     media: { type: "youtube", id: "dQw4w9WgXcQ" }
   ========================================================= */

const PROJECT_ENTRIES = [


//---------------------------------------------------------THIS IS ONE PROJECT -----------------------------------
  {
    id: "pet-identify",
    title: "PET-IDENTIFYPH",
    type: "Web Development",
    objective: "Help pet owners keep accessible identification records and support the safe return of lost pets.",
    description: [
      "A Platform concept designed to help pet owners maintain accessible identification records and support the safe return of lost pets.",
      "MISSION: To give every pet a permanent identity and every family peace of mind. Petidentify connects pets to their essential physical and digital information, making it accessible when it matters most—helping families protect, identify, and care for the pets they love.",
      "VISION: A world where every pet has a permanent identity, every family can stay connected, and no beloved pet is ever truly lost. They are not just pets. They are part of our family."
    ],
    tags: ["HTML", "CSS", "JavaScript", "Google Maps"],
    link: "https://vince-benavidez.github.io/PETIFY-PH",
    glyph: "{ }",
    art: "art-web",
    media: {                        
      type: "image",               
      src: "assets/img/projects/petifyph.png", 
      poster: "assets/img/projects/petifyph.png" 
    },
    date: "June 17,2026",
    thanks: "Sapsappy",
  }
  //---------------------------------------------------------THIS END OF ONE PROJECT -------------------------------
  , //dont forget this comma if you are adding more projects after this
  //---------------------------------------------------------THIS IS ONE PROJECT -----------------------------------
  {
    id: "link-safety",
    title: "WEB LINK SAFETY ASSURANCE: A PROPOSED BROWSER EXTENSION FOR THREAT DETECTION AND PREVENTION",
    type: "Security Research",
    objective: "Detect malicious websites and suspicious links in real time, Block harmful websites and files to protect users, Identify potential online threats and prevent malware attacks, Provide browser-based security without installing antivirus software.",
    description: [
      "A proposed browser extension concept for identifying suspicious links and helping prevent online threats.",
      "My name is Vince Benavidez, and I am one of the researchers behind the thesis project entitled “WEB LINK SAFETY ASSURANCE: A PROPOSED BROWSER EXTENSION FOR THREAT DETECTION AND PREVENTION.”",
      "Our project aims to enhance online security by detecting and preventing threats from malicious websites and files directly through a browser extension, eliminating the need to install additional third-party antivirus software.",
      "We are proud to introduce what we believe to be a pioneering browser-based cybersecurity initiative in the Philippines, with potential global significance. We are also pursuing copyright protection to safeguard our research and technological innovations.",
      "Based on our current testing, the system has achieved a 99% detection rate against known malicious websites and files in our test dataset, leveraging threat intelligence comparable to that of approximately 70 antivirus vendors worldwide—all without requiring users to install separate antivirus applications.",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Browser Extensions", "Virus Total Api"],
    link: "https://example.com",
    glyph: "🔒",
    media: {                        
      type: "image",               
      src: "assets/img/projects/link-safety.png", 
      poster: "assets/img/projects/link-safety.png" 
    },
    date: "2024",
    thanks: "RESEARCHERS:   Herc Bandiola,  Vince Benavidez, Emmanuel Lozanes, Ariel Gamal, Christian Jay Padua"
  }
  //---------------------------------------------------------THIS END OF ONE PROJECT -------------------------------
  , //dont forget this comma if you are adding more projects after this
  //---------------------------------------------------------THIS IS ONE PROJECT -----------------------------------
  {
    id: "ai-automation",
    title: "V.R.U.A",
    type: "Artificial Intelligence",
    objective: "Run, automate, schedule, and manage digital tasks for efficiency and productivity.",
    description: [
      "V.R.U.A is an intelligent AI agent that automates, schedules, executes, and manages digital tasks to maximize productivity, efficiency, and workflow optimization.",
      "A collection of programming experiments focused on useful automation, API integrations, and thoughtful interfaces."
    ],
    tags: ["JavaScript", "AI Automation", "APIs", "Selenium WebDriver", "Python", "Node.js", "Web Scraping", "Java", "C++","C#"],
    link: "https://github.com/",
    glyph: "V.R.U.A",
    art: "art-code",
    date: "March 7, 2022",
    thanks: "Sapsappy",
  }
  //---------------------------------------------------------THIS END OF ONE PROJECT -------------------------------
   , //dont forget this comma if you are adding more projects after this
  //---------------------------------------------------------THIS IS ONE PROJECT -----------------------------------
  {
    id: "binsyongie-app",
    title: "Binsyongie-App",
    type: "App Development",
    objective: "Simplify and optimize my portfolio website by improving its design, enhancing usability, and ensuring full offline functionality for seamless accessibility.",
    description: [
      "Hi, I’m Vince Benavidez, the developer of the BINSYONGIE App. This application was developed with the primary goal of providing convenient, accessible, and seamless access to my personal portfolio website on any mobile device.",
      "The app allows users to explore my personal information, background, skills, projects, and achievements without the need to manually open a web browser or navigate through multiple applications. It serves as a more direct and user-friendly way to access my portfolio anytime and anywhere.",
      "In addition, I created this application to make it easier for me to visit and access the various tools and interactive features I developed and embedded within my portfolio website. Instead of searching for individual tools or navigating through different pages, I can conveniently access everything in one centralized application.",
      "Ultimately, BINSYONGIE App aims to improve accessibility, simplify navigation, and provide a more efficient mobile experience. It brings my portfolio and personally developed web tools together in one place, making them easier to access, explore, and use whenever needed."
    ],
    tags: ["Design", "Development", "Programming"],
    link: "#",
    glyph: "📱",
    art: "art-art",
    media: {
    type: "video",
    src: "https://drive.google.com/file/d/1MDcRofmrM2Lk4XFz7Jm9PcjyE-5bpHch/preview",
    poster: ""
    },
    date: "March 27, 2024",
    thanks: "Sapsappy"
  }
  //---------------------------------------------------------THIS END OF ONE PROJECT -------------------------------
   , //dont forget this comma if you are adding more projects after this
  //---------------------------------------------------------THIS IS ONE PROJECT -----------------------------------
  {
    id: "binsyongie-app-hardware",
    title: "Binsyongie-App",
    type: "Hardware Development",
    objective: "Simplify and optimize my portfolio website by improving its design, enhancing usability, and ensuring full offline functionality for seamless accessibility.",
    description: [
      "Hi, I’m Vince Benavidez, the developer of the BINSYONGIE App. This application was developed with the primary goal of providing convenient, accessible, and seamless access to my personal portfolio website on any mobile device.",
      "The app allows users to explore my personal information, background, skills, projects, and achievements without the need to manually open a web browser or navigate through multiple applications. It serves as a more direct and user-friendly way to access my portfolio anytime and anywhere.",
      "In addition, I created this application to make it easier for me to visit and access the various tools and interactive features I developed and embedded within my portfolio website. Instead of searching for individual tools or navigating through different pages, I can conveniently access everything in one centralized application.",
      "Ultimately, BINSYONGIE App aims to improve accessibility, simplify navigation, and provide a more efficient mobile experience. It brings my portfolio and personally developed web tools together in one place, making them easier to access, explore, and use whenever needed."
    ],
    tags: ["Design", "Development", "Programming"],
    link: "#",
    glyph: "📱",
    art: "art-art",
    date: "March 27, 2024",
    thanks: "Sapsappy"
  }
  //---------------------------------------------------------THIS END OF ONE PROJECT -------------------------------

  
  
  // END OF PROJECT LIST
];
