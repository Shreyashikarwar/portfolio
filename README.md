# Shreyash Backend Portfolio

Vanilla single-page portfolio (dark “developer workspace” theme) built with:
- HTML
- CSS
- Modular JavaScript (no build tooling)

## Run locally

From `d:\portfolio`, run:

```powershell
python -m http.server 8000
```

Then open:
- `http://localhost:8000`

## What’s inside

- `pages/home.js`: renders the full single-page layout and wires up the API Playground + GitHub stats (best-effort).
- `data/profile.js`: your name, contacts, tech stack, and experience.
- `data/projects.js`: project cards using the Problem → Solution → Architecture template.
- `styles/global.css`: dark theme + terminal-style UI components.

