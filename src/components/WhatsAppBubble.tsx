import React, { useEffect, useRef, useState } from "react";
import { FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { IoClose, IoChatbubblesOutline } from "react-icons/io5";

type Props = {
  /** WhatsApp phone number in international format without + or spaces e.g. 15551234567 */
  phone?: string;
  /** Pre-filled message */
  message?: string;
  /** Facebook page URL */
  facebookUrl?: string;
};

const WhatsAppBubble: React.FC<Props> = ({
  phone = "14099954149",
  message = "Hola! Necesito ayuda con FullVisionTV",
  facebookUrl = "https://www.facebook.com/fullvisiontv",
}) => {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div ref={containerRef} className="fixed left-4 bottom-6 z-50">
      {/* Info panel (opens upwards) */}
      {open && (
        <div
          id="contact-panel"
          role="dialog"
          aria-label="Panel de contacto"
          className="mb-4 w-80 animate-fade-in relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Animated gradient border wrapper */}
          <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-[#822e6a] via-[#5456d5] to-[#1f1f66] animate-gradient-x opacity-90" />

          {/* Outer glow effect */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#822e6a]/40 via-[#5456d5]/30 to-[#1f1f66]/40 blur-xl -z-10 animate-pulse-soft" />

          {/* Main card with gradient background */}
          <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_70px_-20px_rgba(84,86,213,0.6)]">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a103d] via-[#150d30] to-[#0f0a24]" />

            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#822e6a]/10 via-transparent to-[#5456d5]/10" />

            <div className="relative p-5">
              {/* Header with gradient accent */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#822e6a] via-[#5456d5] to-[#1f1f66] p-[2px] shadow-lg shadow-purple-500/20">
                      <div className="w-full h-full rounded-[10px] bg-gradient-to-br from-[#1a103d] to-[#0f0a24] flex items-center justify-center">
                        <IoChatbubblesOutline className="w-6 h-6 text-[#a78bfa]" />
                      </div>
                    </div>
                    {/* Online indicator */}
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#1a103d] animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">
                      ¿Necesitas ayuda?
                    </h3>
                    <p className="text-sm text-[#a78bfa]">Estamos en línea</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors group"
                >
                  <IoClose className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </button>
              </div>

              {/* Message with gradient accent */}
              <div className="relative mb-5 p-4 rounded-xl bg-gradient-to-br from-[#822e6a]/15 via-[#5456d5]/10 to-[#1f1f66]/15 border border-[#5456d5]/30">
                <p className="text-sm text-white/90 leading-relaxed">
                  👋 ¡Hola! Estamos aquí para ayudarte. Escríbenos por WhatsApp
                  o visítanos en Facebook.
                </p>
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-[#822e6a]/20 via-[#5456d5]/15 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                </div>
              </div>

              {/* Action buttons with gradient styling */}
              <div className="flex flex-col gap-3">
                {/* WhatsApp button */}
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="group relative flex items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 text-sm font-bold bg-gradient-to-r from-emerald-500 to-emerald-400 text-white transition-all duration-300 hover:shadow-[0_8px_30px_-5px_rgba(16,185,129,0.5)] hover:scale-[1.02] overflow-hidden"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  <FaWhatsapp className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Chatear por WhatsApp</span>
                </a>

                {/* Facebook button with site gradient */}
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="group relative flex items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 text-sm font-bold bg-gradient-to-r from-[#822e6a] via-[#5456d5] to-[#1f1f66] text-white transition-all duration-300 hover:shadow-[0_8px_30px_-5px_rgba(84,86,213,0.5)] hover:scale-[1.02] overflow-hidden border border-white/10"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  <FaFacebookF className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Visitar Facebook</span>
                </a>
              </div>

              {/* Footer with gradient text */}
              <div className="mt-4 pt-4 border-t border-[#5456d5]/30 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-[#a78bfa]">Disponible 24/7</span>
              </div>
            </div>
          </div>

          {/* Pointer arrow with gradient */}
          <div className="absolute -bottom-2 left-8 w-4 h-4 rotate-45 bg-gradient-to-br from-[#1a103d] to-[#0f0a24] border-r border-b border-[#5456d5]/50" />
        </div>
      )}

      {/* Toggle button */}
      <div className="relative">
        {/* Outer animated glow ring */}
        <span
          className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#822e6a] via-[#5456d5] to-[#1f1f66] opacity-60 blur-lg animate-pulse-soft pointer-events-none"
          aria-hidden
        />

        {/* Button with gradient border */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls="contact-panel"
          aria-label={
            open ? "Cerrar panel de contacto" : "Abrir panel de contacto"
          }
          onClick={(e) => {
            e.stopPropagation();
            setOpen((s) => !s);
          }}
          className="group relative flex items-center justify-center rounded-full p-1 bg-gradient-to-r from-[#822e6a] via-[#5456d5] to-[#1f1f66] shadow-[0_10px_40px_-10px_rgba(84,86,213,0.6)] transform transition-all duration-200 hover:scale-110 focus:scale-110 focus:outline-none"
        >
          <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#0f0a24] group-hover:bg-[#0f0a24]/90 transition-colors">
            <FaWhatsapp className="w-7 h-7 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
          </span>

          {/* Notification dot */}
          <span
            className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 border-2 border-[#0f0a24] shadow-lg animate-pulse"
            aria-hidden
          />
        </button>
      </div>
    </div>
  );
};

export default WhatsAppBubble;
