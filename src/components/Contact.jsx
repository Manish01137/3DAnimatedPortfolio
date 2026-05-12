import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section
      id="contact"
      className="relative bg-white overflow-hidden py-28 px-6 md:px-16"
      style={{ borderRadius: '40px 40px 0 0' }}
    >
      {/* Floating 3D objects */}
      <div className="absolute top-8 right-8 w-24 h-24 md:w-36 md:h-36 float-anim pointer-events-none select-none z-10">
        <img
          src="https://em-content.zobj.net/source/apple/391/high-voltage_26a1.png"
          alt=""
          className="w-full h-full object-contain drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 8px 32px rgba(234,179,8,0.4))' }}
        />
      </div>
      <div className="absolute bottom-32 left-6 w-20 h-20 md:w-28 md:h-28 float-anim-2 pointer-events-none select-none z-10">
        <img
          src="https://em-content.zobj.net/source/apple/391/chains_26d3-fe0f.png"
          alt=""
          className="w-full h-full object-contain"
          style={{ filter: 'hue-rotate(260deg) drop-shadow(0 4px 16px rgba(168,85,247,0.4))' }}
        />
      </div>

      <div ref={ref} className="max-w-5xl mx-auto relative z-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="font-bebas text-black leading-none mb-6"
              style={{ fontSize: 'clamp(60px, 10vw, 130px)' }}
            >
              LET'S<br />GET IN<br />TOUCH
            </h2>
            <a
              href="mailto:manish@3ddesigner.com"
              className="font-inter font-bold text-black/50 text-sm hover:text-black transition-colors duration-200 underline underline-offset-4"
            >
              manish@3ddesigner.com
            </a>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {sent ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center h-64 gap-4"
              >
                <span className="text-5xl">🎉</span>
                <p className="font-bebas text-black text-3xl">Message Sent!</p>
                <p className="font-inter text-black/50 text-sm">I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  className="w-full border-b border-black/20 focus:border-black bg-transparent py-3 font-inter text-black text-sm placeholder-black/30 outline-none transition-colors duration-200"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email *"
                    required
                    className="w-full border-b border-black/20 focus:border-black bg-transparent py-3 font-inter text-black text-sm placeholder-black/30 outline-none transition-colors duration-200"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full border-b border-black/20 focus:border-black bg-transparent py-3 font-inter text-black text-sm placeholder-black/30 outline-none transition-colors duration-200"
                  />
                </div>
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full border-b border-black/20 focus:border-black bg-transparent py-3 font-inter text-black text-sm placeholder-black/30 outline-none resize-none transition-colors duration-200"
                />
                <motion.button
                  type="submit"
                  className="mt-2 w-full py-4 rounded-full font-inter font-black text-sm uppercase tracking-widest text-white"
                  style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899, #f59e0b)' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
        <span className="font-bebas text-black text-2xl tracking-widest">ALEX.</span>
        <span className="font-inter text-black/30 text-xs">© 2024 All rights reserved.</span>
      </div>
    </section>
  )
}
