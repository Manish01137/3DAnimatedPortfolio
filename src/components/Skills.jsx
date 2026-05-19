import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const groups = [
  {
    title: 'Print, Digital, Motion & UI UX',
    items: [
      { name: 'Adobe Photoshop',  pct: 90 },
      { name: 'Adobe Illustrator', pct: 70 },
      { name: 'Adobe Lightroom',  pct: 60 },
      { name: 'CorelDraw',        pct: 60 },
    ],
  },
  {
    title: 'Video Editing & VFX',
    items: [
      { name: 'Adobe Premiere Pro',  pct: 70 },
      { name: 'Adobe After Effects', pct: 70 },
      { name: 'Movavi Video Editor', pct: 60 },
    ],
  },
  {
    title: '3D Modeling & Render',
    items: [
      { name: 'KeyShot 3D Render', pct: 80 },
      { name: 'Autodesk 3ds Max',  pct: 70 },
      { name: 'Autodesk Maya',     pct: 60 },
    ],
  },
  {
    title: 'UI, UX Designing',
    items: [
      { name: 'Figma',    pct: 70 },
      { name: 'Adobe XD', pct: 60 },
    ],
  },
]

const ease = [0.16, 1, 0.3, 1]

function Bar({ name, pct, inView, delay }) {
  return (
    <div style={{ marginBottom: 26 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'baseline', marginBottom: 12,
      }}>
        <span style={{
          fontFamily: 'Inter', fontWeight: 500,
          fontSize: 'clamp(13px, 1.05vw, 15px)',
          color: 'rgba(255,255,255,0.85)',
        }}>
          {name}
        </span>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 'clamp(11px, 0.9vw, 13px)',
          color: 'rgba(255,255,255,0.4)',
        }}>
          {pct}%
        </span>
      </div>
      <div style={{
        position: 'relative',
        height: 4, borderRadius: 999,
        background: 'rgba(255,255,255,0.1)',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.1, ease, delay }}
          style={{
            position: 'absolute', inset: 0,
            borderRadius: 999,
            background: 'linear-gradient(90deg,#ffffff,#cfcfcf)',
          }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        position: 'relative',
        background: '#000',
        padding: 'clamp(80px, 12vh, 160px) 8vw',
        overflow: 'hidden',
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease }}
        style={{
          fontFamily: 'Inter', fontWeight: 700,
          fontSize: 'clamp(10px, 0.8vw, 12px)',
          letterSpacing: '0.35em',
          color: 'rgba(255,255,255,0.4)',
          textTransform: 'uppercase',
          margin: '0 0 18px',
          textAlign: 'center',
        }}
      >
        Tools I Use Daily
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease }}
        style={{
          fontFamily: '"Bowlby One", sans-serif',
          fontSize: 'clamp(46px, 11vw, 170px)',
          background: 'linear-gradient(180deg,#ffffff 0%,#ffffff 38%,#8a8a8a 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 16px',
          lineHeight: 0.92,
          letterSpacing: '-0.02em',
          userSelect: 'none',
          textAlign: 'center',
        }}
      >
        SKILLS,<br />SOFTWARE
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, ease, delay: 0.2 }}
        style={{
          fontFamily: 'Inter',
          fontSize: 'clamp(12px, 1vw, 14px)',
          color: 'rgba(255,255,255,0.4)',
          margin: '0 0 clamp(48px, 7vh, 80px)',
          textAlign: 'center',
        }}
      >
        Percentage based on how much I used this software till date.
      </motion.p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          columnGap: 'clamp(40px, 6vw, 100px)',
          rowGap: 'clamp(48px, 7vh, 72px)',
          maxWidth: 1100,
          margin: '0 auto',
          width: '100%',
        }}
      >
        {groups.map((g, gi) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.25 + gi * 0.1 }}
          >
            <h3 style={{
              fontFamily: 'Inter', fontWeight: 700,
              fontSize: 'clamp(17px, 1.5vw, 21px)',
              color: '#fff', margin: '0 0 28px',
              textAlign: 'center',
            }}>
              {g.title}
            </h3>
            {g.items.map((it, ii) => (
              <Bar
                key={it.name}
                name={it.name}
                pct={it.pct}
                inView={inView}
                delay={0.35 + gi * 0.1 + ii * 0.08}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
