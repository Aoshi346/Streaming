import React, { useEffect, useRef, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

type Props = {
  /** WhatsApp phone number in international format without + or spaces e.g. 15551234567 */
  phone?: string
  /** Pre-filled message */
  message?: string
}

const WhatsAppBubble: React.FC<Props> = ({
  phone = '14099954149', // replace with your number
  message = 'Hola! Necesito ayuda con FullVisionTV',
}) => {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Close panel when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  // keyboard accessibility: close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div ref={containerRef} className="fixed left-4 bottom-6 z-50">
      {/* Info panel (opens upwards) */}
      {open && (
        <div
          id="whatsapp-panel"
          role="dialog"
          aria-label="Panel de contacto por WhatsApp"
          className="mb-3 w-72 max-w-xs rounded-lg bg-[rgb(var(--color-background-rgb))/0.6] bg-gradient-to-br from-[rgba(0,0,0,0.04)] to-[rgba(236,72,153,0.08)] backdrop-blur-md border border-border-subtle ring-1 ring-border-subtle shadow-theme-soft p-3 text-text-primary animate-fade-in relative overflow-visible"
          onClick={(e) => e.stopPropagation()}
        >
          {/* pointer triangle */}
          <div className="absolute -bottom-1 left-6 w-4 h-4 bg-[rgb(var(--color-background-rgb))/0.6] rotate-45 border border-border-subtle shadow-md" aria-hidden />
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-[rgba(0,0,0,0.85)] to-[rgba(236,72,153,0.85)] rounded-full p-0.5">
              <div className="bg-[rgb(var(--color-background-rgb))] rounded-full p-2">
                <div className="rounded-full bg-emerald-500 p-1">
                  <FaWhatsapp className="w-4 h-4 text-text-secondary" aria-hidden />
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="font-semibold">Soporte por WhatsApp</div>
              <div className="text-sm text-text-secondary">+{phone} · Disponible 24/7</div>
            </div>
          </div>

          <p className="mt-3 text-sm text-text-muted">Escríbenos y te responderemos lo antes posible. Usa el botón para abrir el chat en WhatsApp.</p>

          <div className="mt-3 flex items-center gap-2">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center flex-1 rounded-md px-3 py-2 text-sm font-semibold bg-gradient-to-tr from-emerald-500 to-emerald-400 hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/30"
            >
              Chatear ahora
            </a>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="p-2 rounded-md bg-[rgb(var(--color-background-rgb))/0.6] hover:bg-[rgb(var(--color-background-rgb))/0.7]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-text-primary">
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Toggle button (icon) */}
      <div className="relative flex items-center">
        {/* decorative glowing ring */}
        <span className="absolute -inset-1 rounded-full blur-2xl bg-gradient-to-tr from-[rgba(0,0,0,0.12)] to-[rgba(236,72,153,0.12)] opacity-80 animate-pulse-soft pointer-events-none" aria-hidden />
        <button
        type="button"
        aria-expanded={open}
        aria-controls="whatsapp-panel"
        aria-label={open ? 'Cerrar panel de WhatsApp' : 'Abrir panel de WhatsApp'}
        onClick={(e) => {
          e.stopPropagation()
          setOpen((s) => !s)
        }}
        className="whatsapp-toggle group relative flex items-center gap-3 rounded-full px-3 py-2 shadow-theme-soft transform transition-transform duration-150 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 bg-gradient-to-tr from-[rgba(0,0,0,0.9)] to-[rgba(236,72,153,0.9)] text-text-primary"
      >
        <span className="sr-only">Contactar por WhatsApp</span>
        <span className="bg-[rgb(var(--color-background-rgb))/0.7] rounded-full p-2 flex items-center justify-center relative pointer-events-none">
          <div className="rounded-full bg-emerald-500 p-1">
            <FaWhatsapp className="w-5 h-5 text-text-secondary" aria-hidden />
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 shadow-md animate-pulse-soft" aria-hidden />
        </span>
      </button>

        {/* extra subtle glow on hover for tablet */}
        <span className="hidden sm:block absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-tl from-[rgba(0,0,0,0.08)] to-[rgba(236,72,153,0.08)] pointer-events-none" aria-hidden />
      </div>

      {/* (panel rendered above the button; duplicate below removed) */}
    </div>
  )
}

export default WhatsAppBubble
