import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const links = ['About', 'Projects', 'Services', 'Contact']

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate  = useNavigate()
  const location  = useLocation()
  const onHome    = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const go = (e, target) => {
    e.preventDefault()
    setOpen(false)
    if (target === 'projects') {
      navigate('/work')
      return
    }
    if (onHome) {
      const el = document.querySelector(`#${target}`)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/#${target}`)
    }
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); setOpen(false); navigate('/') }}
          className="font-bebas text-white text-2xl tracking-widest relative z-50"
          style={{ cursor: 'none' }}
        >
          RAHUL.
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-12">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`/#${l.toLowerCase()}`}
                onClick={(e) => go(e, l.toLowerCase())}
                className="text-white/70 hover:text-white font-inter text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/#contact"
          onClick={(e) => go(e, 'contact')}
          className="hidden md:block font-inter font-bold text-sm uppercase tracking-wider text-white px-6 py-2 rounded-full border border-white/30 hover:border-white transition-all duration-300 hover:bg-white hover:text-black"
        >
          Hire Me
        </a>

        {/* Hamburger (mobile) */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden relative z-50 flex flex-col justify-center items-center w-10 h-10"
          style={{ cursor: 'none', background: 'transparent', border: 'none' }}
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'block', width: 26, height: 2, background: '#fff', borderRadius: 2, margin: '3px 0' }}
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'block', width: 26, height: 2, background: '#fff', borderRadius: 2, margin: '3px 0' }}
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'block', width: 26, height: 2, background: '#fff', borderRadius: 2, margin: '3px 0' }}
          />
        </button>
      </div>

      {/* Mobile slide-in sidebar */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dim backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="md:hidden fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
            />

            {/* Panel */}
            <motion.aside
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed top-0 right-0 z-[60] h-screen flex flex-col"
              style={{
                width: 'min(86vw, 380px)',
                background: 'linear-gradient(200deg, #1a1a1a 0%, #0a0a0a 55%, #000 100%)',
                borderLeft: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '-40px 0 90px -30px rgba(168,85,247,0.5)',
                padding: '32px 30px 36px',
                overflowY: 'auto',
              }}
            >
              {/* Gradient accent edge */}
              <span style={{
                position: 'absolute', top: 0, left: 0, width: 3, height: '100%',
                background: 'linear-gradient(180deg,#a855f7,#ec4899,#f59e0b)',
              }} />

              {/* Top: brand + close */}
              <div className="flex items-center justify-between" style={{ marginBottom: 44 }}>
                <span style={{
                  fontFamily: '"Bowlby One", sans-serif', fontSize: 22,
                  color: '#fff', letterSpacing: '0.08em',
                }}>
                  RAHUL.
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  style={{
                    width: 40, height: 40, borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.04)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontFamily: 'Inter', fontSize: 18, lineHeight: 1,
                    cursor: 'pointer',
                  }}
                >
                  ✕
                </button>
              </div>

              <p style={{
                fontFamily: 'Inter', fontWeight: 700, fontSize: 10,
                letterSpacing: '0.32em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)', margin: '0 0 18px',
              }}>
                Navigation
              </p>

              <nav className="flex flex-col">
                {links.map((l, i) => (
                  <motion.a
                    key={l}
                    href={`/#${l.toLowerCase()}`}
                    onClick={(e) => go(e, l.toLowerCase())}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: 'flex', alignItems: 'baseline', gap: 14,
                      padding: '18px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                      textDecoration: 'none',
                    }}
                  >
                    <span style={{
                      fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
                      color: 'rgba(255,255,255,0.5)',
                      minWidth: 24,
                    }}>
                      0{i + 1}
                    </span>
                    <span
                      style={{
                        fontFamily: '"Bowlby One", sans-serif',
                        fontSize: 'clamp(28px, 8vw, 38px)',
                        lineHeight: 1.05, letterSpacing: '0.01em',
                        color: '#ffffff',
                        textTransform: 'uppercase',
                      }}
                    >
                      {l}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <motion.a
                href="/#contact"
                onClick={(e) => go(e, 'contact')}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + links.length * 0.07 }}
                style={{
                  marginTop: 32,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '18px 28px', borderRadius: 9999,
                  fontFamily: 'Inter', fontWeight: 900, fontSize: 12,
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: '#fff', textDecoration: 'none',
                  background: 'linear-gradient(135deg,#a855f7,#ec4899,#f59e0b)',
                  boxShadow: '0 16px 40px -14px rgba(236,72,153,0.6)',
                }}
              >
                Hire Me →
              </motion.a>

              {/* Socials */}
              <div style={{ marginTop: 'auto', paddingTop: 36 }}>
                <p style={{
                  fontFamily: 'Inter', fontWeight: 700, fontSize: 10,
                  letterSpacing: '0.32em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)', margin: '0 0 14px',
                }}>
                  Follow
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: 20, rowGap: 8 }}>
                  {[
                    ['Instagram', 'https://www.instagram.com/rahulr7988/'],
                    ['Behance', 'https://www.behance.net/mksrahulrai'],
                    ['LinkedIn', 'https://www.linkedin.com/in/rahul-r-851076230/'],
                    ['YouTube', 'https://www.youtube.com/@HindiDreamStorys'],
                  ].map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'Inter', fontWeight: 700, fontSize: 12,
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
                      }}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
