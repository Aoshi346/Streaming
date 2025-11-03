import { forwardRef } from 'react'

const faqs = [
  {
    q: '¿Qué es FullVision?',
    a: 'FullVision es un servicio de streaming que ofrece una amplia variedad de series de TV galardonadas, películas, anime, documentales y más en miles de dispositivos conectados a internet.',
  },
  {
    q: '¿Cuánto cuesta FullVision?',
    a: 'Mira FullVision en tu smartphone, tablet, Smart TV, laptop o dispositivo de streaming, todo por una tarifa mensual fija. Los planes van desde $9.99 a $15.99 al mes. Sin costos extra, sin contratos.',
  },
  {
    q: '¿Dónde puedo ver?',
    a: 'Mira en cualquier lugar, en cualquier momento. Inicia sesión con tu cuenta de FullVision para ver instantáneamente en la web en fullvision.com desde tu computadora personal o en cualquier dispositivo conectado a internet que ofrezca la aplicación de FullVision.',
  },
  {
    q: '¿Puedo cancelar?',
    a: 'FullVision es flexible. No hay contratos molestos ni compromisos. Puedes cancelar fácilmente tu cuenta en línea en dos clics.',
  },
]

const FAQ = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} id="faq" className="relative border-t border-white/10 py-16 sm:py-20">
      <div className="absolute inset-0 bg-section-spotlight opacity-80" aria-hidden />
      <div className="container-wrapper relative">
  <h2 className="gsap-section-title text-2xl font-bold tracking-tight sm:text-3xl">Preguntas frecuentes</h2>
        <div className="mt-6 space-y-3 text-text-secondary">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group rounded-lg border border-white/10 bg-white/[0.05] p-4 transition duration-200 open:border-brand/40 open:bg-white/[0.09]">
              <summary className="cursor-pointer select-none text-base font-medium text-text-primary">
                {q}
              </summary>
              <p className="mt-2 text-sm text-text-secondary">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
})

FAQ.displayName = 'FAQ'

export default FAQ
