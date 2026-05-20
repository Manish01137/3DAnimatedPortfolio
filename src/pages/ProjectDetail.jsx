import { useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { projects, getProject, getProjectIndex } from '../data/projects'

/* Editorial rhythm — cycles for variable image counts.
   Each entry: { col: 1-12 grid columns, ratio: aspect ratio } */
const editorial = [
  { col: 7,  ratio: '4 / 3'   },
  { col: 5,  ratio: '4 / 5'   },
  { col: 12, ratio: '21 / 9'  },
  { col: 5,  ratio: '4 / 5'   },
  { col: 7,  ratio: '4 / 3'   },
  { col: 6,  ratio: '1 / 1'   },
  { col: 6,  ratio: '1 / 1'   },
  { col: 12, ratio: '16 / 9'  },
]

function RevealImage({ src, alt, accent, col, ratio }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: 'inset(12% 12% 12% 12% round 20px)', opacity: 0.4 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 20px)', opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        gridColumn: `span ${col}`,
        position: 'relative', overflow: 'hidden', borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: `0 50px 110px -50px ${accent}55`,
        aspectRatio: ratio,
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

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY     = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const titleY    = useTransform(scrollYProgress, [0, 1], [0, -80])

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

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
          <video
            src={project.videos[0]}
            autoPlay muted loop playsInline controls
            style={{
              position: 'absolute', inset: 0, margin: 'auto',
              maxWidth: '94vw', maxHeight: '100vh',
              width: 'auto', height: '100%', objectFit: 'contain',
              display: 'block',
            }}
          />
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
            transition={{ delay: 0.88, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
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
            color: '#fff', cursor: 'none',
          }}
        >
          ← All Work
        </motion.button>
      </section>

      {/* Intro / description */}
      <section style={{ padding: 'clamp(80px, 12vh, 160px) 6vw', maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 40, textAlign: 'center', justifyItems: 'center' }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: '"Bebas Neue"', fontSize: 'clamp(32px, 5vw, 72px)',
              color: '#fff', margin: '0 auto', lineHeight: 1.05, maxWidth: 1000,
            }}
          >
            {project.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: 'Inter', fontSize: 'clamp(15px, 1.2vw, 18px)',
              color: 'rgba(255,255,255,0.62)', margin: '0 auto',
              lineHeight: 1.85, maxWidth: 820,
            }}
          >
            {project.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 40, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 32, width: '100%' }}
          >
            {[
              ['Client', project.client],
              ['Service', project.service],
              ['Year', project.year],
              ['Discipline', project.category],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{k}</span>
                <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 15, color: '#fff' }}>{v}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery — editorial grid (varied row layouts) */}
      <section
        className="pd-gallery"
        style={{
          padding: '0 6vw 60px', maxWidth: 1560, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'clamp(16px, 2.2vw, 32px)',
        }}
      >
        {project.images.slice(1).map((src, i) => {
          const e = editorial[i % editorial.length]
          return (
            <RevealImage
              key={i}
              src={src}
              alt={`${project.name} ${i + 2}`}
              accent={project.accent}
              col={e.col}
              ratio={e.ratio}
            />
          )
        })}
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
