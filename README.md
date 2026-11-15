# Vince Benavidez — Creative Technologist Portfolio

A responsive, dark minimalist portfolio built with plain HTML, CSS, and JavaScript. No build tools or framework are required.

## Run locally

1. Extract the ZIP file.
2. Open `index.html` in a modern browser.
3. For a local development server, you can use VS Code Live Server or run `python -m http.server 8000` from this folder, then visit `http://localhost:8000`.

## Customize your portfolio

### 1. Personal details
Open `index.html` and replace:
- `Vince Benavidez` with your preferred name or brand.
- `hello@example.com` with your email.
- Social profile URLs in the footer.

Also update the `CONFIG` object at the top of `script.js` with your email, GitHub, and LinkedIn URLs.

### 2. Projects
Open `script.js` and edit the `PROJECTS` array. Each object supports:
- `id`: unique project identifier
- `title`: project name
- `category`: one of the filter categories
- `description`: short card description
- `tags`: technology or topic labels
- `glyph`: simple visual mark on the thumbnail
- `art`: thumbnail style class
- `details`: longer project description for the detail modal
- `link`: live demo, GitHub repository, or resource URL

Available categories:
`Web Development`, `Programming`, `Artificial Intelligence`, `Computer Research`, `Digital Art`, `Cardistry`.

The project detail view is generated automatically from the data. To add real screenshots, replace the generated art block in `renderProjects()` with an `<img>` element and add your image paths under an `assets/` directory.

### 3. Contact form
The form currently opens the visitor's email application using a `mailto:` link. It does not store or send messages by itself. For a real hosted contact form, connect a backend or a form service and validate submissions server-side.

### 4. AI assistant
No AI assistant backend is connected. The visual identity is AI-inspired, but the site does not claim to provide AI responses. If you later integrate an assistant, connect it to a secure server endpoint and never expose secret API keys in browser JavaScript.

## Features
- Responsive desktop, tablet, and mobile layout
- Mobile navigation
- Smooth anchor navigation and active section state
- Project filtering and reusable project detail modal
- Keyboard-accessible project cards and modal dismissal
- Scroll reveal animations
- Ambient canvas particle network
- Reduced-motion preference support
- SEO description and social preview metadata

## Dependencies
- Google Fonts (Manrope and DM Mono)
- Lucide icon CDN

The site itself uses vanilla JavaScript and CSS; no npm installation is needed.
