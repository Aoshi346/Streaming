import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Globally animates all headings with the class `.gsap-section-title`.
 * Sequence per title (once on first scroll into view):
 * 1) Fade + slight lift in
 * 2) Subtle micro-bounce to give feedback
 * Honors prefers-reduced-motion.
 */
export default function SectionTitleAnimator() {
  useLayoutEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const headings = gsap.utils.toArray<HTMLElement>('.gsap-section-title')
    const subtitles = gsap.utils.toArray<HTMLElement>('.gsap-section-subtitle')
    if (!headings.length) return

    const ctx = gsap.context(() => {
      headings.forEach((el) => {
        if (!el) return
        if (prefersReduced) {
          gsap.set(el, { opacity: 1, y: 0 })
          return
        }
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
          defaults: { ease: 'power2.out' },
        })
        tl.from(el, { opacity: 0, y: 12, duration: 0.5 })
          .to(el, { y: -2, duration: 0.14 })
          .to(el, { y: 0, duration: 0.18 })
      })

      // Animate subtitles separately with a lighter, shorter entrance
      subtitles.forEach((el) => {
        if (!el) return
        if (prefersReduced) {
          gsap.set(el, { opacity: 1, y: 0 })
          return
        }
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          opacity: 0,
          y: 8,
          duration: 0.45,
          ease: 'power2.out',
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return null
}
