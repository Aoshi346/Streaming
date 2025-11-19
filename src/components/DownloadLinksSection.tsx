import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaAndroid, FaApple, FaWindows, FaDesktop } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

  interface DownloadPlatform {
    id: string
    label: string
    icon: React.ReactNode
    link: string
    storeName: string
  }

const downloadPlatforms: DownloadPlatform[] = [
  {
    id: 'android',
    label: 'Android',
      icon: <FaAndroid className="h-8 w-8 text-green-400" aria-hidden />,
    link: 'https://play.google.com/store/apps/details?id=com.fullvision',
    storeName: 'Google Play',
  },
  {
    id: 'ios',
    label: 'iOS',
      icon: <FaApple className="h-8 w-8 text-gray-300" aria-hidden />,
    link: 'https://apps.apple.com/app/fullvision/id123456789',
    storeName: 'App Store',
  },
  {
    id: 'macos',
    label: 'MacOS',
      icon: <FaDesktop className="h-8 w-8 text-blue-400" aria-hidden />,
    link: 'https://fullvision.com/download/macos',
    storeName: 'Descargar para Mac',
  },
  {
    id: 'windows',
    label: 'Windows',
      icon: <FaWindows className="h-8 w-8 text-blue-500" aria-hidden />,
    link: 'https://fullvision.com/download/windows',
    storeName: 'Descargar para Windows',
  },
]

const DownloadLinksSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      const targets = section.querySelectorAll('.gsap-section-title, .gsap-section-subtitle, .gsap-card, .label-char, .store-char')
      if (targets.length) {
        gsap.set(targets, { opacity: 1, y: 0 })
      }
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { immediateRender: false },
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      })

      // Title/subtitle are handled globally by SectionTitleAnimator
      // Cards come in with a slightly slower timing for a more deliberate feel
      tl.from('.gsap-card', {
          opacity: 0,
          y: 40,
          scale: 0.96,
          stagger: 0.16,
          duration: 0.7,
          ease: 'power3.out',
        }, '-=0.35')
  // Animate label characters with a gentle stagger
  .from('.gsap-card .label-char', { opacity: 0, y: 10, stagger: 0.02, duration: 0.6, ease: 'power2.out' }, '-=0.45')
        // Animate store name characters slightly after labels
        .from('.gsap-card .store-char', { opacity: 0, y: 8, stagger: 0.03, duration: 0.45, ease: 'power2.out' }, '-=0.42')
    }, section)

    return () => ctx.revert()
  }, [])

  // Hover micro-interactions: card lift + icon bounce
  React.useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const cards = Array.from(section.querySelectorAll<HTMLElement>('.gsap-card'))
    const cleanups: Array<() => void> = []

    cards.forEach((card) => {
      const icon = card.querySelector<HTMLElement>('.platform-icon')
      const labelChars = Array.from(card.querySelectorAll<HTMLElement>('.label-char'))
      const storeChars = Array.from(card.querySelectorAll<HTMLElement>('.store-char'))
      // prepare text animation timeline (paused) for hover — performs a subtle pop/bounce
      let textTl: gsap.core.Timeline | null = null
      if (labelChars.length || storeChars.length) {
        textTl = gsap.timeline({ paused: true })
        if (labelChars.length)
          textTl.to(labelChars, { y: -6, scale: 1.02, stagger: 0.02, duration: 0.22, yoyo: true, repeat: 1, ease: 'power2.out' }, 0)
        if (storeChars.length)
          textTl.to(storeChars, { y: -4, scale: 1.01, stagger: 0.025, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' }, 0.04)
      }
      const onEnter = () => {
        gsap.killTweensOf(card)
        gsap.to(card, { y: -8, scale: 1.03, duration: 0.3, ease: 'power2.out' })
        if (icon) {
          gsap.killTweensOf(icon)
          gsap.fromTo(icon, { y: -4 }, { y: 4, duration: 0.4, yoyo: true, repeat: 1, ease: 'power2.inOut' })
        }
        // play hover text animation (subtle pop) — don't hide text on leave
        if (textTl) {
          textTl.restart()
        }
      }
      const onLeave = () => {
        gsap.killTweensOf(card)
        gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' })
        if (icon) {
          gsap.killTweensOf(icon)
          gsap.to(icon, { y: 0, scale: 1, duration: 0.18, ease: 'power2.out' })
        }
        // let the hover text animation finish naturally; ensure chars remain visible
        if (textTl) {
          // fast-forward to end to ensure they settle back to original
          textTl.progress(1)
        }
      }
      card.addEventListener('mouseenter', onEnter)
      card.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        card.removeEventListener('mouseenter', onEnter)
        card.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <section id="downloads" ref={sectionRef} className="relative border-t border-border-subtle py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b] via-[#312e81] to-[#4c1d95] opacity-95 -z-20" />
      <div className="container-wrapper relative z-10">
        <h2 className="gsap-section-title text-2xl font-bold tracking-tight sm:text-3xl mb-3">Descarga la app</h2>
        <p className="gsap-section-subtitle mb-8 text-text-secondary/90">
          Obtén FullVision en tu dispositivo favorito. Elige tu plataforma y descarga la aplicación oficial.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          {downloadPlatforms.map((platform) => {
            const renderChars = (text: string, baseClass = '') =>
              text.split('').map((ch, i) => (
                <span key={i} className={`${baseClass} inline-block`} aria-hidden>
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              ))

            return (
              <a
                key={platform.id}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="gsap-card flex flex-col items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface-muted/20 px-6 py-6 shadow-theme-soft transition hover:-translate-y-1 hover:shadow-theme-strong focus:outline-none focus-visible:ring focus-visible:ring-brand-light/60"
                aria-label={`Descargar para ${platform.label} (${platform.storeName})`}
              >
                <span className="platform-icon inline-flex">{platform.icon}</span>
                <span className="text-base font-semibold text-text-primary label-text" aria-hidden>
                  {renderChars(platform.label, 'label-char')}
                </span>
                <span className="text-xs text-text-secondary store-text" aria-hidden>
                  {renderChars(platform.storeName, 'store-char')}
                </span>
              </a>
            )
          })}
        </div>
      </div>
      {/* Wave divider removed */}
    </section>
  )
}

export default DownloadLinksSection
