# For Angie, with love

A responsive birthday scrapbook for Angie, built with HTML, CSS, vanilla JavaScript, and Vite. It is a static front-end site: it has no backend, database, tracking, or online message form.

## Requirements

- Node.js 20.19+ (or 22.12+) and pnpm. These meet the current Vite requirements.
- A modern browser. The site is designed for iPhone/iPad Safari, Android Chrome, and current desktop Chrome, Edge, Firefox, and Safari.

## Run locally

```sh
pnpm install
pnpm dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). To check the production output:

```sh
pnpm build
pnpm preview
```

The production site is generated in `dist/`. The music starts only after a user action because browsers commonly prevent pages from playing audible media on initial load.

## Project map

```text
index.html                  Page landmarks, sections, dialogs, and audio element
src/main.js                 Rendering, interactions, audio, lightbox, confetti, reveals
src/content.js              All editable personal text, captions, timeline, letters, surprises
src/styles.css              Visual system, layout, responsive rules, motion/accessibility styles
vite.config.js              Vite setup and GitHub Pages repository base path
.github/workflows/deploy.yml  Build and publish dist to GitHub Pages on the default branch
public/assets/photos/       Replaceable scrapbook photo placeholders
public/assets/audio/        Locally served birthday music MP3
docs/architecture.md        Logic flow, file responsibilities, and interaction details
```

## Personalize the page

1. Edit `src/content.js`. Replace the bracketed birthday and closing messages, memory captions, timeline entries, friend letters, and surprise-card copy.
2. Put final photos in `public/assets/photos/`, then update the matching `image` paths and `alt` descriptions in `src/content.js`. Keep images reasonably sized for mobile data.
3. Put the Happy Birthday MP3 at `public/assets/audio/happy-birthday.mp3`. The included track is **“Happy Birthday Song” by alexander**, from [Orange Free Sounds](https://orangefreesounds.com/happy-birthday-song/), under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/). It is stored locally so playback does not depend on a third-party media host. The license requires attribution and limits use to noncommercial purposes; keep this in mind if the site is ever reused commercially.
4. Re-run `pnpm build` after changing content/assets.

All copy is inserted as text, so punctuation, line breaks, and names can be changed without editing the interaction logic. Each memory needs an image path, accessible alt description, caption, and short label. Each letter has a sender and a message.

## Publish with GitHub Pages

Vite is configured with `/angie-birthday-website-26-11-2026/` as its base path. The workflow in `.github/workflows/deploy.yml` builds the site and publishes `dist/` to GitHub Pages whenever the repository’s default branch is pushed. In the GitHub repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. After the workflow succeeds, the public URL will be `https://kxlm10.github.io/angie-birthday-website-26-11-2026/`.

The project is maintained in `KXLM10/angie-birthday-website-26-11-2026`. After the first deployment, the site does not depend on your computer or the Vite dev server being on.

## Privacy

This is a public static site. Anyone who can access its URL can view included photos, messages, and assets. Do not add content that should remain private.
