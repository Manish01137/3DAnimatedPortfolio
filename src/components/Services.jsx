import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  { num: '01', title: '3D Modeling',    desc: 'Precise mesh construction — from concept sketch to production-ready asset with sub-millimetre accuracy.' },
  { num: '02', title: '3D Rendering',   desc: 'Photorealistic stills with cinematic lighting, ray-traced shadows and 8K texture maps.' },
  { num: '03', title: '3D Animation',   desc: 'Character rigs, motion paths and fluid simulations that breathe life into any narrative.' },
  { num: '04', title: 'Product Design', desc: 'Hero-shot visualizations that convert browsers into buyers — used by 20+ e-commerce brands.' },
  { num: '05', title: 'Visual Identity', desc: 'Complete brand systems: mark, type, palette, and motion guidelines that scale everywhere.' },
]

export default function Services() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(null)

  return (
    <section style={{ background: '#fff', padding: '120px 8vw', borderRadius: '40px 40px 0 0', marginTop: -2 }}>
      <div ref={ref} style={{ maxWidth: 1000, margin: '0 auto' }}>

        {/* Header */}
        <motion.div style={{ marginBottom: 72 }}
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
        >
          <p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', color: 'rgba(0,0,0,0.35)', textTransform: 'uppercase', margin: '0 0 8px' }}>
            Capabilities
          </p>
          <h2 style={{ fontFamily: '"Bebas Neue"', fontSize: 'clamp(40px, 7vw, 96px)', color: '#000', margin: 0, lineHeight: 1 }}>
            WHAT I DO
          </h2>
        </motion.div>

        {/* List */}
        <div>
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              data-cursor
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '5vw',
                padding: '32px 0', borderTop: '1px solid rgba(0,0,0,0.08)',
                cursor: 'none', position: 'relative', overflow: 'hidden',
              }}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.12 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Hover background slide */}
              <motion.div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(90deg, rgba(168,85,247,0.06) 0%, rgba(236,72,153,0.04) 100%)',
                  originX: 0,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Number */}
              <motion.span
                style={{
                  fontFamily: '"Bebas Neue"',
                  fontSize: 'clamp(52px, 7vw, 92px)',
                  lineHeight: 1, color: '#000', flexShrink: 0,
                  position: 'relative',
                  opacity: hovered === i ? 1 : 0.12,
                  transition: 'opacity 0.3s',
                }}
              >
                {s.num}
              </motion.span>

              {/* Content */}
              <div style={{ paddingTop: 8, flex: 1, position: 'relative' }}>
                <h3 style={{ fontFamily: 'Inter', fontWeight: 900, fontSize: 'clamp(16px, 1.6vw, 22px)', color: '#000', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>
                  {s.title}
                </h3>
                <motion.p
                  style={{ fontFamily: 'Inter', fontSize: 'clamp(13px, 1vw, 15px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.75, margin: 0, maxWidth: 520 }}
                  animate={{ opacity: hovered === i ? 1 : 0.6 }}
                  transition={{ duration: 0.25 }}
                >
                  {s.desc}
                </motion.p>
              </div>

              {/* Arrow */}
              <motion.span
                style={{ fontFamily: 'Inter', fontSize: 20, color: '#000', flexShrink: 0, paddingTop: 8, position: 'relative' }}
                animate={{ x: hovered === i ? 6 : 0, opacity: hovered === i ? 1 : 0.2 }}
                transition={{ duration: 0.25 }}
              >
                ↗
              </motion.span>
            </motion.div>
          ))}
          {/* Bottom border */}
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }} />
        </div>
      </div>
    </section>
  )
}
