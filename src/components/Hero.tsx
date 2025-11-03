import { forwardRef, useLayoutEffect, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Hero = forwardRef<HTMLElement>((_, ref) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const subtitleRef = useRef<HTMLParagraphElement | null>(null)

  // expose ref to parent like other components do
  useEffect(() => {
    if (!ref) return
    if (typeof ref === 'function') ref(sectionRef.current as any)
    else (ref as any).current = sectionRef.current
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useLayoutEffect(() => {
    const sectionEl = sectionRef.current
    const titleEl = titleRef.current
    const subEl = subtitleRef.current
    if (!sectionEl || !titleEl) return

    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      const chars = titleEl.querySelectorAll('.hero-title-char')
      if (chars.length) gsap.set(chars, { opacity: 1, y: 0 })
      if (subEl) gsap.set(subEl, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      const chars = titleEl.querySelectorAll<HTMLElement>('.hero-title-char')
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionEl, start: 'top 80%', once: true },
      })

      tl.from(chars, {
        opacity: 0,
        y: 30,
        skewX: 8,
        rotation: 4,
        scale: 0.98,
        duration: 0.55,
        stagger: { each: 0.03, from: 'start' },
        ease: 'back.out(1.2)',
      })

      if (subEl) tl.from(subEl, { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out' }, '-=0.28')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="top" className="relative isolate overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover -z-20"
      >
        {/* 
          TODO: Replace with actual video source. 
          This is a placeholder from https://videos.pexels.com/
        */}
        <source src="https://videos.pexels.com/video-files/3254013/3254013-hd_1920_1080_25fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-950/40 to-black/80 -z-10" />

      <div className="container-wrapper relative">
        <div className="py-20 md:py-28 lg:py-36">
          <div className="max-w-3xl text-center mx-auto">
            <h1 ref={titleRef} aria-label="Películas, series y más ilimitadas" className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
              {(() => {
                const title = 'Películas, series y más ilimitadas'
                const words = title.split(' ')
                return words.map((word, wi) => (
                  <span key={wi} className="hero-word inline-block" style={{ whiteSpace: 'nowrap' }}>
                    {word.split('').map((ch, i) => (
                      <span key={i} className="hero-title-char inline-block" aria-hidden>{ch}</span>
                    ))}
                    {wi < words.length - 1 ? <span aria-hidden className="inline-block">{"\u00A0"}</span> : null}
                  </span>
                ))
              })()}
            </h1>
            <p ref={subtitleRef} className="gsap-hero-subtitle mt-4 text-lg text-gray-300">
              Mira en cualquier lugar. Cancela en cualquier momento.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <a
                href="#pricing"
                className="shrink-0 rounded-md bg-purple-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/80 hover:-translate-y-0.5 hover:shadow-purple-600/50"
              >
                SUSCRÍBETE AHORA
              </a>
              <a
                href="#features"
                className="shrink-0 rounded-md border border-white/50 bg-transparent px-8 py-3 text-base font-semibold text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 hover:bg-white/10"
              >
                CONTÁCTANOS
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

Hero.displayName = 'Hero'

export default Hero
