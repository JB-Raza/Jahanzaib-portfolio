import { useState, useRef, memo } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionContainer from '../layout/SectionContainer'
import SectionTitle from '../ui/SectionTitle'
import { portfolioData } from '../../data/portfolioData'
import { fadeUp, fadeIn, stagger, viewport } from '../../utils/motion'

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Mobile', 'Database', 'Tools']

const LEVEL_STYLE = {
  Expert:       'text-aurora',
  Advanced:     'text-accent',
  Intermediate: 'text-slate-400',
  Beginner:     'text-slate-500',
}

const CIRCUMFERENCE = 2 * Math.PI * 26

/* ── Animated circular ring card ─────────────────────────────────────────── */
/**
 * React.memo prevents re-renders when the parent (SkillsSection) re-renders
 * for reasons unrelated to this card's props (e.g. unrelated state changes).
 * Skill cards are stable within a category selection, so this is a solid win.
 */
const SkillCard = memo(function SkillCard({ skill, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const gradId = `sg-${skill.name.replace(/[^a-zA-Z0-9]/g, '')}`
  const target = CIRCUMFERENCE * (1 - skill.percentage / 100)

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      /* Keyboard users can focus the card and get the same emphasis */
      tabIndex={0}
      role="listitem"
      aria-label={`${skill.name}: ${skill.percentage}% – ${skill.levelLabel}`}
      className="bg-panel border border-rim rounded-2xl p-5 text-center transition-colors duration-300 hover:border-accent/40 focus:border-accent/60 hover:bg-panel-hi hover:shadow-lg hover:shadow-accent/5 focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-default"
    >
      {/* SVG ring */}
      <div className="relative w-16 h-16 mx-auto mb-3">
        <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90" aria-hidden="true">
          {/* Track */}
          <circle cx="32" cy="32" r="26" fill="none" stroke="#1e2a40" strokeWidth="5" />

          {/* Animated progress arc */}
          <motion.circle
            cx="32" cy="32" r="26"
            fill="none"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            animate={{ strokeDashoffset: inView ? target : CIRCUMFERENCE }}
            transition={{
              duration: 1.4,
              ease:     'easeOut',
              delay:    (index % 5) * 0.07 + 0.2,
            }}
            stroke={`url(#${gradId})`}
          />

          {/* Hover glow ring */}
          <motion.circle
            cx="32" cy="32" r="26"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={target}
            stroke={`url(#${gradId})`}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.15 }}
            transition={{ duration: 0.25 }}
          />

          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#818cf8" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>

        {/* Centre percentage — hidden from AT (announced via aria-label on parent) */}
        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center font-display font-bold text-sm text-slate-100">
          {skill.percentage}%
        </span>
      </div>

      <p className="text-slate-100 font-semibold text-sm leading-tight mb-1">
        {skill.name}
      </p>
      <p className={`text-xs font-medium ${LEVEL_STYLE[skill.levelLabel] ?? 'text-slate-400'}`}>
        {skill.levelLabel}
      </p>
    </motion.div>
  )
})

/* ── Main section ──────────────────────────────────────────────────────────── */
const PANEL_ID = 'skill-grid-panel'

export default function SkillsSection() {
  const { skills } = portfolioData
  const [active, setActive] = useState('All')

  const filtered =
    active === 'All' ? skills : skills.filter(s => s.category === active)

  return (
    <SectionContainer id="skills" className="section-fade-top">

      {/* Title */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
      >
        <SectionTitle
          label="What I work with"
          title="Skills & Expertise"
          subtitle="A full-stack capability map — from pixel-perfect frontends to scalable server architectures."
        />
      </motion.div>

      {/* Category tabs — horizontal scroll on mobile */}
      <motion.div
        className="flex gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar"
        role="tablist"
        aria-label="Filter skills by category"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeIn}
      >
        {CATEGORIES.map(cat => (
          <motion.button
            key={cat}
            role="tab"
            id={`skill-tab-${cat}`}
            aria-selected={active === cat}
            aria-controls={PANEL_ID}
            onClick={() => setActive(cat)}
            className={[
              'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer',
              'focus:outline-none focus:ring-2 focus:ring-accent/50',
              active === cat
                ? 'bg-accent text-white shadow-lg shadow-accent/25'
                : 'bg-panel border border-rim text-slate-400 hover:border-accent/40 hover:text-slate-200',
            ].join(' ')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      {/* Skill grid — staggered */}
      <motion.div
        id={PANEL_ID}
        role="list"
        aria-label={`${active} skills`}
        aria-labelledby={`skill-tab-${active}`}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger(0.06, 0.05)}
        key={active}
      >
        {filtered.map((skill, idx) => (
          <SkillCard key={skill.name} skill={skill} index={idx} />
        ))}
      </motion.div>
    </SectionContainer>
  )
}
