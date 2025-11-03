import { forwardRef } from 'react'
import { FaCheck } from 'react-icons/fa'

const perks = [
  'Películas y series ilimitadas sin anuncios',
  'Mira en 4 dispositivos a la vez',
  'Descarga para ver sin conexión',
  'Cancela en cualquier momento',
]

const PricingCTA = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} id="pricing" className="border-t border-white/10 py-16 sm:py-20">
      <div className="container-wrapper">
  <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-theme-strong">
          <div className="px-6 py-8 sm:px-10">
            <h2 className="gsap-section-title text-2xl font-bold tracking-tight sm:text-3xl">Elige un plan y comienza</h2>
            <p className="gsap-section-subtitle mt-2 text-text-secondary">Todos los planes incluyen nuestro catálogo completo y recomendaciones personalizadas.</p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="pricing-card rounded-xl border border-white/10 bg-white/[0.03] p-5 shadow-theme-soft transition-transform duration-200 hover:-translate-y-1 hover:border-brand/40">
                <div className="flex items-end gap-2">
                  <span className="text-xl font-semibold">Estándar</span>
                  <span className="text-text-muted text-sm">1080p</span>
                </div>
                <div className="mt-1 text-3xl font-extrabold">$9.99<span className="text-base font-medium text-text-muted">/mo</span></div>
                <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                  {perks.map((p) => (
                    <li key={p} className="flex items-start gap-2"><FaCheck className="mt-1 h-4 w-4 text-accent" />{p}</li>
                  ))}
                </ul>
                <a href="#" className="mt-5 inline-block w-full rounded-md bg-button-gradient px-4 py-2 text-center font-semibold shadow-theme-soft transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-theme-strong">Comenzar Estándar</a>
              </div>
              <div className="pricing-card rounded-xl border border-brand/40 bg-white/[0.05] p-5 shadow-theme-strong ring-2 ring-brand-light/40 transition-transform duration-200 hover:-translate-y-1.5">
                <div className="flex items-end gap-2">
                  <span className="text-xl font-semibold">Premium</span>
                  <span className="text-text-muted text-sm">4K + HDR</span>
                </div>
                <div className="mt-1 text-3xl font-extrabold">$15.99<span className="text-base font-medium text-text-muted">/mo</span></div>
                <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                  {perks.map((p) => (
                    <li key={p} className="flex items-start gap-2"><FaCheck className="mt-1 h-4 w-4 text-accent" />{p}</li>
                  ))}
                  <li className="flex items-start gap-2"><FaCheck className="mt-1 h-4 w-4 text-accent" />Audio espacial</li>
                </ul>
                <a href="#" className="mt-5 inline-block w-full rounded-md bg-button-gradient px-4 py-2 text-center font-semibold shadow-theme-strong transition-transform duration-200 hover:-translate-y-0.5">Ir a Premium</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

PricingCTA.displayName = 'PricingCTA'

export default PricingCTA
