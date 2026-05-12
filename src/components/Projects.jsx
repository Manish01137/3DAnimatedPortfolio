import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    num: '01', title: 'Aether Product', category: '3D Visualization',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&q=90',
    accent: '#a855f7',
  },
  {
    num: '02', title: 'Neon Organism', category: 'Abstract Render',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1400&q=90',
    accent: '#06b6d4',
  },
  {
    num: '03', title: 'Liquid Chrome', category: 'Material Study',
    year: '2023',
    img: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1400&q=90',
    accent: '#f59e0b',
  },
  {
    num: '04', title: 'Pixel Forge UI', category: 'Game Assets',
    year: '2023',
    img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1400&q=90',
    accent: '#ec4899',
  },
  {
    num: '05', title: 'Orbital Brand', category: 'Identity Design',
    year: '2023',
    img: 'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=1400&q=90',
    accent: '#22c55e',
  },
]

export default function Projects() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const track   = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const cards      = track.querySelectorAll('.proj-card')
      const totalShift = track.scrollWidth - section.offsetWidth

      /* Pin the section, scrub the track horizontally */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start:   'top top',
          end:     `+=${totalShift + 200}`,
          pin:     true,
          scrub:   1.4,
          anticipatePin: 1,
        },
      })

      tl.to(track, { x: -totalShift, ease: 'none' })

      /* Subtle tilt on each card as it enters */
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0.3, scale: 0.92 },
          {
            opacity: 1, scale: 1,
            scrollTrigger: {
              trigger:      section,
              start:        `top top`,
              end:          `+=${totalShift + 200}`,
              scrub:        true,
              containerAnimation: tl,
            },
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef}
      style={{ height: '100vh', background: '#0a0a0a', overflow: 'hidden', position: 'relative' }}
    >
      {/* Section label — centered */}
      <div style={{ position: 'absolute', top: '7%', left: 0, right: 0, zIndex: 20, textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', margin: '0 0 8px' }}>
          Selected Work
        </p>
        <h2 style={{ fontFamily: '"Bebas Neue"', fontSize: 'clamp(56px, 9vw, 120px)', color: '#fff', margin: 0, lineHeight: 1 }}>
          PROJECTS
        </h2>
      </div>

      {/* Drag hint — bottom center */}
      <div style={{ position: 'absolute', bottom: '5%', left: '50%', translateX: '-50%', zIndex: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 1, background: 'rgba(255,255,255,0.2)' }} />
        <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 11, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          Scroll to explore →
        </span>
        <div style={{ width: 36, height: 1, background: 'rgba(255,255,255,0.2)' }} />
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        style={{
          position: 'absolute', top: '50%', translateY: '-50%',
          left: 0, display: 'flex', gap: '2.2vw',
          paddingLeft: '5vw', paddingRight: '5vw',
          willChange: 'transform',
          transform: 'translateY(-50%)',
        }}
      >
        {projects.map((p) => (
          <div
            key={p.num}
            className="proj-card"
            style={{ position: 'relative', flexShrink: 0, width: '38vw', cursor: 'none' }}
          >
            {/* Image */}
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 20, aspectRatio: '4/3' }}>
              <img
                src={p.img}
                alt={p.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease', display: 'block' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              {/* Gradient overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)', borderRadius: 20 }} />
              {/* Number badge */}
              <span style={{
                position: 'absolute', top: 20, left: 22,
                fontFamily: '"Bebas Neue"', fontSize: 18, letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.5)', lineHeight: 1,
              }}>
                {p.num} / {String(projects.length).padStart(2, '0')}
              </span>
              {/* Bottom info */}
              <div style={{ position: 'absolute', bottom: 22, left: 22, right: 22 }}>
                <p style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 5px' }}>
                  {p.category} · {p.year}
                </p>
                <h3 style={{ fontFamily: '"Bebas Neue"', fontSize: 'clamp(22px, 2.4vw, 34px)', color: '#fff', margin: 0, lineHeight: 1.05 }}>
                  {p.title}
                </h3>
              </div>
            </div>

            {/* Accent dot */}
            <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.accent, flexShrink: 0 }} />
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
              <a href="#" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >
                View ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
