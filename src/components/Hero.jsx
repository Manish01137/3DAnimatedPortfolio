import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import cartoonModel from '../assets/modelCartoon.png'

const ease = [0.16, 1, 0.3, 1]

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return isMobile
}

export default function Hero() {
  const ref = useRef(null)
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY  = useTransform(scrollYProgress, [0, 1], [0, -60])
  const charY  = useTransform(scrollYProgress, [0, 1], [0, 40])

  /* ── Cursor-driven 3D tilt for the character ── */
  const spring = { stiffness: 120, damping: 18, mass: 0.6 }
  const rotX = useSpring(useMotionValue(0), spring)
  const rotY = useSpring(useMotionValue(0), spring)
  const shadowX = useTransform(rotY, [-14, 14], [40, -40])

  const handleTilt = (e) => {
    const { innerWidth: w, innerHeight: h } = window
    rotY.set(((e.clientX - w / 2) / (w / 2)) * 14)
    rotX.set(((e.clientY - h / 2) / (h / 2)) * -10)
  }
  const resetTilt = () => { rotX.set(0); rotY.set(0) }

  /* ───────────────────────── MOBILE — premium stacked layout ───────────────────────── */
  if (isMobile) {
    return (
      <section
        id="home"
        ref={ref}
        style={{
          position: 'relative', minHeight: '100vh',
          background: '#000', overflow: 'hidden',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '104px 22px 32px',
        }}
      >
        {/* Ambient premium glow */}
        <div style={{
          position: 'absolute', top: '46%', left: '50%',
          width: '120vw', height: '120vw', maxWidth: 620, maxHeight: 620,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(168,85,247,0.20) 0%, rgba(236,72,153,0.10) 42%, transparent 70%)',
          filter: 'blur(30px)', pointerEvents: 'none', zIndex: 0,
        }} />

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          style={{
            position: 'relative', zIndex: 3, margin: 0, textAlign: 'center',
            fontFamily: '"Bowlby One", sans-serif',
            fontSize: 'clamp(40px, 12.5vw, 76px)',
            lineHeight: 1.05, letterSpacing: '-0.01em',
            background: 'linear-gradient(175deg, #ffffff 0%, #8a8a8a 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            userSelect: 'none',
          }}
        >
          HI, I'M<br />RAHUL
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease }}
          style={{
            position: 'relative', zIndex: 3, margin: '14px 0 0',
            maxWidth: 360, textAlign: 'center',
            fontFamily: 'Inter, sans-serif', fontWeight: 500,
            fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.62)',
          }}
        >
          Designer &amp; visual artist — branding, typography, UI/UX,
          photo manipulation, motion &amp; social media design.
        </motion.p>

        {/* Character */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
          style={{
            position: 'relative', zIndex: 2, flex: 1,
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            width: '100%', minHeight: 0, marginTop: 8,
          }}
        >
          <motion.img
            src={cartoonModel}
            alt="3D Character"
            draggable={false}
            style={{
              maxHeight: '52vh', width: 'min(82vw, 420px)', height: 'auto',
              objectFit: 'contain', display: 'block', userSelect: 'none',
              filter: 'drop-shadow(0 30px 60px rgba(168,85,247,0.25))',
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* CTA — below the character */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
          whileTap={{ scale: 0.96 }}
          style={{
            position: 'relative', zIndex: 3, marginTop: 22,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px 44px', borderRadius: 9999,
            fontFamily: 'Inter, sans-serif', fontWeight: 900,
            fontSize: 12, letterSpacing: '0.14em',
            color: '#fff', textDecoration: 'none', textTransform: 'uppercase',
            background: 'linear-gradient(#000,#000) padding-box, linear-gradient(135deg,#a855f7,#ec4899,#f59e0b) border-box',
            border: '2px solid transparent',
            boxShadow: '0 14px 40px -12px rgba(236,72,153,0.5)',
          }}
        >
          CONTACT ME
        </motion.a>
      </section>
    )
  }

  /* ───────────────────────── DESKTOP ───────────────────────── */
  return (
    <section id="home" ref={ref}
      onMouseMove={handleTilt}
      onMouseLeave={resetTilt}
      style={{ position: 'relative', height: '100vh', background: '#000', overflow: 'hidden' }}
    >
      {/* ── HEADING – top of viewport, full-width ── */}
      <motion.h1
        style={{
          position: 'absolute', top: '12%', left: 0, right: 0, margin: 0,
          textAlign: 'center',
          fontFamily: '"Bowlby One", sans-serif',
          fontSize: 'clamp(36px, 8.8vw, 150px)',
          lineHeight: 1, letterSpacing: '-0.01em', whiteSpace: 'nowrap',
          background: 'linear-gradient(175deg, #ffffff 0%, #707070 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          zIndex: 2, y: textY, userSelect: 'none', pointerEvents: 'none',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease }}
      >
        HI, I'M RAHUL
      </motion.h1>

      {/* ── LEFT SUBTITLE ── */}
      <motion.p
        style={{
          position: 'absolute', left: '4.5vw', top: '50%', translateY: '-50%',
          zIndex: 20, margin: 0,
          fontFamily: 'Inter, sans-serif', fontWeight: 500,
          fontSize: 'clamp(14px, 1.05vw, 18px)', letterSpacing: '0.01em',
          color: 'rgba(255,255,255,0.8)', lineHeight: 1.85, maxWidth: 340,
        }}
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.45, ease }}
      >
        I love everything that has to do with design — for me design
        isn't a job, it's a lifestyle, and I feel true devotion for Art.
        My skills include (but are not limited to) branding, typography,
        photo manipulation, re-touching, editorial design, photography,
        illustration & social media design.
      </motion.p>

      {/* ── CTA BUTTON – right side (original position) ── */}
      <motion.div
        style={{ position: 'absolute', right: '4.5vw', top: '46%', translateY: '-50%', zIndex: 20 }}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.55, ease }}
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

      {/* ── CHARACTER – cursor-driven 3D tilt ── */}
      <motion.div
        style={{
          position: 'absolute', bottom: 0, left: '50%', translateX: '-50%',
          y: charY, zIndex: 10, pointerEvents: 'none',
          perspective: 1200,
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.25, ease }}
      >
        <motion.div
          style={{
            rotateX: rotX, rotateY: rotY,
            transformStyle: 'preserve-3d', transformPerspective: 1200,
          }}
        >
          <motion.img
            src={cartoonModel}
            alt="3D Character"
            style={{
              height: '66vh', width: 'auto', maxWidth: '44vw', display: 'block',
              filter: 'drop-shadow(0 38px 55px rgba(0,0,0,0.6))',
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* Soft ground shadow that shifts with the tilt */}
      <motion.div
        style={{
          position: 'absolute', bottom: '2vh', left: '50%',
          width: 'min(36vw, 480px)', height: 26,
          x: shadowX, translateX: '-50%',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, transparent 70%)',
          filter: 'blur(8px)', zIndex: 9, pointerEvents: 'none',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.45 }}
      />

    </section>
  )
}
