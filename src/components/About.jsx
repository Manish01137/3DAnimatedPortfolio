import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Public 3D-style emoji PNGs (Apple's CDN — used in Footer too)
const props = [
  { src: 'https://em-content.zobj.net/source/apple/391/cloud_2601-fe0f.png',         top: '10%', left:  '4%',  size: 140, hueRotate: 0,     blur: 1, delay: 0,   dur: 5.0 },
  { src: 'https://em-content.zobj.net/source/apple/391/gem-stone_1f48e.png',         top: '8%',  right: '5%',  size: 130, hueRotate: 230,   blur: 0, delay: 0.4, dur: 5.5 },
  { src: 'https://em-content.zobj.net/source/apple/391/cherry-blossom_1f338.png',    top: '52%', right: '4%',  size: 150, hueRotate: 260,   blur: 0, delay: 0.8, dur: 6.0 },
  { src: 'https://em-content.zobj.net/source/apple/391/red-heart_2764-fe0f.png',     top: '54%', left:  '3%',  size: 130, hueRotate: 0,     blur: 0, delay: 0.2, dur: 5.2 },
]

export default function About() {
  const ref      = useRef(null)
  const titleRef = useRef(null)
  const inView   = useInView(ref, { once: true, margin: '-120px' })

  useEffect(() => {
    if (!titleRef.current) return
    const tween = gsap.fromTo(titleRef.current,
      { color: 'rgba(255,255,255,0)' },
      {
        color: 'rgba(255,255,255,1)',
        ease: 'none',
        scrollTrigger: {
          trigger: titleRef.current,
          start:   'top 85%',
          end:     'top 35%',
          scrub:   1,
        },
      }
    )
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [])

  return (
    <section id="about" ref={ref}
      style={{
        position: 'relative', background: '#000',
        padding: 'clamp(100px, 14vh, 180px) 8vw',
        overflow: 'hidden',
      }}
    >
      {/* ── Floating 3D props ── */}
      {props.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: p.top, left: p.left, right: p.right,
            width: p.size, height: p.size,
            animation: `${i % 2 === 0 ? 'floatY' : 'floatY2'} ${p.dur}s ease-in-out ${p.delay}s infinite`,
            pointerEvents: 'none',
            zIndex: 2,
            filter: `hue-rotate(${p.hueRotate}deg) drop-shadow(0 12px 32px rgba(168,85,247,0.25))`,
            opacity: 0.95,
          }}
        >
          <img src={p.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', userSelect: 'none' }} draggable={false} />
        </div>
      ))}

      {/* ── Heading ── */}
      <h2
        ref={titleRef}
        style={{
          fontFamily: '"Bowlby One", sans-serif',
          fontSize: 'clamp(36px, 8.8vw, 150px)',
          color: 'rgba(255,255,255,0)',
          WebkitTextStroke: '1.5px #fff',
          margin: 0, lineHeight: 0.92,
          textAlign: 'center',
          letterSpacing: '-0.02em',
          position: 'relative', zIndex: 5,
          userSelect: 'none',
        }}
      >
        ABOUT ME
      </h2>

      {/* ── Body Copy ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: 760, margin: '56px auto 0',
          position: 'relative', zIndex: 5,
        }}
      >
        {[
          'With over seven years of professional experience in the creative industry, Rahul specializes in Graphic Design, Video Editing, and UI/UX Design — delivering visually compelling and strategically crafted digital experiences.',
          'With a strong passion for creativity and innovation, he helps brands transform ideas into impactful visual identities that connect with audiences and elevate brand presence. From modern user interfaces and engaging motion visuals to premium brand designs, every project is approached with attention to detail, aesthetics, and functionality.',
          'Dedicated to creating meaningful and high-quality creative solutions, Rahul combines artistic vision with professional expertise to deliver designs that are not only visually stunning but also result-driven.',
          "Let's create something exceptional together.",
        ].map((para, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Inter',
              fontSize: 'clamp(14px, 1.1vw, 16px)',
              color: idx === 3 ? '#fff' : 'rgba(255,255,255,0.7)',
              fontWeight: idx === 3 ? 600 : 400,
              lineHeight: 1.85,
              margin: idx === 0 ? 0 : '22px 0 0',
              textAlign: 'center',
            }}
          >
            {para}
          </motion.p>
        ))}
      </motion.div>

      {/* ── CTA Button ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'flex', justifyContent: 'center', marginTop: 56, position: 'relative', zIndex: 5 }}
      >
        <motion.a
          href="#contact"
          data-cursor
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '15px 38px', borderRadius: 9999,
            fontFamily: 'Inter', fontWeight: 800,
            fontSize: 'clamp(11px, 0.9vw, 13px)', letterSpacing: '0.14em',
            color: '#fff', textDecoration: 'none', textTransform: 'uppercase',
            background: 'linear-gradient(#000,#000) padding-box, linear-gradient(135deg,#a855f7,#ec4899,#f59e0b) border-box',
            border: '2px solid transparent',
            cursor: 'none',
          }}
        >
          Contact Me
        </motion.a>
      </motion.div>
    </section>
  )
}
