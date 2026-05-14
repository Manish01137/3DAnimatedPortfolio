import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { num: '01', title: 'Aether Product',  category: '3D Visualization', year: '2024', tag: 'PRODUCT',   accent: '#a855f7', images: [p1_1, p1_2, p1_3] },
  { num: '02', title: 'Neon Organism',   category: 'Abstract Render',  year: '2024', tag: 'ART',       accent: '#06b6d4', images: [p2_1, p2_2, p2_3] },
  { num: '03', title: 'Liquid Chrome',   category: 'Material Study',   year: '2024', tag: 'MATERIAL',  accent: '#f59e0b', images: [p3_1, p3_2, p3_3] },
  { num: '04', title: 'Pixel Forge UI',  category: 'Game Assets',      year: '2023', tag: 'GAME',      accent: '#ec4899', images: [p4_1, p4_2, p4_3] },
  { num: '05', title: 'Orbital Brand',   category: 'Identity Design',  year: '2023', tag: 'BRANDING',  accent: '#22c55e', images: [p5_1, p5_2, p5_3] },
  { num: '06', title: 'Crystal Forms',   category: 'Sculpture',        year: '2023', tag: 'ART',       accent: '#3b82f6', images: [p6_1, p6_2, p6_3] },
  { num: '07', title: 'Voxel Worlds',    category: 'Environment',      year: '2023', tag: 'WORLD',     accent: '#f43f5e', images: [p7_1, p7_2, p7_3] },
  { num: '08', title: 'Holo Interface',  category: 'UI Concept',       year: '2022', tag: 'UI',        accent: '#14b8a6', images: [p8_1, p8_2, p8_3] },
  { num: '09', title: 'Aurora Field',    category: 'Generative',       year: '2022', tag: 'GENERATIVE',accent: '#8b5cf6', images: [p9_1, p9_2, p9_3] },
]

export default function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.proj-card')

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        const next = cards[i + 1]

        gsap.to(card, {
          scale: 0.88,
          opacity: 0.4,
          y: -40,
          filter: 'brightness(0.55)',
          ease: 'none',
          scrollTrigger: {
            trigger: next,
            start:   'top bottom',
            end:     'top top',
            scrub:   true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} style={{ background: '#0a0a0a', position: 'relative' }}>

      {/* Section Header */}
      <div style={{ padding: '140px 8vw 80px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', margin: '0 0 12px' }}>
          Selected Work · 2022 — 2024
        </p>
        <h2 style={{ fontFamily: '"Bebas Neue"', fontSize: 'clamp(64px, 11vw, 160px)', color: '#fff', margin: 0, lineHeight: 0.95, letterSpacing: '-0.01em' }}>
          PROJECTS
        </h2>
      </div>

      {/* Sticky stacked cards */}
      <div style={{ position: 'relative' }}>
        {projects.map((p, i) => (
          <div
            key={p.num}
            className="proj-card"
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 6vw',
              transformOrigin: '50% 0%',
              willChange: 'transform, opacity, filter',
            }}
          >
            {/* Card body */}
            <div style={{
              width: '100%', maxWidth: 1040, height: '64vh', maxHeight: 580,
              borderRadius: 22,
              overflow: 'hidden',
              position: 'relative',
              background: '#0d0d0d',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 40px 80px -30px rgba(0,0,0,0.7), 0 16px 40px -16px rgba(0,0,0,0.5)',
              display: 'grid',
              gridTemplateColumns: '1fr 1.25fr',
              gridTemplateRows: '1fr',
            }}>

              {/* Left — Info Panel */}
              <div style={{
                padding: 'clamp(24px, 2.6vw, 44px)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                background: 'linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(10,10,10,1) 100%)',
                position: 'relative', zIndex: 2,
              }}>
                {/* Top: number + tag */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <span style={{
                    fontFamily: '"Bebas Neue"',
                    fontSize: 'clamp(14px, 1.05vw, 18px)',
                    color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em',
                  }}>
                    {p.num} / 09
                  </span>
                  <span style={{
                    fontFamily: 'Inter', fontWeight: 700, fontSize: 9,
                    color: p.accent, letterSpacing: '0.16em',
                    border: `1px solid ${p.accent}`,
                    padding: '5px 10px', borderRadius: 999,
                  }}>
                    {p.tag}
                  </span>
                </div>

                {/* Middle: title + meta */}
                <div>
                  <h3 style={{
                    fontFamily: '"Bebas Neue"',
                    fontSize: 'clamp(32px, 3.6vw, 56px)',
                    color: '#fff', margin: 0, lineHeight: 0.95,
                    letterSpacing: '-0.005em',
                  }}>
                    {p.title}
                  </h3>
                  <p style={{
                    fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.5)',
                    margin: '14px 0 0', letterSpacing: '0.03em', lineHeight: 1.65, maxWidth: 320,
                  }}>
                    {p.category} — Crafted with attention to lighting, mood, and material storytelling.
                  </p>
                </div>

                {/* Bottom: meta + CTA */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                      Year
                    </span>
                    <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                      {p.year}
                    </span>
                  </div>
                  <a href="#"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '10px 18px', borderRadius: 999,
                      border: '1px solid rgba(255,255,255,0.2)',
                      fontFamily: 'Inter', fontWeight: 700, fontSize: 10,
                      letterSpacing: '0.14em', textTransform: 'uppercase',
                      color: '#fff', textDecoration: 'none',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = p.accent; e.currentTarget.style.borderColor = p.accent }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
                  >
                    Live <span style={{ fontSize: 12 }}>↗</span>
                  </a>
                </div>
              </div>

              {/* Right — Image grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr 1fr',
                gap: 2,
                background: '#000',
              }}>
                <div style={{ gridColumn: '1 / 3', gridRow: '1 / 2', overflow: 'hidden', position: 'relative' }}>
                  <img src={p.images[0]} alt={p.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  {/* Accent corner */}
                  <div style={{
                    position: 'absolute', top: 14, right: 14,
                    width: 8, height: 8, borderRadius: '50%',
                    background: p.accent,
                    boxShadow: `0 0 20px ${p.accent}`,
                  }} />
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <img src={p.images[1]} alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <img src={p.images[2]} alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom spacer */}
      <div style={{ height: '40vh' }} />
    </section>
  )
}
