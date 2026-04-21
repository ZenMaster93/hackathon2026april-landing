# ZenHire AI Coding Hackathon — Landing Page

Static landing page for the ZenHire AI Coding Hackathon (25—26. april 2026, CDT Hub, Beograd).

## Stack

Plain HTML + CSS + vanilla JS. No build step. No dependencies.

```
index.html      Page structure + content (Serbian)
styles.css      Design system, layout, animations
script.js       Nav collapse, FAQ accordion, scroll reveal, hero parallax
assets/         Logo SVGs, favicon
```

## Local preview

```bash
python -m http.server 8000
# → http://localhost:8000
```

## Deploy on Render

1. Push this repo to GitHub.
2. In Render: **New → Static Site** → connect this repo.
3. Settings:
   - **Build command:** *(leave blank)*
   - **Publish directory:** `.`
4. Deploy.

## Deploy anywhere else

Works on any static host — Vercel, Netlify, Cloudflare Pages, GitHub Pages. Just serve the files.

## Swapping assets

- **Logo:** replace `assets/zenhire-logo.svg`
- **Favicon:** replace `assets/favicon.svg`
- **Application URL:** search `simulation/apply` in `index.html`
