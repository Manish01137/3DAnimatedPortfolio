import { useEffect, useRef, useState } from 'react'

const links = ['About', 'Customers', 'Projects', 'Contact']

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <span className="font-bebas text-white text-2xl tracking-widest">ALEX.</span>
        <ul className="hidden md:flex gap-12">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className="text-white/70 hover:text-white font-inter text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden md:block font-inter font-bold text-sm uppercase tracking-wider text-white px-6 py-2 rounded-full border border-white/30 hover:border-white transition-all duration-300 hover:bg-white hover:text-black"
        >
          Hire Me
        </a>
      </div>
    </nav>
  )
}
