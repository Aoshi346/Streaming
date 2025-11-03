import React, { forwardRef, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaTv, FaDownload, FaUserFriends, FaBolt } from 'react-icons/fa'
import FeatureCard, { FeatureVariant } from './FeatureCard'

gsap.registerPlugin(ScrollTrigger)

const features: Array<{ title: string; description: string; icon: React.ReactNode; variant: FeatureVariant }> = [
  {
    title: 'Mira en tu TV',
    description: 'Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, reproductores Blu-ray y más.',
    icon: <FaTv aria-hidden className="h-5 w-5" />,
    variant: 'tv',
  },
  {
    title: 'Descarga tus programas',
    description: 'Guarda tus favoritos fácilmente y siempre ten algo que ver.',
    icon: <FaDownload aria-hidden className="h-5 w-5" />,
    variant: 'download',
  },
  {
    title: 'Crea perfiles para niños',
    description: 'Envía a los niños en aventuras con sus personajes favoritos en un espacio hecho solo para ellos.',
    icon: <FaUserFriends aria-hidden className="h-5 w-5" />,
    variant: 'kids',
  },
  {
    title: 'Sin anuncios. Nunca.',
    description: 'Disfruta de transmisión ininterrumpida con nuestra experiencia sin anuncios.',
    icon: <FaBolt aria-hidden className="h-5 w-5" />,
    variant: 'bolt',
  },
]

const FeaturesSection = forwardRef<HTMLElement>((_, ref) => {
  const sectionRef = useRef<HTMLElement | null>(null)

  // expose outer ref if parent passes one
  useEffect(() => {
    if (!ref) return
    if (typeof ref === 'function') ref(sectionRef.current as any)
    else (ref as any).current = sectionRef.current
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
    const cardsNodeList = el.querySelectorAll('.feature-card')
    // Title and subtitle are handled globally by SectionTitleAnimator; animate cards only here
    const cards = Array.from(cardsNodeList) as HTMLElement[]

      if (prefersReduced) {
        if (cards.length) gsap.set(cards, { opacity: 1, y: 0 })
        return
      }

      if (!cards.length) return

      ScrollTrigger.matchMedia({
        // mobile
        '(max-width: 767px)': function () {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
            },
          })
          if (cards.length) tl.from(cards, { opacity: 0, y: 20, duration: 0.35, ease: 'power2.out', stagger: 0.08 })
        },
        // tablet and up
        '(min-width: 768px)': function () {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
            },
          })
          if (cards.length) tl.from(cards, { opacity: 0, y: 24, duration: 0.45, ease: 'power2.out', stagger: 0.15 })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="features" className="relative border-t border-white/10 py-16 sm:py-20">
      <div className="absolute inset-0 bg-section-spotlight opacity-70" aria-hidden />
      <div className="container-wrapper relative">
  <h2 className="feature-title gsap-section-title text-2xl font-bold tracking-tight sm:text-3xl">Todo lo que necesitas para transmitir</h2>
        <p className="feature-subtitle gsap-section-subtitle mt-2 max-w-2xl text-text-secondary/90">
          Desde tu sala de estar hasta en movimiento, FullVision mantiene tu entretenimiento fluyendo con poderosas
          características diseñadas para todos.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} variant={f.variant} />
          ))}
        </div>
      </div>
    </section>
  )
})

FeaturesSection.displayName = 'FeaturesSection'

export default FeaturesSection
