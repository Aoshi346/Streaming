import React, { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiTv } from 'react-icons/fi'
import { Clapperboard } from '@/components/animate-ui/icons/clapperboard'
import { Play } from '@/components/animate-ui/icons/play'

gsap.registerPlugin(ScrollTrigger)

const formatCompactNumber = (n: number) => {
  if (n < 1000) return `${Math.round(n)}`
  const thousands = Math.max(1, Math.round(n / 1000))
  return `${thousands}k+`
}

type StatCardProps = {
  to: number
  label: string
  Icon: React.ComponentType<{ className?: string; animate?: boolean }>
  duration?: number
  formatter?: (value: number) => string
}

function StatCard({ to, label, Icon, duration = 2, formatter = formatCompactNumber }: StatCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
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

    // No GSAP continuous icon animation to avoid conflict with framer-motion

    // Hover micro-interactions
    const onEnter = () => {
      if (prefersReduced) return
      gsap.to(el, {
        scale: 1.05,
        boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.5)',
        duration: 0.3,
        ease: 'power2.out',
      })
      // Icon hover animation handled by Framer Motion AnimatedIcon
    }
    const onLeave = () => {
      if (prefersReduced) return
      gsap.to(el, { scale: 1, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', duration: 0.35, ease: 'power2.out' })
      // Icon hover reset handled by Framer Motion AnimatedIcon
    }
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)

    // Count-up intro
    if (prefersReduced) {
      valueEl.textContent = formatter(to)
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
            valueEl.textContent = formatter(obj.val)
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="stat-card group relative z-20 flex flex-col items-center gap-2 px-5 py-5 sm:px-6 sm:py-6 rounded-xl border-2 border-white/30 bg-gradient-to-br from-white/15 via-white/8 to-white/5 backdrop-blur-md will-change-transform overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-102"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/15 via-blue-400/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-purple-400/40 via-blue-400/40 to-pink-400/40 opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300" aria-hidden />

      {/* Icon container with animation */}
      <div ref={iconRef} className="relative z-10 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br from-purple-400/25 to-blue-400/25 text-white shadow-lg ring-1 ring-white/30 group-hover:ring-white/50 transition-all duration-300">
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-lg" animate={isHovered} />
      </div>

      {/* Number display */}
      <div className="relative z-10 text-center">
        <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-lg">
          <span ref={valueElRef}>0</span>
        </div>
      </div>

      {/* Label */}
      <div className="relative z-10 text-center">
        <div className="text-xs sm:text-sm font-bold text-white/95 tracking-[0.2em] uppercase group-hover:text-white transition-all duration-300">
          {label}
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 h-0.5 w-20 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-purple-300/60 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
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
  const filmStripRef = useRef<HTMLDivElement | null>(null)

  // Section entrance: stagger cards
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (prefersReduced) return

    const cards = el.querySelectorAll('.stat-card')
    const ctx = gsap.context(() => {
      // Set initial state to visible
      gsap.set(cards, { opacity: 1, y: 0 })
      
      // Only animate if element is below viewport
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.from(cards, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
          })
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

  useEffect(() => {
    if (prefersReduced) return
    const strip = filmStripRef.current
    if (!strip) return

    const ctx = gsap.context(() => {
      const width = strip.scrollWidth / 2 || 1
      gsap.fromTo(
        strip,
        { x: 0 },
        {
          x: -width,
          duration: 24,
          ease: 'none',
          repeat: -1,
          modifiers: {
            x: (value) => `${parseFloat(value) % -width}px`,
          },
        }
      )
    }, filmStripRef)

    return () => ctx.revert()
  }, [prefersReduced])

  // Removed random growth for static stable numbers per request.

  return (
    <section ref={sectionRef} id="stats" className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e] via-[#2d1b4e] to-[#0f0820] -z-30" />
      <div
        ref={bgRef}
        style={{
          ['--glow-x' as any]: '50%',
          ['--glow-y' as any]: '10%',
          background:
            'radial-gradient(50% 40% at var(--glow-x) var(--glow-y), rgba(139, 92, 246, 0.25), transparent 70%)',
        } as React.CSSProperties}
        className="pointer-events-none absolute inset-0 -z-20"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="gsap-section-title text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-2 tracking-tight">
            Mucho Por Qué Suscribirte
          </h2>
          <p className="gsap-section-subtitle text-base sm:text-lg text-white/70">
            Programación premium, estrenos constantes y TV en vivo que no se detiene
          </p>
        </div>

        {/* Cinematic reel background */}
        <div className="relative mb-12 sm:mb-16 flex justify-center">
          <div className="relative w-full max-w-5xl h-16 sm:h-20 overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-r from-black/60 via-black/80 to-black/60 backdrop-blur-sm shadow-2xl">
            {/* Film perforations top */}
            <div className="pointer-events-none absolute inset-x-0 top-1.5 sm:top-2 flex justify-between px-3 sm:px-4" aria-hidden>
              <div className="flex gap-1.5 sm:gap-2">
                {Array.from({ length: 15 }).map((_, idx) => (
                  <span key={`perf-top-left-${idx}`} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-sm bg-white/10 border border-white/20" />
                ))}
              </div>
              <div className="flex gap-1.5 sm:gap-2">
                {Array.from({ length: 15 }).map((_, idx) => (
                  <span key={`perf-top-right-${idx}`} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-sm bg-white/10 border border-white/20" />
                ))}
              </div>
            </div>

            {/* Scrolling content */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-black/80 to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-32 bg-gradient-to-l from-black/80 to-transparent z-10" />
              <div
                ref={filmStripRef}
                className="flex items-center gap-8 sm:gap-12 whitespace-nowrap text-xs sm:text-sm font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/80"
              >
                {[...Array(3)].map((_, loopIndex) => (
                  <div key={loopIndex} className="flex items-center gap-8 sm:gap-12">
                    {['🎬 Series Originales', '🍿 Películas', '👶 Kids', '📺 Documentales', '🎭 Live Shows', '⭐ Estrenos'].map((item) => (
                      <span key={`${loopIndex}-${item}`} className="flex items-center gap-3 sm:gap-4">
                        {item}
                        <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-accent animate-pulse" />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Film perforations bottom */}
            <div className="pointer-events-none absolute inset-x-0 bottom-1.5 sm:bottom-2 flex justify-between px-3 sm:px-4" aria-hidden>
              <div className="flex gap-1.5 sm:gap-2">
                {Array.from({ length: 15 }).map((_, idx) => (
                  <span key={`perf-bottom-left-${idx}`} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-sm bg-white/10 border border-white/20" />
                ))}
              </div>
              <div className="flex gap-1.5 sm:gap-2">
                {Array.from({ length: 15 }).map((_, idx) => (
                  <span key={`perf-bottom-right-${idx}`} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-sm bg-white/10 border border-white/20" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto relative z-20">
          <StatCard to={11000} label="LIVE TV" Icon={FiTv} />
          <StatCard to={54000} label="MOVIES" Icon={({ animate }) => <Clapperboard animate={animate} loop />} />
          <StatCard to={14000} label="SERIES" Icon={({ animate }) => <Play animate={animate ? "path-loop" : false} loop />} />
        </div>
      </div>
        {/* Transition to Downloads (#1e1b4b) */}
        {/* Wave divider removed */}
    </section>
  )
}
