/**
 * CursorFollower — premium split-cursor, desktop / fine-pointer only.
 *
 * Two layers:
 *  • Inner dot  — tight spring, disappears when hovering interactive elements.
 *  • Outer ring — loose spring (trails behind), expands + turns aurora on hover.
 *
 * All transforms go through Framer Motion's style prop so they compose cleanly
 * with `animate: { scale }` (no CSS-transform conflicts with Tailwind classes).
 */
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const isTouchDevice =
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches

export default function CursorFollower() {
  const [visible,  setVisible]  = useState(false)
  const [hovering, setHovering] = useState(false)

  /* Raw cursor position */
  const rawX = useMotionValue(-300)
  const rawY = useMotionValue(-300)

  /* Dot — tight spring (near-instant) */
  const dotLeft = useSpring(rawX, { stiffness: 2000, damping: 90, mass: 0.3 })
  const dotTop  = useSpring(rawY, { stiffness: 2000, damping: 90, mass: 0.3 })

  /* Ring — loose spring (lags ~80 ms) */
  const ringLeft = useSpring(rawX, { stiffness: 130, damping: 18, mass: 0.6 })
  const ringTop  = useSpring(rawY, { stiffness: 130, damping: 18, mass: 0.6 })

  useEffect(() => {
    if (isTouchDevice) return

    const onMove = (e) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      setVisible(true)
    }

    const onOver = (e) => {
      const el = e.target
      setHovering(
        el.tagName === 'A'      ||
        el.tagName === 'BUTTON' ||
        el.closest('a')      !== null ||
        el.closest('button') !== null,
      )
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove',   onMove,   { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove',   onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  if (isTouchDevice) return null

  return (
    <>
      {/* ── Inner dot ─────────────────────────────────────────────────── */}
      <motion.div
        className="fixed z-[9999] pointer-events-none w-2 h-2 rounded-full bg-accent"
        style={{
          left:       dotLeft,
          top:        dotTop,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow:  '0 0 10px rgba(129,140,248,0.9)',
        }}
        animate={{
          opacity: visible && !hovering ? 1 : 0,
          scale:   hovering ? 0 : 1,
        }}
        transition={{ duration: 0.12 }}
      />

      {/* ── Outer ring ────────────────────────────────────────────────── */}
      <motion.div
        className="fixed z-[9999] pointer-events-none rounded-full border"
        style={{
          left:            ringLeft,
          top:             ringTop,
          width:           36,
          height:          36,
          translateX:      '-50%',
          translateY:      '-50%',
        }}
        animate={{
          opacity:         visible ? 1 : 0,
          scale:           hovering ? 1.65 : 1,
          borderColor:     hovering
            ? 'rgba(34,211,238,0.55)'
            : 'rgba(129,140,248,0.35)',
          backgroundColor: hovering
            ? 'rgba(34,211,238,0.05)'
            : 'rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </>
  )
}
