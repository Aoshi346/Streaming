import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

let pluginRegistered = false

const ensurePlugin = () => {
  if (!pluginRegistered) {
    gsap.registerPlugin(ScrollToPlugin)
    pluginRegistered = true
  }
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export interface SmoothScrollOptions {
  offset?: number
  duration?: number
}

export const smoothScrollTo = (target: string | Element, options?: SmoothScrollOptions) => {
  if (typeof window === 'undefined') return

  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) return

  const offset = options?.offset ?? 72
  const duration = options?.duration ?? 0.7

  if (prefersReducedMotion()) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }

  ensurePlugin()
  gsap.to(window, {
    duration,
    ease: 'power3.out',
    scrollTo: { y: element, offsetY: offset },
  })
}
