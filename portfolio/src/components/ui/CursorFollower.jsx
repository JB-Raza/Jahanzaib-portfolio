/**
 * CursorFollower — premium split-cursor, desktop / fine-pointer only.
 *
 * Performance fixes vs original:
 *  - Removed separate `mouseover` listener (fired on EVERY nested element,
 *    causing hundreds of setState calls per second → jank).
 *  - Hover detection now runs inside the single `mousemove` handler.
 *  - `hoveringRef` guards setState so it only fires when the value CHANGES,
 *    not on every pixel of movement.
 *  - `visibleRef` similarly prevents re-renders after the first show.
 */
import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const isTouchDevice =
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches

export default function CursorFollower() {
  const [visible,  setVisible]  = useState(false)
  const [hovering, setHovering] = useState(false)

  /* Refs to guard against unnecessary setState calls */
  const visibleRef  = useRef(false)
  const hoveringRef = useRef(false)

  /* Raw cursor position */
  const rawX = useMotionValue(-300)
  const rawY = useMotionValue(-300)

  /* Dot — near-instant, unchanged (already fast) */
  const dotLeft = useSpring(rawX, { stiffness: 2000, damping: 90, mass: 0.3 })
  const dotTop  = useSpring(rawY, { stiffness: 2000, damping: 90, mass: 0.3 })

  /* Ring — ~20% faster: stiffness 130→160, mass 0.6→0.48, damping 18→16 */
  const ringLeft = useSpring(rawX, { stiffness: 160, damping: 16, mass: 0.48 })
  const ringTop  = useSpring(rawY, { stiffness: 160, damping: 16, mass: 0.48 })

  useEffect(() => {
    if (isTouchDevice) return

    const onMove = (e) => {
      /* Update motion values — no re-render */
      rawX.set(e.clientX)
      rawY.set(e.clientY)

      /* Show cursor — only setState once */
      if (!visibleRef.current) {
        visibleRef.current = true
        setVisible(true)
      }

      /* Hover detection — only setState when value CHANGES */
      const el = e.target
      const isHovering =
        el.tagName === 'A'      ||
        el.tagName === 'BUTTON' ||
        !!el.closest('a')      ||
        !!el.closest('button')

      if (isHovering !== hoveringRef.current) {
        hoveringRef.current = isHovering
        setHovering(isHovering)
      }
    }

    const onLeave = () => {
      visibleRef.current = false
      setVisible(false)
    }

    /* Single listener instead of two — cuts event overhead in half */
    window.addEventListener('mousemove',    onMove,   { passive: true })
    document.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove',    onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  if (isTouchDevice) return null

  return (
    <>
      {/* ── Inner dot ──────────────────────────────────────────────── */}
      <motion.div
        className="fixed z-[9999] pointer-events-none w-2.5 h-2.5 rounded-full bg-accent"
        style={{
          left:       dotLeft,
          top:        dotTop,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow:  '0 0 10px rgba(129,140,248,0.9)',
          willChange: 'transform',
        }}
        animate={{
          opacity: visible && !hovering ? 1 : 0,
          scale:   hovering ? 0 : 1,
        }}
        transition={{ duration: 0.12 }}
      />

      {/* ── Outer ring ─────────────────────────────────────────────── */}
      <motion.div
        className="fixed z-[9999] pointer-events-none rounded-full border"
        style={{
          left:       ringLeft,
          top:        ringTop,
          width:      36,
          height:     36,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
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
