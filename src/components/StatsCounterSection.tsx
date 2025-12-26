import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiTv } from "react-icons/fi";
import { Clapperboard } from "@/components/animate-ui/icons/clapperboard";
import { Play } from "@/components/animate-ui/icons/play";

gsap.registerPlugin(ScrollTrigger);

const formatCompactNumber = (n: number) => {
  if (n < 1000) return `${Math.round(n)}`;
  const thousands = Math.max(1, Math.round(n / 1000));
  return `${thousands}k+`;
};

type StatCardProps = {
  to: number;
  label: string;
  Icon: React.ComponentType<{ className?: string; animate?: boolean }>;
  duration?: number;
  formatter?: (value: number) => string;
};

function StatCard({
  to,
  label,
  Icon,
  duration = 2,
  formatter = formatCompactNumber,
}: StatCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const prefersReduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // Skip complex animations on mobile for performance
  const isMobile = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(max-width: 768px)").matches,
    []
  );

  const cardRef = useRef<HTMLDivElement | null>(null);
  const valueElRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    const valueEl = valueElRef.current;
    if (!el || !valueEl) return;

    // No GSAP continuous icon animation to avoid conflict with framer-motion

    // Skip hover event listeners on mobile for performance
    if (!isMobile && !prefersReduced) {
      // Hover micro-interactions (desktop only)
      const onEnter = () => {
        gsap.to(el, {
          scale: 1.05,
          boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.5)",
          duration: 0.3,
          ease: "power2.out",
        });
      };
      const onLeave = () => {
        gsap.to(el, {
          scale: 1,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          duration: 0.35,
          ease: "power2.out",
        });
      };
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    }

    // Count-up intro
    // On mobile or reduced motion: show final value immediately
    if (prefersReduced || isMobile) {
      valueEl.textContent = formatter(to);
      return;
    }

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.fromTo(
        obj,
        { val: 0 },
        {
          val: to,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            valueEl.textContent = formatter(obj.val);
          },
          onComplete: () => {},
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, cardRef);

    return () => {
      ctx.revert();
    };
  }, [to, duration, prefersReduced, isMobile]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="stat-card group relative z-20 flex flex-col items-center gap-3 px-7 py-7 sm:px-8 sm:py-8 md:px-10 md:py-10 rounded-2xl border-[3px] border-[#4a5fc9] bg-[linear-gradient(135deg,#131c67_0%,#1d2570_35%,#331165_70%,#4d0c68_100%)] backdrop-blur-lg will-change-transform overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 hover:border-[#6b7fd9] hover:shadow-[0_20px_50px_-10px_rgba(100,150,255,0.3)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div
        className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-purple-500/20 via-blue-500/15 to-purple-500/20 opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-300"
        aria-hidden
      />

      {/* Sheen / chrome shimmer for cinematic look */}
      <div className="card-sheen z-30" aria-hidden>
        <div className={`sheen ${!prefersReduced ? "animate-shine" : ""}`} />
      </div>

      {/* Film frame accents removed for uniform appearance */}

      {/* Film-style perforations on card - reduced count for performance */}
      <div
        className="pointer-events-none absolute inset-x-0 top-2 sm:top-3 flex justify-center px-4 sm:px-5"
        aria-hidden
      >
        <div className="flex gap-4 sm:gap-5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <span
              key={`card-top-${idx}`}
              className="w-3 h-3 sm:w-2.5 sm:h-2.5 rounded-sm bg-[#0d1445] border border-[#4a5fc9]"
            />
          ))}
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-2 sm:bottom-3 flex justify-center px-4 sm:px-5"
        aria-hidden
      >
        <div className="flex gap-4 sm:gap-5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <span
              key={`card-bottom-${idx}`}
              className="w-3 h-3 sm:w-2.5 sm:h-2.5 rounded-sm bg-[#0d1445] border border-[#4a5fc9]"
            />
          ))}
        </div>
      </div>

      {/* Icon container with animation */}
      <div
        ref={iconRef}
        className="relative z-10 flex items-center justify-center w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] rounded-xl bg-gradient-to-br from-[#4a5fc9]/40 via-[#6b7fd9]/30 to-[#4a5fc9]/20 text-[#fcf3e1] shadow-lg ring-2 ring-[#6b7fd9]/60 group-hover:ring-[#8fa0e9]/80 group-hover:shadow-[#4a5fc9]/30 transition-all duration-300"
      >
        <Icon
          className="w-8 h-8 sm:w-9 sm:h-9 text-[#fcf3e1] drop-shadow-lg"
          animate={isHovered}
        />
      </div>

      {/* Number display */}
      <div className="relative z-10 text-center">
        <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#fcf3e1] drop-shadow-xl">
          <span ref={valueElRef}>0</span>
        </div>
      </div>

      {/* Label */}
      <div className="relative z-10 text-center">
        <div className="text-sm sm:text-base font-bold text-[#fcf3e1]/80 tracking-[0.25em] uppercase group-hover:text-[#fcf3e1] transition-all duration-300">
          {label}
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 h-0.5 w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-purple-400/60 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

export default function StatsCounterSection() {
  const prefersReduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const filmStripRef = useRef<HTMLDivElement | null>(null);

  // Section entrance: stagger cards
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (prefersReduced) return;

    const cards = el.querySelectorAll(".stat-card");
    const ctx = gsap.context(() => {
      // Set initial state to visible
      gsap.set(cards, { opacity: 1, y: 0 });

      // Only animate if element is below viewport
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.from(cards, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  // bgRef animation removed - replaced with static wave background

  useEffect(() => {
    if (prefersReduced) return;
    const strip = filmStripRef.current;
    if (!strip) return;

    const ctx = gsap.context(() => {
      const width = strip.scrollWidth / 2 || 1;
      gsap.fromTo(
        strip,
        { x: 0 },
        {
          x: -width,
          duration: 24,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: (value) => `${parseFloat(value) % -width}px`,
          },
        }
      );
    }, filmStripRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  // Removed random growth for static stable numbers per request.

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative isolate py-20 sm:py-24 md:py-32 overflow-hidden -mt-1"
    >
      {/* Flowing wave background */}
      {/* Clean background with subtle gradient */}
      {/* Clean background with subtle gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#f8fafc] via-[#f1f5f9] to-[#ffffff]" />

      {/* Wave layers */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {/* Top Wave Group - Aligned with Hero rhythm */}
        <div className="absolute -top-4 left-0 right-0 h-[480px]">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 450"
            preserveAspectRatio="none"
          >
            <defs>
              {/* New gradient palette: magenta → blue-purple → dark navy */}
              <linearGradient
                id="waveTopGrad1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#822e6a" stopOpacity="1" />
                <stop offset="50%" stopColor="#5456d5" stopOpacity="1" />
                <stop offset="100%" stopColor="#1f1f66" stopOpacity="1" />
              </linearGradient>
              <linearGradient
                id="waveTopGrad2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#822e6a" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#5456d5" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#1f1f66" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Layer 1 - Deepest/Largest */}
            <path
              d="M0,0 L1440,0 L1440,300 C1200,380 950,200 720,280 C480,350 240,200 0,320 Z"
              fill="url(#waveTopGrad2)"
            />
            {/* Layer 2 - Middle detail */}
            <path
              d="M0,0 L1440,0 L1440,240 C1200,280 960,180 720,240 C480,300 240,160 0,260 Z"
              fill="url(#waveTopGrad1)"
            />
            {/* Layer 3 - Top detail (Hero match) */}
            <path
              d="M0,0 L1440,0 L1440,180 C1100,220 800,100 500,160 C250,200 0,120 0,120 Z"
              fill="url(#waveTopGrad1)"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Bottom Wave Group */}
        <div className="absolute bottom-0 left-0 right-0 h-[400px]">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 400"
            preserveAspectRatio="none"
          >
            <defs>
              {/* New gradient palette: magenta → blue-purple → dark navy */}
              <linearGradient
                id="waveBottomGrad1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#822e6a" stopOpacity="1" />
                <stop offset="50%" stopColor="#5456d5" stopOpacity="1" />
                <stop offset="100%" stopColor="#1f1f66" stopOpacity="1" />
              </linearGradient>
              <linearGradient
                id="waveBottomGrad2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#822e6a" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#5456d5" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#1f1f66" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Layer 1 - Background (Sides Lifted) */}
            <path
              d="M0,400 L1440,400 L1440,220 C1100,280 700,340 350,280 C150,250 0,300 0,300 Z"
              fill="url(#waveBottomGrad2)"
              opacity="0.7"
            />
            {/* Layer 2 - Foreground accent (Sides Lifted) */}
            <path
              d="M0,400 L1440,400 L1440,280 C1100,320 700,350 400,300 C150,280 0,340 0,340 Z"
              fill="url(#waveBottomGrad1)"
            />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="gsap-section-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 tracking-tight text-[#fcf3e1] drop-shadow-md">
            Mucho Por Qué Suscribirte
          </h2>
          <p className="gsap-section-subtitle text-base sm:text-lg text-[#fcf3e1]/90 font-medium drop-shadow-sm">
            Programación premium, estrenos constantes y TV en vivo que no se
            detiene
          </p>
        </div>

        {/* Cinematic reel background */}
        <div className="relative mb-12 sm:mb-16 flex justify-center">
          <div className="relative w-full max-w-6xl h-24 sm:h-28 md:h-32 overflow-hidden rounded-3xl border-[3px] border-[#4a5fc9] bg-[#131c67] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(100,150,255,0.1)] ring-1 ring-[#6b7fd9]/30">
            {/* Inner blue border accent */}
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl border border-[#4a5fc9]/30 z-[5]"
              aria-hidden
            />
            {/* Outer glow for depth */}
            <div
              className="pointer-events-none absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-transparent to-purple-600/20 blur-xl -z-10"
              aria-hidden
            />
            {/* Rich blue tint overlay */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-950/40 via-blue-900/25 to-blue-950/40 z-10"
              aria-hidden
            />
            {/* Highlight for dimension */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-black/10 z-10"
              aria-hidden
            />
            {/* Subtle film grain overlay */}
            <div
              className="pointer-events-none film-grain absolute inset-0 z-20"
              aria-hidden
            />
            {/* Film perforations top - reduced count for performance */}
            <div
              className="pointer-events-none absolute inset-x-0 top-2 sm:top-3 flex justify-between px-4 sm:px-6"
              aria-hidden
            >
              <div className="flex gap-4 sm:gap-5">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <span
                    key={`perf-top-left-${idx}`}
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm bg-[#0d1445] border border-[#4a5fc9] shadow-inner"
                  />
                ))}
              </div>
              <div className="flex gap-4 sm:gap-5">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <span
                    key={`perf-top-right-${idx}`}
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm bg-[#0d1445] border border-[#4a5fc9] shadow-inner"
                  />
                ))}
              </div>
            </div>

            {/* Scrolling content */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-32 sm:w-40 bg-gradient-to-r from-[rgb(var(--color-background-rgb))/0.92] to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-32 sm:w-40 bg-gradient-to-l from-[rgb(var(--color-background-rgb))/0.92] to-transparent z-10" />

              {/* Moving scanline for cinematic feel (disabled when reduced motion) */}
              {!prefersReduced && (
                <div
                  className="scanline absolute left-0 right-0 top-[-12%] h-8 sm:h-10 md:h-12 z-20"
                  aria-hidden
                />
              )}

              <div
                ref={filmStripRef}
                className="flex items-center gap-12 sm:gap-16 md:gap-20 whitespace-nowrap text-sm sm:text-base md:text-lg font-extrabold uppercase tracking-[0.35em] sm:tracking-[0.45em] text-white drop-shadow-md"
              >
                {[...Array(3)].map((_, loopIndex) => (
                  <div
                    key={loopIndex}
                    className="flex items-center gap-8 sm:gap-12"
                  >
                    {[
                      "🎬 Series Originales",
                      "🍿 Películas",
                      "👶 Kids",
                      "📺 Documentales",
                      "🎭 Live Shows",
                      "⭐ Estrenos",
                    ].map((item) => (
                      <span
                        key={`${loopIndex}-${item}`}
                        className="flex items-center gap-3 sm:gap-4"
                      >
                        {item}
                        <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-accent" />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Film perforations bottom - reduced count for performance */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-2 sm:bottom-3 flex justify-between px-4 sm:px-6"
              aria-hidden
            >
              <div className="flex gap-4 sm:gap-5">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <span
                    key={`perf-bottom-left-${idx}`}
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm bg-[#0d1445] border border-[#4a5fc9] shadow-inner"
                  />
                ))}
              </div>
              <div className="flex gap-4 sm:gap-5">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <span
                    key={`perf-bottom-right-${idx}`}
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm bg-[#0d1445] border border-[#4a5fc9] shadow-inner"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 max-w-5xl mx-auto relative z-20">
          <StatCard to={11000} label="LIVE TV" Icon={FiTv} />
          <StatCard
            to={54000}
            label="MOVIES"
            Icon={({ animate }) => <Clapperboard animate={animate} loop />}
          />
          <StatCard
            to={14000}
            label="SERIES"
            Icon={({ animate }) => (
              <Play animate={animate ? "path-loop" : false} loop />
            )}
          />
        </div>
      </div>
      {/* Transition to Downloads (#1e1b4b) */}
      {/* Wave divider removed */}
    </section>
  );
}
