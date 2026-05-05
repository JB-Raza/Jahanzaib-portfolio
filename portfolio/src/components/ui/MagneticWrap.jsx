/**
 * MagneticWrap — wraps any element with a magnetic-pull hover effect.
 *
 * On mouse-enter the child is gently attracted toward the cursor's centre
 * using spring physics. On mouse-leave it snaps back.
 * Has no effect on touch devices (matchMedia pointer: coarse).
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
  const ref = useRef(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const x = useSpring(mx, { stiffness: 220, damping: 18 })
  const y = useSpring(my, { stiffness: 220, damping: 18 })

  const handleMove = (e) => {
    if (isTouchDevice || !ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    mx.set((e.clientX - (left + width  / 2)) * strength)
    my.set((e.clientY - (top  + height / 2)) * strength)
  }

  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={`inline-flex ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  )
}
