import { useRef, useEffect } from 'react'

/* Brand colours + two mid-tones for variety */
const COLORS = ['#818cf8', '#22d3ee', '#a5b4fc', '#67e8f9', '#c4b5fd']
const COUNT  = 55

function rand(min, max) { return min + Math.random() * (max - min) }

function makeParticle(w, h) {
  return {
    x:   rand(0, w),
    y:   rand(0, h),
    vx:  rand(-0.12, 0.12),
    vy:  rand(-0.12, 0.12),
    r:   rand(1.0, 2.2),           /* radius in CSS px */
    a:   rand(0.25, 0.70),         /* base opacity */
    c:   COLORS[Math.floor(Math.random() * COLORS.length)],
    pf:  rand(0.008, 0.030),       /* parallax factor */
  }
}

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)  /* cap at 2× */

    let w, h, particles
    let mouseX = 0, mouseY = 0
    let rafId

    /* ── Size canvas to its CSS layout dimensions × DPR ────────────────── */
    function resize() {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width  = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)

      /* Re-generate particles on first call; keep them on resize */
      if (!particles) {
        particles = Array.from({ length: COUNT }, () => makeParticle(w, h))
      }
    }

    resize()

    /* ── Mouse tracking ────────────────────────────────────────────────── */
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      /* normalised: −1 (left/top) → +1 (right/bottom) */
      mouseX = ((e.clientX - rect.left) / w) * 2 - 1
      mouseY = ((e.clientY - rect.top)  / h) * 2 - 1
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('resize',    resize,       { passive: true })

    /* ── Draw loop ─────────────────────────────────────────────────────── */
    function draw() {
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        /* Move */
        p.x += p.vx + mouseX * p.pf
        p.y += p.vy + mouseY * p.pf

        /* Wrap edges */
        if (p.x < -10)    p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10)    p.y = h + 10
        if (p.y > h + 10) p.y = -10

        /* Draw circle */
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle   = p.c
        ctx.globalAlpha = p.a
        ctx.fill()
      }

      ctx.globalAlpha = 1
      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize',    resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
