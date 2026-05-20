import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { projects, getProject, getProjectIndex } from '../data/projects'

const ease = [0.16, 1, 0.3, 1]

function RevealImage({ src, alt, accent, ratio = '16 / 9' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: 'inset(10% 10% 10% 10% round 20px)', opacity: 0.4 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 20px)', opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease }}
      style={{
        position: 'relative', overflow: 'hidden', borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: `0 50px 110px -50px ${accent}55`,
        aspectRatio: ratio,
        width: '100%',
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        draggable={false}
        style={{
          position: 'absolute', top: '-8%', left: 0,
          width: '100%', height: '116%', objectFit: 'cover',
          display: 'block', y, userSelect: 'none',
        }}
      />
    </motion.div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project  = getProject(slug)
  const idx      = getProjectIndex(slug)
  const heroRef  = useRef(null)
  const heroVideoRef = useRef(null)
  const [muted, setMuted] = useState(true)

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY     = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const titleY    = useTransform(scrollYProgress, [0, 1], [0, -80])

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  // Keep <video> muted state in sync with React state
  useEffect(() => {
    if (heroVideoRef.current) heroVideoRef.current.muted = muted
  }, [muted])

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, background: '#000' }}>
        <p style={{ fontFamily: '"Bebas Neue"', fontSize: 40, color: '#fff' }}>Project not found</p>
        <button type="button" data-cursor onClick={() => navigate('/work')}
          style={{ padding: '14px 32px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', fontFamily: 'Inter', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'none' }}>
          Back to Work
        </button>
      </div>
    )
  }

  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]

  /* ── Build editorial image rhythm from PDF reference ──
     hero → 2-up → centered text block → big → 2-up → big → 2-up → … */
  const galleryImages = project.images.slice(1)
  const firstPair     = galleryImages.slice(0, 2)
  const after         = galleryImages.slice(2)
  const blocks        = []
  for (let i = 0; i < after.length;) {
    blocks.push({ type: 'big', images: [after[i]] }); i += 1
    if (i < after.length) {
      blocks.push({ type: 'pair', images: after.slice(i, i + 2) }); i += 2
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ background: '#000' }}
    >
      {/* Curtain reveal */}
      <motion.div
        initial={{ scaleY: 1 }} animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed', inset: 0, zIndex: 60,
          background: `linear-gradient(135deg, ${project.accent}, #ec4899, #f59e0b)`,
          transformOrigin: 'top', pointerEvents: 'none',
        }}
      />

      {/* Hero */}
      <section ref={heroRef} style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#000' }}>
        {project.type === 'video' ? (
          <>
            <video
              ref={heroVideoRef}
              src={project.videos[0]}
              autoPlay loop playsInline
              muted={muted}
              style={{
                position: 'absolute', inset: 0, margin: 'auto',
                maxWidth: '94vw', maxHeight: '100vh',
                width: 'auto', height: '100%', objectFit: 'contain',
                display: 'block',
              }}
            />

            {/* Mute / Unmute toggle */}
            <motion.button
              type="button"
              data-cursor
              onClick={() => setMuted((v) => !v)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              style={{
                position: 'absolute', right: 'clamp(20px, 4vw, 48px)', bottom: 'clamp(20px, 4vh, 48px)',
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '12px 22px', borderRadius: 9999,
                background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.25)',
                fontFamily: '"Bowlby One", sans-serif', fontSize: 12,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: '#fff', cursor: 'none', zIndex: 20,
              }}
            >
              <span style={{ fontSize: 16 }}>{muted ? '🔇' : '🔊'}</span>
              {muted ? 'Unmute' : 'Mute'}
            </motion.button>
          </>
        ) : (
          <motion.img
            src={project.images[0]}
            alt={project.name}
            draggable={false}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
              y: heroY, scale: heroScale, userSelect: 'none',
            }}
          />
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.5) 100%)',
        }} />

        <motion.div
          style={{ position: 'absolute', left: 0, right: 0, bottom: '8vh', padding: '0 6vw', textAlign: 'center', y: titleY }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            style={{
              fontFamily: 'Inter', fontWeight: 700, fontSize: 12,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: project.accent, margin: '0 0 16px',
            }}
          >
            {project.num} · {project.category} · {project.year}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.88, duration: 0.9, ease }}
            style={{
              fontFamily: '"Bowlby One", sans-serif',
              fontSize: 'clamp(36px, 8.8vw, 150px)',
              color: '#fff', margin: 0, lineHeight: 0.9, letterSpacing: '-0.02em',
            }}
          >
            {project.name}
          </motion.h1>
        </motion.div>

        {/* Back button */}
        <motion.button
          type="button" data-cursor
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          onClick={() => navigate('/work')}
          whileHover={{ x: -4 }}
          style={{
            position: 'absolute', top: 'clamp(90px, 12vh, 130px)', left: '6vw',
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '12px 24px', borderRadius: 999,
            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            fontFamily: 'Inter', fontWeight: 700, fontSize: 11,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#fff', cursor: 'none', zIndex: 20,
          }}
        >
          ← All Work
        </motion.button>
      </section>

      {/* ── Editorial gallery: 2-up → text block → big → 2-up → big → … ── */}
      <section
        style={{
          padding: 'clamp(64px, 10vh, 120px) 6vw clamp(60px, 9vh, 110px)',
          maxWidth: 1560, margin: '0 auto',
          display: 'flex', flexDirection: 'column',
          gap: 'clamp(20px, 3vw, 40px)',
        }}
      >
        {/* First 2-up (or single if only 1 left) */}
        {firstPair.length === 2 && (
          <div className="pd-pair" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(16px, 2vw, 28px)' }}>
            <RevealImage src={firstPair[0]} alt={`${project.name} 1`} accent={project.accent} ratio="4 / 3" />
            <RevealImage src={firstPair[1]} alt={`${project.name} 2`} accent={project.accent} ratio="4 / 3" />
          </div>
        )}
        {firstPair.length === 1 && (
          <RevealImage src={firstPair[0]} alt={`${project.name} 1`} accent={project.accent} ratio="16 / 9" />
        )}

        {/* Centered text block — matches PDF layout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease }}
          style={{
            margin: 'clamp(24px, 4vh, 56px) auto',
            maxWidth: 820, textAlign: 'center',
            display: 'flex', flexDirection: 'column', gap: 16,
          }}
        >
          <h2 style={{
            fontFamily: '"Bowlby One", sans-serif',
            fontSize: 'clamp(28px, 4.5vw, 56px)',
            color: '#fff', margin: 0, lineHeight: 1.05, letterSpacing: '-0.01em',
          }}>
            {project.title}
          </h2>
          <p style={{
            fontFamily: 'Inter', fontSize: 'clamp(15px, 1.2vw, 18px)',
            color: 'rgba(255,255,255,0.7)', margin: '8px auto 0',
            lineHeight: 1.85, maxWidth: 760,
          }}>
            <span style={{ color: '#fff', fontWeight: 700 }}>Project: </span>{project.title}
          </p>
          <p style={{
            fontFamily: 'Inter', fontSize: 'clamp(15px, 1.2vw, 18px)',
            color: 'rgba(255,255,255,0.65)', margin: 0,
            lineHeight: 1.85, maxWidth: 760, marginLeft: 'auto', marginRight: 'auto',
          }}>
            {project.description}
          </p>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 6, marginTop: 18,
            fontFamily: 'Inter', fontSize: 'clamp(14px, 1.1vw, 16px)',
            color: 'rgba(255,255,255,0.85)', fontWeight: 600,
          }}>
            <span><span style={{ color: '#fff', fontWeight: 700 }}>Client : </span>{project.client}</span>
            <span><span style={{ color: '#fff', fontWeight: 700 }}>Service : </span>{project.service}</span>
          </div>
        </motion.div>

        {/* Remaining blocks: big → 2-up → big → 2-up → … */}
        {blocks.map((b, i) => (
          b.type === 'big' ? (
            <RevealImage
              key={i}
              src={b.images[0]}
              alt={`${project.name} ${i + 3}`}
              accent={project.accent}
              ratio="16 / 9"
            />
          ) : (
            <div key={i} className="pd-pair" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(16px, 2vw, 28px)' }}>
              {b.images.map((src, j) => (
                <RevealImage
                  key={j}
                  src={src}
                  alt={`${project.name} ${i + 3 + j}`}
                  accent={project.accent}
                  ratio="4 / 3"
                />
              ))}
              {b.images.length === 1 && <div />}
            </div>
          )
        ))}
      </section>

      {/* Prev / Next */}
      <section className="pd-prevnext" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 80,
      }}>
        {[{ p: prev, label: 'Previous', align: 'flex-start' }, { p: next, label: 'Next', align: 'flex-end' }].map(({ p, label, align }) => (
          <button
            key={label}
            type="button"
            data-cursor
            onClick={() => navigate(`/work/${p.slug}`)}
            style={{
              position: 'relative', overflow: 'hidden',
              padding: 'clamp(48px, 9vh, 110px) 6vw',
              background: 'transparent', border: 'none',
              borderRight: label === 'Previous' ? '1px solid rgba(255,255,255,0.1)' : 'none',
              cursor: 'none', textAlign: align === 'flex-start' ? 'left' : 'right',
              display: 'flex', flexDirection: 'column', alignItems: align, gap: 12,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${p.accent}14` }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >
            <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
              {label === 'Previous' ? '← ' : ''}{label}{label === 'Next' ? ' →' : ''}
            </span>
            <span style={{ fontFamily: '"Bowlby One", sans-serif', fontSize: 'clamp(28px, 4.5vw, 64px)', color: '#fff', lineHeight: 0.95 }}>
              {p.name}
            </span>
          </button>
        ))}
      </section>
    </motion.div>
  )
}
