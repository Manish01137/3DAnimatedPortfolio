import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/rahulr7988/' },
  { label: 'Facebook',  href: 'https://www.facebook.com/designethical1/' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/rahul-r-851076230/' },
  { label: 'YouTube',   href: 'https://www.youtube.com/@HindiDreamStorys' },
  { label: 'Behance',   href: 'https://www.behance.net/mksrahulrai' },
]

const OWNER_EMAIL    = 'designethical0@gmail.com'
const FORM_ENDPOINT  = `https://formsubmit.co/ajax/${OWNER_EMAIL}`

function openMailtoFallback(form) {
  const subject = encodeURIComponent(`New portfolio enquiry from ${form.name || 'website visitor'}`)
  const body = encodeURIComponent(
    `Name: ${form.name}\n` +
    `Email: ${form.email}\n` +
    `Phone: ${form.phone || '-'}\n\n` +
    `Message:\n${form.message}`,
  )
  window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`
}

export default function Footer() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [status, setStatus] = useState('idle')  // 'idle' | 'sending' | 'sent' | 'error'
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          phone:   form.phone,
          message: form.message,
          _subject: `New portfolio enquiry from ${form.name}`,
          _replyto: form.email,         // replies go directly to the sender
          _template: 'table',
          _captcha:  'false',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data.success === 'false') {
        throw new Error(data.message || 'Submission failed')
      }
      setStatus('sent')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      // Fallback: open user's mail client pre-filled so the message still
      // reaches the inbox even if the backend is unreachable / not yet activated.
      openMailtoFallback(form)
      setStatus('error')
    }
  }

  return (
    <footer id="contact" ref={ref}
      style={{ background: '#fff', position: 'relative', overflow: 'hidden' }}
    >
      {/* Floating 3D objects (desktop-only) */}
      <div className="footer-emoji" style={{ position: 'absolute', top: 32, right: 40, width: 110, height: 110, animation: 'floatY 4s ease-in-out infinite', pointerEvents: 'none', zIndex: 2 }}>
        <img src="https://em-content.zobj.net/source/apple/391/high-voltage_26a1.png" alt="" style={{ width: '100%', filter: 'drop-shadow(0 8px 24px rgba(234,179,8,0.35))' }} />
      </div>
      {/* ── One container, two parts ── */}
      <div
        className="footer-grid"
        style={{
          padding: 'clamp(80px, 12vh, 110px) 8vw clamp(64px, 9vh, 90px)',
          maxWidth: 1440, margin: '0 auto', position: 'relative', zIndex: 3,
        }}
      >
        {/* Part 1 — Start a project / contact info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', color: 'rgba(0,0,0,0.35)', textTransform: 'uppercase', margin: '0 0 8px' }}>
            Start a project
          </p>
          <h2 style={{
            fontFamily: '"Bebas Neue"', margin: '0 0 16px',
            fontSize: 'clamp(52px, 9vw, 130px)', lineHeight: 1, color: '#000',
          }}>
            LET'S<br />GET IN<br />TOUCH
          </h2>
          <a href="mailto:designethical0@gmail.com"
            style={{ display: 'inline-block', fontFamily: 'Inter', fontWeight: 600, fontSize: 'clamp(13px, 1.1vw, 16px)', color: 'rgba(0,0,0,0.55)', textDecoration: 'none', letterSpacing: '0.02em', borderBottom: '1px solid rgba(0,0,0,0.2)', paddingBottom: 2, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#000'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.55)'}
          >
            designethical0@gmail.com
          </a>

          {/* Social links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(14px, 1.6vw, 24px)', marginTop: 36 }}>
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#000'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.45)'}
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Part 2 — Query / contact form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', color: 'rgba(0,0,0,0.35)', textTransform: 'uppercase', margin: '0 0 24px' }}>
            For any queries
          </p>
          {status === 'sent' ? (
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12, padding: '40px 0' }}
            >
              <span style={{ fontSize: 48 }}>🎉</span>
              <p style={{ fontFamily: '"Bebas Neue"', fontSize: 36, color: '#000', margin: 0 }}>Message Sent!</p>
              <p style={{ fontFamily: 'Inter', color: 'rgba(0,0,0,0.45)', fontSize: 14 }}>I'll get back to you within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <input type="text" name="name" placeholder="Full Name *" required value={form.name} onChange={onChange}
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.15)', padding: '16px 0', fontFamily: 'Inter', fontSize: 14, color: '#000', outline: 'none' }}
                onFocus={e => e.currentTarget.style.borderBottomColor = '#000'}
                onBlur={e => e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.15)'}
              />
              <input type="email" name="email" placeholder="Email *" required value={form.email} onChange={onChange}
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.15)', padding: '16px 0', fontFamily: 'Inter', fontSize: 14, color: '#000', outline: 'none' }}
                onFocus={e => e.currentTarget.style.borderBottomColor = '#000'}
                onBlur={e => e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.15)'}
              />
              <input type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={onChange}
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.15)', padding: '16px 0', fontFamily: 'Inter', fontSize: 14, color: '#000', outline: 'none' }}
                onFocus={e => e.currentTarget.style.borderBottomColor = '#000'}
                onBlur={e => e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.15)'}
              />
              <textarea name="message" placeholder="Your message" rows={4} required value={form.message} onChange={onChange}
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.15)', padding: '16px 0', fontFamily: 'Inter', fontSize: 14, color: '#000', outline: 'none', resize: 'none', marginTop: 0 }}
                onFocus={e => e.currentTarget.style.borderBottomColor = '#000'}
                onBlur={e => e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.15)'}
              />
              {/* Honeypot — bots fill this, humans don't see it */}
              <input type="text" name="_honey" tabIndex="-1" autoComplete="off"
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />

              <motion.button type="submit" disabled={status === 'sending'}
                style={{
                  marginTop: 32, alignSelf: 'flex-start',
                  padding: '14px 40px', borderRadius: 9999, border: 'none',
                  background: status === 'sending' ? '#444' : '#000', color: '#fff',
                  fontFamily: 'Inter', fontWeight: 800, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase',
                  cursor: status === 'sending' ? 'wait' : 'none',
                  opacity: status === 'sending' ? 0.8 : 1,
                }}
                whileHover={status === 'sending' ? {} : { background: 'linear-gradient(135deg, #a855f7, #ec4899)', scale: 1.03 }}
                whileTap={status === 'sending' ? {} : { scale: 0.97 }}
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </motion.button>

              {status === 'error' && (
                <p style={{ marginTop: 14, fontFamily: 'Inter', fontSize: 12, color: '#dc2626' }}>
                  Couldn't reach the server — your mail app has been opened with the
                  message pre-filled. Just hit Send.
                </p>
              )}
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
        <span style={{ fontFamily: '"Bebas Neue"', fontSize: 28, letterSpacing: '0.1em', color: '#000' }}>RAHUL.</span>
        <span style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(0,0,0,0.3)', letterSpacing: '0.04em' }}>
          © 2026 Rahul — All rights reserved
        </span>
      </motion.div>
    </footer>
  )
}
