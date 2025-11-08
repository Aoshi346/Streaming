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

    if (prefersReduced) {
      gsap.set([...headings, ...subtitles], { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      // A single, lightweight animation for all section titles
      headings.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        })
      })

      // A slightly delayed, lightweight animation for subtitles
      subtitles.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 15,
          duration: 0.6,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return null
}
