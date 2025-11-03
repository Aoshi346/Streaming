import React, { forwardRef, useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'

export type FeatureVariant = 'tv' | 'download' | 'kids' | 'bolt'

export interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  variant: FeatureVariant
}

const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ icon, title, description, variant }, ref) => {
    const localRef = useRef<HTMLDivElement | null>(null)
    const iconRef = useRef<HTMLDivElement | null>(null)
    const spotRef = useRef<HTMLDivElement | null>(null)
    // allow parent to get the node
    const setRefs = (node: HTMLDivElement | null) => {
      localRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref && 'current' in ref) (ref as any).current = node
    }

    const prefersReducedMotion = useMemo(
      () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      []
    )
    const hoverCapable = useMemo(() => {
      if (typeof window === 'undefined' || !window.matchMedia) return false
      // hover: hover and pointer: fine -> likely desktop
      return window.matchMedia('(hover: hover) and (pointer: fine)').matches
    }, [])

    useEffect(() => {
      const card = localRef.current
      const iconEl = iconRef.current
      const spot = spotRef.current
      if (!card) return
      if (!hoverCapable || prefersReducedMotion) return

      const maxDeg = 6
      const ctx = gsap.context(() => {
        const onEnter = () => {
          gsap.to(card, { duration: 0.25, y: -6, scale: 1.02, ease: 'power3.out' })
          if (spot) gsap.to(spot, { duration: 0.2, opacity: 0.6, ease: 'power3.out' })
          if (iconEl) {
            switch (variant) {
              case 'tv':
                gsap.fromTo(iconEl, { scale: 0.95 }, { scale: 1.05, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' })
                break
              case 'download':
                gsap.fromTo(iconEl, { y: -2 }, { y: 2, duration: 0.24, yoyo: true, repeat: 1, ease: 'power2.inOut' })
                break
              case 'kids':
                gsap.fromTo(iconEl, { x: -2 }, { x: 2, duration: 0.24, yoyo: true, repeat: 1, ease: 'power2.inOut' })
                break
              case 'bolt':
                gsap.fromTo(iconEl, { opacity: 0.9 }, { opacity: 1, duration: 0.18, yoyo: true, repeat: 2, ease: 'power1.inOut' })
                break
            }
          }
        }
        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect()
          const dx = e.clientX - (rect.left + rect.width / 2)
          const dy = e.clientY - (rect.top + rect.height / 2)
          const rx = gsap.utils.clamp(-maxDeg, maxDeg, (-dy / rect.height) * maxDeg)
          const ry = gsap.utils.clamp(-maxDeg, maxDeg, (dx / rect.width) * maxDeg)
          gsap.to(card, { rotateX: rx, rotateY: ry, transformPerspective: 800, transformOrigin: 'center', duration: 0.15, ease: 'power2.out' })
          if (spot) {
            const px = ((e.clientX - rect.left) / rect.width) * 100
            const py = ((e.clientY - rect.top) / rect.height) * 100
            gsap.to(spot, { x: (px - 50) / 2, y: (py - 50) / 2, duration: 0.15, ease: 'power2.out' })
          }
        }
        const onLeave = () => {
          gsap.to(card, { duration: 0.25, rotateX: 0, rotateY: 0, y: 0, scale: 1, ease: 'power3.out' })
          if (spot) gsap.to(spot, { duration: 0.2, opacity: 0, x: 0, y: 0, ease: 'power3.out' })
        }

        card.addEventListener('mouseenter', onEnter)
        card.addEventListener('mousemove', onMove)
        card.addEventListener('mouseleave', onLeave)
        return () => {
          card.removeEventListener('mouseenter', onEnter)
          card.removeEventListener('mousemove', onMove)
          card.removeEventListener('mouseleave', onLeave)
        }
      }, localRef)
      return () => ctx.revert()
    }, [hoverCapable, prefersReducedMotion, variant])

    return (
      <div
        ref={setRefs}
        className="feature-card group relative rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-theme-soft will-change-transform"
      >
        {/* spotlight */}
        <div ref={spotRef} className="pointer-events-none absolute inset-0 opacity-0">
          <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),rgba(255,255,255,0)_60%)]" />
        </div>
        <div ref={iconRef} className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand/40 via-brand-light/40 to-brand-dark/60 text-accent">
          {icon}
        </div>
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-text-muted">{description}</p>
      </div>
    )
  }
)

FeatureCard.displayName = 'FeatureCard'

export default FeatureCard
