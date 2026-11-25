import './styles.css';
import { content } from './content.js';

const baseUrl = import.meta.env.BASE_URL;
const assetUrl = (path) => `${baseUrl}${path.replace(/^\//, '')}`;
const byId = (id) => document.getElementById(id);
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.documentElement.classList.add('js');
document.title = 'For Angie, With Love';
byId('birthday-message').textContent = content.birthdayMessage;
byId('anniversary-message').textContent = content.anniversaryMessage;
byId('closing-message').textContent = content.closingMessage;

document.querySelectorAll('[data-asset]').forEach((image) => {
  image.src = assetUrl(image.dataset.asset);
});

function renderMemories() {
  const groups = byId('memory-grid');
  content.memories.forEach((group, groupIndex) => {
    const section = document.createElement('section');
    section.className = 'memory-group reveal';
    section.setAttribute('aria-labelledby', `memory-group-title-${groupIndex + 1}`);

    const heading = document.createElement('h3');
    heading.className = 'memory-group-title';
    heading.id = `memory-group-title-${groupIndex + 1}`;
    heading.textContent = group.title;

    const grid = document.createElement('div');
    grid.className = `memory-grid${group.photos.length === 1 ? ' memory-grid-single' : ''}`;
    grid.setAttribute('aria-label', `${group.title} photos`);

    group.photos.forEach((memory, photoIndex) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'memory-card';
      button.setAttribute('aria-label', `Open photo ${photoIndex + 1} from ${group.title}`);
      button.dataset.image = memory.image;
      button.dataset.alt = memory.alt;
      button.dataset.caption = memory.caption;

      const image = document.createElement('img');
      image.src = assetUrl(memory.image);
      image.alt = '';
      image.loading = 'lazy';
      const caption = document.createElement('span');
      caption.className = 'memory-label';
      caption.textContent = `Photo ${photoIndex + 1}`;
      const marker = document.createElement('span');
      marker.className = 'memory-open';
      marker.setAttribute('aria-hidden', 'true');
      marker.textContent = '↗';

      button.append(image, caption, marker);
      button.addEventListener('click', () => openPhoto(memory));
      grid.append(button);
    });

    section.append(heading, grid);
    groups.append(section);
  });
}

function renderTimeline() {
  const timeline = byId('timeline');
  content.timeline.forEach((moment, index) => {
    const article = document.createElement('article');
    article.className = 'timeline-item reveal';
    const marker = document.createElement('span');
    marker.className = 'timeline-marker';
    marker.setAttribute('aria-hidden', 'true');
    const copy = document.createElement('div');
    copy.className = 'timeline-copy';
    const date = document.createElement('p');
    date.className = 'timeline-date';
    date.textContent = moment.date;
    const heading = document.createElement('h3');
    heading.textContent = moment.title;
    const note = document.createElement('p');
    note.textContent = moment.note;
    copy.append(date, heading, note);
    const stamp = document.createElement('span');
    stamp.className = 'timeline-index';
    stamp.textContent = String(index + 1).padStart(2, '0');
    article.append(marker, copy, stamp);
    timeline.append(article);
  });
}

function renderSurprises() {
  const grid = byId('surprise-grid');
  content.surprises.forEach((surprise, index) => {
    const card = document.createElement('article');
    card.className = `surprise-card surprise-card-${index + 1} reveal`;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'surprise-trigger';
    button.setAttribute('aria-expanded', 'false');
    const icon = document.createElement('span');
    icon.className = 'surprise-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = surprise.icon;
    const title = document.createElement('span');
    title.className = 'surprise-title';
    title.textContent = surprise.title;
    const prompt = document.createElement('span');
    prompt.className = 'surprise-prompt';
    prompt.textContent = surprise.prompt;
    const reveal = document.createElement('span');
    reveal.className = 'surprise-reveal';
    reveal.hidden = true;
    reveal.textContent = surprise.reveal;
    button.append(icon, title, prompt, reveal);
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      reveal.hidden = expanded;
      card.classList.toggle('is-open', !expanded);
    });
    card.append(button);
    grid.append(card);
  });
}

renderMemories();
renderTimeline();
renderSurprises();

// Memory lightbox: native dialog provides Escape handling and focus management.
const photoDialog = byId('photo-dialog');
function openPhoto(memory) {
  byId('dialog-image').src = assetUrl(memory.image);
  byId('dialog-image').alt = memory.alt;
  byId('photo-caption').textContent = memory.caption;
  photoDialog.showModal();
}
document.querySelectorAll('.hero-photo').forEach((photo) => {
  photo.addEventListener('click', () => openPhoto({
    image: photo.dataset.image,
    alt: photo.dataset.alt,
    caption: photo.dataset.caption,
  }));
});
byId('dialog-close').addEventListener('click', () => photoDialog.close());
photoDialog.addEventListener('click', (event) => {
  if (event.target === photoDialog) photoDialog.close();
});

// Birthday messages from friends are presented one at a time.
let letterIndex = -1;
const letterContent = byId('letter-content');
const letterNavigation = byId('letter-navigation');
function showLetter(index) {
  letterIndex = Math.max(0, Math.min(index, content.letters.length - 1));
  const letter = content.letters[letterIndex];
  letterContent.hidden = false;
  byId('letter-envelope').classList.add('is-open');
  byId('letter-count').textContent = `A note for you · ${letterIndex + 1} of ${content.letters.length}`;
  byId('letter-text').textContent = letter.message;
  byId('letter-sender').textContent = `— ${letter.from}`;
  letterNavigation.hidden = false;
  byId('letter-previous').disabled = letterIndex === 0;
  byId('letter-next').textContent = letterIndex === content.letters.length - 1 ? 'Read again ↺' : 'Next letter →';
}
byId('open-letters').addEventListener('click', () => {
  showLetter(letterIndex < 0 ? 0 : letterIndex);
  byId('open-letters').hidden = true;
});
byId('letter-previous').addEventListener('click', () => showLetter(letterIndex - 1));
byId('letter-next').addEventListener('click', () => {
  showLetter(letterIndex === content.letters.length - 1 ? 0 : letterIndex + 1);
});

// The title screen stays visible until a visitor tap successfully starts the
// song. This deliberate gesture is needed by browsers that block audible autoplay.
const audio = byId('birthday-audio');
const musicToggle = byId('music-toggle');
const audioStatus = byId('audio-status');
audio.src = assetUrl(content.music.file);
audio.volume = 0.58;
function setMusicState(isPlaying) {
  musicToggle.setAttribute('aria-pressed', String(isPlaying));
  musicToggle.setAttribute('aria-label', isPlaying ? 'Pause birthday music' : 'Play birthday music');
  musicToggle.querySelector('.music-toggle-label').textContent = isPlaying ? 'Pause music' : 'Play music';
  musicToggle.classList.toggle('is-playing', isPlaying);
}
async function startMusic() {
  try {
    await audio.play();
    setMusicState(true);
    audioStatus.hidden = true;
    return true;
  } catch {
    setMusicState(false);
    audioStatus.textContent = 'The song did not start yet. Tap “Open your surprise” to try again.';
    audioStatus.hidden = false;
    return false;
  }
}
musicToggle.addEventListener('click', () => {
  if (audio.paused) startMusic();
  else audio.pause();
});
audio.addEventListener('pause', () => setMusicState(false));
audio.addEventListener('play', () => setMusicState(true));
byId('start-surprise').addEventListener('click', async () => {
  const playbackStarted = await startMusic();
  if (!playbackStarted) return;

  byId('welcome-screen').hidden = true;
  byId('site-header').hidden = false;
  byId('main').hidden = false;
  byId('site-footer').hidden = false;
  byId('skip-link').href = '#main';
  byId('hero-title').focus({ preventScroll: true });
});

// A tiny, short-lived confetti burst; skipped for reduced-motion preferences.
byId('celebrate-button').addEventListener('click', () => {
  if (prefersReducedMotion.matches) {
    audioStatus.textContent = 'Happy birthday, Angie!';
    return;
  }
  const layer = byId('confetti-layer');
  const colors = ['#f0a796', '#e8c775', '#9bbaa1', '#c5a0b4', '#fff1d6'];
  for (let i = 0; i < 54; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.setProperty('--x', `${Math.random() * 100}vw`);
    piece.style.setProperty('--delay', `${Math.random() * 0.35}s`);
    piece.style.setProperty('--duration', `${2.2 + Math.random() * 1.4}s`);
    piece.style.setProperty('--color', colors[i % colors.length]);
    piece.style.setProperty('--spin', `${Math.random() * 720 - 360}deg`);
    layer.append(piece);
    window.setTimeout(() => piece.remove(), 4200);
  }
});

// Progressive enhancement: reveal content on scroll, but keep it visible without JS/observer.
if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
} else {
  document.querySelectorAll('.reveal').forEach((item) => item.classList.add('is-visible'));
}
