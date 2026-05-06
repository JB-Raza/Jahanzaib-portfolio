import { motion } from 'framer-motion'
import { MapPin, CheckCircle } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons'
import SectionContainer from '../layout/SectionContainer'
import SectionTitle from '../ui/SectionTitle'
import { portfolioData } from '../../data/portfolioData'
import { fadeUp, fadeLeft, fadeRight, scaleUp, stagger, viewport } from '../../utils/motion'

export default function AboutSection() {
  const { personal, contact } = portfolioData

  const stats = [
    { value: `${personal.yearsOfExperience}+`, label: 'Years Exp.'  },
    { value: `${personal.projectsDelivered}+`, label: 'Projects'     },
    { value: `${personal.techStacks}+`,        label: 'Tech Stacks'  },
  ]

  const socials = [
    contact.github   && { href: contact.github,   Icon: GithubIcon,   label: 'GitHub'   },
    contact.linkedin && { href: contact.linkedin, Icon: LinkedinIcon, label: 'LinkedIn' },
  ].filter(Boolean)

  return (
    <SectionContainer id="about" alternate className="section-fade-top">

      {/* Section title */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
      >
        <SectionTitle
          label="Who I am"
          title="About Me"
          subtitle="A brief look at my background, technical strengths, and what drives me as an engineer."
        />
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-10 lg:gap-16 items-start">

        {/* ── Left — Profile card ──────────────────────────────────── */}
        <motion.div
          className="lg:col-span-1 flex flex-col items-center lg:items-start gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeLeft}
        >
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="gradient-border rounded-2xl p-0.5 glow-card">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden bg-panel flex items-center justify-center">
                {personal.avatar && personal.avatar !== '@/assets/avatar.png' ? (
                  <img
                    src={personal.avatar}
                    alt={personal.fullName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-accent/10 to-aurora/10">
                    <span className="font-display font-extrabold text-6xl gradient-text select-none">
                      {personal.name.charAt(0)}
                    </span>
                    <span className="text-slate-600 text-xs mt-2 text-center px-4">
                      Add avatar.jpg to public/images/
                    </span>
                  </div>
                )}
              </div>
            </div>
            {/* Floating location badge */}
            <div className="absolute -bottom-3 -right-3 bg-panel border border-rim rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs text-slate-400 shadow-lg">
              <MapPin size={11} className="text-aurora flex-shrink-0" />
              {personal.location}
            </div>
          </div>

          {/* Social icons */}
          {socials.length > 0 && (
            <div className="flex items-center gap-3">
              {socials.map(({ href, Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-panel border border-rim flex items-center justify-center text-slate-500 hover:text-slate-100 hover:border-accent/40 hover:bg-panel-hi transition-all duration-200"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
          )}

          {/* Role + availability */}
          <div className="text-center lg:text-left">
            <p className="font-display font-semibold text-slate-100 text-sm">{personal.role}</p>
            <p className="flex items-center gap-1.5 text-xs text-aurora mt-1 justify-center lg:justify-start">
              <span className="w-1.5 h-1.5 rounded-full bg-aurora" />
              Open to opportunities
            </p>
          </div>
        </motion.div>

        {/* ── Right — Bio + stats + highlights ────────────────────── */}
        <motion.div
          className="lg:col-span-2 space-y-7"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeRight}
        >
          {/* Bio paragraphs */}
          <div className="space-y-4">
            <p className="text-slate-300 text-base leading-relaxed">{personal.bio}</p>
            <p className="text-slate-400 leading-relaxed">{personal.bioExtended}</p>
          </div>

          {/* Stats strip */}
          <motion.div
            className="grid grid-cols-3 gap-3"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {stats.map(({ value, label }) => (
              <motion.div
                key={label}
                variants={scaleUp}
                className="bg-panel border border-rim rounded-2xl p-4 md:p-5 text-center hover:border-accent/30 transition-colors duration-300"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <p className="font-display text-2xl md:text-3xl font-bold gradient-text">{value}</p>
                <p className="text-slate-500 text-xs mt-1.5 leading-tight">{label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Core highlights */}
          <div className="bg-panel border border-rim rounded-2xl p-6">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-[0.15em] mb-5">
              Core Strengths
            </p>
            <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-4">
              {personal.highlights.map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle size={14} className="text-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  )
}
