/**
 * Single source of truth for all projects.
 * Images, reels and copy are sourced from
 * `src/assets/Project images and content/**` (analysed from each Content.pdf).
 *
 * Used by the homepage Projects section AND the /work pages.
 */

/* ---- Eager-load every asset via Vite glob ---- */
const gdGlob = import.meta.glob(
  '../assets/Project images and content/Graphic Designing/*/*.webp',
  { eager: true, import: 'default' },
)
const uxGlob = import.meta.glob(
  '../assets/Project images and content/UI UX Design/*/*.webp',
  { eager: true, import: 'default' },
)
const reelGlob = import.meta.glob(
  '../assets/Project images and content/Video Editing/*.mp4',
  { eager: true, import: 'default' },
)
/* New cover banners for Graphic Design projects (1.jpg → project 1, etc.) */
const gdBannerGlob = import.meta.glob(
  '../assets/Project image/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' },
)

/* Group `.../<folder>/<n>.webp` → ordered arrays, sorted by folder then n */
function groupByFolder(glob) {
  const map = {}
  for (const path in glob) {
    const m = path.match(/\/(\d+)\/(\d+)\.webp$/)
    if (!m) continue
    const folder = Number(m[1])
    const idx = Number(m[2])
    ;(map[folder] ||= []).push({ idx, url: glob[path] })
  }
  return Object.keys(map)
    .map(Number)
    .sort((a, b) => a - b)
    .map((f) => map[f].sort((a, b) => a.idx - b.idx).map((o) => o.url))
}

const gdImages = groupByFolder(gdGlob)
const uxImages = groupByFolder(uxGlob)

/* Resolve banner overrides: filename "1.jpg" → index 0, "2.jpg" → index 1, ... */
const gdBanners = []
for (const path in gdBannerGlob) {
  const m = path.match(/\/(\d+)\.(?:jpg|jpeg|png|webp)$/i)
  if (m) gdBanners[Number(m[1]) - 1] = gdBannerGlob[path]
}

/* Map reel basename → resolved url */
const reelByName = {}
for (const path in reelGlob) {
  const name = path.split('/').pop()
  reelByName[name] = reelGlob[path]
}

/* ---- Project copy (analysed from each Content.pdf) ---- */
const graphicMeta = [
  {
    slug: 'artisan-podiatry', name: 'ARTISAN',
    title: 'Podiatry Brand Identity Design', year: '2024', accent: '#e11d48',
    client: 'ARTISAN', service: 'Logo Design & Brand Identity',
    description:
      'ARTISAN is a modern podiatry and foot care clinic focused on professional treatment, comfort, wellness, and patient trust. I created the complete visual identity — logo design, branding assets, social media creatives, and digital promotional materials — building a clean, professional healthcare brand that reflects care, confidence, and modern medical excellence.',
  },
  {
    slug: 'london-camera-auction', name: 'London Camera & Antique Auction',
    title: 'Brand Identity Design', year: '2024', accent: '#f59e0b',
    client: 'London Camera & Antique Auction', service: 'Logo Design & Brand Identity',
    description:
      'A premium auction house specialising in rare vintage cameras, collectible lenses, antique photography equipment, and historical treasures for collectors worldwide. I built the complete visual identity including logo design, auction branding, social media creatives, and premium promotional visuals.',
  },
  {
    slug: 'vinr-skincare', name: 'VINR Skincare',
    title: '3D Modeling & Branding', year: '2024', accent: '#22c55e',
    client: 'VINR', service: '3D Modeling & Branding',
    description:
      'VINR is a high-performance skincare brand focused on active ingredients like Vitamin C, Retinol, and Niacinamide. I created a 3D visual identity communicating both clinical effectiveness and luxury — a realistic digital twin of the physical packaging for marketing and e-commerce use.',
  },
  {
    slug: 'youngphase-fashion', name: 'YoungPhase',
    title: 'Fashion Brand Identity Design', year: '2024', accent: '#facc15',
    client: 'YoungPhase', service: 'Logo Design & Social Media Branding',
    description:
      'YoungPhase is a modern streetwear fashion brand focused on bold aesthetics, youth culture, and premium visual identity. I delivered the complete brand identity — logo design, social media branding, promotional creatives, and digital visual direction — building a stylish, recognisable presence that connects with modern audiences.',
  },
  {
    slug: 'sailber-cab', name: 'Sailber Cab',
    title: 'Services Brand Identity Design', year: '2023', accent: '#eab308',
    client: 'Sailber', service: 'Logo Design & Social Media Branding',
    description:
      'Sailber is a modern cab service brand focused on reliable transportation, smart mobility, and clean urban travel. I created the complete visual identity including logo design, social media branding, promotional creatives, and digital marketing visuals — reflecting speed, trust, safety, and modern transportation.',
  },
  {
    slug: 'appsdiary-tech', name: 'APPSDIARY Technologies',
    title: 'Technology Brand Identity', year: '2023', accent: '#3b82f6',
    client: 'APPSDIARY Technologies', service: 'Logo Design & Brand Identity Design',
    description:
      'APPSDIARY Technologies is a modern digital technology brand delivering innovative software solutions, mobile applications, and digital experiences for businesses and startups. I crafted a unique, professional brand identity that reflects innovation, trust, scalability, and modern technology aesthetics.',
  },
  {
    slug: 'crew-solutions-brand', name: 'Crew Solutions',
    title: 'Brand Identity Design', year: '2023', accent: '#f59e0b',
    client: 'Crew Solutions', service: 'Logo Design & Brand Identity Design',
    description:
      'A bold premium brand identity built around a striking gold-and-black system — logo, brand guidelines, stationery, packaging and merchandise — designed to communicate energy, leadership and trust across every touchpoint.',
  },
]

const uxMeta = [
  {
    slug: 'fresh-cart-grocery', name: 'Fresh Cart',
    title: 'Grocery App UI/UX Design', year: '2025', accent: '#22c55e',
    client: 'Fresh Cart', service: 'UI/UX Design & Brand Identity',
    description:
      'Fresh Cart is a modern grocery delivery and online shopping platform focused on fast ordering, clean user experience, and seamless mobile convenience. I created the complete UI/UX design system — mobile app interface, user flow, branding, promotional visuals, and digital product presentation.',
  },
  {
    slug: 'global-sports-app', name: 'Global Sports',
    title: 'Mobile App UI/UX Design', year: '2025', accent: '#10b981',
    client: 'Global Sports', service: 'UI/UX Design & Mobile App Branding',
    description:
      'Global Sports is a sports networking and athlete community platform connecting athletes, coaches, scouts, and trainers worldwide. I designed the complete mobile app UI/UX — onboarding, social networking features, athlete profiles, training content layouts, event systems, and sports branding visuals.',
  },
  {
    slug: 'cab-rider-app', name: 'Cab Rider',
    title: 'Mobile App UI/UX Design', year: '2024', accent: '#2563eb',
    client: 'Cab Rider', service: 'UI/UX Design & Mobile App Branding',
    description:
      'Cab Rider is a modern taxi booking and ride-sharing app for fast, reliable, seamless urban transport. I created the complete UI/UX — onboarding, live tracking, ride booking flow, driver interaction screens, payment interface, and overall mobile app branding.',
  },
  {
    slug: 'crew-solutions-app', name: 'Crew Solutions',
    title: 'Workforce Management App', year: '2025', accent: '#f59e0b',
    client: 'Crew Solutions', service: 'UI/UX Design & Mobile App Branding',
    description:
      'A smart workforce and crew management app that simplifies job posting, apprentice management, attendance tracking, payment handling, and communication between contractors and workers — managing active jobs, approvals, payments, and productivity from a single dashboard.',
  },
  {
    slug: 'ai-science-learning', name: 'AI Science Learning',
    title: 'AI Education App UI/UX', year: '2025', accent: '#8b5cf6',
    client: 'AI Science Learning System', service: 'UI/UX Design & Mobile App Branding',
    description:
      'An AI-powered educational app enhancing science learning through smart assessments, AI-assisted evaluations, progress tracking, online examinations, and interactive study content — a clean, futuristic experience combining ed-tech with intelligent learning analytics.',
  },
]

/* Reels — in display order with clean titles */
const reelMeta = [
  { file: 'Diwali Reel 2_1_1.mp4', name: 'Diwali Reel' },
  { file: 'Final_1_1.mp4',         name: 'Showcase Reel' },
  { file: 'FF_1_1.mp4',            name: 'Fashion Film' },
  { file: '1_1_1_1.mp4',           name: 'Brand Reel' },
  { file: 'F_1.mp4',               name: 'Promo Reel' },
  { file: 'OM us_1.mp4',           name: 'OM Us Reel' },
  { file: 'Tocken god 3_1.mp4',    name: 'Token God Reel' },
  { file: 'Token 35_1.mp4',        name: 'Token 35 Reel' },
  { file: 'Token 38_1_1.mp4',      name: 'Token 38 Reel' },
]

/* ---- Assemble unified project list ---- */
let n = 0
const pad = () => String(++n).padStart(2, '0')

const graphicProjects = graphicMeta.map((m, i) => {
  const inner = gdImages[i] || []
  /* Replace the banner (images[0]) with the new cover from Project image/ folder
     when available; keep the rest of the detail-page imagery intact. */
  const images = gdBanners[i]
    ? [gdBanners[i], ...inner.slice(1)]
    : inner
  return {
    ...m,
    num: pad(),
    category: 'Graphic Design',
    tag: 'GRAPHIC DESIGN',
    type: 'image',
    images,
  }
})

const uxProjects = uxMeta.map((m, i) => ({
  ...m,
  num: pad(),
  category: 'UI / UX Design',
  tag: 'UI/UX',
  type: 'image',
  images: uxImages[i] || [],
}))

const reelProjects = reelMeta
  .filter((r) => reelByName[r.file])
  .map((r) => ({
    slug: r.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    name: r.name,
    title: 'Video Editing · Reel',
    num: pad(),
    category: 'Video Editing',
    tag: 'REELS',
    year: '2024',
    accent: '#a855f7',
    client: 'Personal / Client Work',
    service: 'Video Editing & Motion',
    description:
      'A short-form vertical reel — edited for rhythm, motion and impact. Cut, colour-graded and sound-synced for social-first delivery.',
    type: 'video',
    images: [],
    videos: [reelByName[r.file]],
  }))

export const projects = [...graphicProjects, ...uxProjects, ...reelProjects]

/* Curated subset for the homepage sticky-stack (image projects only) */
export const featured = [
  'artisan-podiatry',
  'youngphase-fashion',
  'sailber-cab',
  'fresh-cart-grocery',
  'global-sports-app',
  'ai-science-learning',
]
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter(Boolean)

export const categories = ['ALL', 'GRAPHIC DESIGN', 'UI/UX', 'REELS']

export const getProject      = (slug) => projects.find((p) => p.slug === slug)
export const getProjectIndex = (slug) => projects.findIndex((p) => p.slug === slug)
