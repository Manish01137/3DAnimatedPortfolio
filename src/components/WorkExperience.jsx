import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const jobs = [
  { num: '01', company: 'Artistonk',                 type: '(A digital marketing agency)', role: 'Graphic Designer (2019-2020)' },
  { num: '02', company: 'Fashion Comfartz',          type: '(An E-commerce agency)',       role: 'Graphic Designer (2020-2021)' },
  { num: '03', company: 'DLF Healthcare',            type: '(A digital marketing agency)', role: 'Graphic Designer (2021-2022)' },
  { num: '04', company: 'Digital Python',            type: '(A digital marketing agency)', role: 'Graphic Designer (2022, 6 Month)' },
  { num: '05', company: 'Webslogin IT Services',     type: '(A digital marketing agency)', role: 'Graphic Designer (2022-2023)' },
  { num: '06', company: 'Omnist Techhub Solutions',  type: '(A digital marketing agency)', role: 'Graphic Designer (2023-20xx) — Currently Working', current: true },
]

const ease = [0.16, 1, 0.3, 1]

export default function WorkExperience() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [hover, setHover] = useState(null)

  return (
    <section
      id="experience"
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
        }}
      >
        Career Journey
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
          margin: '0 0 clamp(48px, 7vh, 90px)',
          lineHeight: 0.92,
          letterSpacing: '-0.02em',
          userSelect: 'none',
        }}
      >
        WORK<br />EXPERIENCE
      </motion.h2>

      {/* Card grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          gap: 'clamp(16px, 1.8vw, 26px)',
        }}
      >
        {jobs.map((j, i) => (
          <motion.div
            key={j.num}
            data-cursor
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.08 }}
            style={{
              position: 'relative',
              background: hover === i ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.015)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 18,
              padding: 'clamp(26px, 2.6vw, 38px)',
              transform: hover === i ? 'translateY(-6px)' : 'translateY(0)',
              transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1), background 0.4s, border-color 0.4s',
              borderColor: hover === i ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.1)',
              cursor: 'none',
            }}
          >
            <span style={{
              position: 'absolute',
              top: 'clamp(20px, 2vw, 30px)',
              right: 'clamp(20px, 2vw, 30px)',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 'clamp(11px, 0.95vw, 13px)',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.1em',
            }}>
              {j.num}
            </span>

            <h3 style={{
              fontFamily: 'Inter', fontWeight: 700,
              fontSize: 'clamp(18px, 1.7vw, 24px)',
              color: '#fff', margin: '0 0 6px',
              paddingRight: 36,
            }}>
              {j.company}
            </h3>
            <p style={{
              fontFamily: 'Inter', fontWeight: 400,
              fontSize: 'clamp(12px, 1vw, 14px)',
              color: 'rgba(255,255,255,0.5)',
              margin: '0 0 22px',
            }}>
              {j.type}
            </p>
            <p style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 'clamp(12px, 1vw, 14px)',
              color: j.current ? '#fff' : 'rgba(255,255,255,0.6)',
              margin: 0, lineHeight: 1.6,
              display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
            }}>
              {j.current && (
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 8px #22c55e',
                  display: 'inline-block', flexShrink: 0,
                }} />
              )}
              {j.role}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
