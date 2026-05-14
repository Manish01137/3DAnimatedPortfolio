import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import logo1  from '../assets/Logo/1.png'
import logo2  from '../assets/Logo/2.png'
import logo3  from '../assets/Logo/3.png'
import logo4  from '../assets/Logo/4.png'
import logo5  from '../assets/Logo/5.png'
import logo6  from '../assets/Logo/6.png'
import logo7  from '../assets/Logo/7.png'
import logo8  from '../assets/Logo/8.png'
import logo9  from '../assets/Logo/9.png'
import logo10 from '../assets/Logo/10.png'
import logo11 from '../assets/Logo/11.png'
import logo12 from '../assets/Logo/12.png'
import logo13 from '../assets/Logo/13.png'
import logo14 from '../assets/Logo/14.png'
import logo15 from '../assets/Logo/15.png'

const rowA = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8]
const rowB = [logo9, logo10, logo11, logo12, logo13, logo14, logo15, logo2]

const fadeMask = {
  WebkitMaskImage: 'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)',
  maskImage:       'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)',
}

function Track({ items, reverse = false, pxPerSecond = 60 }) {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let tween
    let raf

    const start = () => {
      // measure ONE copy width (track has 2 copies)
      const oneCopyWidth = track.scrollWidth / 2
      if (oneCopyWidth <= 0) { raf = requestAnimationFrame(start); return }

      const duration = oneCopyWidth / pxPerSecond

      if (reverse) {
        gsap.set(track, { x: -oneCopyWidth })
        tween = gsap.to(track, {
          x: 0,
          duration,
          ease: 'none',
          repeat: -1,
        })
      } else {
        gsap.set(track, { x: 0 })
        tween = gsap.to(track, {
          x: -oneCopyWidth,
          duration,
          ease: 'none',
          repeat: -1,
        })
      }
    }

    // wait for images to load so scrollWidth is accurate
    const imgs = track.querySelectorAll('img')
    let loaded = 0
    const onLoad = () => {
      loaded++
      if (loaded >= imgs.length) start()
    }
    imgs.forEach(img => {
      if (img.complete && img.naturalWidth) onLoad()
      else { img.addEventListener('load', onLoad); img.addEventListener('error', onLoad) }
    })

    return () => {
      cancelAnimationFrame(raf)
      tween?.kill()
    }
  }, [reverse, pxPerSecond])

  return (
    <div style={{ overflow: 'hidden', ...fadeMask }}>
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {[...items, ...items].map((src, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              padding: '0 48px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              height: 80,
            }}
          >
            <img
              src={src}
              alt=""
              draggable={false}
              style={{
                height: 52, width: 'auto', objectFit: 'contain',
                opacity: 0.55, filter: 'brightness(0) invert(1)',
                transition: 'opacity 0.3s, transform 0.3s',
                userSelect: 'none', display: 'block',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.1)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.transform = 'scale(1)' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <section style={{ background: '#000', padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', margin: 0 }}>
          Trusted by 50+ brands worldwide
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        <Track items={rowA} pxPerSecond={55} />
        <Track items={rowB} reverse pxPerSecond={55} />
      </div>
    </section>
  )
}
