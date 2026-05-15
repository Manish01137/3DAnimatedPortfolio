import p1_1 from '../assets/project/1/1.jpg'
import p1_2 from '../assets/project/1/2.jpg'
import p1_3 from '../assets/project/1/3.jpg'
import p2_1 from '../assets/project/2/1.jpg'
import p2_2 from '../assets/project/2/2.jpg'
import p2_3 from '../assets/project/2/3.jpg'
import p3_1 from '../assets/project/3/1.jpg'
import p3_2 from '../assets/project/3/2.jpg'
import p3_3 from '../assets/project/3/3.jpg'
import p4_1 from '../assets/project/4/1.jpg'
import p4_2 from '../assets/project/4/2.jpg'
import p4_3 from '../assets/project/4/3.jpg'
import p5_1 from '../assets/project/5/1.jpg'
import p5_2 from '../assets/project/5/2.jpg'
import p5_3 from '../assets/project/5/3.jpg'
import p6_1 from '../assets/project/6/1.jpg'
import p6_2 from '../assets/project/6/2.jpg'
import p6_3 from '../assets/project/6/3.jpg'
import p7_1 from '../assets/project/7/1.jpg'
import p7_2 from '../assets/project/7/2.jpg'
import p7_3 from '../assets/project/7/3.jpg'
import p8_1 from '../assets/project/8/1.jpg'
import p8_2 from '../assets/project/8/2.jpg'
import p8_3 from '../assets/project/8/3.jpg'
import p9_1 from '../assets/project/9/1.jpg'
import p9_2 from '../assets/project/9/2.jpg'
import p9_3 from '../assets/project/9/3.jpg'

/**
 * Single source of truth for all projects.
 * Used by the homepage Projects section AND the /work pages.
 */
export const projects = [
  {
    slug: 'skyline-studios', num: '01', name: 'Skyline Studios',
    category: 'Branding', tag: 'BRANDING', year: '2024', accent: '#a855f7',
    description: 'A bold visual identity system for an architecture studio — logo, type, and a flexible grid built to scale across print and digital.',
    images: [p1_1, p1_2, p1_3],
  },
  {
    slug: 'pixel-forge', num: '02', name: 'Pixel Forge',
    category: 'UI / UX', tag: 'UI/UX', year: '2024', accent: '#06b6d4',
    description: 'End-to-end product design for a game-asset marketplace — interface system, dark-mode palette, and motion guidelines.',
    images: [p2_1, p2_2, p2_3],
  },
  {
    slug: 'metaform-creations', num: '03', name: 'MetaForm Creations',
    category: 'Motion', tag: 'MOTION', year: '2024', accent: '#f59e0b',
    description: 'Animated brand visuals and 3D motion pieces crafted for launch campaigns and social rollout.',
    images: [p3_1, p3_2, p3_3],
  },
  {
    slug: 'aurum-co', num: '04', name: 'Aurum & Co.',
    category: 'Packaging', tag: 'PACKAGING', year: '2023', accent: '#ec4899',
    description: 'Premium packaging design for a luxury goods label — foil systems, structural mockups, and shelf-ready art.',
    images: [p4_1, p4_2, p4_3],
  },
  {
    slug: 'realmforge-studios', num: '05', name: 'RealmForge Studios',
    category: 'Branding', tag: 'BRANDING', year: '2023', accent: '#22c55e',
    description: 'Complete rebrand for a creative game studio — mark, mascot, and a striking environment-driven art direction.',
    images: [p5_1, p5_2, p5_3],
  },
  {
    slug: 'velocity-motors', num: '06', name: 'Velocity Motors',
    category: 'Advertising', tag: 'ADVERTISING', year: '2023', accent: '#3b82f6',
    description: 'High-impact advertising creatives for an automotive brand — hero key-visuals, billboards, and digital ad sets.',
    images: [p6_1, p6_2, p6_3],
  },
  {
    slug: 'glowskin-beauty', num: '07', name: 'GlowSkin Beauty',
    category: 'Packaging', tag: 'PACKAGING', year: '2023', accent: '#f43f5e',
    description: 'Skincare line packaging and brand world — soft palette, tactile finishes, and a cohesive product family.',
    images: [p7_1, p7_2, p7_3],
  },
  {
    slug: 'quantum-labs', num: '08', name: 'Quantum Labs',
    category: 'UI / UX', tag: 'UI/UX', year: '2022', accent: '#14b8a6',
    description: 'Dashboard and data-visualization interface for a research platform — clarity-first layouts and a calm system.',
    images: [p8_1, p8_2, p8_3],
  },
  {
    slug: 'saffron-foods', num: '09', name: 'Saffron Foods',
    category: 'Social Media', tag: 'SOCIAL', year: '2022', accent: '#8b5cf6',
    description: 'A vibrant social-media content system for a food brand — templates, carousels, and a recognizable visual rhythm.',
    images: [p9_1, p9_2, p9_3],
  },
]

export const categories = ['ALL', ...Array.from(new Set(projects.map(p => p.tag)))]

export const getProject     = (slug) => projects.find(p => p.slug === slug)
export const getProjectIndex = (slug) => projects.findIndex(p => p.slug === slug)
