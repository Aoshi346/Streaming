import React, { forwardRef, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// icons are replaced with brand logo
import fullvisionLogo from "../assets/fullvision_logo2.svg";
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
      "Ya no más.\n\n" +
      "Con FullVisionTV siempre tendrás programación variada e interesante todos los días.\n\n" +
      "Más de +10.000 Series y +45.000 películas de Blim, Netflix, Amazon Prime, HBO, FOX+, Disney+ y KIDS en un solo lugar.",
    icon: (
      <img
        src={fullvisionLogo}
        alt="FullVisionTV"
        className="h-12 w-12 rounded-full object-contain"
      />
    ),
    variant: "tv",
  },
  {
    title: "MEJORAMOS TODOS LOS DÍAS PARA TI",
    description:
      "¿Cansado de los altos costos de la TV por cable, sus SVA, canales adicionales y PPV?\n\n" +
      "Ya no más.\n\n" +
      "Con FullVisionTV siempre pagarás menos y obtendrás más beneficios.\n\n" +
      "Más de +10.000 canales en vivo en SD, HD720P, FHD1080P, 4K, además de contenido con control parental.",
    icon: (
      <img
        src={fullvisionLogo}
        alt="FullVisionTV"
        className="h-12 w-12 rounded-full object-contain"
      />
    ),
    variant: "bolt",
  },
  {
    title: "SIEMPRE TE BENEFICIAMOS",
    description:
      "¿Ansioso por ver programación nueva y premium?\n\n" +
      "Con FullVisionTV pagas sólo tu SUSCRIPCIÓN y obtienes al instante programación Premium y PPV GRATIS, sin tener que pagar adicional cada contenido.\n\n" +
      "Calidad y estabilidad siempre garantizados con soporte técnico y comercial 24/7.",
    icon: (
      <img
        src={fullvisionLogo}
        alt="FullVisionTV"
        className="h-12 w-12 rounded-full object-contain"
      />
    ),
    variant: "kids",
    // emphasize the last card as featured to match the design
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
      className="relative border-t border-border-subtle py-20 sm:py-24 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#2e1065] via-[#4c1d95] to-[#6b21a8] opacity-95 -z-20"
        aria-hidden
      />
      <div className="container-wrapper relative z-10">
        <h2 className="feature-title gsap-section-title text-2xl font-bold tracking-tight sm:text-3xl">
          Todo lo que necesitas para transmitir
        </h2>
        <p className="feature-subtitle gsap-section-subtitle mt-2 max-w-2xl text-text-secondary/90">
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
        {/* Prize / referral announcement (high visibility) */}
        <div className="mt-10">
          <div
            role="region"
            aria-label="Anuncio de premio por referidos"
            className="mx-auto max-w-4xl rounded-lg border border-white/8 bg-white/6 p-4 sm:p-6 text-center shadow-theme-strong"
          >
            <h3 className="text-lg sm:text-2xl font-semibold text-text-primary">
              ¿Sabías que después que te suscribes te premiamos?
            </h3>
            <p className="mt-3 text-sm sm:text-base text-text-primary/90">
              Por cada 3 personas que invites y contraten cualquiera de nuestros
              paquetes, cargaremos 1 mes gratis a tu cuenta como beneficio por
              tu lealtad.
            </p>
            <p className="mt-2 text-sm sm:text-base font-semibold text-text-primary">
              ¡Con FullVisionTV ganas por siempre!
            </p>
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
