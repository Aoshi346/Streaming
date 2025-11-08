import React, { forwardRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
// Replaced lucide-react icons with react-icons (already installed) to avoid adding new dependency
import { FaTv, FaMobileAlt, FaTabletAlt, FaLaptop } from 'react-icons/fa'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

type DeviceID = 'tv' | 'mobile' | 'tablet' | 'laptop'

interface DeviceSpec {
  id: DeviceID
  label: string
  icon: React.ReactNode
  aspectRatio: string
  radius: number
}

interface DeviceContent {
  title: string
  description: string
  items: string[]
  color: string
}

const DEVICE_SPECS: DeviceSpec[] = [
  { id: 'tv', label: 'TV', icon: <FaTv className="h-5 w-5" />, aspectRatio: '16/9', radius: 12 },
  { id: 'mobile', label: 'Móvil', icon: <FaMobileAlt className="h-5 w-5" />, aspectRatio: '9/16', radius: 28 },
  { id: 'tablet', label: 'Tablet', icon: <FaTabletAlt className="h-5 w-5" />, aspectRatio: '3/4', radius: 20 },
  { id: 'laptop', label: 'Laptop', icon: <FaLaptop className="h-5 w-5" />, aspectRatio: '16/10', radius: 14 },
]

const DEVICE_CONTENT: Record<DeviceID, DeviceContent> = {
  tv: {
    title: 'Experiencia Cinematográfica',
    description: 'Disfruta de contenido en pantalla grande con calidad 4K',
    items: ['4K Ultra HD', 'Dolby Atmos', 'Pantalla completa', 'Transmisión sin cortes'],
    color: 'from-blue-600/20 to-blue-400/10',
  },
  mobile: {
    title: 'En Tu Bolsillo',
    description: 'Mira lo que ames en cualquier momento, en cualquier lugar',
    items: ['Portable', 'Sincronización instantánea', 'Acceso offline', 'Control total'],
    color: 'from-purple-600/20 to-purple-400/10',
  },
  tablet: {
    title: 'Lo Mejor de Ambos Mundos',
    description: 'Pantalla perfecta para lectura y entretenimiento',
    items: ['Pantalla amplia', 'Multitarea fluida', 'Interfaz táctil', 'Portabilidad'],
    color: 'from-pink-600/20 to-pink-400/10',
  },
  laptop: {
    title: 'Producción Total',
    description: 'Trabaja y disfruta sin límites en tu computadora',
    items: ['Resolución full HD', 'Teclado y mouse', 'Multitarea avanzada', 'Mejor rendimiento'],
    color: 'from-cyan-600/20 to-cyan-400/10',
  },
}

function parseAspect(aspect: string): number {
  const [w, h] = aspect.split('/').map(Number)
  if (!w || !h) return 16 / 9
  return w / h
}

const Devices = forwardRef<HTMLElement>((_, ref) => {
  const [activeDeviceID, setActiveDeviceID] = useState<DeviceID>('tv')
  const prevIDRef = useRef<DeviceID>('tv')

  const tabsRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const previewOuterRef = useRef<HTMLDivElement>(null)
  const ratioBoxRef = useRef<HTMLDivElement>(null)
  const framesRef = useRef<Record<DeviceID, HTMLDivElement | null>>({ tv: null, mobile: null, tablet: null, laptop: null })
  const contentRef = useRef<HTMLDivElement>(null)

  const prefersReducedMotion = useMemo(
    () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false),
    []
  )
  const hoverCapable = useMemo(
    () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(hover: hover) and (pointer: fine)').matches : false),
    []
  )

  // Move animated pill
  useLayoutEffect(() => {
    const tabs = tabsRef.current
    const pill = pillRef.current
    if (!tabs || !pill) return

    const activeBtn = tabs.querySelector<HTMLButtonElement>(`[data-device="${activeDeviceID}"]`)
    if (!activeBtn) return

    // Calculate position relative to parent container
    const rect = activeBtn.getBoundingClientRect()
    const parentRect = tabs.getBoundingClientRect()
    const left = rect.left - parentRect.left
    const top = rect.top - parentRect.top

    if (prefersReducedMotion) {
      Object.assign(pill.style, {
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        left: `${left}px`,
        top: `${top}px`,
        transform: 'none',
      })
      return
    }

    const state = Flip.getState(pill)
    Object.assign(pill.style, {
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      left: `${left}px`,
      top: `${top}px`,
      transform: 'none',
    })
    Flip.from(state, { duration: 0.5, ease: 'power4.inOut' })
  }, [activeDeviceID, prefersReducedMotion])

  // Animate preview and content
  useLayoutEffect(() => {
    const currentID = activeDeviceID
    const prevID = prevIDRef.current
    if (prevID === currentID) return

    const nextSpec = DEVICE_SPECS.find((d) => d.id === currentID)!
    const box = ratioBoxRef.current
    const outer = previewOuterRef.current
    const prevFrame = framesRef.current[prevID]
    const nextFrame = framesRef.current[currentID]
    const content = contentRef.current
    if (!box || !outer || !nextFrame) {
      prevIDRef.current = currentID
      return
    }

    const nextPad = 100 / parseAspect(nextSpec.aspectRatio)

    if (prefersReducedMotion) {
      box.style.paddingTop = `${nextPad}%`
      outer.style.borderRadius = `${nextSpec.radius}px`
      if (prevFrame) prevFrame.style.opacity = '0'
      nextFrame.style.opacity = '1'
      if (content) content.style.opacity = '1'
      prevIDRef.current = currentID
      return
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } })
    tl.to(box, { paddingTop: `${nextPad}%`, duration: 0.6 }, 0)
      .to(outer, { borderRadius: nextSpec.radius, duration: 0.6 }, 0)
      .to(prevFrame, { opacity: 0, duration: 0.4 }, 0)
      .fromTo(nextFrame, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5 }, 0.15)
      .to(content, { opacity: 1, y: 0, duration: 0.5 }, 0.2)
    prevIDRef.current = currentID
  }, [activeDeviceID, prefersReducedMotion])

  // Hover animations
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
          gsap.fromTo(icon, { scale: 0.9 }, { scale: 1.1, duration: 0.3, ease: 'back.out' })
        }
      }
      const onLeave = () => {
        if (btn.dataset.device === activeDeviceID) return
        gsap.to(btn, { opacity: 0.6, duration: 0.2 })
        if (icon) {
          gsap.to(icon, { scale: 1, duration: 0.3 })
        }
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

  // Initial pill position
  useEffect(() => {
    const tabs = tabsRef.current
    const pill = pillRef.current
    if (!tabs || !pill) return
    const first = tabs.querySelector<HTMLButtonElement>('button[data-device]')
    if (!first) return
    const rect = first.getBoundingClientRect()
    const parentRect = tabs.getBoundingClientRect()
    const left = rect.left - parentRect.left
    const top = rect.top - parentRect.top
    Object.assign(pill.style, {
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      left: `${left}px`,
      top: `${top}px`,
      transform: 'none',
    })
  }, [])

  const activeSpec = DEVICE_SPECS.find((d) => d.id === activeDeviceID)!
  const activeContent = DEVICE_CONTENT[activeDeviceID]
  const padTop = 100 / parseAspect(activeSpec.aspectRatio)

  return (
    <section ref={ref} id="devices" className="relative py-16 sm:py-20 md:py-24 border-t border-border-subtle overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-text-primary/2 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
          {/* Left: Tabs and Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-text-primary mb-3">
                Mira en cualquier dispositivo
              </h2>
              <p className="text-base text-text-secondary">
                Transmite sin interrupciones en TV, móvil, tablet o laptop. Tu contenido, en cualquier pantalla.
              </p>
            </div>

            {/* Device Tabs */}
            <div ref={tabsRef} className="relative inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-muted/50 p-1.5 backdrop-blur-md">
              {/* Animated pill */}
              <div
                ref={pillRef}
                className="pointer-events-none absolute rounded-full bg-text-primary/10 border border-brand/30 shadow-lg"
                style={{ width: 0, height: 0, left: 0, top: 0 }}
              />
              {DEVICE_SPECS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  data-device={d.id}
                  onClick={() => {
                    prevIDRef.current = activeDeviceID
                    setActiveDeviceID(d.id)
                  }}
                  className={`relative z-10 flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeDeviceID === d.id
                      ? 'text-text-primary'
                      : 'text-text-secondary hover:text-text-primary/80'
                  }`}
                >
                  <span className="icon inline-flex">{d.icon}</span>
                  <span>{d.label}</span>
                </button>
              ))}
            </div>

            {/* Device Info */}
            <div
              ref={contentRef}
              className="space-y-6 opacity-100"
            >
              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-2">
                  {activeContent.title}
                </h3>
                <p className="text-text-secondary">
                  {activeContent.description}
                </p>
              </div>

              {/* Feature list */}
              <div className="grid grid-cols-2 gap-3">
                {activeContent.items.map((item) => (
                  <div key={item} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-muted/30 border border-border-subtle">
                    <div className="w-2 h-2 rounded-full bg-brand" />
                    <span className="text-sm text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Device Preview */}
          <div className="flex justify-center lg:justify-end">
            <div
              ref={previewOuterRef}
              className="relative w-full max-w-sm overflow-hidden border border-border-subtle bg-gradient-to-br from-surface-muted/50 to-surface-base/20 shadow-2xl backdrop-blur-sm"
              style={{ borderRadius: `${activeSpec.radius}px` }}
            >
              {/* Ratio box for aspect ratio */}
              <div ref={ratioBoxRef} className="w-full" style={{ paddingTop: `${padTop}%` }} />

              {/* Content background */}
              <div className="absolute inset-0 bg-[color:var(--color-background)]/80 flex items-center justify-center">
                <div className={`absolute inset-0 bg-gradient-to-br ${activeContent.color} animate-pulse`} />
                <div className="relative text-text-muted text-center px-6">
                  <div className="text-sm font-medium">{activeDeviceID.toUpperCase()}</div>
                  <div className="text-xs opacity-70 mt-1">Contenido optimizado</div>
                </div>
              </div>

              {/* Device frames */}
              {DEVICE_SPECS.map((d) => (
                <div
                  key={d.id}
                  ref={(el) => (framesRef.current[d.id] = el)}
                  className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity ${
                    activeDeviceID === d.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <svg className="h-[95%] w-[95%]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <mask id={`hole-${d.id}`}>
                        <rect x="0" y="0" width="100" height="100" fill="white" />
                        <rect
                          x="8"
                          y="8"
                          width="84"
                          height="84"
                          rx={d.id === 'mobile' ? 12 : d.id === 'tablet' ? 10 : d.id === 'laptop' ? 5 : 3}
                          fill="black"
                        />
                      </mask>
                    </defs>
                    <rect
                      x="0"
                      y="0"
                      width="100"
                      height="100"
                      rx={d.id === 'mobile' ? 14 : d.id === 'tablet' ? 12 : d.id === 'laptop' ? 6 : 4}
                      fill="rgb(var(--color-background-rgb) / 0.9)"
                      stroke="rgb(var(--color-border-subtle-rgb) / 0.3)"
                      strokeWidth="1"
                      mask={`url(#hole-${d.id})`}
                    />
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
