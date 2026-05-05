import { memo } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Star } from 'lucide-react'
import { GithubIcon } from '../ui/SocialIcons'
import SectionContainer from '../layout/SectionContainer'
import SectionTitle from '../ui/SectionTitle'
import Tag from '../ui/Tag'
import Button from '../ui/Button'
import useTilt from '../../hooks/useTilt'
import { portfolioData } from '../../data/portfolioData'
import { fadeUp, scaleUp, stagger, viewport } from '../../utils/motion'

const FeaturedCard = memo(function FeaturedCard({ project }) {
  const tilt = useTilt(8)

  return (
    <motion.article
      variants={fadeUp}
      style={tilt.style}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="bg-panel border border-rim rounded-2xl p-6 md:p-8 flex flex-col h-full hover:border-accent/35 hover:shadow-xl hover:shadow-accent/5 transition-colors duration-300 glow-card"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="min-w-0">
          <span className="text-xs font-semibold text-aurora uppercase tracking-widest">
            {project.type}
          </span>
          <h3 className="font-display font-bold text-lg md:text-xl text-slate-100 mt-1 leading-tight">
            {project.title}
          </h3>
          <p className="text-accent text-sm font-medium mt-0.5">{project.role}</p>
        </div>
        <div className="flex items-center gap-1 bg-accent/10 border border-accent/20 text-accent text-xs px-2.5 py-1 rounded-full flex-shrink-0">
          <Star size={11} />
          Featured
        </div>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed mb-5">{project.summary}</p>

      <ul className="space-y-2 mb-6 flex-1">
        {project.impactPoints.map((point, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-aurora mt-2 flex-shrink-0" />
            {point}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.stack.map(tech => <Tag key={tech}>{tech}</Tag>)}
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-auto">
        {project.liveUrl && (
          <Button href={project.liveUrl} variant="primary" size="sm" target="_blank" rel="noopener noreferrer">
            <ExternalLink size={13} /> Live Demo
          </Button>
        )}
        {project.repoUrl && (
          <Button href={project.repoUrl} variant="secondary" size="sm" target="_blank" rel="noopener noreferrer">
            <GithubIcon size={13} /> GitHub
          </Button>
        )}
      </div>
    </motion.article>
  )
})

const CompactCard = memo(function CompactCard({ project }) {
  return (
    <motion.article
      variants={scaleUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-panel border border-rim rounded-2xl p-5 flex flex-col hover:border-accent/35 hover:bg-panel-hi hover:shadow-lg hover:shadow-accent/5 transition-colors duration-300"
    >
      <span className="text-xs text-aurora uppercase tracking-widest font-semibold">{project.type}</span>
      <h3 className="font-display font-semibold text-slate-100 text-base mt-1 mb-2 leading-tight">
        {project.title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{project.summary}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.stack.map(tech => <Tag key={tech} variant="muted">{tech}</Tag>)}
      </div>
      <div className="flex items-center gap-3">
        {project.liveUrl && (
          <Button href={project.liveUrl} variant="ghost" size="sm" target="_blank" rel="noopener noreferrer">
            <ExternalLink size={12} /> Demo
          </Button>
        )}
        {project.repoUrl && (
          <Button href={project.repoUrl} variant="ghost" size="sm" target="_blank" rel="noopener noreferrer">
            <GithubIcon size={12} /> Code
          </Button>
        )}
      </div>
    </motion.article>
  )
})

export default function ProjectsSection() {
  const { projects } = portfolioData
  const featured = projects.filter(p => p.featured)
  const rest     = projects.filter(p => !p.featured)

  return (
    <SectionContainer id="projects" className="section-fade-top">

      {/* Title */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
      >
        <SectionTitle
          label="What I've built"
          title="Projects"
          subtitle="A selection of projects that demonstrate my range, depth, and real-world impact."
        />
      </motion.div>

      {/* Featured grid — stagger */}
      {featured.length > 0 && (
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger(0.12, 0.05)}
        >
          {featured.map((project, idx) => (
            <FeaturedCard key={idx} project={project} />
          ))}
        </motion.div>
      )}

      {/* Compact grid — stagger */}
      {rest.length > 0 && (
        <>
          <motion.p
            className="text-slate-500 text-xs font-semibold uppercase tracking-[0.15em] mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
          >
            Other Projects
          </motion.p>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger(0.08, 0.05)}
          >
            {rest.map((project, idx) => (
              <CompactCard key={idx} project={project} />
            ))}
          </motion.div>
        </>
      )}
    </SectionContainer>
  )
}
