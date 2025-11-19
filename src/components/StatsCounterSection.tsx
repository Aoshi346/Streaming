import { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiFilm, FiPlay, FiTv } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

// Utility to format integers with thousands separators
function formatNumber(n: number) {
  return Math.round(n).toLocaleString('en-US')
}

type StatCardProps = {
  to: number
  label: string
  Icon: React.ComponentType<{ className?: string }>
  duration?: number
}

function StatCard({ to, label, Icon, duration = 2 }: StatCardProps) {
  const prefersReduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  const cardRef = useRef<HTMLDivElement | null>(null)
  const valueElRef = useRef<HTMLSpanElement | null>(null)
  const iconRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = cardRef.current
    const valueEl = valueElRef.current
    if (!el || !valueEl) return

    // Hover micro-interactions
    const onEnter = () => {
      if (prefersReduced) return
      gsap.to(el, {
        scale: 1.03,
        boxShadow: 'var(--shadow-strong)',
        duration: 0.3,
        ease: 'power2.out',
      })
      if (iconRef.current) {
        gsap.to(iconRef.current, { y: -3, rotate: -3, scale: 1.05, duration: 0.3, ease: 'power2.out' })
      }
    }
    const onLeave = () => {
      if (prefersReduced) return
      gsap.to(el, { scale: 1, boxShadow: 'var(--shadow-soft)', duration: 0.35, ease: 'power2.out' })
      if (iconRef.current) {
        gsap.to(iconRef.current, { y: 0, rotate: 0, scale: 1, duration: 0.35, ease: 'power2.out' })
      }
    }
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)

    // Count-up intro
    if (prefersReduced) {
      valueEl.textContent = formatNumber(to)
      return () => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      }
    }

    const ctx = gsap.context(() => {
      const obj = { val: 0 }
      gsap.fromTo(
        obj,
        { val: 0 },
        {
          val: to,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            valueEl.textContent = formatNumber(obj.val)
          },
          onComplete: () => {},
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, cardRef)

    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      ctx.revert()
    }
  }, [to, duration, prefersReduced])

  return (
    <div
      ref={cardRef}
      className="stat-card group relative flex flex-col items-center justify-center gap-2 px-4 sm:px-6 py-6 sm:py-8 rounded-xl bg-surface-muted/30 border border-border-subtle backdrop-blur-lg will-change-transform overflow-hidden hover:bg-surface-muted/40 transition-colors duration-300"
    >
      {/* Minimal top accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-12 sm:h-16 rounded-t-xl bg-gradient-to-b from-text-primary/5 via-text-primary/1 to-transparent" />

      {/* Icon container */}
      <div ref={iconRef} className="relative z-10 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-text-primary/8 border border-border-subtle group-hover:bg-text-primary/12 transition-all duration-300">
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-text-primary/75 group-hover:text-text-primary/90 transition-colors duration-300" />
      </div>

      {/* Number display */}
      <div className="relative z-10 text-center pt-1">
        <div className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-text-primary/90">
          <span ref={valueElRef}>0</span>
        </div>
      </div>

      {/* Label */}
      <div className="relative z-10 text-center pt-0.5">
        <div className="text-xs sm:text-sm font-medium text-text-secondary tracking-wider uppercase group-hover:text-text-primary/80 transition-colors duration-300">{label}</div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
}

export default function StatsCounterSection() {
  const prefersReduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  const sectionRef = useRef<HTMLElement | null>(null)
  const bgRef = useRef<HTMLDivElement | null>(null)

  // Section entrance: stagger cards
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (prefersReduced) return

    const cards = el.querySelectorAll('.stat-card')
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReduced])

  // Moving radial background
  useEffect(() => {
    if (prefersReduced) return
    if (!bgRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        '--glow-x': '70%',
        '--glow-y': '80%',
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, bgRef)
    return () => ctx.revert()
  }, [prefersReduced])

  // Removed random growth for static stable numbers per request.

  return (
    <section ref={sectionRef} id="stats" className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* top wave removed to prevent overlap */}
      {/* Subtle animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4c1d95] via-[#581c87] to-[#2e1065] opacity-95 -z-20" />
      <div
        ref={bgRef}
        style={{
          ['--glow-x' as any]: '50%',
          ['--glow-y' as any]: '10%',
          background:
            'radial-gradient(50% 40% at var(--glow-x) var(--glow-y), rgba(76, 201, 240, 0.15), transparent 70%)',
        } as React.CSSProperties}
        className="pointer-events-none absolute inset-0 -z-10"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="gsap-section-title text-2xl sm:text-3xl md:text-4xl font-semibold text-text-primary mb-2">
            Mucho Por Qué Suscribirte
          </h2>
          <p className="gsap-section-subtitle text-sm sm:text-base text-text-secondary">
            Nuestras cifras hablan por sí solas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          <StatCard to={12000} label="Canales" Icon={FiTv} />
          <StatCard to={55000} label="Películas" Icon={FiFilm} />
          <StatCard to={14000} label="Series" Icon={FiPlay} />
        </div>
      </div>
        {/* Transition to Downloads (#1e1b4b) */}
        {/* Wave divider removed */}
    </section>
  )
}
