import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const images = [
  { url: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=600&q=80', span: 'col-span-1' },
  { url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80', span: 'col-span-2' },
  { url: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&q=80', span: 'col-span-1' },
  { url: 'https://images.unsplash.com/photo-1655635643532-fa9ba2648cbe?w=600&q=80', span: 'col-span-1' },
  { url: 'https://images.unsplash.com/photo-1636633762833-5d1658f1e29b?w=800&q=80', span: 'col-span-2' },
  { url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&q=80', span: 'col-span-1' },
]

export default function Portfolio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="bg-black py-24 px-6 md:px-12">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.p
          className="font-inter text-white/40 text-xs uppercase tracking-widest mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Work
        </motion.p>

        <motion.h2
          className="font-bebas text-white mb-12"
          style={{ fontSize: 'clamp(48px, 8vw, 100px)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          SO FAR, WE'VE DESIGNED
        </motion.h2>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-3 auto-rows-[220px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className={`${img.span} relative overflow-hidden rounded-2xl group cursor-pointer`}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <img
                src={img.url}
                alt={`project ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 rounded-2xl" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-inter font-black text-white text-sm uppercase tracking-widest border border-white rounded-full px-6 py-2">
                  View Project
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
