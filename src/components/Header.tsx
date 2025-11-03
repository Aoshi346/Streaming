import { forwardRef, useCallback, useState, useEffect } from 'react'
import type React from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Logo from './Logo'
import Button from './Button'
import ThemeToggleButton from './ThemeToggleButton'

gsap.registerPlugin(ScrollToPlugin)

const links = [
  { href: '#features', label: 'Características' },
  { href: '#devices', label: 'Dispositivos' },
  { href: '#pricing', label: 'Precios' },
  { href: '#faq', label: 'Preguntas Frecuentes' },
]

gsap.registerPlugin(ScrollToPlugin)

const Header = forwardRef<HTMLElement>((_, ref) => {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // Lock body scroll when mobile menu is open
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const onLinkEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { y: -2, scale: 1.04, duration: 0.2, ease: 'power3.out' })
  }, [])

  const onLinkLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.2, ease: 'power3.out' })
  }, [])

  const onNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href')
    if (href && href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href) as HTMLElement | null
      if (target) {
        gsap.to(window, {
          duration: 0.8,
          ease: 'power2.out',
          scrollTo: { y: target, offsetY: 72 },
        })
      }
    }
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <header ref={ref} className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur">
      <div className="container-wrapper relative grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6">
        <Logo className="relative overflow-visible flex items-center rounded focus:outline-none focus-visible:ring focus-visible:ring-brand-light/60" />
        <nav role="navigation" aria-label="Principal" className="hidden md:flex justify-center items-center gap-6 text-sm font-medium text-text-secondary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={onLinkEnter}
              onMouseLeave={onLinkLeave}
              onClick={(e) => {
                onNavClick(e)
                closeMenu()
              }}
              className="group relative px-0.5 pb-1 transition-colors duration-200 hover:text-text-primary will-change-transform"
            >
              {link.label}
              <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-brand-light/80 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
  <div className="flex items-center justify-end gap-2 sm:gap-3">
          <Button
            onClick={() => console.log('click')}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-button-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-theme-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-theme-strong focus:outline-none focus-visible:ring focus-visible:ring-brand-light/60"
          >
            Comenzar
          </Button>
          <ThemeToggleButton />
          <Button
            onClick={() => setMenuOpen((s) => !s)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex items-center justify-center rounded-md p-2 md:hidden bg-white/5 text-text-secondary shadow-theme-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 focus:outline-none focus-visible:ring focus-visible:ring-brand-light/40"
          >
            <span className="sr-only">{menuOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
            <div className="h-5 w-5">
              <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <g className={`transition-transform duration-300 ease-out ${menuOpen ? 'rotate-45' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12" />
                </g>
                <g className={`transition-transform duration-300 ease-out ${menuOpen ? '-rotate-45' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12" />
                </g>
                <g className={`transition-opacity duration-300 ease-out ${menuOpen ? 'opacity-0' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 18h16" />
                </g>
              </svg>
            </div>
          </Button>
        </div>
        {/* Mobile overlay */}
        <div
          className={`md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setMenuOpen(false)}
        />
        {/* Mobile menu panel */}
        <div
          id="mobile-menu"
          className={`md:hidden absolute left-0 right-0 top-full z-50 mt-2 px-4 pb-4 transition-all duration-200 ease-out ${menuOpen ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-2'}`}
        >
          <div className="rounded-2xl border border-white/10 bg-black/80 p-4 shadow-xl backdrop-blur">
            <div className="flex flex-col items-stretch gap-1 text-base font-medium text-text-secondary">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    onNavClick(e)
                    closeMenu()
                  }}
                  className="flex items-center rounded-xl px-3 py-2 transition-colors duration-200 hover:bg-white/10 hover:text-text-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <Button
              onClick={() => {
                console.log('click')
                closeMenu()
              }}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-button-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-theme-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-theme-strong focus:outline-none focus-visible:ring focus-visible:ring-brand-light/60"
            >
              Comenzar
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
})

Header.displayName = 'Header'

export default Header
