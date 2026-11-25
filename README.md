# For Angie, with love

A responsive birthday scrapbook for Angie, built with HTML, CSS, vanilla JavaScript, and Vite. It is a static front-end site: it has no backend, database, tracking, or online message form.

## Requirements

- Node.js 20.19+ (or 22.12+) and npm. These meet the current Vite requirements. This repository keeps `pnpm-lock.yaml` as its checked-in lockfile; the PowerShell commands below avoid creating a second lockfile.
- A modern browser. The site is designed for iPhone/iPad Safari, Android Chrome, and current desktop Chrome, Edge, Firefox, and Safari.

## Run and test locally

In VS Code, open the project folder, then open **Terminal → New Terminal**. In Windows PowerShell, run:

```powershell
npm.cmd install --no-package-lock
npm.cmd run dev -- --host 0.0.0.0
```

Keep the terminal open while testing. Vite prints a **Local** URL and a **Network** URL. Open the Local URL on the computer (it may include the repository path `/angie-birthday-website-26-11-2026/`). To test on a phone or tablet, connect it to the same Wi-Fi as the computer and open the Network URL printed by Vite. It will look like `http://192.168.0.150:5173/angie-birthday-website-26-11-2026/`; use the actual IP address and port shown in your terminal. If Windows Firewall asks, allow Node.js on your **Private** network. Tap **Open your surprise** to begin playback; browsers require a user gesture before playing audio.

To stop the development server, focus the terminal and press **Ctrl+C**. To create and locally preview a production build:

```powershell
npm.cmd run build
npm.cmd run preview
```

The production site is generated in `dist/`. On macOS/Linux, use `npm` in place of `npm.cmd` for these commands. Public hosting steps are documented below and can be followed when you are ready to make the URL available independently of your computer.

## Project map

```text
index.html                  Page landmarks, sections, dialogs, and audio element
src/main.js                 Rendering, interactions, audio, lightbox, confetti, reveals
src/content.js              All editable personal text, captions, timeline, letters, surprises
src/styles.css              Visual system, layout, responsive rules, motion/accessibility styles
vite.config.js              Vite setup and GitHub Pages repository base path
.github/workflows/deploy.yml  Build and publish dist to GitHub Pages on the default branch
public/assets/photos/       Main-wish photos and grouped memories gallery photos
public/assets/audio/        Locally served birthday music MP3
docs/architecture.md        Logic flow, file responsibilities, and interaction details
```

## Personalize the page

1. Edit `src/content.js` to personalize the birthday, closing, and final anniversary messages, memory captions, timeline entries, friend letters, and surprise-card copy.
2. The three photos beside the main birthday message live in `public/assets/photos/wish-*.jpeg`; update their paths, alt text, captions, or scrapbook captions in the hero markup in `index.html`. The memories gallery is organized into titled groups in `src/content.js`; each group has a title and a `photos` array with an image path, alt text, and lightbox caption. Add or remove photos in those arrays and store the files under `public/assets/photos/memories/`. Keep images reasonably sized for mobile data.
3. Put the Happy Birthday MP3 at `public/assets/audio/happy-birthday.mp3`. The included track is **“Happy Birthday Song” by alexander**, from [Orange Free Sounds](https://orangefreesounds.com/happy-birthday-song/), under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/). It is stored locally so playback does not depend on a third-party media host. The license requires attribution and limits use to noncommercial purposes; keep this in mind if the site is ever reused commercially.
4. Re-run `npm.cmd run build` after changing content/assets (or `npm run build` on macOS/Linux).

All copy is inserted as text, so punctuation, line breaks, and names can be changed without editing the interaction logic. Each memory group has a title and one or more photos; every photo needs an image path, accessible alt description, and lightbox caption. Each letter has a sender and a message.

## Publish with GitHub Pages

Vite is configured with `/angie-birthday-website-26-11-2026/` as its base path. The workflow in `.github/workflows/deploy.yml` builds the site and publishes `dist/` to GitHub Pages whenever the repository’s default branch is pushed. In the GitHub repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. After the workflow succeeds, the public URL will be `https://kxlm10.github.io/angie-birthday-website-26-11-2026/`.

The project is maintained in `KXLM10/angie-birthday-website-26-11-2026`. After the first deployment, the site does not depend on your computer or the Vite dev server being on.

## Privacy

This is a public static site. Anyone who can access its URL can view included photos, messages, and assets. Do not add content that should remain private.
