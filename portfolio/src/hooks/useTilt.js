/**
 * useTilt — 3D perspective card-tilt on mouse-move.
 *
 * Returns { style, onMouseMove, onMouseLeave } to spread onto a motion element.
 * The rotateX / rotateY values are derived from the cursor position relative to
 * the element bounds and smoothed with a spring so the tilt feels physical.
 *
 * Usage:
 *   const tilt = useTilt()
 *   <motion.div style={tilt.style} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}>
 */
import {
  useMotionValue,
  useTransform,
  useSpring,
} from 'framer-motion'

export default function useTilt(maxDeg = 10) {
  /* Normalized cursor position within element: −0.5 → 0.5 */
  const nx = useMotionValue(0)
  const ny = useMotionValue(0)

  /* Smooth the raw values */
  const snx = useSpring(nx, { stiffness: 280, damping: 28 })
  const sny = useSpring(ny, { stiffness: 280, damping: 28 })

  /* Map position to rotation angle */
  const rotateX = useTransform(sny, [-0.5, 0.5], [ maxDeg, -maxDeg])
  const rotateY = useTransform(snx, [-0.5, 0.5], [-maxDeg,  maxDeg])

  const onMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    nx.set((e.clientX - left) / width  - 0.5)
    ny.set((e.clientY - top)  / height - 0.5)
  }

  const onMouseLeave = () => {
    nx.set(0)
    ny.set(0)
  }

  return {
    style: { rotateX, rotateY, transformPerspective: 900 },
    onMouseMove,
    onMouseLeave,
  }
}
