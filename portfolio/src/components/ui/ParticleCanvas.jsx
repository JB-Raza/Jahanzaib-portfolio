/**
 * ParticleCanvas — spring-oscillation + orbital cursor gravity.
 *
 * Physics (two forces applied when cursor is within INFLUENCE_RADIUS):
 *
 *   1. Spring pull  →  force = SPRING_CONSTANT × distance   (Hooke's Law)
 *      - Force is WEAK near the cursor (small distance → small force)
 *      - Force is STRONG at the edge of influence (large distance → large force)
 *      - This causes the "Earth-core" effect: particle accelerates falling in,
 *        passes through the cursor at peak speed, decelerates on the other side,
 *        reverses, and repeats like a ping-pong ball.
 *
 *   2. Orbital push  →  force = ORBIT_STRENGTH / √effectiveDistance  (tangential)
 *      - Perpendicular to the inward direction (90° clockwise)
 *      - Makes particles rotate around the cursor while they oscillate
 *      - Combined with the spring: particles trace spirograph / flower-petal paths
 *
 *   3. Friction  →  velocity × FRICTION each frame
 *      - Bleeds off energy so oscillations shrink each cycle (~3–4 bounces)
 *      - Particles eventually settle into a slow drift or tight orbit
 *
 * Naming used throughout:
 *   velocity   — px/frame speed in one axis
 *   distance   — straight-line distance from particle to cursor
 *   inward     — unit vector pointing FROM particle TOWARD cursor
 *   tangent    — unit vector perpendicular to inward (90° clockwise) → orbit
 *   springForce  — pull magnitude (proportional to distance → overshoot)
 *   orbitForce   — tangential push magnitude (rotational spin)
 */
import { useRef, useEffect } from 'react'

/* ── Colour palette ──────────────────────────────────────────────────────── */
const COLORS = ['#818cf8', '#22d3ee', '#a5b4fc', '#67e8f9', '#c4b5fd', '#818cf8', '#22d3ee']

/* ── Scene ───────────────────────────────────────────────────────────────── */
const PARTICLE_COUNT        = 160
const TARGET_FPS            = 40                      /* cap to 30 fps — halves CPU vs 60 fps */
const FRAME_INTERVAL_MS     = 1000 / TARGET_FPS

/* ── Influence zone ──────────────────────────────────────────────────────── */
const INFLUENCE_RADIUS      = 220
const INFLUENCE_RADIUS_SQ   = INFLUENCE_RADIUS ** 2  /* pre-squared: skip sqrt for gate check */
const MIN_DISTANCE          = 18

/* ── Spring physics (Hooke's Law — causes ping-pong oscillation) ─────────── */
const SPRING_CONSTANT       = 0.005

/* ── Orbital physics (tangential push — causes rotation) ────────────────── */
const ORBIT_STRENGTH        = 1.8

/* ── Damping ─────────────────────────────────────────────────────────────── */
const FRICTION              = 0.983

/* ── Speed limit ─────────────────────────────────────────────────────────── */
const MAX_SPEED             = 6.5

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

/**
 * Three visual tiers for depth:
 *   65 % small dim  → dense star-field background
 *   27 % mid-size   → main visible layer
 *    8 % large bright → focal anchor dots
 */
function createParticle(canvasWidth, canvasHeight) {
  const roll = Math.random()
  let radius, opacity

  if (roll < 0.65) {
    radius  = randomBetween(0.7, 1.4)
    opacity = randomBetween(0.30, 0.50)
  } else if (roll < 0.92) {
    radius  = randomBetween(1.4, 2.4)
    opacity = randomBetween(0.42, 0.65)
  } else {
    radius  = randomBetween(2.4, 3.6)
    opacity = randomBetween(0.60, 0.88)
  }

  /* Natural autonomous drift — stored permanently, never modified.
     When the particle leaves the cursor's influence zone, its velocity
     gradually returns to these values so it keeps moving freely. */
  const driftVelocityX = randomBetween(-0.22, 0.22)
  const driftVelocityY = randomBetween(-0.22, 0.22)

  return {
    x:              randomBetween(0, canvasWidth),
    y:              randomBetween(0, canvasHeight),
    velocityX:      driftVelocityX,
    velocityY:      driftVelocityY,
    driftVelocityX,   /* target velocity when outside influence — constant */
    driftVelocityY,
    radius,
    opacity,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }
}

/* ── Component ───────────────────────────────────────────────────────────── */
export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx        = canvas.getContext('2d')
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)

    let canvasWidth, canvasHeight, particles
    let cachedRect    = null             /* getBoundingClientRect result — updated on resize only */
    let cursorX       = null, cursorY = null
    let animationFrameId
    let lastFrameTime = 0

    /* ── Resize ──────────────────────────────────────────────────────── */
    function resizeCanvas() {
      cachedRect    = canvas.getBoundingClientRect()   /* cache here, NOT on every mousemove */
      canvasWidth   = cachedRect.width
      canvasHeight  = cachedRect.height
      canvas.width  = canvasWidth  * pixelRatio
      canvas.height = canvasHeight * pixelRatio
      ctx.scale(pixelRatio, pixelRatio)

      if (!particles) {
        particles = Array.from(
          { length: PARTICLE_COUNT },
          () => createParticle(canvasWidth, canvasHeight)
        )
      }
    }

    resizeCanvas()

    /* ── Cursor tracking ─────────────────────────────────────────────── */
    /* Uses the cached rect — zero layout reflows on mousemove            */
    function onMouseMove(event) {
      if (!cachedRect) return
      const relativeX = event.clientX - cachedRect.left
      const relativeY = event.clientY - cachedRect.top

      const insideHero = relativeX >= 0 && relativeX <= canvasWidth
                      && relativeY >= 0 && relativeY <= canvasHeight
      if (insideHero) {
        cursorX = relativeX
        cursorY = relativeY
      } else {
        cursorX = null
        cursorY = null
      }
    }

    function onPointerLeaveWindow() {
      cursorX = null
      cursorY = null
    }

    window.addEventListener('mousemove',    onMouseMove,          { passive: true })
    document.addEventListener('mouseleave', onPointerLeaveWindow, { passive: true })
    window.addEventListener('resize',       resizeCanvas,         { passive: true })

    /* ── Main draw loop (throttled to TARGET_FPS) ───────────────────── */
    function drawFrame(timestamp) {
      animationFrameId = requestAnimationFrame(drawFrame)

      /* Skip this frame if not enough time has elapsed — 30 fps cap */
      if (timestamp - lastFrameTime < FRAME_INTERVAL_MS) return
      lastFrameTime = timestamp

      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      for (const particle of particles) {

        /* ── Physics: two modes depending on cursor proximity ───────── */
        let insideInfluence = false

        if (cursorX !== null) {
          const toCursorX  = cursorX - particle.x
          const toCursorY  = cursorY - particle.y
          const distanceSq = toCursorX ** 2 + toCursorY ** 2   /* squared — no sqrt needed for gate */

          if (distanceSq < INFLUENCE_RADIUS_SQ && distanceSq > 0) {
            const distance = Math.sqrt(distanceSq)              /* sqrt only for particles inside zone */
            insideInfluence = true

            const inwardX = toCursorX / distance   /* toward cursor          */
            const inwardY = toCursorY / distance
            const tangentX = -inwardY               /* 90° clockwise → orbit */
            const tangentY =  inwardX

            const effectiveDistance = Math.max(distance, MIN_DISTANCE)

            /* Spring force (Hooke's Law): F = k × d
               Weak at centre → overshoot. Strong at edge → fast pull-in.
               This is what creates the ping-pong oscillation.            */
            const springForce = SPRING_CONSTANT * distance

            /* Orbital force: F = ORBIT_STRENGTH / √d
               Rotates the particle clockwise around the cursor.          */
            const orbitForce = ORBIT_STRENGTH / Math.sqrt(effectiveDistance)

            particle.velocityX += inwardX * springForce + tangentX * orbitForce
            particle.velocityY += inwardY * springForce + tangentY * orbitForce

            /* Friction only inside influence — damps the oscillation     */
            particle.velocityX *= FRICTION
            particle.velocityY *= FRICTION

            /* Speed cap — prevents runaway acceleration                   */
            const speed = Math.sqrt(particle.velocityX ** 2 + particle.velocityY ** 2)
            if (speed > MAX_SPEED) {
              particle.velocityX = (particle.velocityX / speed) * MAX_SPEED
              particle.velocityY = (particle.velocityY / speed) * MAX_SPEED
            }
          }
        }

        if (!insideInfluence) {
          /* Outside cursor influence: smoothly recover toward the particle's
             natural drift velocity so it always moves freely across the canvas.
             The 0.03 lerp factor means ~50 frames to recover 80 % of drift. */
          particle.velocityX += (particle.driftVelocityX - particle.velocityX) * 0.03
          particle.velocityY += (particle.driftVelocityY - particle.velocityY) * 0.03
        }

        /* ── Move ────────────────────────────────────────────────── */
        particle.x += particle.velocityX
        particle.y += particle.velocityY

        /* ── Edge wrap ───────────────────────────────────────────── */
        if (particle.x < -10)               particle.x = canvasWidth  + 10
        if (particle.x > canvasWidth  + 10) particle.x = -10
        if (particle.y < -10)               particle.y = canvasHeight + 10
        if (particle.y > canvasHeight + 10) particle.y = -10

        /* ── Draw ────────────────────────────────────────────────── */
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle   = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()
      }

      ctx.globalAlpha = 1
    }

    animationFrameId = requestAnimationFrame(drawFrame)

    /* ── Cleanup on unmount ──────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove',    onMouseMove)
      document.removeEventListener('mouseleave', onPointerLeaveWindow)
      window.removeEventListener('resize',       resizeCanvas)
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
