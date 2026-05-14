import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import cartoonModel from '../assets/modelCartoon.png'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY  = useTransform(scrollYProgress, [0, 1], [0, -60])
  const charY  = useTransform(scrollYProgress, [0, 1], [0, 40])

  return (
    <section id="home" ref={ref}
      style={{ position: 'relative', height: '100vh', background: '#000', overflow: 'hidden' }}
    >
      {/* ── HEADING – top of viewport, full-width ── */}
      <motion.h1
        style={{
          position: 'absolute', top: '12%', left: 0, right: 0, margin: 0,
          textAlign: 'center',
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(64px, 17.5vw, 240px)',
          lineHeight: 1, letterSpacing: '-0.01em', whiteSpace: 'nowrap',
          background: 'linear-gradient(175deg, #ffffff 0%, #707070 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          zIndex: 2, y: textY, userSelect: 'none', pointerEvents: 'none',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        HI, I'M RAHUL
      </motion.h1>

      {/* ── LEFT SUBTITLE ── */}
      <motion.p
        style={{
          position: 'absolute', left: '4.5vw', top: '50%', translateY: '-50%',
          zIndex: 20, margin: 0,
          fontFamily: 'Inter, sans-serif', fontWeight: 500,
          fontSize: 'clamp(10px, 0.78vw, 12px)', letterSpacing: '0.02em',
          color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, maxWidth: 230,
        }}
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        I love everything that has to do with<br />
        design, for me design is not a job, it's a<br />
        lifestyle and I feel true devotion for Art.<br />
        My skills include "but are not limited to"<br />
        branding, Typography, Photo<br />
        Manipulation, Re-Touching, Editorial<br />
        Designs, Photography, Illustration & last<br />
        but not least, social media Designs.
      </motion.p>

      {/* ── CTA BUTTON ── */}
      <motion.div
        style={{ position: 'absolute', right: '4.5vw', top: '46%', translateY: '-50%', zIndex: 20 }}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.a
          href="#contact"
          style={{
            position: 'relative', display: 'inline-flex', alignItems: 'center',
            padding: '13px 30px', borderRadius: 9999,
            fontFamily: 'Inter, sans-serif', fontWeight: 900,
            fontSize: 'clamp(10px, 0.85vw, 13px)', letterSpacing: '0.12em',
            color: '#fff', textDecoration: 'none', textTransform: 'uppercase',
            background: 'linear-gradient(#000,#000) padding-box, linear-gradient(135deg,#a855f7,#ec4899,#f59e0b) border-box',
            border: '2px solid transparent',
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
        >
          CONTACT ME
        </motion.a>
      </motion.div>

      {/* ── CHARACTER – anchored to bottom, sits below text ── */}
      <motion.div
        style={{
          position: 'absolute', bottom: 0, left: '50%', translateX: '-50%',
          y: charY, zIndex: 10, pointerEvents: 'none',
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src={cartoonModel}
          alt="3D Character"
          style={{ height: '66vh', width: 'auto', maxWidth: '44vw', display: 'block' }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ── SCROLL LINE ── */}
      <motion.div
        style={{ position: 'absolute', bottom: 24, left: '50%', translateX: '-50%', zIndex: 20 }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.25))' }} />
      </motion.div>
    </section>
  )
}
