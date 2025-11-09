import { forwardRef } from 'react'
import { FaCheck } from 'react-icons/fa'

const PLANS = [
  {
    id: 'standard',
    title: 'Paquete Estándar',
    subtitle: 'Tv en vivo 24/7 + Canales premium',
    price: '$20',
    term: 'x1 Mes',
    strike: '$30.99',
    accent: 'bg-white/[0.03] border-white/10 shadow-theme-soft',
    cta: 'COMPRAR AHORA',
    perks: [
      '1 Mes de Servicio',
      'X3 Pantallas FHD',
      'Soporte 24/7 Gratis',
      'Instalación Gratis',
      'PPV Gratuito',
      'Canales premium sin costo adicional',
    ],
  },
  {
    id: 'premium',
    title: 'Paquete Premium',
    subtitle: 'Tv en vivo 24/7 + Canales premium',
    price: '$40',
    term: 'x3 Meses',
    strike: '$80.99',
    accent: 'bg-white/[0.05] border-brand/40 shadow-theme-strong ring-2 ring-brand-light/40',
    cta: 'COMPRAR AHORA',
    badge: 'POPULAR',
    perks: [
      '3 Meses de Servicio',
      'X3 Pantallas FHD',
      'Soporte 24/7 Gratis',
      'Instalación Gratis',
      'PPV Gratuito',
      'Canales Premium sin costo adicional',
    ],
  },
  {
    id: 'gold',
    title: 'Paquete Gold',
    subtitle: 'Tv en vivo 24/7 + Canales premium',
    price: '$65',
    term: 'x6 Meses',
    strike: '$130.99',
    accent: 'bg-white/[0.03] border-white/10 shadow-theme-soft',
    cta: 'COMPRAR AHORA',
    perks: [
      '6 Meses de Servicio',
      'X3 Pantallas FHD',
      'Soporte 24/7 Gratis',
      'Instalación Gratis',
      'PPV Gratuito',
      'Canales Premium sin costo adicional',
    ],
  },
  {
    id: 'platinum',
    title: 'Paquete Platinum',
    subtitle: 'Tv en vivo 24/7 + Canales premium',
    price: '$120',
    term: 'x12 Meses',
    strike: '$240.99',
    accent: 'bg-white/[0.05] border-white/10 shadow-theme-strong',
    cta: 'COMPRAR AHORA',
    perks: [
      '12 Meses de Servicio',
      'X3 Pantallas FHD',
      'Soporte 24/7 Gratis',
      'Instalación Gratis',
      'PPV Gratuito',
      'Canales premium sin costo adicional',
    ],
  },
]

const PricingCTA = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} id="pricing" className="relative border-t border-white/10 py-16 sm:py-20 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-accent/5 opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container-wrapper relative z-10">
        <div className="text-center mb-8 sm:mb-12 px-4">
          <h2 className="gsap-section-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-white to-brand/80 bg-clip-text text-transparent">
            Elige un plan y comienza
          </h2>
          <p className="gsap-section-subtitle mt-3 sm:mt-4 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
            Todos los planes incluyen nuestro catálogo completo y recomendaciones personalizadas.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto px-2 sm:px-0">
          {PLANS.map((p, idx) => (
            <div
              key={p.id}
              className={`group pricing-card relative rounded-2xl ${p.accent} p-4 sm:p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                p.badge ? 'lg:scale-105 lg:-translate-y-2' : ''
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
              
              {/* Premium badge */}
              {p.badge && (
                <div className="absolute -top-4 -right-4 z-20">
                  <div className="relative group/badge">
                    {/* Outer glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 animate-gradient-x blur-lg opacity-75" />
                    
                    {/* Badge container with shine effect */}
                    <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white text-xs font-black px-5 py-2 rounded-full shadow-2xl transform rotate-6 group-hover/badge:rotate-0 group-hover/badge:scale-110 transition-all duration-300 border-2 border-white/30">
                      {/* Animated shine overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine-slow" />
                      
                      {/* Content */}
                      <span className="relative z-10 flex items-center gap-1.5 drop-shadow-lg">
                        <svg className="w-3 h-3 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {p.badge}
                      </span>
                      
                      {/* Bottom highlight */}
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                    </div>
                    
                    {/* Sparkle effects */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover/badge:opacity-100 group-hover/badge:animate-ping" />
                    <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-pink-300 rounded-full opacity-0 group-hover/badge:opacity-100 group-hover/badge:animate-ping animation-delay-150" />
                  </div>
                </div>
              )}

              {/* Card header with gradient background */}
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-transparent p-3 sm:p-4 mb-3 sm:mb-4 backdrop-blur-sm border border-white/10">
                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{p.title}</h3>
                  <p className="text-text-muted text-xs leading-relaxed">{p.subtitle}</p>
                </div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-brand/20 rounded-full blur-2xl" />
              </div>

              {/* Pricing section */}
              <div className="relative mb-4 sm:mb-6">
                <div className="text-center py-3 sm:py-4 rounded-lg bg-gradient-to-br from-white/5 to-transparent border border-white/5">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-xs sm:text-sm text-text-muted line-through opacity-60">{p.strike}</span>
                    <span className="text-[10px] sm:text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full border border-red-500/30">AHORRO</span>
                  </div>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl sm:text-5xl font-black bg-gradient-to-br from-white to-brand/60 bg-clip-text text-transparent">
                      {p.price}
                    </span>
                  </div>
                  <p className="text-brand text-xs sm:text-sm font-semibold mt-1">{p.term}</p>
                </div>
              </div>

              {/* Features list */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {p.perks.map((perk, i) => (
                  <div
                    key={perk}
                    className="flex items-start gap-2 sm:gap-3 group/item hover:translate-x-1 transition-transform duration-200"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-brand to-accent flex items-center justify-center mt-0.5 shadow-lg">
                      <FaCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm text-text-secondary group-hover/item:text-white transition-colors duration-200 leading-relaxed">
                      {perk}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className="relative w-full group/btn overflow-hidden rounded-lg font-bold text-white py-2.5 sm:py-3 px-4 sm:px-6 transition-all duration-300 hover:shadow-xl text-sm sm:text-base">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 bg-[length:200%_100%] group-hover/btn:bg-[length:100%_100%] transition-all duration-500 animate-gradient-x" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {p.cta}
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 text-center px-4">
          <p className="text-text-secondary text-xs sm:text-sm mb-3 sm:mb-4">¿Necesitas ayuda para elegir? Contáctanos</p>
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <span className="inline-flex items-center gap-2 text-brand text-xs sm:text-sm">
              <FaCheck className="text-accent flex-shrink-0" /> Sin compromisos
            </span>
            <span className="inline-flex items-center gap-2 text-brand text-xs sm:text-sm">
              <FaCheck className="text-accent flex-shrink-0" /> Cancela cuando quieras
            </span>
            <span className="inline-flex items-center gap-2 text-brand text-xs sm:text-sm">
              <FaCheck className="text-accent flex-shrink-0" /> Soporte 24/7
            </span>
          </div>
        </div>
      </div>
    </section>
  )
})

PricingCTA.displayName = 'PricingCTA'

export default PricingCTA
