import { useState, useEffect } from 'react'
import { Menu, X, Download } from 'lucide-react'
import { portfolioData } from '../../data/portfolioData'
import Button from '../ui/Button'
import ScrollProgress from '../ui/ScrollProgress'

const NAV_LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Contact',    href: '#contact'    },
]

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('')

  const { personal } = portfolioData

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)

      const sections = NAV_LINKS.map(l => l.href.slice(1))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setIsOpen(false)

  return (
    <nav
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-base/85 backdrop-blur-xl border-b border-rim/60 shadow-xl shadow-black/30'
          : 'bg-transparent',
      ].join(' ')}
      aria-label="Main navigation"
    >
      {/* ── Scroll progress bar ────────────────────────────────────── */}
      <ScrollProgress />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo / Name */}
          <a
            href="#hero"
            className="font-display font-bold text-xl text-slate-100 hover:text-accent transition-colors duration-200 flex-shrink-0"
            aria-label="Home"
          >
            {personal.name}
            <span className="text-accent">.</span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(link => {
              const isActive = active === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={[
                    'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'text-accent'
                      : 'text-slate-400 hover:text-slate-100',
                  ].join(' ')}
                >
                  {link.label}
                  {/* Active underline dot */}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                  )}
                </a>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block flex-shrink-0">
            <Button
              href={personal.cvUrl}
              size="sm"
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={14} />
              Download CV
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(o => !o)}
            className="md:hidden p-2 text-slate-400 hover:text-slate-100 transition-colors rounded-lg hover:bg-panel min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ──────────────────────────────────────────── */}
      <div
        className={[
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <div className="bg-base-alt/95 backdrop-blur-xl border-b border-rim">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-4 space-y-1">
            {NAV_LINKS.map(link => {
              const isActive = active === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={isActive ? 'true' : undefined}
                  className={[
                    'flex items-center py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 min-h-[44px]',
                    isActive
                      ? 'text-accent bg-accent/8 border border-accent/15'
                      : 'text-slate-300 hover:text-slate-100 hover:bg-panel',
                  ].join(' ')}
                >
                  {link.label}
                </a>
              )
            })}
            <div className="pt-3 pb-1 px-4">
              <Button
                href={personal.cvUrl}
                size="sm"
                variant="primary"
                className="w-full min-h-[44px]"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                <Download size={14} />
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
