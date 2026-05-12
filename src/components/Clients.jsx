import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const clients = [
  {
    num: '01', name: 'Studio Grind', category: '3D Branding',
    img: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=800&q=80',
  },
  {
    num: '02', name: 'Pixel Forge', category: 'Game Assets',
    img: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80',
  },
  {
    num: '03', name: 'MetaForm Creations', category: 'Product Render',
    img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
  },
  {
    num: '04', name: 'RealmForge Studios', category: 'Environment Design',
    img: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=80',
  },
]

export default function Clients() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(null)

  return (
    <section id="customers" className="bg-black py-24 px-6 md:px-16">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.p
          className="font-inter text-white/40 text-xs uppercase tracking-widest mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          Clients
        </motion.p>
        <motion.h2
          className="font-bebas text-white mb-16"
          style={{ fontSize: 'clamp(48px, 8vw, 100px)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          IN THIS VIDEO, I'LL SHOW YOU
        </motion.h2>

        {/* Clients accordion list */}
        <div className="border border-white/10 rounded-2xl overflow-hidden">
          {clients.map((c, i) => (
            <motion.div
              key={c.num}
              className={`relative border-b border-white/10 last:border-b-0 group cursor-pointer transition-colors duration-300 ${hovered === i ? 'bg-white/5' : ''}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
            >
              <div className="flex items-center justify-between px-8 py-7">
                <div className="flex items-center gap-8">
                  <span className="font-bebas text-white/20 text-5xl leading-none">{c.num}</span>
                  <div>
                    <p className="font-inter font-black text-white/40 text-xs uppercase tracking-widest mb-1">Client</p>
                    <p className="font-inter font-bold text-white text-lg">{c.name}</p>
                  </div>
                </div>
                <motion.a
                  href="#"
                  className="font-inter font-bold text-white text-xs uppercase tracking-widest border border-white/30 rounded-full px-6 py-3 hover:bg-white hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Live Project
                </motion.a>
              </div>

              {/* Hover preview image */}
              <AnimatePresence>
                {hovered === i && (
                  <motion.div
                    className="overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 200, opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img
                      src={c.img}
                      alt={c.name}
                      className="w-full h-[200px] object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
