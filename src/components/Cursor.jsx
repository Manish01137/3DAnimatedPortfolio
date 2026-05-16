import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)

  // Only enable the custom cursor on real mouse devices (skip touch /
  // coarse-pointer — Windows touch laptops, tablets, phones).
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(pointer: fine) and (hover: hover)')
    const apply = () => setEnabled(mq.matches)
    apply()
    mq.addEventListener?.('change', apply)
    return () => mq.removeEventListener?.('change', apply)
  }, [])

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  /* Dot follows instantly, ring follows with lag */
  const dotX  = useSpring(mouseX, { stiffness: 2000, damping: 50, mass: 0.1 })
  const dotY  = useSpring(mouseY, { stiffness: 2000, damping: 50, mass: 0.1 })
  const ringX = useSpring(mouseX, { stiffness: 200,  damping: 26, mass: 0.6 })
  const ringY = useSpring(mouseY, { stiffness: 200,  damping: 26, mass: 0.6 })

  const ringRef = useRef(null)

  useEffect(() => {
    if (!enabled) return
    const onMove = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY) }

    const expand  = () => { if (ringRef.current) { ringRef.current.style.transform = 'translate(-50%,-50%) scale(2.6)'; ringRef.current.style.opacity = '0.55' } }
    const shrink  = () => { if (ringRef.current) { ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)';   ringRef.current.style.opacity = '1' } }

    const attachHover = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', expand)
        el.addEventListener('mouseleave', shrink)
      })
    }

    window.addEventListener('mousemove', onMove)
    attachHover()

    /* Re-attach when DOM updates */
    const observer = new MutationObserver(attachHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [mouseX, mouseY, enabled])

  if (!enabled) return null

  return (
    <>
      {/* Lagging ring — mix-blend-mode makes it visible on any bg */}
      <motion.div
        ref={ringRef}
        style={{
          x: ringX, y: ringY,
          translateX: '-50%', translateY: '-50%',
          position: 'fixed', top: 0, left: 0,
          width: 38, height: 38, borderRadius: '50%',
          border: '1.5px solid #fff',
          mixBlendMode: 'difference',
          zIndex: 99998, pointerEvents: 'none',
          transition: 'transform 0.28s ease, opacity 0.2s',
        }}
      />
      {/* Precise dot */}
      <motion.div
        style={{
          x: dotX, y: dotY,
          translateX: '-50%', translateY: '-50%',
          position: 'fixed', top: 0, left: 0,
          width: 7, height: 7, borderRadius: '50%',
          background: '#fff',
          mixBlendMode: 'difference',
          zIndex: 99999, pointerEvents: 'none',
        }}
      />
    </>
  )
}
