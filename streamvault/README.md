# 🎬 StreamVault — Premium Video Streaming Website

A full-featured, premium video streaming website built with **React + Vite**.

## Features
- 🎥 **Hero banner** with featured movie, play & watchlist buttons
- 🗂️ **Category filter** bar (Action, Drama, Sci-Fi, Horror, Comedy, etc.)
- 🔍 **Live search** — filter movies by title in real time
- 🎞️ **Movie cards** with hover effects, rating badges, play overlay
- 📖 **Movie modal** with full details, backdrop, cast, director, tags
- ▶️ **Play simulation** with streaming animation
- 🔖 **Watchlist** — add/remove, persisted in React state, own page
- 📱 **Fully responsive** — mobile-first with hamburger menu
- 🌑 **Cinematic dark theme** — premium Netflix-style UI

## Project Structure
```
StreamVault/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── movies.js          ← 12 mock movies with images & metadata
    └── components/
        ├── Navbar.jsx          ← Fixed navbar with search & watchlist
        ├── Hero.jsx            ← Full-width featured movie hero
        ├── MovieGrid.jsx       ← Grid with category filter
        ├── MovieCard.jsx       ← Individual movie card
        ├── MovieModal.jsx      ← Movie detail popup
        └── Footer.jsx          ← Site footer
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Then open http://localhost:5173

## Technologies
- React 18 (hooks: useState, useEffect)
- Vite (build tool)
- Pure CSS (no Tailwind / no UI library — all custom)
- Google Fonts: Outfit + Playfair Display
- Unsplash for demo images

## Extending the Project
- Add React Router for proper pages
- Connect to TMDB API for real movie data
- Add video.js or react-player for real video playback
- Add Firebase/Supabase for auth + persistent watchlist