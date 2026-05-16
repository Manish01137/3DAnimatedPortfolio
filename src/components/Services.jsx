import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { num: '01', title: 'Branding & Identity Design',  accent: '#a855f7',
    desc: 'Logo Design, Brand Identity Design, Brand Guidelines, Business Card Design, Letterhead Design, Stationery Design, Packaging Design, Product Label Design.' },
  { num: '02', title: 'Social Media Design',         accent: '#ec4899',
    desc: 'Instagram Post Design, Carousel Design, Story Design, Facebook Ads Creatives, YouTube Thumbnail Design, LinkedIn Banner Design, Social Media Banner Design.' },
  { num: '03', title: 'Marketing & Advertising Design', accent: '#f59e0b',
    desc: 'Poster Design, Flyer Design, Brochure Design, Pamphlet Design, Billboard Design, Hoarding Design, Newspaper Ad Design, Magazine Ad Design.' },
  { num: '04', title: 'Print Design',                accent: '#06b6d4',
    desc: 'Catalogue Design, Menu Card Design, Book Cover Design, Magazine Layout Design, Invitation Card Design, Certificate Design.' },
  { num: '05', title: 'Digital Design',              accent: '#22c55e',
    desc: 'Website Banner Design, Landing Page Design, Email Template Design, UI Design, App UI Design, Web Graphics, Dashboard Design.' },
  { num: '06', title: 'E-commerce Design',           accent: '#3b82f6',
    desc: 'Amazon Listing Images, Product Mockups, Product Infographics, A+ Content Design, Shopify Banner Design.' },
  { num: '07', title: 'Motion & Creative Design',    accent: '#f43f5e',
    desc: 'Motion Graphics, GIF Design, Animated Social Media Posts, Presentation Design (PPT), Pitch Deck Design.' },
  { num: '08', title: 'Photo Editing & Retouching',  accent: '#14b8a6',
    desc: 'Background Removal, Photo Retouching, Manipulation, Color Correction, AI Image Enhancement.' },
  { num: '09', title: 'Special Creative Services',   accent: '#8b5cf6',
    desc: 'Event Creative Design, Festival Post Design, Real Estate Creatives, Restaurant Menu & Ads, Fashion Brand Creatives, Crypto/Web 3 Creatives, YouTube Channel Branding.' },
]

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________'

function useScramble(target, active) {
  const [text, setText] = useState(target)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!active) { setText(target); return }
    const old = text.replace(/<[^>]+>/g, '')
    const length = Math.max(old.length, target.length)
    const queue = []
    for (let i = 0; i < length; i++) {
      const from = old[i] || ''
      const to   = target[i] || ''
      const start = Math.floor(Math.random() * 12)
      const end   = start + Math.floor(Math.random() * 12) + 6
      queue.push({ from, to, start, end, char: '' })
    }
    let frame = 0
    const update = () => {
      let output = ''
      let complete = 0
      for (let i = 0; i < queue.length; i++) {
        let { from, to, start, end, char } = queue[i]
        if (frame >= end) { complete++; output += to }
        else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
            queue[i].char = char
          }
          output += `<span style="color:rgba(0,0,0,0.35)">${char}</span>`
        } else { output += from }
      }
      setText(output)
      if (complete < queue.length) { frame++; rafRef.current = requestAnimationFrame(update) }
    }
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, target])

  return text
}

function ServiceRow({ s, i, hovered, setHovered, inView }) {
  const isActive  = hovered === i
  const isDim     = hovered !== null && !isActive
  const scrambled = useScramble(s.title, isActive)

  return (
    <motion.div
      data-cursor
      onMouseEnter={() => setHovered(i)}
      onMouseLeave={() => setHovered(null)}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gap: '4vw',
        alignItems: 'center',
        padding: '36px 0',
        borderTop: '1px solid rgba(0,0,0,0.12)',
        cursor: 'none',
        opacity: isDim ? 0.35 : 1,
        transition: 'opacity 0.4s ease',
      }}
    >
      {/* Number */}
      <span style={{
        fontFamily: '"Bebas Neue"',
        fontSize: 'clamp(40px, 4.5vw, 64px)',
        lineHeight: 1,
        color: isActive ? s.accent : 'rgba(0,0,0,0.85)',
        transition: 'color 0.4s ease, transform 0.4s ease',
        transform: isActive ? 'translateX(8px)' : 'translateX(0)',
        flexShrink: 0,
        minWidth: 80,
        fontWeight: 900,
      }}>
        {s.num}
      </span>

      {/* Title + Description */}
      <div style={{ overflow: 'hidden' }}>
        <h3
          style={{
            fontFamily: 'Inter',
            fontWeight: 900,
            fontSize: 'clamp(20px, 2.1vw, 30px)',
            color: '#000',
            margin: 0, lineHeight: 1.1,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            transform: isActive ? 'translateX(12px)' : 'translateX(0)',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          dangerouslySetInnerHTML={{ __html: scrambled }}
        />
        <motion.p
          style={{
            fontFamily: 'Inter', fontSize: 14,
            color: 'rgba(0,0,0,0.55)',
            lineHeight: 1.7, margin: 0, maxWidth: 620,
          }}
          animate={{
            height: isActive ? 'auto' : 0,
            opacity: isActive ? 1 : 0,
            marginTop: isActive ? 14 : 0,
          }}
          initial={{ height: 0, opacity: 0, marginTop: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {s.desc}
        </motion.p>
      </div>

      {/* Arrow */}
      <span style={{
        fontFamily: 'Inter', fontSize: 22,
        color: isActive ? s.accent : 'rgba(0,0,0,0.3)',
        transform: isActive ? 'translate(8px, -8px) rotate(0deg)' : 'translate(0, 0) rotate(-45deg)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'inline-block',
      }}>
        →
      </span>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [hovered, setHovered] = useState(null)
  const previewRef = useRef(null)
  const titleRef   = useRef(null)

  // Floating circle preview tracks cursor
  useEffect(() => {
    const el = previewRef.current
    if (!el) return
    let raf
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  // SERVICES title outline → fill (black on white bg)
  useEffect(() => {
    if (!titleRef.current) return
    const tween = gsap.fromTo(titleRef.current,
      { color: 'rgba(10,10,10,0)' },
      {
        color: 'rgba(10,10,10,1)',
        ease: 'none',
        scrollTrigger: {
          trigger: titleRef.current,
          start:   'top 85%',
          end:     'top 35%',
          scrub:   1,
        },
      }
    )
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [])

  return (
    <section id="services"
      ref={ref}
      style={{
        position: 'relative',
        background: '#f5f5f3',
        padding: '140px 8vw 160px',
        overflow: 'hidden',
        borderRadius: '40px 40px 0 0',
        marginTop: -2,
      }}
    >
      {/* ── Floating cursor-tracked accent circle ── */}
      <div
        ref={previewRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 220, height: 220,
          pointerEvents: 'none',
          zIndex: 40,
          opacity: hovered !== null ? 1 : 0,
          scale: hovered !== null ? 1 : 0.4,
          transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), scale 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform, opacity, scale',
        }}
      >
        <div style={{
          width: '100%', height: '100%',
          borderRadius: '50%',
          background: hovered !== null
            ? `radial-gradient(circle at 30% 30%, ${services[hovered].accent}, ${services[hovered].accent}aa 60%, ${services[hovered].accent}66)`
            : 'radial-gradient(circle, #000, #333)',
          boxShadow: hovered !== null
            ? `0 30px 80px -20px ${services[hovered].accent}88, 0 20px 50px -10px ${services[hovered].accent}44`
            : '0 30px 80px -20px rgba(0,0,0,0.4)',
          position: 'relative',
          transition: 'background 0.4s, box-shadow 0.4s',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Inner ring */}
          <div style={{
            position: 'absolute', inset: 8,
            border: '1px solid rgba(255,255,255,0.35)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }} />
          {/* Number badge */}
          <span style={{
            fontFamily: '"Bebas Neue"',
            fontSize: 64, color: '#fff',
            letterSpacing: '0.02em',
            lineHeight: 1,
            textShadow: '0 2px 12px rgba(0,0,0,0.3)',
          }}>
            {hovered !== null ? services[hovered].num : '—'}
          </span>
          {/* Bottom label */}
          <span style={{
            position: 'absolute', bottom: 26, left: 0, right: 0,
            textAlign: 'center',
            fontFamily: 'Inter', fontWeight: 700, fontSize: 10,
            letterSpacing: '0.2em', color: 'rgba(255,255,255,0.85)',
            textTransform: 'uppercase',
          }}>
            View
          </span>
        </div>
      </div>

      {/* ── Header ── */}
      <div style={{ textAlign: 'center', marginBottom: 96 }}>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: 'Inter', fontWeight: 700, fontSize: 11,
            letterSpacing: '0.16em', color: 'rgba(0,0,0,0.45)',
            textTransform: 'uppercase', margin: '0 0 14px',
          }}
        >
          What I do · 9 capabilities
        </motion.p>
        <h2
          ref={titleRef}
          style={{
            fontFamily: '"Bowlby One", sans-serif',
            fontSize: 'clamp(80px, 14vw, 220px)',
            color: 'rgba(10,10,10,0)',
            WebkitTextStroke: '1.5px #0a0a0a',
            margin: 0, lineHeight: 0.9,
            letterSpacing: '-0.02em',
            userSelect: 'none',
          }}
        >
          SERVICES
        </h2>
      </div>

      {/* ── Service list ── */}
      <div style={{ maxWidth: 1480, margin: '0 auto' }}>
        {services.map((s, i) => (
          <ServiceRow key={s.num} s={s} i={i} hovered={hovered} setHovered={setHovered} inView={inView} />
        ))}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.12)' }} />
      </div>
    </section>
  )
}
