import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const socials = [
  { label: 'Twitter',   href: '#' },
  { label: 'Dribbble',  href: '#' },
  { label: 'LinkedIn',  href: '#' },
  { label: 'Instagram', href: '#' },
]

export default function Footer() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [sent, setSent] = useState(false)

  return (
    <footer id="contact" ref={ref}
      style={{ background: '#fff', position: 'relative', overflow: 'hidden' }}
    >
      {/* Floating 3D objects */}
      <div style={{ position: 'absolute', top: 32, right: 40, width: 110, height: 110, animation: 'floatY 4s ease-in-out infinite', pointerEvents: 'none', zIndex: 2 }}>
        <img src="https://em-content.zobj.net/source/apple/391/high-voltage_26a1.png" alt="" style={{ width: '100%', filter: 'drop-shadow(0 8px 24px rgba(234,179,8,0.35))' }} />
      </div>
      <div style={{ position: 'absolute', bottom: 140, left: 32, width: 90, height: 90, animation: 'floatY2 5.5s ease-in-out infinite', pointerEvents: 'none', zIndex: 2 }}>
        <img src="https://em-content.zobj.net/source/apple/391/chains_26d3-fe0f.png" alt="" style={{ width: '100%', filter: 'hue-rotate(260deg) drop-shadow(0 4px 14px rgba(168,85,247,0.4))' }} />
      </div>

      {/* Top contact area */}
      <div style={{ padding: '100px 8vw 80px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Big headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', color: 'rgba(0,0,0,0.35)', textTransform: 'uppercase', margin: '0 0 8px' }}>
            Start a project
          </p>
          <h2 style={{
            fontFamily: '"Bebas Neue"', margin: '0 0 12px',
            fontSize: 'clamp(56px, 10vw, 140px)', lineHeight: 1, color: '#000',
          }}>
            LET'S<br />GET IN<br />TOUCH
          </h2>
          <a href="mailto:alex@3ddesigner.com"
            style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 'clamp(12px, 1.1vw, 16px)', color: 'rgba(0,0,0,0.45)', textDecoration: 'none', letterSpacing: '0.02em', borderBottom: '1px solid rgba(0,0,0,0.2)', paddingBottom: 2, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#000'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.45)'}
          >
            alex@3ddesigner.com
          </a>
        </motion.div>

        {/* Form */}
        <motion.div
          style={{ marginTop: 64, maxWidth: 560 }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {sent ? (
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12, padding: '40px 0' }}
            >
              <span style={{ fontSize: 48 }}>🎉</span>
              <p style={{ fontFamily: '"Bebas Neue"', fontSize: 36, color: '#000', margin: 0 }}>Message Sent!</p>
              <p style={{ fontFamily: 'Inter', color: 'rgba(0,0,0,0.45)', fontSize: 14 }}>I'll get back to you within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { placeholder: 'Full Name *',  type: 'text',  required: true },
                { placeholder: 'Email *',       type: 'email', required: true },
                { placeholder: 'Phone',         type: 'tel',   required: false },
              ].map((f) => (
                <input key={f.placeholder} type={f.type} placeholder={f.placeholder} required={f.required}
                  style={{
                    width: '100%', background: 'transparent',
                    border: 'none', borderBottom: '1px solid rgba(0,0,0,0.15)',
                    padding: '16px 0', fontFamily: 'Inter', fontSize: 14, color: '#000',
                    outline: 'none',
                  }}
                  onFocus={e => e.currentTarget.style.borderBottomColor = '#000'}
                  onBlur={e => e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.15)'}
                />
              ))}
              <textarea placeholder="Your message" rows={4} required
                style={{
                  width: '100%', background: 'transparent',
                  border: 'none', borderBottom: '1px solid rgba(0,0,0,0.15)',
                  padding: '16px 0', fontFamily: 'Inter', fontSize: 14, color: '#000',
                  outline: 'none', resize: 'none', marginTop: 0,
                }}
                onFocus={e => e.currentTarget.style.borderBottomColor = '#000'}
                onBlur={e => e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.15)'}
              />
              <motion.button type="submit"
                style={{
                  marginTop: 32, alignSelf: 'flex-start',
                  padding: '14px 40px', borderRadius: 9999, border: 'none',
                  background: '#000', color: '#fff',
                  fontFamily: 'Inter', fontWeight: 800, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase',
                  cursor: 'none',
                }}
                whileHover={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)', scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Send Message
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        style={{ borderTop: '1px solid rgba(0,0,0,0.08)', padding: '24px 8vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <span style={{ fontFamily: '"Bebas Neue"', fontSize: 28, letterSpacing: '0.1em', color: '#000' }}>ALEX.</span>

        <div style={{ display: 'flex', gap: 28 }}>
          {socials.map((s) => (
            <a key={s.label} href={s.href}
              style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#000'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.35)'}
            >
              {s.label}
            </a>
          ))}
        </div>

        <span style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(0,0,0,0.3)', letterSpacing: '0.04em' }}>
          © 2024 Alex — All rights reserved
        </span>
      </motion.div>
    </footer>
  )
}
