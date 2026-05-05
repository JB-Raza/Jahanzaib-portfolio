import { motion } from 'framer-motion'
import { Briefcase, MapPin, Calendar, CheckCircle2 } from 'lucide-react'
import SectionContainer from '../layout/SectionContainer'
import SectionTitle from '../ui/SectionTitle'
import Tag from '../ui/Tag'
import { portfolioData } from '../../data/portfolioData'
import { fadeUp, fadeLeft, stagger, viewport } from '../../utils/motion'

export default function ExperienceSection() {
  const { experience } = portfolioData

  return (
    <SectionContainer id="experience" alternate className="section-fade-top">

      {/* Title */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
      >
        <SectionTitle
          label="My journey"
          title="Work Experience"
          subtitle="My professional timeline and the impact I've delivered along the way."
        />
      </motion.div>

      {/* Timeline */}
      <motion.div
        className="relative space-y-6"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger(0.15, 0.1)}
      >
        {/* Vertical connector line — desktop */}
        <div
          className="absolute left-[2.35rem] top-10 bottom-10 w-px hidden md:block pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'linear-gradient(to bottom, #818cf8 0%, #22d3ee 60%, transparent 100%)',
            opacity: 0.2,
          }}
        />

        {experience.map((exp, idx) => (
          <motion.article
            key={idx}
            variants={fadeLeft}
            className="relative md:pl-20"
          >
            {/* Timeline dot — desktop */}
            <div
              className="absolute left-[1.75rem] top-8 w-5 h-5 rounded-full border-2 border-accent bg-base-alt hidden md:flex items-center justify-center z-10"
              aria-hidden="true"
            >
              <div className="w-2 h-2 rounded-full bg-accent" />
            </div>

            {/* Card */}
            <motion.div
              className="bg-panel border border-rim rounded-2xl p-6 md:p-8 hover:border-accent/30 transition-colors duration-300 glow-card"
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <Briefcase size={17} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-slate-100 text-lg leading-tight">
                      {exp.role}
                    </h3>
                    <p className="text-accent text-sm font-semibold mt-0.5">{exp.company}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1 bg-base border border-rim rounded-lg px-2 py-1">
                    <Calendar size={11} />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1 bg-base border border-rim rounded-lg px-2 py-1">
                    <MapPin size={11} />
                    {exp.location}
                  </span>
                  <span className="bg-aurora/10 text-aurora border border-aurora/20 px-2 py-1 rounded-lg">
                    {exp.type}
                  </span>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-5">{exp.summary}</p>

              <ul className="space-y-2.5 mb-6">
                {exp.achievements.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 size={15} className="text-accent mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.stack.map(tech => <Tag key={tech}>{tech}</Tag>)}
              </div>
            </motion.div>
          </motion.article>
        ))}
      </motion.div>
    </SectionContainer>
  )
}
