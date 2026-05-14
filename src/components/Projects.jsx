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
  { num: '01', name: 'Skyline Studios',    year: '2024', category: 'Brand Identity',     accent: '#a855f7', images: [p1_1, p1_2, p1_3] },
  { num: '02', name: 'Pixel Forge',        year: '2024', category: 'Digital · UI',       accent: '#06b6d4', images: [p2_1, p2_2, p2_3] },
  { num: '03', name: 'MetaForm Creations', year: '2024', category: 'Packaging',          accent: '#f59e0b', images: [p3_1, p3_2, p3_3] },
  { num: '04', name: 'Aurum & Co.',        year: '2023', category: 'Print · Editorial',  accent: '#ec4899', images: [p4_1, p4_2, p4_3] },
  { num: '05', name: 'RealmForge Studios', year: '2023', category: 'Motion · Social',    accent: '#22c55e', images: [p5_1, p5_2, p5_3] },
  { num: '06', name: 'Velocity Motors',    year: '2023', category: 'Advertising',        accent: '#3b82f6', images: [p6_1, p6_2, p6_3] },
  { num: '07', name: 'GlowSkin Beauty',    year: '2023', category: 'E-commerce',         accent: '#f43f5e', images: [p7_1, p7_2, p7_3] },
  { num: '08', name: 'Quantum Labs',       year: '2022', category: 'Web · Dashboard',    accent: '#14b8a6', images: [p8_1, p8_2, p8_3] },
  { num: '09', name: 'Saffron Foods',      year: '2022', category: 'Brand · Packaging',  accent: '#8b5cf6', images: [p9_1, p9_2, p9_3] },
]

const CornerAccent = ({ position, color = 'rgba(255,255,255,0.7)' }) => {
  const offsets = {
    tl: { top: 14, left: 14, transform: 'rotate(0deg)' },
    tr: { top: 14, right: 14, transform: 'rotate(90deg)' },
    bl: { bottom: 14, left: 14, transform: 'rotate(-90deg)' },
    br: { bottom: 14, right: 14, transform: 'rotate(180deg)' },
  }
  return (
    <div style={{
      position: 'absolute', ...offsets[position],
      width: 14, height: 14, zIndex: 3, pointerEvents: 'none',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 14, height: 1.5, background: color }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: 1.5, height: 14, background: color }} />
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.proj-card')

      cards.forEach((card, i) => {
        // Track which card is active (closest to top of viewport)
        ScrollTrigger.create({
          trigger: card,
          start: 'top 60%',
          end: 'bottom 40%',
          onToggle: (self) => { if (self.isActive) setActive(i) },
        })

        // Sticky stack scale-down
        if (i < cards.length - 1) {
          const next = cards[i + 1]
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.35,
            y: -30,
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

        // Image parallax inside card
        const bigImg   = card.querySelector('.tile-big img')
        const smallImg = card.querySelector('.tile-small img')
        if (bigImg) {
          gsap.fromTo(bigImg, { yPercent: -6 }, {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end:   'bottom top',
              scrub: true,
            },
          })
        }
        if (smallImg) {
          gsap.fromTo(smallImg, { yPercent: 4 }, {
            yPercent: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end:   'bottom top',
              scrub: true,
            },
          })
        }
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

      {/* ── Section Header ── */}
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
              padding: '0 6vw',
              transformOrigin: '50% 0%',
              willChange: 'transform, opacity, filter',
            }}
          >
            {/* Ambient accent glow */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: '70%', height: '70%',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle at 50% 50%, ${p.accent}24 0%, ${p.accent}0c 35%, transparent 65%)`,
              filter: 'blur(60px)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />

            <div style={{ width: '100%', maxWidth: 1280, position: 'relative', zIndex: 1 }}>

              {/* Pill row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                alignItems: 'center',
                gap: 'clamp(20px, 3vw, 48px)',
                padding: 'clamp(16px, 1.8vw, 22px) clamp(28px, 3.2vw, 40px)',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.22)',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                backdropFilter: 'blur(4px)',
                marginBottom: 22,
              }}>
                {/* Number */}
                <span style={{
                  fontFamily: '"Bowlby One", sans-serif',
                  fontSize: 'clamp(28px, 3.2vw, 44px)',
                  lineHeight: 1,
                  color: p.accent,
                  minWidth: 60,
                  textShadow: `0 0 28px ${p.accent}66`,
                }}>
                  {p.num}
                </span>

                {/* Client info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={{
                    fontFamily: 'Inter', fontWeight: 800, fontSize: 10,
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <span>Client</span>
                    <span style={{ width: 18, height: 1, background: 'rgba(255,255,255,0.18)' }} />
                    <span>{p.year}</span>
                    <span style={{ width: 18, height: 1, background: 'rgba(255,255,255,0.18)' }} />
                    <span>{p.category}</span>
                  </span>
                  <span style={{
                    fontFamily: 'Inter', fontWeight: 600,
                    fontSize: 'clamp(15px, 1.25vw, 19px)',
                    color: 'rgba(255,255,255,0.95)',
                    letterSpacing: '0.005em',
                  }}>
                    {p.name}
                  </span>
                </div>

                {/* Live Project pill */}
                <a
                  href="#"
                  data-cursor
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    padding: '12px 28px',
                    borderRadius: 999,
                    border: '1px solid rgba(255,255,255,0.35)',
                    fontFamily: 'Inter', fontWeight: 800, fontSize: 11,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: '#fff', textDecoration: 'none',
                    transition: 'all 0.35s',
                    whiteSpace: 'nowrap',
                    cursor: 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = p.accent; e.currentTarget.style.borderColor = p.accent; e.currentTarget.style.boxShadow = `0 8px 30px -8px ${p.accent}` }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  Live Project <span style={{ fontSize: 14, marginLeft: 2 }}>↗</span>
                </a>
              </div>

              {/* Image preview grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1.4fr 1fr',
                gap: 16,
                height: 'clamp(280px, 38vw, 460px)',
              }}>
                {/* Big tile */}
                <div className="tile-big" style={{
                  position: 'relative',
                  borderRadius: 28,
                  overflow: 'hidden',
                  background: '#0a0a0a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: `0 30px 80px -30px ${p.accent}55, 0 16px 40px -20px rgba(0,0,0,0.6)`,
                }}>
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    style={{
                      position: 'absolute',
                      top: '-8%', left: 0,
                      width: '100%', height: '116%',
                      objectFit: 'cover', display: 'block',
                      willChange: 'transform',
                    }}
                  />
                  {/* Corner accents */}
                  <CornerAccent position="tl" />
                  <CornerAccent position="br" />
                  {/* Accent badge */}
                  <div style={{
                    position: 'absolute', top: 18, right: 18,
                    padding: '7px 14px', borderRadius: 999,
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    fontFamily: 'Inter', fontWeight: 800, fontSize: 10,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: '#fff',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: p.accent, boxShadow: `0 0 12px ${p.accent}` }} />
                    Featured
                  </div>
                  {/* Bottom-left meta caption */}
                  <div style={{
                    position: 'absolute', bottom: 22, left: 22, right: 22,
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16,
                  }}>
                    <div>
                      <p style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', margin: '0 0 4px' }}>
                        Case Study
                      </p>
                      <p style={{ fontFamily: '"Bowlby One", sans-serif', fontSize: 'clamp(20px, 2.4vw, 32px)', color: '#fff', margin: 0, lineHeight: 1, letterSpacing: '-0.005em' }}>
                        {p.name}
                      </p>
                    </div>
                    <span style={{
                      fontFamily: 'Inter', fontWeight: 700, fontSize: 10,
                      letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.65)',
                    }}>
                      {p.num} / 09
                    </span>
                  </div>
                  {/* Bottom gradient for readability */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 45%)', pointerEvents: 'none' }} />
                </div>

                {/* Small tile */}
                <div className="tile-small" style={{
                  position: 'relative',
                  borderRadius: 28,
                  overflow: 'hidden',
                  background: '#0a0a0a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 30px 60px -20px rgba(0,0,0,0.7)',
                }}>
                  <img
                    src={p.images[1]}
                    alt=""
                    style={{
                      position: 'absolute',
                      top: '-8%', left: 0,
                      width: '100%', height: '116%',
                      objectFit: 'cover', display: 'block',
                      willChange: 'transform',
                    }}
                  />
                  <CornerAccent position="tr" />
                  <CornerAccent position="bl" />
                  {/* Bottom label */}
                  <div style={{
                    position: 'absolute', bottom: 18, left: 18, right: 18,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <span style={{
                      fontFamily: 'Inter', fontWeight: 800, fontSize: 10,
                      letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.85)',
                    }}>
                      Detail · 02
                    </span>
                    <span style={{ width: 22, height: 1.5, background: p.accent, boxShadow: `0 0 12px ${p.accent}` }} />
                  </div>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)', pointerEvents: 'none' }} />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Bottom spacer for last card to scroll out */}
      <div style={{ height: '30vh' }} />
    </section>
  )
}
