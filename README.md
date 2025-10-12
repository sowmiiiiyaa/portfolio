# Sowmiya S — Personal Portfolio (React + Tailwind + Framer Motion)

This is a minimal portfolio scaffold with a theme selection screen (Dark Neon and Light Pastel). It uses React, Vite, Tailwind CSS and Framer Motion.

Getting started

1. Install dependencies

   npm install

2. Start dev server

   npm run dev

What changed / Files

- `src/components/ThemeSelector.jsx` — split-screen theme chooser
- `src/components/MainPortfolio.jsx` — main site and sections
- `src/styles/dark.css`, `src/styles/pastel.css` — theme palettes
- `src/styles/tailwind.css` — Tailwind entry

Notes

- Theme selection is stored in localStorage. Use the "Change Theme" link in the header to go back.
- Replace placeholder images in `src/assets` with real images.
- Tailwind must be installed and PostCSS configured; files are included.
