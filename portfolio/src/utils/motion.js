// Shared Framer Motion animation variants + viewport config.
// Import these instead of re-defining per file.

/** Viewport config — animate once when 80px into view */
export const viewport = { once: true, margin: '-80px' }

/** Fade + rise from below */
export const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

/** Fade only */
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

/** Slide in from the left */
export const fadeLeft = {
  hidden:  { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

/** Slide in from the right */
export const fadeRight = {
  hidden:  { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

/** Scale up from slightly smaller */
export const scaleUp = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1,   transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

/**
 * Stagger container — staggers `visible` state of direct children.
 * @param {number} staggerDelay  — gap between children (default 0.08s)
 * @param {number} childDelay    — delay before first child starts (default 0.05s)
 */
export const stagger = (staggerDelay = 0.08, childDelay = 0.05) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: staggerDelay, delayChildren: childDelay } },
})
