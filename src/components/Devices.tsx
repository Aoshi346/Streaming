import React, { forwardRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
// Replaced lucide-react icons with react-icons (already installed) to avoid adding new dependency
import { FaTv, FaMobileAlt, FaTabletAlt, FaLaptop } from 'react-icons/fa'
import { gsap } from 'gsap'
import mobileDeviceSvg from '../assets/mobile_device.svg'
import tvDeviceSvg from '../assets/tv_device.svg'
import tabletDeviceSvg from '../assets/tablet_device.svg'
import laptopDeviceSvg from '../assets/laptop_device.svg'


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
  { id: 'tv', label: 'TV', icon: <FaTv className="h-5 w-5" />, aspectRatio: '2544/1647', radius: 12 },
  // Match the actual SVG's intrinsic aspect ratio to avoid odd spacing
  { id: 'mobile', label: 'Móvil', icon: <FaMobileAlt className="h-5 w-5" />, aspectRatio: '783/1024', radius: 28 },
  { id: 'tablet', label: 'Tablet', icon: <FaTabletAlt className="h-5 w-5" />, aspectRatio: '1920/1080', radius: 20 },
  { id: 'laptop', label: 'Laptop', icon: <FaLaptop className="h-5 w-5" />, aspectRatio: '3834/2256', radius: 14 },
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

  // We now use a CSS-only active state for the tab "pill" to simplify mobile behavior
  // and avoid JS-driven position/Flip work. Keep tabsRef for hover animations.

  // Animate preview and content with creative transitions
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

    const isNarrow = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(max-width: 640px)').matches : false
    const adjPad = isNarrow ? nextPad * 0.68 : nextPad

    // On reduced motion or narrow screens prefer simple direct style changes for performance
    if (prefersReducedMotion || isNarrow) {
      box.style.paddingTop = `${adjPad}%`
      outer.style.borderRadius = `${nextSpec.radius}px`
      if (prevFrame) prevFrame.style.opacity = '0'
      nextFrame.style.opacity = '1'
      if (content) content.style.opacity = '1'
      prevIDRef.current = currentID
      return
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } })

    // Animate container shape and size
    tl.to(box, { paddingTop: `${adjPad}%`, duration: 0.7 }, 0)
      .to(outer, { 
        borderRadius: nextSpec.radius, 
        duration: 0.7,
        ease: 'power2.inOut'
      }, 0)

    // Previous frame exits with 3D rotation and fade
    if (prevFrame) {
      tl.to(prevFrame, { 
        opacity: 0, 
        rotateY: -15,
        scale: 0.92,
        duration: 0.45,
        ease: 'power2.in'
      }, 0)
    }

    // Next frame enters with 3D rotation, scale, and float
    tl.fromTo(nextFrame, 
      { 
        opacity: 0, 
        scale: 0.88,
        rotateY: 15,
        y: 20
      }, 
      { 
        opacity: 1, 
        scale: 1,
        rotateY: 0,
        y: 0,
        duration: 0.65,
        ease: 'power2.out'
      }, 0.2)

    // Content fades in with slight upward motion
    if (content) {
      tl.to(content, { 
        opacity: 1, 
        y: 0, 
        duration: 0.55,
        ease: 'power2.out'
      }, 0.25)
    }

    prevIDRef.current = currentID
  }, [activeDeviceID, prefersReducedMotion])

  // (floating animation removed per request)

  // Parallax effect on mouse move
  useEffect(() => {
    if (!hoverCapable || prefersReducedMotion) return
    
    const outer = previewOuterRef.current
    if (!outer) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = outer.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      
      const activeFrame = framesRef.current[activeDeviceID]
      if (activeFrame) {
        gsap.to(activeFrame, {
          rotateY: x * 8,
          rotateX: -y * 8,
          duration: 0.5,
          ease: 'power2.out'
        })
      }
    }

    const handleMouseLeave = () => {
      const activeFrame = framesRef.current[activeDeviceID]
      if (activeFrame) {
        gsap.to(activeFrame, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.8,
          ease: 'power2.out'
        })
      }
    }

    outer.addEventListener('mousemove', handleMouseMove)
    outer.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      outer.removeEventListener('mousemove', handleMouseMove)
      outer.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [activeDeviceID, hoverCapable, prefersReducedMotion])

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

  // No JS-inserted pill needed: active state is handled by CSS classes on the button itself.

  const activeSpec = DEVICE_SPECS.find((d) => d.id === activeDeviceID)!
  const activeContent = DEVICE_CONTENT[activeDeviceID]
  const padTop = 100 / parseAspect(activeSpec.aspectRatio)
  const isNarrowScreen = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(max-width: 640px)').matches : false
  // Reduce the displayed padding-top on narrow screens so the preview height is not excessively tall
  const displayPadTop = isNarrowScreen ? padTop * 0.68 : padTop

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
            <div ref={tabsRef} className="relative inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-muted/50 p-1.5 backdrop-blur-md overflow-x-auto touch-pan-x flex-nowrap whitespace-nowrap">
              {DEVICE_SPECS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  data-device={d.id}
                  onClick={() => {
                    prevIDRef.current = activeDeviceID
                    setActiveDeviceID(d.id)
                  }}
                  className={`relative z-10 flex items-center gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeDeviceID === d.id
                      ? 'text-text-primary bg-text-primary/10 border border-brand/30 shadow-lg'
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
              className="relative w-full max-w-[420px] sm:max-w-sm overflow-visible perspective-1000"
              style={{ perspective: '1200px' }}
            >
              {/* Animated glow background */}
              <div 
                className="absolute inset-0 -z-10 rounded-[inherit] blur-3xl opacity-30 transition-all duration-700"
                style={{
                  background: `radial-gradient(circle at center, ${
                    activeDeviceID === 'tv' ? 'rgb(37, 99, 235)' :
                    activeDeviceID === 'mobile' ? 'rgb(147, 51, 234)' :
                    activeDeviceID === 'tablet' ? 'rgb(236, 72, 153)' :
                    'rgb(6, 182, 212)'
                  } 0%, transparent 70%)`,
                  transform: 'scale(1.1)'
                }}
              />
              
              <div
                className="relative overflow-hidden border border-border-subtle bg-gradient-to-br from-surface-muted/50 to-surface-base/20 shadow-2xl backdrop-blur-sm transition-all duration-700"
                style={{ 
                  borderRadius: `${activeSpec.radius}px`,
                  boxShadow: `0 20px 60px -15px ${
                    activeDeviceID === 'tv' ? 'rgba(37, 99, 235, 0.3)' :
                    activeDeviceID === 'mobile' ? 'rgba(147, 51, 234, 0.3)' :
                    activeDeviceID === 'tablet' ? 'rgba(236, 72, 153, 0.3)' :
                    'rgba(6, 182, 212, 0.3)'
                  }`,
                }}
              >
                {/* Ratio box for aspect ratio */}
                <div ref={ratioBoxRef} className="w-full" style={{ paddingTop: `${displayPadTop}%` }} />

                {/* Animated gradient overlay for depth */}
                <div 
                  className="absolute inset-0 opacity-40 pointer-events-none transition-opacity duration-700"
                  style={{
                    background: `linear-gradient(135deg, ${
                      activeDeviceID === 'tv' ? 'rgba(37, 99, 235, 0.1)' :
                      activeDeviceID === 'mobile' ? 'rgba(147, 51, 234, 0.1)' :
                      activeDeviceID === 'tablet' ? 'rgba(236, 72, 153, 0.1)' :
                      'rgba(6, 182, 212, 0.1)'
                    } 0%, transparent 60%)`
                  }}
                />

                {/* Device frames */}
                {DEVICE_SPECS.map((d) => (
                  <div
                    key={d.id}
                    ref={(el) => (framesRef.current[d.id] = el)}
                    className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300`}
                    style={{
                      opacity: activeDeviceID === d.id ? 1 : 0,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {
                      // Render the matching SVG asset for each device. Use <img> so the SVG stays sandboxed
                      // and responsive. Keep sizes a little smaller than the container to avoid overlap.
                      d.id === 'mobile' ? (
                        <img src={mobileDeviceSvg} alt={`${d.label} frame`} className="max-h-[88%] max-w-[88%] object-contain drop-shadow-2xl" draggable={false} />
                      ) : d.id === 'tv' ? (
                        <img src={tvDeviceSvg} alt={`${d.label} frame`} className="max-h-[92%] max-w-[92%] object-contain drop-shadow-2xl" draggable={false} />
                      ) : d.id === 'tablet' ? (
                        <img src={tabletDeviceSvg} alt={`${d.label} frame`} className="max-h-[90%] max-w-[90%] object-contain drop-shadow-2xl" draggable={false} />
                      ) : d.id === 'laptop' ? (
                        <img src={laptopDeviceSvg} alt={`${d.label} frame`} className="max-h-[92%] max-w-[92%] object-contain drop-shadow-2xl" draggable={false} />
                      ) : (
                        <svg className="max-h-[95%] max-w-[95%]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true" />
                      )
                    }
                  </div>
                ))}

                {/* Shine effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                    transform: 'translateX(-100%)',
                    animation: 'shine 3s ease-in-out infinite'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

Devices.displayName = 'Devices'

export default Devices
