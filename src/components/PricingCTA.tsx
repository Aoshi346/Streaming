import { forwardRef } from "react";
import { FaCheck } from "react-icons/fa";

// Payment method logos
import zelleLogo from "../assets/images/Zelle_logo.png";
import paypalLogo from "../assets/images/PayPal_logo.webp";
import mastercardLogo from "../assets/images/mastercard_logo.svg";
import binanceLogo from "../assets/images/binance-logo-hd.webp";
import pipolPayLogo from "../assets/images/pipol_pay_logo.png";
import facebankLogo from "../assets/images/facebank_logo.webp";

// Payment methods for the marquee with logo images
const PAYMENT_METHODS = [
  { logo: zelleLogo, name: "Zelle", size: "h-6 sm:h-8" },
  { logo: paypalLogo, name: "PayPal", size: "h-6 sm:h-8" },
  {
    logo: mastercardLogo,
    name: "Tarjeta Crédito/Débito",
    size: "h-10 sm:h-12",
  },
  { logo: binanceLogo, name: "Binance USDT", size: "h-16 sm:h-24" },
  { logo: pipolPayLogo, name: "Pipol Pay", size: "h-6 sm:h-8" },
  { logo: facebankLogo, name: "Facebank", size: "h-6 sm:h-8" },
];

const PLANS = [
  {
    id: "standard",
    title: "Paquete Estándar",
    subtitle: "Tv en vivo 24/7 + Canales premium",
    price: "$20",
    term: "x1 Mes",
    strike: "$30.99",
    accent: "bg-brand/5 border-brand-dark/30 shadow-theme-soft",
    cta: "COMPRAR AHORA",
    perks: [
      "1 Mes de Servicio",
      "X3 Pantallas FHD",
      "Soporte 24/7 Gratis",
      "Instalación Gratis",
      "PPV Gratuito",
      "Canales premium sin costo adicional",
    ],
  },
  {
    id: "premium",
    title: "Paquete Premium",
    subtitle: "Tv en vivo 24/7 + Canales premium",
    price: "$40",
    term: "x3 Meses",
    strike: "$80.99",
    accent:
      "bg-brand/8 border-brand/40 shadow-theme-strong ring-2 ring-brand-light/40",
    cta: "COMPRAR AHORA",
    badge: "POPULAR",
    perks: [
      "3 Meses de Servicio",
      "X3 Pantallas FHD",
      "Soporte 24/7 Gratis",
      "Instalación Gratis",
      "PPV Gratuito",
      "Canales Premium sin costo adicional",
    ],
  },
  {
    id: "gold",
    title: "Paquete Gold",
    subtitle: "Tv en vivo 24/7 + Canales premium",
    price: "$65",
    term: "x6 Meses",
    strike: "$130.99",
    accent: "bg-brand/5 border-brand-dark/30 shadow-theme-soft",
    cta: "COMPRAR AHORA",
    perks: [
      "6 Meses de Servicio",
      "X3 Pantallas FHD",
      "Soporte 24/7 Gratis",
      "Instalación Gratis",
      "PPV Gratuito",
      "Canales Premium sin costo adicional",
    ],
  },
  {
    id: "platinum",
    title: "Paquete Platinum",
    subtitle: "Tv en vivo 24/7 + Canales premium",
    price: "$120",
    term: "x12 Meses",
    strike: "$240.99",
    accent: "bg-brand/8 border-brand-dark/30 shadow-theme-strong",
    cta: "COMPRAR AHORA",
    badge: "+AHORRO",
    perks: [
      "12 Meses de Servicio",
      "X3 Pantallas FHD",
      "Soporte 24/7 Gratis",
      "Instalación Gratis",
      "PPV Gratuito",
      "Canales premium sin costo adicional",
    ],
  },
];

const PricingCTA = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      id="pricing"
      className="relative py-20 sm:py-24 overflow-hidden"
    >
      {/* Base background gradient - matches Devices section palette for seamless flow */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#822e6a] via-[#5456d5] to-[#1f1f66] pointer-events-none" />

      {/* Aurora animated background blobs - simplified for mobile performance */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Top-left blob - reduced blur on mobile, no animation on mobile */}
        <div
          className="absolute -top-20 -left-1/4 w-[70%] h-[55%] rounded-full bg-[#822e6a]/30 blur-[40px] sm:blur-[80px] md:blur-[100px] sm:animate-aurora-1"
          style={{ willChange: "auto" }}
        />
        {/* Center-right blob */}
        <div
          className="absolute top-1/3 -right-1/4 w-[55%] h-[50%] rounded-full bg-[#5456d5]/25 blur-[40px] sm:blur-[70px] md:blur-[90px] sm:animate-aurora-2"
          style={{ willChange: "auto" }}
        />
        {/* Bottom blob */}
        <div
          className="absolute bottom-0 left-1/4 w-[60%] h-[45%] rounded-full bg-[#1f1f66]/35 blur-[40px] sm:blur-[70px] md:blur-[90px] sm:animate-aurora-3"
          style={{ willChange: "auto" }}
        />
      </div>

      <div className="container-wrapper relative z-10">
        <div className="text-center mb-8 sm:mb-12 px-4">
          <h2 className="gsap-section-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#fcf3e1] drop-shadow-md">
            Elige un plan y comienza
          </h2>
          <p className="gsap-section-subtitle mt-3 sm:mt-4 text-base sm:text-lg text-[#fcf3e1]/90 max-w-2xl mx-auto font-medium">
            Todos los planes incluyen nuestro catálogo completo y
            recomendaciones personalizadas.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto px-2 sm:px-0">
          {PLANS.map((p, idx) => {
            const isPopular = Boolean(p.badge);
            return (
              <div
                key={p.id}
                className={`group pricing-card relative rounded-2xl backdrop-blur-md p-4 sm:p-6 transition-all duration-300 hover:scale-105
                  ${
                    isPopular
                      ? /* Popular card: deeper bg, brighter border, largest & softest shadow, intense glow */
                        "bg-[#1a103d]/95 border border-white/40 shadow-[0_30px_80px_-15px_rgba(84,86,213,0.6),0_15px_50px_-10px_rgba(130,46,106,0.5),0_0_60px_-5px_rgba(139,92,246,0.3)] lg:scale-105 lg:-translate-y-4 ring-2 ring-[#8b5cf6]/50"
                      : /* Regular cards: deeper bg, subtle border, soft diffuse shadow */
                        "bg-[#150d30]/90 border border-white/15 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6),0_10px_30px_-10px_rgba(84,86,213,0.2)]"
                  }
                  hover:bg-[#1e1445]/95 hover:shadow-[0_35px_80px_-20px_rgba(84,86,213,0.5),0_0_40px_-10px_rgba(139,92,246,0.3)]`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Intensified glow effect behind Popular card */}
                {isPopular && (
                  <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[#8b5cf6]/30 via-[#a855f7]/20 to-[#7c3aed]/30 -z-10 opacity-90 sm:blur-xl" />
                )}

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#5456d5]/20 to-[#822e6a]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:blur-lg -z-10" />

                {/* Premium badge - Mobile optimized */}
                {p.badge && (
                  <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-20">
                    <div className="relative">
                      {/* Badge container - solid background for mobile, gradient for desktop */}
                      <div className="group/badge relative overflow-hidden bg-gradient-to-r from-[#5456d5] via-[#822e6a] to-[#5456d5] text-white text-[10px] sm:text-xs font-black px-3 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-lg sm:shadow-2xl transform rotate-3 sm:rotate-6 hover:rotate-0 hover:scale-105 transition-transform duration-300 border-2 border-white/40 sm:border-white/30">
                        {/* Shine sweep effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/badge:translate-x-full transition-transform duration-500 ease-out" />
                        {/* Content */}
                        <span className="relative z-10 flex items-center gap-1 sm:gap-1.5">
                          <svg
                            className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {p.badge}
                        </span>

                        {/* Bottom highlight */}
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Card header */}
                <div className="relative overflow-hidden rounded-xl bg-white/5 p-3 sm:p-4 mb-3 sm:mb-4 border border-white/5">
                  <div className="relative z-10">
                    {/* Package name: pure white, bold */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                      {p.title}
                    </h3>
                    {/* Subtitle: transparent white for reduced visual noise */}
                    <p className="text-white/60 text-xs leading-relaxed font-medium">
                      {p.subtitle}
                    </p>
                  </div>
                </div>

                {/* Pricing section */}
                <div className="relative mb-4 sm:mb-6">
                  <div className="text-center py-3 sm:py-4 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {/* Strike-through price: ~50% opacity */}
                      <span className="text-xs sm:text-sm text-white/50 line-through font-medium">
                        {p.strike}
                      </span>
                      <span className="text-[10px] sm:text-xs bg-red-500/90 text-white px-2 py-0.5 rounded-full font-bold shadow-sm">
                        AHORRO
                      </span>
                    </div>
                    <div className="flex items-baseline justify-center">
                      {/* Price: pure white, extra bold with glow */}
                      <span className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
                        {p.price}
                      </span>
                    </div>
                    {/* Term: transparent white */}
                    <p className="text-white/70 text-xs sm:text-sm font-semibold mt-1">
                      {p.term}
                    </p>
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
                      {/* Checkmark: pure white bg with deep indigo icon */}
                      <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white flex items-center justify-center mt-0.5 shadow-md">
                        <FaCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#1f1f66]" />
                      </div>
                      {/* Feature text: transparent white, brightens on hover */}
                      <span className="text-xs sm:text-sm text-white/70 group-hover/item:text-white transition-colors duration-200 leading-relaxed font-medium">
                        {perk}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button - Harmonized gradient with gloss effect */}
                <button className="relative w-full group/btn overflow-hidden rounded-xl font-bold text-white py-2.5 sm:py-3 px-4 sm:px-6 transition-all duration-300 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 hover:scale-105 shadow-[0_4px_25px_-5px_rgba(124,58,237,0.5)] hover:shadow-[0_8px_35px_-5px_rgba(124,58,237,0.7)] ring-1 ring-white/20 ring-inset">
                  {/* Shine sweep effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out" />
                  {/* Inner highlight for gloss effect */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-sm">
                    {p.cta}
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </button>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#5456d5] to-transparent opacity-60" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 text-center px-4">
          <p className="text-[#fcf3e1]/80 text-xs sm:text-sm mb-3 sm:mb-4">
            ¿Necesitas ayuda para elegir? Contáctanos
          </p>
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <span className="inline-flex items-center gap-2 text-[#fcf3e1] text-xs sm:text-sm font-medium">
              <FaCheck className="text-[#fcf3e1]/70 flex-shrink-0" /> Sin
              compromisos
            </span>
            <span className="inline-flex items-center gap-2 text-[#fcf3e1] text-xs sm:text-sm font-medium">
              <FaCheck className="text-[#fcf3e1]/70 flex-shrink-0" /> Cancela
              cuando quieras
            </span>
            <span className="inline-flex items-center gap-2 text-[#fcf3e1] text-xs sm:text-sm font-medium">
              <FaCheck className="text-[#fcf3e1]/70 flex-shrink-0" /> Soporte
              24/7
            </span>
          </div>
        </div>

        {/* Payment Methods Marquee */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10 pb-8">
          <p className="text-center text-[#fcf3e1] text-sm sm:text-base mb-8 font-semibold tracking-wide uppercase">
            Métodos de pago aceptados
          </p>
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            {/* Scrolling track */}
            <div className="flex animate-marquee items-center">
              {/* First set */}
              <div className="flex gap-12 sm:gap-20 items-center shrink-0 px-8">
                {PAYMENT_METHODS.map((method) => (
                  <div
                    key={method.name}
                    className="group flex flex-col items-center justify-center gap-2 opacity-70 hover:opacity-100 transition-opacity duration-300"
                  >
                    <img
                      src={method.logo}
                      alt={method.name}
                      className={`${method.size} w-auto object-contain filter brightness-0 invert`}
                    />
                    {/* Text label - appears on hover */}
                    <span className="text-[#fcf3e1] text-[10px] sm:text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-4">
                      {method.name}
                    </span>
                  </div>
                ))}
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex gap-12 sm:gap-20 items-center shrink-0 px-8">
                {PAYMENT_METHODS.map((method) => (
                  <div
                    key={`${method.name}-dup`}
                    className="group flex flex-col items-center justify-center gap-2 opacity-70 hover:opacity-100 transition-opacity duration-300"
                  >
                    <img
                      src={method.logo}
                      alt={method.name}
                      className={`${method.size} w-auto object-contain filter brightness-0 invert`}
                    />
                    {/* Text label - appears on hover */}
                    <span className="text-[#fcf3e1] text-[10px] sm:text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-4">
                      {method.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Transition to FAQ (#2e1065) */}
      {/* Wave divider removed */}
    </section>
  );
});

PricingCTA.displayName = "PricingCTA";

export default PricingCTA;
