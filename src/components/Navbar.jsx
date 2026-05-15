import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const links = ['About', 'Projects', 'Services', 'Contact']

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const navigate  = useNavigate()
  const location  = useLocation()
  const onHome    = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, target) => {
    e.preventDefault()
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
        scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); navigate('/') }}
          className="font-bebas text-white text-2xl tracking-widest"
          style={{ cursor: 'none' }}
        >
          RAHUL.
        </a>
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
      </div>
    </nav>
  )
}
