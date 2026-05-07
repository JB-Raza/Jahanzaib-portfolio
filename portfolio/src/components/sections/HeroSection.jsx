import { motion } from 'framer-motion'
import { Download, Mail, ChevronDown, ArrowRight } from 'lucide-react'
import Button         from '../ui/Button'
import MagneticWrap   from '../ui/MagneticWrap'
import ParticleCanvas from '../ui/ParticleCanvas'
import { portfolioData } from '../../data/portfolioData'
import { fadeUp, fadeIn, stagger } from '../../utils/motion'

export default function HeroSection() {
  const { personal, contact } = portfolioData
  const mailHref = `mailto:${contact.email}?subject=Portfolio%20Inquiry%20-%20${encodeURIComponent(personal.name)}`

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-base pt-20 overflow-hidden"
    >
      {/* ── Canvas 2D particle field (replaces Three.js ~880 KB) ────── */}
      {/* Zero dependencies, ~0.3 ms/frame, works on all devices        */}
      <ParticleCanvas />

      {/* ── CSS ambient orbs ────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/4 w-[560px] h-[560px] rounded-full opacity-[0.07] animate-orb-a"
          style={{ background: 'radial-gradient(circle, #818cf8, transparent 70%)', willChange: 'transform' }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[440px] h-[440px] rounded-full opacity-[0.06] animate-orb-b"
          style={{ background: 'radial-gradient(circle, #22d3ee, transparent 70%)', animationDelay: '-5s', willChange: 'transform' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.03] animate-orb-c"
          style={{ background: 'radial-gradient(circle, #818cf8, transparent 70%)', animationDelay: '-2s', willChange: 'transform' }}
        />
      </div>

      {/* ── Dot-grid overlay ────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        aria-hidden="true"
        style={{
          backgroundImage:  'radial-gradient(circle, #818cf820 1px, transparent 1px)',
          backgroundSize:   '36px 36px',
          maskImage:        'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage:  'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* ── Main content — page-load stagger ────────────────────────── */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 text-center"
        initial="hidden"
        animate="visible"
        variants={stagger(0.14, 0.25)}
      >
        {/* Availability badge */}
        <motion.div variants={fadeUp} className="flex justify-center mb-10">
          <span className="inline-flex items-center gap-2.5 bg-panel/80 backdrop-blur-sm border border-rim rounded-full px-5 py-2 text-xs font-medium text-slate-400 animate-badge-glow">
            <span className="w-2 h-2 rounded-full bg-aurora" />
            Available for new opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="font-display font-extrabold text-fluid-2xl text-slate-50 leading-none tracking-tight mb-3"
        >
          {personal.name}
          <span className="text-accent">.</span>
        </motion.h1>

        {/* Role — shimmer gradient */}
        <motion.h2
          variants={fadeUp}
          className="font-display font-semibold text-xl sm:text-2xl md:text-3xl mb-6"
        >
          <span className="shimmer-text">{personal.specialization}</span>
        </motion.h2>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="text-slate-400 text-fluid-md max-w-xl mx-auto leading-relaxed mb-12"
        >
          {personal.tagline}
        </motion.p>

        {/* CTA buttons — each wrapped in MagneticWrap for pull effect */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <MagneticWrap>
            <Button href={mailHref} size="lg">
              <Mail size={18} />
              Email Me
            </Button>
          </MagneticWrap>

          <MagneticWrap>
            <Button
              href={personal.cvUrl}
              variant="secondary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={18} />
              Download CV
            </Button>
          </MagneticWrap>

          <MagneticWrap>
            <Button href="#projects" variant="ghost" size="lg">
              View Projects
              <ArrowRight size={16} />
            </Button>
          </MagneticWrap>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          variants={fadeIn}
          className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-0 bg-panel/50 backdrop-blur-sm border border-rim rounded-2xl px-6 py-4 sm:divide-x sm:divide-rim"
        >
          {[
            { value: `${personal.yearsOfExperience}+`, label: 'Years Experience'   },
            { value: `${personal.projectsDelivered}+`, label: 'Projects Delivered' },
            { value: `${personal.techStacks}+`,        label: 'Tech Stacks'        },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center px-6 gap-1">
              <span className="font-display font-bold text-2xl gradient-text">{value}</span>
              <span className="text-slate-500 text-xs">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ────────────────────────────────────────── */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-600 hover:text-slate-400 transition-colors duration-200"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </motion.a>
    </section>
  )
}
