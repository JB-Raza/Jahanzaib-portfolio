import { MotionConfig } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'

import Navbar            from './components/layout/Navbar'
import Footer            from './components/layout/Footer'
import HeroSection       from './components/sections/HeroSection'
import AboutSection      from './components/sections/AboutSection'
import SkillsSection     from './components/sections/SkillsSection'
import ExperienceSection from './components/sections/ExperienceSection'
import ProjectsSection   from './components/sections/ProjectsSection'
import ContactSection    from './components/sections/ContactSection'
import CursorFollower    from './components/ui/CursorFollower'

/**
 * Hidden anchor visible only on keyboard focus — lets screen-reader /
 * keyboard-only users skip the navbar and jump straight to content.
 */
function SkipLink() {
  return (
    <a
      href="#main-content"
      className={[
        'fixed top-4 left-4 z-[99999]',
        'bg-accent text-white text-sm font-semibold',
        'px-5 py-2.5 rounded-xl shadow-lg',
        /* hidden until focused — translate off-screen, then snap in */
        '-translate-y-20 focus:translate-y-0',
        'transition-transform duration-200 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-white/60',
      ].join(' ')}
    >
      Skip to main content
    </a>
  )
}

export default function App() {
  return (
    /*
     * MotionConfig reducedMotion="user":
     *   Framer Motion reads window.matchMedia('(prefers-reduced-motion: reduce)').
     *   When the OS setting is ON, FM automatically sets all transition
     *   durations to ~0 and skips entrance animations across the entire tree.
     *   No per-component opt-in required.
     */
    <MotionConfig reducedMotion="user">
      <SkipLink />

      {/* Custom cursor — renders nothing on touch/coarse-pointer devices */}
      <CursorFollower />

      <Navbar />

      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Vercel Analytics — zero-config visitor tracking, no cookies */}
      <Analytics />
    </MotionConfig>
  )
}
