import React, { forwardRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { FaTv, FaMobileAlt, FaTabletAlt, FaLaptop } from 'react-icons/fa'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

type DeviceID = 'tv' | 'mobile' | 'tablet' | 'laptop'

interface DeviceSpec {
  id: DeviceID
  label: string
  icon: React.ReactNode
  aspectRatio: string // e.g., '16/9'
  radius: number // preview border-radius in px
}

const DEVICE_SPECS: DeviceSpec[] = [
  { id: 'tv', label: 'TV', icon: <FaTv className="h-4 w-4" aria-hidden />, aspectRatio: '16/9', radius: 12 },
  { id: 'mobile', label: 'Móvil', icon: <FaMobileAlt className="h-4 w-4" aria-hidden />, aspectRatio: '9/16', radius: 28 },
  { id: 'tablet', label: 'Tablet', icon: <FaTabletAlt className="h-4 w-4" aria-hidden />, aspectRatio: '3/4', radius: 20 },
  { id: 'laptop', label: 'Laptop', icon: <FaLaptop className="h-4 w-4" aria-hidden />, aspectRatio: '16/10', radius: 14 },
]

function parseAspect(aspect: string): number {
  const [w, h] = aspect.split('/').map(Number)
  if (!w || !h) return 16 / 9
  return w / h
}

const Devices = forwardRef<HTMLElement>((_, ref) => {
  const [activeDeviceID, setActiveDeviceID] = useState<DeviceID>('tv')
  const prevIDRef = useRef<DeviceID>('tv')

  // layout refs
  const tabsRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const previewOuterRef = useRef<HTMLDivElement>(null)
  const ratioBoxRef = useRef<HTMLDivElement>(null)
  const framesRef = useRef<Record<DeviceID, HTMLDivElement | null>>({ tv: null, mobile: null, tablet: null, laptop: null })

  const prefersReducedMotion = useMemo(
    () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false),
    []
  )
  const hoverCapable = useMemo(
    () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(hover: hover) and (pointer: fine)').matches : false),
    []
  )

  // Move the animated pill using GSAP Flip when active device changes
  useLayoutEffect(() => {
    const tabs = tabsRef.current
    const pill = pillRef.current
    if (!tabs || !pill) return

    const activeBtn = tabs.querySelector<HTMLButtonElement>(`[data-device="${activeDeviceID}"]`)
    if (!activeBtn) return

    if (prefersReducedMotion) {
      const rect = activeBtn.getBoundingClientRect()
      const parentRect = tabs.getBoundingClientRect()
      Object.assign(pill.style, {
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        transform: `translate(${rect.left - parentRect.left}px, ${rect.top - parentRect.top}px)`,
      })
      return
    }

    const state = Flip.getState(pill)
    const rect = activeBtn.getBoundingClientRect()
    const parentRect = tabs.getBoundingClientRect()
    Object.assign(pill.style, {
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      transform: `translate(${rect.left - parentRect.left}px, ${rect.top - parentRect.top}px)`,
    })
    Flip.from(state, { duration: 0.5, ease: 'power4.inOut' })
  }, [activeDeviceID, prefersReducedMotion])

  // Animate preview aspect ratio + frames cross-fade when device changes
  useLayoutEffect(() => {
    const currentID = activeDeviceID
    const prevID = prevIDRef.current
    if (prevID === currentID) return

    const nextSpec = DEVICE_SPECS.find((d) => d.id === currentID)!
    const box = ratioBoxRef.current
    const outer = previewOuterRef.current
    const prevFrame = framesRef.current[prevID]
    const nextFrame = framesRef.current[currentID]
    if (!box || !outer || !nextFrame) {
      prevIDRef.current = currentID
      return
    }

  // compute next paddingTop from aspect ratio; previous values not needed for animation start state
  const nextPad = 100 / parseAspect(nextSpec.aspectRatio)

    if (prefersReducedMotion) {
      box.style.paddingTop = `${nextPad}%`
      outer.style.borderRadius = `${nextSpec.radius}px`
      if (prevFrame) prevFrame.style.opacity = '0'
      nextFrame.style.opacity = '1'
      prevIDRef.current = currentID
      return
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } })
    tl.to(box, { paddingTop: `${nextPad}%`, duration: 0.6 }, 0)
      .to(outer, { borderRadius: nextSpec.radius, duration: 0.6 }, 0)
      .to(prevFrame, { opacity: 0, scale: 0.9, duration: 0.45 }, 0)
      .fromTo(nextFrame, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.5 }, 0.1)
    prevIDRef.current = currentID
  }, [activeDeviceID, prefersReducedMotion])

  // Hover micro animations for tabs
  useEffect(() => {
    if (!hoverCapable) return
    const tabs = tabsRef.current
    if (!tabs) return
    const cleanups: Array<() => void> = []
    tabs.querySelectorAll<HTMLButtonElement>('button[data-device]').forEach((btn) => {
      const icon = btn.querySelector('.icon')
      const onEnter = () => {
        if (btn.dataset.device === activeDeviceID) return
        gsap.to(btn, { opacity: 1, duration: 0.2 })
        if (icon) {
          const id = btn.dataset.device as DeviceID
          if (id === 'mobile') gsap.fromTo(icon, { x: -1 }, { x: 1, yoyo: true, repeat: 1, duration: 0.12 })
          if (id === 'laptop') gsap.fromTo(icon, { rotateX: -5 }, { rotateX: 0, duration: 0.18, ease: 'power2.out' })
          if (id === 'tv') gsap.fromTo(icon, { scale: 0.96 }, { scale: 1, duration: 0.18, ease: 'power2.out' })
          if (id === 'tablet') gsap.fromTo(icon, { y: -1 }, { y: 1, yoyo: true, repeat: 1, duration: 0.12 })
        }
      }
      const onLeave = () => {
        if (btn.dataset.device === activeDeviceID) return
        gsap.to(btn, { opacity: 0.7, duration: 0.2 })
      }
      btn.addEventListener('mouseenter', onEnter)
      btn.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        btn.removeEventListener('mouseenter', onEnter)
        btn.removeEventListener('mouseleave', onLeave)
      })
    })
    return () => cleanups.forEach((fn) => fn())
  }, [hoverCapable, activeDeviceID])

  // Initial mount: position pill on the first tab
  useEffect(() => {
    const tabs = tabsRef.current
    const pill = pillRef.current
    if (!tabs || !pill) return
    const first = tabs.querySelector<HTMLButtonElement>('button[data-device]')
    if (!first) return
    const rect = first.getBoundingClientRect()
    const parentRect = tabs.getBoundingClientRect()
    Object.assign(pill.style, {
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      transform: `translate(${rect.left - parentRect.left}px, ${rect.top - parentRect.top}px)`,
    })
  }, [])

  const activeSpec = DEVICE_SPECS.find((d) => d.id === activeDeviceID)!
  const padTop = 100 / parseAspect(activeSpec.aspectRatio)

  return (
    <section ref={ref} id="devices" className="border-t border-white/10 py-16 sm:py-20">
      <div className="container-wrapper">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left column: copy + tabs */}
          <div>
            <h2 className="gsap-section-title text-2xl font-bold tracking-tight sm:text-3xl">Mira en cualquier dispositivo</h2>
            <p className="gsap-section-subtitle mt-3 text-text-secondary/90">
              Transmite en tu smartphone, tablet, laptop y TV sin perder el ritmo. Cambia de dispositivos sin problemas y continúa justo donde lo dejaste.
            </p>

            {/* Tabs */}
            <div ref={tabsRef} className="relative mt-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1">
              {/* animated pill */}
              <div ref={pillRef} className="pointer-events-none absolute left-0 top-0 z-0 rounded-full bg-brand/80 shadow-theme-soft" style={{ width: 0, height: 0, transform: 'translate(0,0)' }} />
              {DEVICE_SPECS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  data-device={d.id}
                  onClick={() => setActiveDeviceID((prev) => {
                    prevIDRef.current = prev
                    return d.id
                  })}
                  className={`relative z-10 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-opacity ${activeDeviceID === d.id ? 'text-white opacity-100' : 'text-text-secondary opacity-70'}`}
                >
                  <span className="icon inline-flex">{d.icon}</span>
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right column: continuity preview */}
          <div className="order-first lg:order-none">
            <div ref={previewOuterRef} className="relative w-full overflow-hidden border border-white/10 bg-black shadow-theme-soft" style={{ borderRadius: activeSpec.radius }}>
              {/* ratio box */}
              <div ref={ratioBoxRef} className="w-full" style={{ paddingTop: `${padTop}%` }} />
              {/* video: stays persistent below frames */}
              <div className="absolute inset-0">
                {/* placeholder visual if you don't have a video yet */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.25),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.25),transparent_60%)] animate-pulse" />
                {/* Optional: replace with your video asset */}
                {/* <video src={videoSrc} className="h-full w-full object-cover" autoPlay loop muted playsInline /> */}
              </div>
              {/* frames overlay */}
              {DEVICE_SPECS.map((d) => (
                <div
                  key={d.id}
                  ref={(el) => (framesRef.current[d.id] = el)}
                  className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity ${activeDeviceID === d.id ? 'opacity-100' : 'opacity-0'}`}
                >
                  {/* simple SVG bezel placeholder per device */}
                  <svg className="h-[92%] w-[92%]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <mask id={`hole-${d.id}`}>
                        <rect x="0" y="0" width="100" height="100" fill="white" />
                        <rect x="8" y="8" width="84" height="84" rx={d.id === 'mobile' ? 10 : d.id === 'tablet' ? 8 : d.id === 'laptop' ? 4 : 2} fill="black" />
                      </mask>
                    </defs>
                    {/* bezel */}
                    <rect x="0" y="0" width="100" height="100" rx={d.id === 'mobile' ? 14 : d.id === 'tablet' ? 10 : d.id === 'laptop' ? 6 : 3} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" mask={`url(#hole-${d.id})`} />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

Devices.displayName = 'Devices'

export default Devices
