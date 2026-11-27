/* =========================================================
   CREDENTIALS — YOUR CERTIFICATIONS & ACHIEVEMENTS
   ---------------------------------------------------------
   The home page shows the FIRST 3 of these. Every entry is
   shown on credential.html. Filter buttons and counts update
   automatically.

   >>> The entries below are PLACEHOLDERS. Replace them with
       your real certificates (or delete the ones you don't need).

   To ADD one:    copy a whole { ... }, block and paste it after the last one.
   To REMOVE one: delete its { ... }, block.
   To REORDER:    move blocks up/down (the top 3 appear on the home page).

   Optional certificate picture (shown on credential.html only):
     media: { type: "image", src: "assets/img/credentials/my-cert.png", alt: "Certificate of ..." }
   ========================================================= */

const CREDENTIAL_ENTRIES = [
  {
    id: "credential-1",                       // unique, no spaces (used for credential.html#credential-1)
    title: "Certificate",
    type: "Certification",                    // filter buttons are made from these values
    issuer: "Issuing Organization",
    date: "Month YYYY",
    credentialId: "",                         // optional — "" to hide
    description: [
      "Describe what this certification covers and what you learned or can now do.",
      "Add a second paragraph if you like (optional)."
    ],
    tags: ["Skill One", "Skill Two", "Skill Three"],
    link: "",                                 // optional verification link — "" to hide the button
    glyph: "🎓",                              // symbol shown on the home page card
    art: "art-web"                            // background: art-web, art-ai, art-research, art-art, art-cards, art-code
  },
  {
    id: "credential-2",
    title: "Training",
    type: "Training",
    issuer: "Issuing Organization",
    date: "Month YYYY",
    credentialId: "",
    description: [
      "Describe the training, seminar, or course and what it covered."
    ],
    tags: ["Topic One", "Topic Two"],
    link: "",
    glyph: "📜",
    art: "art-research"
  },
  {
    id: "credential-3",
    title: "Award / Recognition",
    type: "Award",
    issuer: "Issuing Organization",
    date: "Month YYYY",
    credentialId: "",
    description: [
      "Describe the award or recognition and why it was given."
    ],
    tags: ["Achievement"],
    link: "",
    glyph: "🏆",
    art: "art-ai"
  },
  {
    id: "credential-4",
    title: "Another Certificate",
    type: "Certification",
    issuer: "Issuing Organization",
    date: "Month YYYY",
    credentialId: "",
    description: [
      "This one only appears on credential.html because the home page shows just the first 3."
    ],
    tags: ["Skill One"],
    link: "",
    glyph: "🎖️",
    art: "art-code"
  }

  // END OF CREDENTIAL LIST
];
