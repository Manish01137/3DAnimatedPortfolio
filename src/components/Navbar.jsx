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

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8"
          >
            {links.map((l, i) => (
              <motion.a
                key={l}
                href={`/#${l.toLowerCase()}`}
                onClick={(e) => go(e, l.toLowerCase())}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.06 }}
                className="text-white font-bebas tracking-widest uppercase"
                style={{ fontSize: 'clamp(34px, 10vw, 56px)' }}
              >
                {l}
              </motion.a>
            ))}
            <motion.a
              href="/#contact"
              onClick={(e) => go(e, 'contact')}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + links.length * 0.06 }}
              className="mt-4 font-inter font-bold text-sm uppercase tracking-wider text-white px-8 py-3 rounded-full border border-white/40"
            >
              Hire Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
