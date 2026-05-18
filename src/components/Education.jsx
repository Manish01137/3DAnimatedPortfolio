import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const items = [
  {
    title: 'Govt. Boys. Sr. Sec. School Mata Sundri Minto Road, New Delhi',
    detail: '(2016-17) 10th Passed (60%)',
  },
  {
    title: 'Govt. Boys. Sr. Sec. School Mata Sundri Minto Road, New Delhi',
    detail: '(2017-18) 12th Passed (74%)',
  },
  {
    title: 'Bachelor of Arts (B.A. PROGRAMME)',
    detail: '(2019-2022) Passed ( Passing Marks )',
  },
  {
    title: 'Indian Institute of Computer Science, Daryaganj, New Delhi',
    detail: '(2019-22) Multimedia diploma in graphic communication & 3D design (90%)',
  },
]

const ease = [0.16, 1, 0.3, 1]

export default function Education() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="education"
      ref={ref}
      style={{
        position: 'relative',
        background: '#000',
        padding: 'clamp(80px, 12vh, 160px) 8vw',
        overflow: 'hidden',
      }}
    >
      {/* Eyebrow */}
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
        Academics
      </motion.p>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease }}
        style={{
          fontFamily: '"Bowlby One", sans-serif',
          fontSize: 'clamp(56px, 13vw, 200px)',
          background: 'linear-gradient(180deg,#ffffff 0%,#ffffff 38%,#8a8a8a 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 clamp(48px, 7vh, 90px)',
          lineHeight: 0.9,
          letterSpacing: '-0.02em',
          userSelect: 'none',
        }}
      >
        EDUCATION
      </motion.h2>

      {/* Timeline */}
      <div style={{ maxWidth: 1100, position: 'relative' }}>
        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.1, ease, delay: 0.2 }}
          style={{
            position: 'absolute',
            left: 9, top: 8, bottom: 8,
            width: 2,
            background: 'linear-gradient(180deg,rgba(255,255,255,0.5),rgba(255,255,255,0.08))',
            transformOrigin: 'top',
          }}
        />

        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.3 + i * 0.12 }}
            style={{
              position: 'relative',
              paddingLeft: 44,
              paddingBottom: i === items.length - 1 ? 0 : 'clamp(36px, 5vh, 56px)',
            }}
          >
            {/* Dot */}
            <span
              style={{
                position: 'absolute',
                left: 0, top: 4,
                width: 20, height: 20,
                borderRadius: '50%',
                background: '#000',
                border: '2px solid #fff',
                boxShadow: '0 0 0 4px rgba(255,255,255,0.06)',
              }}
            >
              <span style={{
                position: 'absolute', inset: 4,
                borderRadius: '50%', background: '#fff',
              }} />
            </span>

            <h3 style={{
              fontFamily: 'Inter', fontWeight: 700,
              fontSize: 'clamp(16px, 1.5vw, 21px)',
              color: '#fff', margin: '0 0 8px',
              lineHeight: 1.35,
            }}>
              {it.title}
            </h3>
            <p style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 'clamp(12px, 1vw, 14px)',
              color: 'rgba(255,255,255,0.45)',
              margin: 0, lineHeight: 1.6,
            }}>
              {it.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
