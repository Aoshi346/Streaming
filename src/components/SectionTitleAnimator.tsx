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

        // preserve raw text for accessibility and to avoid double-splitting
        const rawText = el.getAttribute('aria-label') || el.textContent || ''
        if (!el.dataset.splitApplied) {
          // set aria-label so screen readers read the full title
          el.setAttribute('aria-label', rawText.trim())
          // split into words, then characters per word to keep words intact when wrapping
          const words = rawText.split(' ')
          const frag = document.createDocumentFragment()
          words.forEach((word, wi) => {
            const wordWrap = document.createElement('span')
            wordWrap.className = 'gsap-word inline-block'
            wordWrap.style.whiteSpace = 'nowrap'
            // create spans per character
            Array.from(word).forEach((ch) => {
              const chSpan = document.createElement('span')
              chSpan.className = 'gsap-title-char inline-block'
              chSpan.setAttribute('aria-hidden', 'true')
              chSpan.textContent = ch
              wordWrap.appendChild(chSpan)
            })
            // add a non-breaking space between words (except last)
            if (wi < words.length - 1) {
              const nbsp = document.createElement('span')
              nbsp.className = 'gsap-title-char inline-block'
              nbsp.setAttribute('aria-hidden', 'true')
              nbsp.textContent = '\u00A0'
              wordWrap.appendChild(nbsp)
            }
            frag.appendChild(wordWrap)
          })
          // clear and append
          el.textContent = ''
          el.appendChild(frag)
          el.dataset.splitApplied = 'true'
        }

        const chars = el.querySelectorAll<HTMLElement>('.gsap-title-char')

        if (prefersReduced) {
          if (chars.length) gsap.set(chars, { opacity: 1, y: 0 })
          return
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        })

        // Fade in characters with a short stagger, then a tiny micro-bounce on the whole title
        tl.from(chars, {
          opacity: 0,
          y: 12,
          duration: 0.48,
          stagger: { each: 0.03, from: 'center' },
          ease: 'power2.out',
        })
          .to(el, { y: -2, duration: 0.12, ease: 'power2.out' })
          .to(el, { y: 0, duration: 0.16, ease: 'power2.out' })
      })

      // Animate subtitles with a split-by-line, per-character entrance
      subtitles.forEach((el) => {
        if (!el) return

        const rawText = el.getAttribute('aria-label') || el.textContent || ''
        // split subtitle into characters and keep words intact visually
        if (!el.dataset.splitSubtitleApplied) {
          const words = rawText.split(' ')
          const frag = document.createDocumentFragment()
          words.forEach((word, wi) => {
            const wordWrap = document.createElement('span')
            wordWrap.className = 'gsap-sub-word inline-block'
            wordWrap.style.whiteSpace = 'nowrap'
            Array.from(word).forEach((ch) => {
              const chSpan = document.createElement('span')
              chSpan.className = 'gsap-sub-char inline-block'
              chSpan.setAttribute('aria-hidden', 'true')
              chSpan.textContent = ch
              wordWrap.appendChild(chSpan)
            })
            if (wi < words.length - 1) {
              const nbsp = document.createElement('span')
              nbsp.className = 'gsap-sub-char inline-block'
              nbsp.setAttribute('aria-hidden', 'true')
              nbsp.textContent = '\u00A0'
              wordWrap.appendChild(nbsp)
            }
            frag.appendChild(wordWrap)
          })
          el.textContent = ''
          el.appendChild(frag)
          el.dataset.splitSubtitleApplied = 'true'
        }

        const chars = Array.from(el.querySelectorAll<HTMLElement>('.gsap-sub-char'))
        if (!chars.length) return

        if (prefersReduced) {
          gsap.set(chars, { opacity: 1, y: 0 })
          return
        }

        // group chars by their offsetTop to get visual lines after layout
        const linesMap = new Map<number, HTMLElement[]>()
        chars.forEach((ch) => {
          const top = Math.round(ch.offsetTop)
          const arr = linesMap.get(top) || []
          arr.push(ch)
          linesMap.set(top, arr)
        })

        const lineGroups = Array.from(linesMap.entries())
          .sort((a, b) => a[0] - b[0])
          .map(([, group]) => group)

        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        })

        // animate each line with a small stagger between lines, and a per-character stagger within the line
        let pos = 0
        const lineDelay = 0.06
        lineGroups.forEach((group) => {
          tl.from(group, { opacity: 0, y: 8, stagger: 0.02, duration: 0.36, ease: 'power2.out' }, pos)
          pos += lineDelay
        })
      })
    }, headings as any)

    return () => ctx.revert()
  }, [])

  return null
}
