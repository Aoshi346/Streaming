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
          className="mb-3 w-72 max-w-xs rounded-lg bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl p-3 text-white animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-full p-2">
              <FaWhatsapp className="w-4 h-4 text-white" aria-hidden />
            </div>

            <div className="flex-1">
              <div className="font-semibold">Soporte por WhatsApp</div>
              <div className="text-sm text-white/80">+{phone} · Disponible 24/7</div>
            </div>
          </div>

          <p className="mt-3 text-sm text-white/75">Escríbenos y te responderemos lo antes posible. Usa el botón para abrir el chat en WhatsApp.</p>

          <div className="mt-3 flex items-center gap-2">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center flex-1 rounded-md px-3 py-2 text-sm font-semibold bg-gradient-to-tr from-emerald-600 to-emerald-400 hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/30"
            >
              Chatear ahora
            </a>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="p-2 rounded-md bg-white/6 hover:bg-white/8"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white/90">
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Toggle button (icon) */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls="whatsapp-panel"
        aria-label={open ? 'Cerrar panel de WhatsApp' : 'Abrir panel de WhatsApp'}
        onClick={(e) => {
          e.stopPropagation()
          setOpen((s) => !s)
        }}
        className="whatsapp-toggle flex items-center gap-3 rounded-full px-3 py-2 shadow-lg transform transition-transform duration-150 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white"
      >
        <span className="sr-only">Contactar por WhatsApp</span>
        <span className="bg-white/10 rounded-full p-2 flex items-center justify-center">
          <FaWhatsapp className="w-5 h-5 text-white" aria-hidden />
        </span>
      </button>

      {/* (panel rendered above the button; duplicate below removed) */}
    </div>
  )
}

export default WhatsAppBubble
