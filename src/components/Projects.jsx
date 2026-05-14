import { useEffect, useRef, useState } from 'react'
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
  { num: '01', name: 'Skyline Studios',    accent: '#a855f7', images: [p1_1, p1_2, p1_3] },
  { num: '02', name: 'Pixel Forge',        accent: '#06b6d4', images: [p2_1, p2_2, p2_3] },
  { num: '03', name: 'MetaForm Creations', accent: '#f59e0b', images: [p3_1, p3_2, p3_3] },
  { num: '04', name: 'Aurum & Co.',        accent: '#ec4899', images: [p4_1, p4_2, p4_3] },
  { num: '05', name: 'RealmForge Studios', accent: '#22c55e', images: [p5_1, p5_2, p5_3] },
  { num: '06', name: 'Velocity Motors',    accent: '#3b82f6', images: [p6_1, p6_2, p6_3] },
  { num: '07', name: 'GlowSkin Beauty',    accent: '#f43f5e', images: [p7_1, p7_2, p7_3] },
  { num: '08', name: 'Quantum Labs',       accent: '#14b8a6', images: [p8_1, p8_2, p8_3] },
  { num: '09', name: 'Saffron Foods',      accent: '#8b5cf6', images: [p9_1, p9_2, p9_3] },
]

export default function Projects() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.proj-card')

      cards.forEach((card, i) => {
        // Active-card tracker for side progress dots
        ScrollTrigger.create({
          trigger: card,
          start: 'top 60%',
          end:   'bottom 40%',
          onToggle: (self) => { if (self.isActive) setActive(i) },
        })

        // Sticky-stack scale-down as next card slides over
        if (i < cards.length - 1) {
          const next = cards[i + 1]
          gsap.to(card, {
            scale: 0.92,
            opacity: 0.4,
            y: -28,
            filter: 'brightness(0.55)',
            ease: 'none',
            scrollTrigger: {
              trigger: next,
              start:   'top bottom',
              end:     'top top',
              scrub:   true,
            },
          })
        }

        // Subtle image parallax
        const imgs = card.querySelectorAll('.tile img')
        imgs.forEach((img, idx) => {
          const dir = idx % 2 === 0 ? 1 : -1
          gsap.fromTo(img, { yPercent: -5 * dir }, {
            yPercent: 5 * dir,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end:   'bottom top',
              scrub: true,
            },
          })
        })
      })

      // PROJECTS title outline → fill
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { color: 'rgba(255,255,255,0)' },
          {
            color: 'rgba(255,255,255,1)',
            ease: 'none',
            scrollTrigger: {
              trigger: titleRef.current,
              start:   'top 85%',
              end:     'top 35%',
              scrub:   1,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} style={{ background: '#000', position: 'relative', borderRadius: '40px 40px 0 0', marginTop: -2 }}>

      {/* ── Header ── */}
      <div style={{ padding: '140px 4vw 80px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', margin: '0 0 18px' }}>
          Selected Work · 2022 — 2024
        </p>
        <h2
          ref={titleRef}
          style={{
            fontFamily: '"Bowlby One", sans-serif',
            fontSize: 'clamp(64px, 13vw, 200px)',
            color: 'rgba(255,255,255,0)',
            WebkitTextStroke: '1.5px #fff',
            margin: 0, lineHeight: 0.92,
            letterSpacing: '-0.02em',
            userSelect: 'none',
          }}
        >
          PROJECTS
        </h2>
      </div>

      {/* ── Floating Side Progress Indicator ── */}
      <div style={{
        position: 'fixed',
        right: 'clamp(16px, 2.4vw, 36px)',
        top: '50%', transform: 'translateY(-50%)',
        zIndex: 30,
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 14,
        pointerEvents: 'none',
        mixBlendMode: 'difference',
      }}>
        {projects.map((p, i) => {
          const isActive = active === i
          return (
            <div key={p.num} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              opacity: isActive ? 1 : 0.4,
              transition: 'opacity 0.4s ease',
            }}>
              <span style={{
                fontFamily: 'Inter', fontWeight: 700, fontSize: 10,
                letterSpacing: '0.14em', color: '#fff',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateX(0)' : 'translateX(8px)',
                transition: 'opacity 0.4s, transform 0.4s',
                whiteSpace: 'nowrap',
              }}>
                {p.num}
              </span>
              <span style={{
                width: isActive ? 22 : 12,
                height: 1.5,
                background: '#fff',
                transition: 'width 0.4s ease',
                display: 'block',
              }} />
            </div>
          )
        })}
      </div>

      {/* ── Sticky-stack cards ── */}
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
              padding: '0 4vw',
              transformOrigin: '50% 0%',
              willChange: 'transform, opacity, filter',
            }}
          >
            {/* Outer rounded container */}
            <div style={{
              width: '100%', maxWidth: 1380,
              borderRadius: 36,
              border: '1px solid rgba(255,255,255,0.18)',
              background: '#000',
              padding: 'clamp(20px, 2.2vw, 32px)',
              boxShadow: `0 50px 100px -40px ${p.accent}44, 0 20px 50px -20px rgba(0,0,0,0.6)`,
            }}>

              {/* Top row: number · CLIENT/name · Live Project */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                alignItems: 'center',
                gap: 'clamp(20px, 3vw, 40px)',
                padding: 'clamp(8px, 1vw, 14px) clamp(12px, 1.6vw, 20px) clamp(20px, 2vw, 26px)',
              }}>
                {/* Number */}
                <span style={{
                  fontFamily: '"Bowlby One", sans-serif',
                  fontSize: 'clamp(36px, 4.5vw, 64px)',
                  lineHeight: 1,
                  color: '#fff',
                  letterSpacing: '-0.005em',
                }}>
                  {p.num}
                </span>

                {/* CLIENT label + name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{
                    fontFamily: 'Inter', fontWeight: 800, fontSize: 13,
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                    color: '#fff',
                  }}>
                    Client
                  </span>
                  <span style={{
                    fontFamily: 'Inter', fontWeight: 500, fontSize: 15,
                    color: 'rgba(255,255,255,0.55)',
                    letterSpacing: '0.01em',
                  }}>
                    {p.name}
                  </span>
                </div>

                {/* Live Project pill */}
                <a
                  href="#"
                  data-cursor
                  style={{
                    display: 'inline-flex', alignItems: 'center',
                    padding: '14px 32px',
                    borderRadius: 999,
                    border: '1px solid rgba(255,255,255,0.5)',
                    fontFamily: 'Inter', fontWeight: 700, fontSize: 12,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: '#fff', textDecoration: 'none',
                    transition: 'all 0.35s',
                    whiteSpace: 'nowrap',
                    cursor: 'none',
                    background: 'transparent',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = p.accent; e.currentTarget.style.borderColor = p.accent }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)' }}
                >
                  Live Project
                </a>
              </div>

              {/* Image grid: 1 big left + 2 stacked right */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: 14,
                height: 'clamp(320px, 46vh, 520px)',
              }}>
                {/* Big tile */}
                <div className="tile" style={{
                  position: 'relative',
                  borderRadius: 24,
                  overflow: 'hidden',
                  background: '#0a0a0a',
                }}>
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    style={{
                      position: 'absolute',
                      top: '-6%', left: 0,
                      width: '100%', height: '112%',
                      objectFit: 'cover', display: 'block',
                      willChange: 'transform',
                    }}
                  />
                </div>

                {/* Right column: 2 stacked */}
                <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 14 }}>
                  <div className="tile" style={{
                    position: 'relative',
                    borderRadius: 24,
                    overflow: 'hidden',
                    background: '#0a0a0a',
                  }}>
                    <img
                      src={p.images[1]}
                      alt=""
                      style={{
                        position: 'absolute',
                        top: '-6%', left: 0,
                        width: '100%', height: '112%',
                        objectFit: 'cover', display: 'block',
                        willChange: 'transform',
                      }}
                    />
                  </div>
                  <div className="tile" style={{
                    position: 'relative',
                    borderRadius: 24,
                    overflow: 'hidden',
                    background: '#0a0a0a',
                  }}>
                    <img
                      src={p.images[2]}
                      alt=""
                      style={{
                        position: 'absolute',
                        top: '-6%', left: 0,
                        width: '100%', height: '112%',
                        objectFit: 'cover', display: 'block',
                        willChange: 'transform',
                      }}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      <div style={{ height: '30vh' }} />
    </section>
  )
}
