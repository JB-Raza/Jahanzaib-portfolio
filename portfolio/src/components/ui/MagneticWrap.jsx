/**
 * MagneticWrap — magnetic-pull hover effect.
 *
 * Performance fix vs original:
 *  - `getBoundingClientRect()` was called on EVERY mousemove event, which
 *    forces a synchronous layout reflow each time (~1ms per call × 60fps).
 *  - Now we cache the rect in a ref on mouseenter and clear it on mouseleave,
 *    so the expensive DOM read only happens ONCE per hover session.
 */
import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const isTouchDevice =
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches

export default function MagneticWrap({
  children,
  strength  = 0.38,
  className = '',
}) {
  const ref     = useRef(null)
  const rectRef = useRef(null)   /* cached bounding rect */

  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const x = useSpring(mx, { stiffness: 220, damping: 18 })
  const y = useSpring(my, { stiffness: 220, damping: 18 })

  const handleEnter = () => {
    /* Cache rect ONCE on enter instead of on every mousemove */
    if (ref.current) rectRef.current = ref.current.getBoundingClientRect()
  }

  const handleMove = (e) => {
    if (isTouchDevice || !rectRef.current) return
    const { left, top, width, height } = rectRef.current
    mx.set((e.clientX - (left + width  / 2)) * strength)
    my.set((e.clientY - (top  + height / 2)) * strength)
  }

  const handleLeave = () => {
    rectRef.current = null
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y, willChange: 'transform' }}
      className={`inline-flex ${className}`}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  )
}
