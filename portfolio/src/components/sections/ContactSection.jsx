import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons'
import SectionContainer from '../layout/SectionContainer'
import SectionTitle from '../ui/SectionTitle'
import Button from '../ui/Button'
import { portfolioData } from '../../data/portfolioData'
import { fadeUp, fadeLeft, fadeRight, viewport } from '../../utils/motion'

const INPUT_CLS =
  'w-full bg-base border border-rim rounded-xl px-4 py-3 text-slate-100 text-sm ' +
  'placeholder:text-slate-600 focus:outline-none focus:border-accent/60 focus:bg-base-alt ' +
  'transition-colors duration-200 min-h-[44px]'

export default function ContactSection() {
  const { contact, personal } = portfolioData

  const [form,   setForm]   = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')

  const mailHref = `mailto:${contact.email}?subject=Portfolio%20Inquiry%20-%20${encodeURIComponent(personal.name)}`

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res  = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify({
          access_key: contact.web3formsKey,
          from_name:  form.name,
          email:      form.email,
          subject:    form.subject,
          message:    form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const socials = [
    contact.github   && { href: contact.github,   Icon: GithubIcon,   label: 'GitHub'   },
    contact.linkedin && { href: contact.linkedin, Icon: LinkedinIcon, label: 'LinkedIn' },
  ].filter(Boolean)

  return (
    <SectionContainer id="contact" alternate className="section-fade-top">

      {/* Title */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
      >
        <SectionTitle
          label="Get in touch"
          title="Let's Work Together"
          subtitle="Have a project in mind or want to explore opportunities? I'd love to hear from you."
        />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

        {/* ── Left — Info ─────────────────────────────────────────────── */}
        <motion.div
          className="space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeLeft}
        >
          <p className="text-slate-300 text-base leading-relaxed">
            Whether you have a project, an open role, or just want to connect — feel free to reach out. I typically respond within 24–48 hours.
          </p>

          {/* Email CTA */}
          <div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-[0.15em] mb-3">
              Prefer email?
            </p>
            <Button href={mailHref} size="md">
              <Mail size={16} />
              {contact.email}
            </Button>
          </div>

          {/* Social links */}
          {socials.length > 0 && (
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-[0.15em] mb-4">
                Also find me on
              </p>
              <div className="flex flex-col gap-3">
                {socials.map(({ href, Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-400 hover:text-slate-100 transition-colors duration-200 w-fit group"
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-panel border border-rim flex items-center justify-center group-hover:border-accent/40 group-hover:bg-panel-hi transition-all duration-200 flex-shrink-0">
                      <Icon size={16} />
                    </div>
                    <span className="text-sm font-medium">{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Right — Contact form ─────────────────────────────────────── */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-panel border border-rim rounded-2xl p-6 md:p-8 space-y-5 glow-card"
          noValidate
          aria-label="Contact form"
          aria-busy={status === 'loading'}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeRight}
        >
          {/* Name + Email */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="cf-name" className="block text-slate-400 text-sm font-medium mb-2">Name</label>
              <input
                id="cf-name" name="name" type="text" required
                value={form.name} onChange={handleChange}
                placeholder="Your name" className={INPUT_CLS}
              />
            </div>
            <div>
              <label htmlFor="cf-email" className="block text-slate-400 text-sm font-medium mb-2">Email</label>
              <input
                id="cf-email" name="email" type="email" required
                value={form.email} onChange={handleChange}
                placeholder="your@email.com" className={INPUT_CLS}
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="cf-subject" className="block text-slate-400 text-sm font-medium mb-2">Subject</label>
            <input
              id="cf-subject" name="subject" type="text" required
              value={form.subject} onChange={handleChange}
              placeholder="What's this about?" className={INPUT_CLS}
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="cf-message" className="block text-slate-400 text-sm font-medium mb-2">Message</label>
            <textarea
              id="cf-message" name="message" required rows={5}
              value={form.message} onChange={handleChange}
              placeholder="Tell me about your project or inquiry…"
              className={`${INPUT_CLS} resize-none`}
            />
          </div>

          {/* Status feedback — role="alert" makes screen readers announce immediately */}
          {status === 'success' && (
            <motion.div
              role="alert"
              aria-live="polite"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 text-sm text-aurora bg-aurora/10 border border-aurora/20 rounded-xl px-4 py-3"
            >
              <CheckCircle size={16} className="flex-shrink-0" aria-hidden="true" />
              Message sent! I'll get back to you soon.
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div
              role="alert"
              aria-live="assertive"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3"
            >
              <AlertCircle size={16} className="flex-shrink-0" aria-hidden="true" />
              Something went wrong. Please try emailing me directly.
            </motion.div>
          )}

          {/* Submit */}
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              type="submit"
              size="md"
              className="w-full"
              disabled={status === 'loading'}
              aria-disabled={status === 'loading'}
              aria-label={status === 'loading' ? 'Sending message, please wait' : 'Send message'}
            >
              {status === 'loading' ? (
                <>
                  <span aria-hidden="true" className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send size={15} aria-hidden="true" />
                  Send Message
                </>
              )}
            </Button>
          </motion.div>

          {!contact.web3formsKey && (
            <p className="text-slate-600 text-xs text-center">
              Add your Web3Forms key to{' '}
              <code className="text-slate-500">portfolioData.contact.web3formsKey</code>
              {' '}to enable form submissions.
            </p>
          )}
        </motion.form>
      </div>
    </SectionContainer>
  )
}
