/**
 * HeroCanvas — desktop-only Three.js scene.
 *
 * Layers:
 *  1. Nebula   — ~300 particles distributed on a sphere shell, vertex-coloured
 *                accent → aurora, respond to mouse via subtle rotation.
 *  2. Wireframe — dual icosahedra (outer accent, inner aurora) wrapped in
 *                Drei <Float> so they gently bob and rotate indefinitely.
 *
 * The canvas has alpha: true so the CSS orbs / dot-grid beneath show through.
 * On touch / narrow screens the component returns null to save resources.
 */
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

const ACCENT = new THREE.Color('#818cf8')
const AURORA  = new THREE.Color('#22d3ee')

/* ── Particle nebula ─────────────────────────────────────────────────────── */
function Nebula({ count = 300 }) {
  const ref = useRef()

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const c   = new THREE.Color()

    for (let i = 0; i < count; i++) {
      /* Sphere-shell distribution: radius 2.2 – 5 */
      const r     = 2.2 + Math.random() * 2.8
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      /* Gradient tint: random lerp between accent and aurora */
      c.lerpColors(ACCENT, AURORA, Math.random())
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }

    return [pos, col]
  }, [count])

  useFrame(({ clock, mouse }) => {
    if (!ref.current) return
    /* Slow auto-rotation + subtle mouse parallax */
    ref.current.rotation.y = clock.elapsedTime * 0.04  + mouse.x * 0.12
    ref.current.rotation.x = clock.elapsedTime * 0.025 + mouse.y * 0.07
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors,    3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.016}
        vertexColors
        transparent
        opacity={0.72}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* ── Floating dual wireframe icosahedra ──────────────────────────────────── */
function WireframeCore() {
  return (
    <Float speed={1.6} rotationIntensity={0.45} floatIntensity={0.6}>
      <group>
        {/* Outer — accent */}
        <mesh>
          <icosahedronGeometry args={[0.92, 1]} />
          <meshBasicMaterial
            color="#818cf8"
            wireframe
            transparent
            opacity={0.11}
          />
        </mesh>

        {/* Inner — aurora, counter-rotated at rest */}
        <mesh rotation={[0.6, 0.8, 0.2]}>
          <icosahedronGeometry args={[0.55, 0]} />
          <meshBasicMaterial
            color="#22d3ee"
            wireframe
            transparent
            opacity={0.17}
          />
        </mesh>
      </group>
    </Float>
  )
}

/* ── Canvas wrapper ─────────────────────────────────────────────────────── */
export default function HeroCanvas() {
  if (
    typeof window !== 'undefined' &&
    (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768)
  ) {
    return null
  }

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Nebula count={300} />
        <WireframeCore />
      </Canvas>
    </div>
  )
}
