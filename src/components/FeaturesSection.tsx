import React, { forwardRef, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// icons are replaced with brand logo
import fullvisionLogo from "../assets/images/fullvision_logo_color.svg";
import FeatureCard, { FeatureVariant } from "./FeatureCard";

gsap.registerPlugin(ScrollTrigger);

const features: Array<{
  title: string;
  description: string;
  icon: React.ReactNode;
  variant: FeatureVariant;
  featured?: boolean;
}> = [
  {
    title: "ENTRETENIMIENTO GARANTIZADO",
    description:
      "¿Aburrido de lo repetitiva que es la TV por cable?\n\n" +
      "*Ya no más.*\n\n" +
      "Con *FULLVISIONTV* siempre tendrás programación *variada e interesante* todos los días.\n\n" +
      "Más de *+10.000 Series* y *+45.000 películas* de Blim, Netflix, Amazon Prime, HBO, FOX+, Disney+ y KIDS *en un solo lugar*.",
    icon: (
      <img
        src={fullvisionLogo}
        alt="FullVisionTV"
        className="h-24 w-24 object-contain drop-shadow-lg"
      />
    ),
    variant: "tv",
  },
  {
    title: "MEJORAMOS TODOS LOS DÍAS PARA TI",
    description:
      "¿Cansado de los altos costos de la TV por cable, sus SVA, canales adicionales y PPV?\n\n" +
      "*Ya no más.*\n\n" +
      "Con *FULLVISIONTV* siempre pagarás *menos* y obtendrás *más beneficios*.\n\n" +
      "Más de *+10.000 canales en vivo* en HD, HD720P, FHD1080P, *4K*, Adultos XXX con *control parental*.",
    icon: (
      <img
        src={fullvisionLogo}
        alt="FullVisionTV"
        className="h-24 w-24 object-contain drop-shadow-lg"
      />
    ),
    variant: "bolt",
  },
  {
    title: "SIEMPRE TE BENEFICIAMOS",
    description:
      "¿Ansioso por ver programación nueva y premium?\n\n" +
      "*Ya no más.*\n\n" +
      "Con *FULLVISIONTV* pagas sólo tu *SUSCRIPCIÓN* y obtienes al instante programación *Premium* y *PPV GRATIS*, SIN TENER QUE PAGAR ADICIONAL CADA CONTENIDO.\n\n" +
      "Calidad y estabilidad siempre garantizados con *soporte técnico y comercial 24/7*.",
    icon: (
      <img
        src={fullvisionLogo}
        alt="FullVisionTV"
        className="h-24 w-24 object-contain drop-shadow-lg"
      />
    ),
    variant: "kids",
    featured: true,
  },
];

const FeaturesSection = forwardRef<HTMLElement>((_, ref) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // expose outer ref if parent passes one
  useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") ref(sectionRef.current as any);
    else (ref as any).current = sectionRef.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Ensure cards are visible by default in case ScrollTrigger doesn't run (e.g. navigation without reload)
    const cardsNodeList = el.querySelectorAll(".feature-card");
    const cards = Array.from(cardsNodeList) as HTMLElement[];
    if (!cards.length) return;

    gsap.set(cards, { opacity: 1, y: 0 });

    if (prefersReduced) {
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // mobile
        "(max-width: 767px)": function () {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          });
          tl.from(cards, {
            opacity: 0,
            y: 20,
            duration: 0.35,
            ease: "power2.out",
            stagger: 0.08,
          });
        },
        // tablet and up
        "(min-width: 768px)": function () {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          });
          tl.from(cards, {
            opacity: 0,
            y: 24,
            duration: 0.45,
            ease: "power2.out",
            stagger: 0.15,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-20 sm:py-24 overflow-hidden -mt-1"
    >
      {/* Background gradient connecting with Download section bottom wave */}
      {/* Horizontal gradient matching the wave, with vertical fade overlay */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, #822e6a 0%, #5456d5 50%, #1f1f66 100%)",
        }}
      />
      {/* Vertical fade to white at bottom */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, transparent 40%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.7) 80%, #ffffff 100%)",
        }}
      />

      {/* Aurora animated background blobs */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -left-1/4 w-[70%] h-[40%] rounded-full bg-[#822e6a]/20 blur-[60px] sm:blur-[100px]"
          style={{ willChange: "auto" }}
        />
        <div
          className="absolute top-1/4 -right-1/4 w-[55%] h-[35%] rounded-full bg-[#5456d5]/15 blur-[50px] sm:blur-[90px]"
          style={{ willChange: "auto" }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-[50%] h-[30%] rounded-full bg-[#1f1f66]/20 blur-[50px] sm:blur-[80px]"
          style={{ willChange: "auto" }}
        />
      </div>

      <div className="container-wrapper relative z-20">
        <h2 className="feature-title gsap-section-title text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#fcf3e1] drop-shadow-lg">
          Todo lo que necesitas para transmitir
        </h2>
        <p className="feature-subtitle gsap-section-subtitle mt-4 max-w-3xl text-lg sm:text-xl font-medium text-[#fcf3e1]/85 leading-relaxed">
          Desde tu sala de estar hasta en movimiento, FullVision mantiene tu
          entretenimiento fluyendo con poderosas características diseñadas para
          todos.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <FeatureCard
              key={f.title}
              icon={f.icon}
              title={f.title}
              description={f.description}
              variant={f.variant}
              layout="vertical"
              featured={Boolean(f.featured)}
            />
          ))}
        </div>
        {/* Prize / referral announcement - Premium gift card matching pricing section style */}
        <div className="mt-12 sm:mt-16">
          <div
            role="region"
            aria-label="Anuncio de premio por referidos"
            className="group relative mx-auto max-w-3xl"
          >
            {/* Premium badge - positioned outside the overflow-hidden card */}
            <div className="absolute -top-3 -right-2 z-30">
              <div className="relative group/badge">
                {/* Outer glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#f8d675] via-[#fde68a] to-[#f8d675] animate-gradient-x blur-lg opacity-75" />

                {/* Badge container with shine effect */}
                <div className="relative overflow-hidden bg-gradient-to-r from-[#f8d675] via-[#fde68a] to-[#f8d675] text-[#1f1f66] text-sm sm:text-base font-black px-6 py-2.5 rounded-full shadow-2xl transform rotate-6 group-hover/badge:rotate-0 group-hover/badge:scale-110 transition-all duration-300 border-2 border-white/50">
                  {/* Animated shine overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shine-slow" />

                  {/* Content */}
                  <span className="relative z-10 flex items-center gap-2 drop-shadow-sm">
                    <svg
                      className="w-4 h-4 animate-pulse"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    PREMIO
                  </span>

                  {/* Bottom highlight */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                </div>

                {/* Sparkle effects */}
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover/badge:opacity-100 group-hover/badge:animate-ping" />
                <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-0 group-hover/badge:opacity-100 group-hover/badge:animate-ping animation-delay-150" />
              </div>
            </div>

            {/* Card with pricing section styling */}
            <div className="relative rounded-2xl backdrop-blur-md p-6 sm:p-8 pt-8 bg-[#1a103d]/95 border border-white/40 shadow-[0_30px_80px_-15px_rgba(84,86,213,0.6),0_15px_50px_-10px_rgba(130,46,106,0.5),0_0_60px_-5px_rgba(139,92,246,0.3)] ring-2 ring-[#8b5cf6]/50 transition-all duration-300 hover:scale-[1.02]">
              {/* Intensified glow effect behind card */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[#8b5cf6]/40 via-[#a855f7]/30 to-[#7c3aed]/40 blur-2xl -z-10 opacity-90 animate-pulse" />

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#5456d5]/20 to-[#822e6a]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />

              {/* Card header */}
              <div className="relative overflow-hidden rounded-xl bg-white/5 p-5 sm:p-6 mb-6 border border-white/5">
                <div className="relative z-10 text-center">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3">
                    ¿Sabías que después de suscribirte{" "}
                    <em className="italic text-[#fde68a]">te premiamos</em>?
                  </h3>
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed font-medium">
                    🎁{" "}
                    <em className="italic font-bold text-[#fde68a]">
                      Programa de Referidos
                    </em>
                  </p>
                </div>
              </div>

              {/* Stats/Numbers section - similar to pricing */}
              <div className="relative mb-8">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="text-center py-5 sm:py-6 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-5xl sm:text-6xl lg:text-7xl font-black text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.4)]">
                      3
                    </span>
                    <p className="text-white/80 text-sm sm:text-base font-bold mt-2">
                      <em className="italic text-[#fde68a]">Amigos</em>{" "}
                      invitados
                    </p>
                  </div>
                  <div className="text-center py-5 sm:py-6 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#fde68a] drop-shadow-[0_2px_15px_rgba(253,230,138,0.4)]">
                      1
                    </span>
                    <p className="text-white/80 text-sm sm:text-base font-bold mt-2">
                      Mes <em className="italic text-[#fde68a]">GRATIS</em>
                    </p>
                  </div>
                </div>
              </div>

              {/* Features list - same style as pricing */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 group/item hover:translate-x-1 transition-transform duration-200">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white flex items-center justify-center mt-0.5 shadow-md">
                    <svg
                      className="h-3 w-3 text-[#1f1f66]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-white/80 group-hover/item:text-white transition-colors duration-200 leading-relaxed font-medium">
                    Invita{" "}
                    <em className="italic font-bold text-[#fde68a]">amigos</em>{" "}
                    a suscribirse a cualquier paquete
                  </span>
                </div>
                <div className="flex items-start gap-3 group/item hover:translate-x-1 transition-transform duration-200">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white flex items-center justify-center mt-0.5 shadow-md">
                    <svg
                      className="h-3 w-3 text-[#1f1f66]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-white/80 group-hover/item:text-white transition-colors duration-200 leading-relaxed font-medium">
                    Por cada{" "}
                    <em className="italic font-bold text-white">3 referidos</em>
                    , ganas{" "}
                    <em className="italic font-bold text-[#fde68a]">
                      1 mes gratis
                    </em>
                  </span>
                </div>
                <div className="flex items-start gap-3 group/item hover:translate-x-1 transition-transform duration-200">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white flex items-center justify-center mt-0.5 shadow-md">
                    <svg
                      className="h-3 w-3 text-[#1f1f66]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-white/80 group-hover/item:text-white transition-colors duration-200 leading-relaxed font-medium">
                    <em className="italic font-bold text-[#fde68a]">
                      ¡Sin límites!
                    </em>{" "}
                    Sigue invitando y ganando
                  </span>
                </div>
              </div>

              {/* CTA tagline */}
              <div className="text-center">
                <p className="text-xl sm:text-2xl lg:text-3xl font-black drop-shadow-lg">
                  <span className="text-white">¡Con </span>
                  <em className="italic text-[#fde68a]">FullVisionTV</em>
                  <span className="text-white"> ganas </span>
                  <em className="italic text-[#fde68a]">por siempre!</em>
                  <span> 🏆</span>
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#fde68a] to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </div>
      {/* Transition to Stats (#4c1d95) */}
      {/* Wave divider removed */}
    </section>
  );
});

FeaturesSection.displayName = "FeaturesSection";

export default FeaturesSection;
