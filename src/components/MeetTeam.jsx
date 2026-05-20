import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import teamImg from '../assets/Rahulclient.jpg'

gsap.registerPlugin(ScrollTrigger)

const disciplines = [
  { label: 'Graphic Design',   accent: '#a855f7' },
  { label: 'Video Editing',    accent: '#ec4899' },
  { label: 'UI / UX Design',   accent: '#06b6d4' },
  { label: 'Packaging Design', accent: '#f59e0b' },
]

export default function MeetTeam() {
  const ref       = useRef(null)
  const frameRef  = useRef(null)
  const imgRef    = useRef(null)
  const inView    = useInView(ref, { once: true, margin: '-120px' })

  /* Cursor-driven 3D tilt — same effect as the hero cartoon */
  const spring = { stiffness: 120, damping: 18, mass: 0.6 }
  const rotX = useSpring(useMotionValue(0), spring)
  const rotY = useSpring(useMotionValue(0), spring)
  const handleTilt = (e) => {
    const r = frameRef.current?.getBoundingClientRect()
    if (!r) return
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    rotY.set(px * 14)
    rotX.set(py * -10)
  }
  const resetTilt = () => { rotX.set(0); rotY.set(0) }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic clip-path reveal of the frame
      if (frameRef.current) {
        gsap.fromTo(frameRef.current,
          { clipPath: 'inset(14% 18% 14% 18% round 24px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 24px)',
            ease: 'none',
            scrollTrigger: {
              trigger: frameRef.current,
              start: 'top 80%',
              end:   'top 28%',
              scrub: 1,
            },
          }
        )
      }
      // Slow Ken-Burns parallax on the image itself
      if (imgRef.current) {
        gsap.fromTo(imgRef.current,
          { scale: 1.18, yPercent: -4 },
          {
            scale: 1, yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top bottom',
              end:   'bottom top',
              scrub: true,
            },
          }
        )
      }
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      id="team"
      style={{
        position: 'relative',
        background: '#000',
        padding: 'clamp(100px, 14vh, 180px) clamp(16px, 2.5vw, 40px) clamp(110px, 15vh, 190px)',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '38%', left: '50%',
        width: '60vw', height: '60vw', maxWidth: 900, maxHeight: 900,
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(168,85,247,0.16) 0%, rgba(236,72,153,0.08) 40%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Kicker */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative', zIndex: 2,
          textAlign: 'center', margin: '0 0 14px',
          fontFamily: 'Inter', fontWeight: 700, fontSize: 11,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)',
        }}
      >
        Behind The Work
      </motion.p>

      {/* Outline title */}
      <motion.h2
        initial={{ opacity: 0, y: 26 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative', zIndex: 2,
          textAlign: 'center', margin: '0 0 clamp(40px, 6vh, 72px)',
          fontFamily: '"Bowlby One", sans-serif',
          fontSize: 'clamp(36px, 8.8vw, 150px)',
          lineHeight: 0.92, letterSpacing: '-0.02em',
          color: 'transparent',
          WebkitTextStroke: '1.5px rgba(255,255,255,0.85)',
          userSelect: 'none',
        }}
      >
        THE&nbsp;CREW
      </motion.h2>

      {/* 3D-tilt wrapper (perspective lives here) */}
      <div
        onMouseMove={handleTilt}
        onMouseLeave={resetTilt}
        style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1820, margin: '0 auto',
          perspective: 1400,
        }}
      >
        {/* Image frame with cinematic reveal + cursor tilt */}
        <motion.div
          ref={frameRef}
          style={{
            position: 'relative',
            borderRadius: 24, overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 60px 140px -40px rgba(168,85,247,0.35), 0 30px 80px -30px rgba(0,0,0,0.9)',
            willChange: 'clip-path, transform',
            rotateX: rotX, rotateY: rotY,
            transformStyle: 'preserve-3d', transformPerspective: 1400,
          }}
        >
          <div style={{ overflow: 'hidden', aspectRatio: '705 / 421' }}>
            <img
              ref={imgRef}
              src={teamImg}
              alt="Meet Rahul and the creative team"
              draggable={false}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                display: 'block', willChange: 'transform', userSelect: 'none',
              }}
            />
          </div>
          {/* Subtle vignette for premium depth */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%)',
          }} />
        </motion.div>
      </div>

      {/* Discipline tags */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative', zIndex: 2,
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: 'clamp(10px, 1.4vw, 18px)',
          margin: 'clamp(40px, 6vh, 64px) auto 0',
          maxWidth: 880,
        }}
      >
        {disciplines.map((d) => (
          <span
            key={d.label}
            data-cursor
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '12px 22px', borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.14)',
              background: 'rgba(255,255,255,0.03)',
              fontFamily: 'Inter', fontWeight: 600, fontSize: 13,
              letterSpacing: '0.04em', color: 'rgba(255,255,255,0.85)',
              cursor: 'none', transition: 'border-color 0.3s, background 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = d.accent; e.currentTarget.style.background = `${d.accent}1a` }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: d.accent, flexShrink: 0 }} />
            {d.label}
          </span>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative', zIndex: 2,
          display: 'flex', justifyContent: 'center',
          marginTop: 'clamp(36px, 5vh, 56px)',
        }}
      >
        <motion.a
          href="#contact"
          data-cursor
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '16px 40px', borderRadius: 9999,
            fontFamily: 'Inter', fontWeight: 800,
            fontSize: 'clamp(11px, 0.9vw, 13px)', letterSpacing: '0.14em',
            color: '#fff', textDecoration: 'none', textTransform: 'uppercase',
            background: 'linear-gradient(#000,#000) padding-box, linear-gradient(135deg,#a855f7,#ec4899,#f59e0b) border-box',
            border: '2px solid transparent', cursor: 'none',
          }}
        >
          Work With Me <span style={{ fontSize: 14 }}>→</span>
        </motion.a>
      </motion.div>
    </section>
  )
}
