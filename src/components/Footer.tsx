import { forwardRef, useCallback } from 'react'
import type React from 'react'
import { gsap } from 'gsap'

const Footer = forwardRef<HTMLElement>((_, ref) => {
  const onLinkEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { y: -2, scale: 1.04, duration: 0.2, ease: 'power3.out' })
  }, [])
  const onLinkLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.2, ease: 'power3.out' })
  }, [])
  return (
    <footer ref={ref} className="mt-20 border-t border-border-subtle py-10 text-sm text-text-muted">
      <div className="container-wrapper">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-text-secondary">&copy; {new Date().getFullYear()} FullVision. Todos los derechos reservados.</p>
          <nav className="flex flex-wrap items-center gap-4">
            <a onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave} className="group relative px-0.5 pb-1 text-text-secondary transition-colors duration-200 hover:text-text-primary" href="#">
              Privacidad
              <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-[1px] origin-left scale-x-0 bg-brand-light/80 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
            <a onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave} className="group relative px-0.5 pb-1 text-text-secondary transition-colors duration-200 hover:text-text-primary" href="#">
              Términos
              <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-[1px] origin-left scale-x-0 bg-brand-light/80 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
            <a onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave} className="group relative px-0.5 pb-1 text-text-secondary transition-colors duration-200 hover:text-text-primary" href="#">
              Centro de Ayuda
              <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-[1px] origin-left scale-x-0 bg-brand-light/80 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'

export default Footer
