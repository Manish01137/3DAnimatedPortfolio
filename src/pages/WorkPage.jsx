import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, categories } from '../data/projects'

/* Editorial size rhythm — repeats if list is longer */
const sizes = [
  { col: 7, ratio: '4 / 3'  },
  { col: 5, ratio: '3 / 4'  },
  { col: 5, ratio: '3 / 4'  },
  { col: 7, ratio: '4 / 3'  },
  { col: 6, ratio: '1 / 1'  },
  { col: 6, ratio: '1 / 1'  },
  { col: 7, ratio: '4 / 3'  },
  { col: 5, ratio: '3 / 4'  },
  { col: 12, ratio: '21 / 9' },
]

function Tile({ p, size, index, navigate }) {
  const [hover, setHover] = useState(false)
  const videoRef = useRef(null)
  const isVideo = p.type === 'video'

  const onEnter = () => {
    setHover(true)
    if (isVideo && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }
  const onLeave = () => {
    setHover(false)
    if (isVideo && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <motion.div
      layout
      data-cursor
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => navigate(`/work/${p.slug}`)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        gridColumn: `span ${size.col}`,
        position: 'relative',
        borderRadius: 22,
        overflow: 'hidden',
        cursor: 'none',
        border: '1px solid rgba(255,255,255,0.08)',
        background: '#0a0a0a',
      }}
    >
      <div style={{ aspectRatio: size.ratio, overflow: 'hidden' }}>
        {isVideo ? (
          <video
            ref={videoRef}
            src={p.videos[0]}
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              display: 'block',
              transform: hover ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        ) : (
          <img
            src={p.images[0]}
            alt={p.name}
            draggable={false}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              display: 'block',
              transform: hover ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        )}
      </div>

      {/* Play affordance for reels */}
      {isVideo && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: `translate(-50%,-50%) scale(${hover ? 0.6 : 1})`,
          width: 64, height: 64, borderRadius: '50%',
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hover ? 0 : 1,
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          pointerEvents: 'none', zIndex: 3,
        }}>
          <span style={{
            width: 0, height: 0,
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent',
            borderLeft: '16px solid #fff',
            marginLeft: 4,
          }} />
        </div>
      )}

      {/* Accent wash */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `linear-gradient(to top, ${p.accent}cc 0%, ${p.accent}22 35%, transparent 65%)`,
        opacity: hover ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }} />
      {/* Constant subtle bottom gradient for legibility */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
      }} />

      {/* Number badge */}
      <span style={{
        position: 'absolute', top: 20, left: 22,
        fontFamily: '"Bowlby One", sans-serif',
        fontSize: 18, color: '#fff', letterSpacing: '0.06em',
        opacity: 0.85,
      }}>
        {p.num}
      </span>

      {/* Tag chip */}
      <span style={{
        position: 'absolute', top: 18, right: 18,
        fontFamily: 'Inter', fontWeight: 700, fontSize: 9,
        letterSpacing: '0.16em', color: '#fff',
        padding: '6px 12px', borderRadius: 999,
        background: 'rgba(0,0,0,0.45)',
        border: '1px solid rgba(255,255,255,0.18)',
        backdropFilter: 'blur(6px)',
      }}>
        {p.tag}
      </span>

      {/* Bottom info */}
      <div style={{ position: 'absolute', left: 24, right: 24, bottom: 22 }}>
        <p style={{
          fontFamily: 'Inter', fontWeight: 600, fontSize: 11,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.7)', margin: '0 0 6px',
        }}>
          {p.category} · {p.year}
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
          <h3 style={{
            fontFamily: '"Bebas Neue"',
            fontSize: 'clamp(24px, 2.6vw, 40px)',
            color: '#fff', margin: 0, lineHeight: 1,
          }}>
            {p.name}
          </h3>
          <span style={{
            fontFamily: 'Inter', fontWeight: 700, fontSize: 11,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#fff', whiteSpace: 'nowrap',
            transform: hover ? 'translateX(0)' : 'translateX(10px)',
            opacity: hover ? 1 : 0,
            transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1)',
          }}>
            View ↗
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function WorkPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('ALL')
  const titleRef = useRef(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const filtered = filter === 'ALL' ? projects : projects.filter(p => p.tag === filter)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ background: '#000', minHeight: '100vh' }}
    >
      {/* Curtain reveal */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed', inset: 0, zIndex: 60,
          background: 'linear-gradient(135deg,#a855f7,#ec4899,#f59e0b)',
          transformOrigin: 'top', pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div style={{ padding: 'clamp(120px, 18vh, 220px) 5vw 60px', textAlign: 'center' }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          style={{
            fontFamily: 'Inter', fontWeight: 700, fontSize: 11,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)', margin: '0 0 16px',
          }}
        >
          {projects.length} Selected Projects · 2023 — 2025
        </motion.p>
        <motion.h1
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Bowlby One", sans-serif',
            fontSize: 'clamp(36px, 8.8vw, 150px)',
            color: 'transparent',
            WebkitTextStroke: '1.5px #fff',
            margin: 0, lineHeight: 0.9, letterSpacing: '-0.02em',
            userSelect: 'none',
          }}
        >
          ALL&nbsp;WORK
        </motion.h1>
      </div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: 10, padding: '0 5vw 64px',
        }}
      >
        {categories.map((c) => {
          const isActive = filter === c
          return (
            <button
              key={c}
              type="button"
              data-cursor
              onClick={() => setFilter(c)}
              style={{
                padding: '11px 24px', borderRadius: 999,
                fontFamily: 'Inter', fontWeight: 700, fontSize: 11,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                cursor: 'none',
                color: isActive ? '#000' : 'rgba(255,255,255,0.7)',
                background: isActive ? '#fff' : 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'all 0.3s',
              }}
            >
              {c}
            </button>
          )
        })}
      </motion.div>

      {/* Editorial grid */}
      <div style={{
        maxWidth: 1760, margin: '0 auto', padding: '0 5vw 140px',
      }}>
        <motion.div
          layout
          className="wp-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(14px, 1.6vw, 26px)',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <Tile
                key={p.slug}
                p={p}
                size={p.type === 'video' ? { col: 4, ratio: '9 / 16' } : sizes[i % sizes.length]}
                index={i}
                navigate={navigate}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter', padding: '80px 0' }}>
            No projects in this category yet.
          </p>
        )}
      </div>
    </motion.div>
  )
}
