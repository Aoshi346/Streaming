import {
  forwardRef,
  useLayoutEffect,
  useRef,
  useEffect,
  useCallback,
} from "react";
import type React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaDownload, FaLaptop } from "react-icons/fa";
import { smoothScrollTo } from "../utils/smoothScroll";
import heroBackground from "../assets/images/hero_background.png";
import heroBackgroundMobile from "../assets/images/hero_background_mobile-min.png";

gsap.registerPlugin(ScrollTrigger);

const Hero = forwardRef<HTMLElement>((_, ref) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);

  // expose ref to parent like other components do
  useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") ref(sectionRef.current as any);
    else (ref as any).current = sectionRef.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    const sectionEl = sectionRef.current;
    const titleEl = titleRef.current;
    const subEl = subtitleRef.current;
    if (!sectionEl || !titleEl) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Check if mobile for lighter animations
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(max-width: 768px)").matches;

    // Skip animations only for reduced motion preference
    if (prefersReduced) {
      const chars = titleEl.querySelectorAll(".hero-title-char");
      if (chars.length) gsap.set(chars, { opacity: 1, y: 0 });
      if (subEl) gsap.set(subEl, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const chars = titleEl.querySelectorAll<HTMLElement>(".hero-title-char");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionEl, start: "top 80%", once: true },
      });

      if (isMobile) {
        // Mobile: simple fade-in for all chars at once
        tl.from(chars, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        // Desktop: full character animation
        tl.from(chars, {
          opacity: 0,
          y: 30,
          skewX: 8,
          rotation: 4,
          scale: 0.98,
          duration: 0.55,
          stagger: { each: 0.03, from: "start" },
          ease: "back.out(1.2)",
        });
      }

      if (subEl)
        tl.from(
          subEl,
          { opacity: 0, y: 10, duration: 0.5, ease: "power2.out" },
          "-=0.28"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getGlobalOffset = useCallback(() => {
    const headerEl = document.querySelector("header");
    return headerEl ? headerEl.getBoundingClientRect().height + 12 : 72;
  }, []);

  const handleSmoothAnchor = useCallback(
    (hash: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!hash.startsWith("#")) return;
      event.preventDefault();
      smoothScrollTo(hash, { offset: getGlobalOffset(), duration: 0.65 });
    },
    [getGlobalOffset]
  );

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate overflow-hidden min-h-[70vh] sm:min-h-[75vh] lg:min-h-[85vh] flex items-center"
    >
      {/* Background Image - Responsive */}
      <picture>
        <source media="(min-width: 768px)" srcSet={heroBackground} />
        <img
          src={heroBackgroundMobile}
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-full object-cover object-center -z-20"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      {/* Palette-driven gradient overlay */}
      <div className="absolute inset-0 bg-hero-gradient opacity-90 -z-10" />

      {/* Animated gradient orbs for depth - reduced blur on mobile for performance */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-64 h-64 sm:w-96 sm:h-96 bg-brand-light/30 rounded-full blur-xl sm:blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 sm:w-96 sm:h-96 bg-accent/30 rounded-full blur-xl sm:blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container-wrapper relative z-10 w-full">
        <div className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
          <div className="max-w-4xl text-center mx-auto space-y-6 sm:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-muted/30 border border-border-subtle backdrop-blur-sm">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm sm:text-base font-semibold text-white">
                Miles de películas y series disponibles
              </span>
            </div>

            <h1
              ref={titleRef}
              aria-label="Películas, series y más ilimitadas"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            >
              {(() => {
                const title = "Películas, series y más ilimitadas";
                const words = title.split(" ");
                return words.map((word, wi) => (
                  <span
                    key={wi}
                    className="hero-word inline-block"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {word.split("").map((ch, i) => (
                      <span
                        key={i}
                        className="hero-title-char inline-block"
                        aria-hidden
                      >
                        {ch}
                      </span>
                    ))}
                    {wi < words.length - 1 ? (
                      <span aria-hidden className="inline-block">
                        {"\u00A0"}
                      </span>
                    ) : null}
                  </span>
                ));
              })()}
            </h1>

            <p
              ref={subtitleRef}
              className="gsap-hero-subtitle text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed px-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
            >
              Disfruta de contenido 4K, sin anuncios, en todos tus dispositivos.
              Cancela en cualquier momento.
            </p>

            {/* CTA Buttons with enhanced styling */}
            <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3 px-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                <a
                  href="#pricing"
                  className="group relative w-full sm:w-auto overflow-hidden rounded-lg sm:rounded-xl px-5 py-2.5 sm:px-8 sm:py-4 text-xs sm:text-base font-black text-[#fcf3e1] shadow-[0_0_20px_rgba(130,46,106,0.4),0_0_40px_rgba(84,86,213,0.2)] sm:shadow-[0_0_30px_rgba(130,46,106,0.4),0_0_60px_rgba(84,86,213,0.2)] transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:shadow-[0_0_30px_rgba(130,46,106,0.6),0_0_60px_rgba(84,86,213,0.4)] ring-2 ring-[#fcf3e1]/30 hover:ring-[#fcf3e1]/60"
                  onClick={handleSmoothAnchor("#pricing")}
                  style={{
                    background:
                      "linear-gradient(135deg, #822e6a 0%, #5456d5 50%, #1f1f66 100%)",
                  }}
                >
                  {/* Animated shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-[#fcf3e1]/20 to-transparent" />

                  {/* Glow pulse background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[#822e6a]/30 via-transparent to-[#5456d5]/20" />

                  {/* Pulsing border glow */}
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#822e6a] via-[#5456d5] to-[#1f1f66] opacity-60 blur-sm animate-pulse -z-10" />

                  <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                    <span className="tracking-wider">✨ SUSCRÍBETE AHORA</span>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </a>

                <a
                  href="#features"
                  className="group w-full sm:w-auto rounded-lg border-2 border-[#5456d5]/50 bg-[#1f1f66]/20 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold text-[#fcf3e1] transition-all duration-300 hover:bg-[#822e6a]/30 hover:border-[#fcf3e1]/50 hover:text-[#fcf3e1] hover:scale-105 hover:shadow-[0_4px_20px_rgba(84,86,213,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fcf3e1]/50"
                  onClick={handleSmoothAnchor("#features")}
                >
                  <span className="flex items-center justify-center gap-2">
                    VER MÁS
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-y-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </a>
              </div>

              <div className="w-full max-w-xl space-y-2">
                <div className="grid gap-2 sm:grid-cols-2">
                  <a
                    href="#devices"
                    className="group relative flex items-center justify-between rounded-lg border border-[#5456d5]/30 bg-[#1f1f66]/20 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-semibold text-[#fcf3e1] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#fcf3e1]/40 hover:bg-[#5456d5]/25 hover:shadow-[0_4px_15px_rgba(84,86,213,0.25)]"
                    onClick={handleSmoothAnchor("#devices")}
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#5456d5]/30 text-[#fcf3e1] text-sm">
                        <FaLaptop aria-hidden />
                      </span>
                      <div className="flex flex-col text-left">
                        <span className="text-sm">
                          Dispositivos Compatibles
                        </span>
                        <span className="text-xs text-white/70">
                          TV, móvil, tablet y más
                        </span>
                      </div>
                    </div>
                    <svg
                      className="h-5 w-5 text-[#fcf3e1]/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#fcf3e1]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>

                  <a
                    href="#downloads"
                    className="group relative flex items-center justify-between rounded-lg border border-[#5456d5]/30 bg-[#1f1f66]/20 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-semibold text-[#fcf3e1] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#fcf3e1]/40 hover:bg-[#822e6a]/25 hover:shadow-[0_4px_15px_rgba(130,46,106,0.25)]"
                    onClick={handleSmoothAnchor("#downloads")}
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#822e6a]/30 text-[#fcf3e1] text-sm">
                        <FaDownload aria-hidden />
                      </span>
                      <div className="flex flex-col text-left">
                        <span className="text-sm">Descarga la app</span>
                        <span className="text-xs text-white/70">
                          Android, iOS, Windows, Mac
                        </span>
                      </div>
                    </div>
                    <svg
                      className="h-5 w-5 text-[#fcf3e1]/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#fcf3e1]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-xs sm:text-sm text-[#fcf3e1] mt-2">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1f1f66]/40 backdrop-blur-sm border border-[#5456d5]/30">
                  <svg
                    className="w-3.5 h-3.5 text-[#822e6a]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Sin compromisos
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1f1f66]/40 backdrop-blur-sm border border-[#5456d5]/30">
                  <svg
                    className="w-3.5 h-3.5 text-[#822e6a]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  HD & 4K disponible
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1f1f66]/40 backdrop-blur-sm border border-[#5456d5]/30">
                  <svg
                    className="w-3.5 h-3.5 text-[#822e6a]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Cancela cuando quieras
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider - matching Stats section top wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-20 sm:h-28 md:h-32"
        >
          <defs>
            {/* New gradient palette: magenta → blue-purple → dark navy */}
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#822e6a" stopOpacity="1" />
              <stop offset="50%" stopColor="#5456d5" stopOpacity="1" />
              <stop offset="100%" stopColor="#1f1f66" stopOpacity="1" />
            </linearGradient>
            <linearGradient
              id="waveGradientBottom"
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
          <path
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            fill="url(#waveGradient)"
          />
          <path
            d="M0,80 C240,40 480,100 720,80 C960,40 1200,100 1440,80 L1440,120 L0,120 Z"
            fill="url(#waveGradientBottom)"
          />
        </svg>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
