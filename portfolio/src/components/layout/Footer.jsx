import { ArrowUp } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterXIcon } from '../ui/SocialIcons'
import { portfolioData } from '../../data/portfolioData'

const NAV_LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Contact',    href: '#contact'    },
]

export default function Footer() {
  const { personal, contact } = portfolioData
  const year = new Date().getFullYear()

  const socials = [
    contact.github   && { href: contact.github,   Icon: GithubIcon,   label: 'GitHub'   },
    contact.linkedin && { href: contact.linkedin, Icon: LinkedinIcon, label: 'LinkedIn' },
    contact.twitter  && { href: contact.twitter,  Icon: TwitterXIcon, label: 'Twitter'  },
  ].filter(Boolean)

  return (
    <footer className="bg-base border-t border-rim">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-14">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">

          {/* Brand */}
          <div className="text-center md:text-left">
            <a
              href="#hero"
              className="font-display font-bold text-2xl text-slate-100 hover:text-accent transition-colors duration-200"
            >
              {personal.name}
              <span className="text-accent">.</span>
            </a>
            <p className="text-slate-500 text-sm mt-1">{personal.specialization}</p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-400 hover:text-slate-100 text-sm transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social icons + back-to-top */}
          <div className="flex items-center gap-3">
            {socials.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg bg-panel border border-rim flex items-center justify-center text-slate-500 hover:text-slate-100 hover:border-accent/40 hover:bg-panel-hi transition-all duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
            <a
              href="#hero"
              aria-label="Back to top"
              className="w-9 h-9 rounded-lg bg-panel border border-rim flex items-center justify-center text-slate-500 hover:text-accent hover:border-accent/40 hover:bg-panel-hi transition-all duration-200"
            >
              <ArrowUp size={16} />
            </a>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="border-t border-rim pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-sm">
          <p>© {year} {personal.fullName}. All rights reserved.</p>
          <p>
            Crafted with <span className="text-accent">♥</span> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
