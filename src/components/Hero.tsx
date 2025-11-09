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
    <section ref={sectionRef} id="top" className="relative isolate overflow-hidden min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen flex items-center">
      {/* Background Video with performance optimizations */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        className="absolute top-0 left-0 w-full h-full object-cover -z-20 scale-105"
        style={{ filter: 'brightness(0.7)' }}
      >
        {/* Streaming-related video: Netflix-style content streaming */}
        <source src="https://videos.pexels.com/video-files/7991579/7991579-hd_1920_1080_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Enhanced gradient overlay with purple/pink theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-purple-950/50 to-black/85 -z-10" />
      
      {/* Animated gradient orbs for depth */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-64 h-64 sm:w-96 sm:h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 sm:w-96 sm:h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container-wrapper relative z-10 w-full">
        <div className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
          <div className="max-w-4xl text-center mx-auto space-y-6 sm:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-purple-300">Miles de películas y series disponibles</span>
            </div>

            <h1 ref={titleRef} aria-label="Películas, series y más ilimitadas" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-text-primary leading-tight">
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
            
            <p ref={subtitleRef} className="gsap-hero-subtitle text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed px-4">
              Disfruta de contenido 4K, sin anuncios, en todos tus dispositivos. Cancela en cualquier momento.
            </p>

            {/* CTA Buttons with enhanced styling */}
            <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-3 sm:gap-4 px-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <a
                  href="#pricing"
                  className="group relative w-full sm:w-auto overflow-hidden rounded-lg px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 bg-[length:200%_100%] transition-all duration-500 group-hover:bg-[length:100%_100%] animate-gradient-x" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    SUSCRÍBETE AHORA
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </a>
                
                <a
                  href="#features"
                  className="group w-full sm:w-auto rounded-lg border-2 border-purple-500/50 bg-black/30 backdrop-blur-sm px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                  <span className="flex items-center justify-center gap-2">
                    VER MÁS
                    <svg className="w-4 h-4 transform group-hover:translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </a>
              </div>
              
              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 flex-wrap text-xs sm:text-sm text-text-secondary">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Sin compromisos
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  HD & 4K disponible
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Cancela cuando quieras
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent -z-10" />
    </section>
  )
})

Hero.displayName = 'Hero'

export default Hero
