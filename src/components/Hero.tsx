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
import heroBackground from "../assets/images/hero_background.webp";
import heroBackgroundMobile from "../assets/images/hero_background_mobile-min.webp";

// Movie poster imports for the cinematic reel
import poster1 from "../assets/images/posters/poster1.webp";
import poster2 from "../assets/images/posters/poster2.webp";
import poster3 from "../assets/images/posters/poster3.webp";
import poster4 from "../assets/images/posters/poster4.webp";
import poster5 from "../assets/images/posters/poster5.webp";
import poster6 from "../assets/images/posters/poster6.webp";

const moviePosters = [poster1, poster2, poster3, poster4, poster5, poster6];

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
      }
      // DESKTOP LCP OPTIMIZATION: Removed complex char animation that hides text initially.
      // Text will now be visible immediately on load for faster LCP.

      if (subEl)
        tl.from(
          subEl,
          { opacity: 0, y: 10, duration: 0.5, ease: "power2.out" },
          "-=0.28",
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
    [getGlobalOffset],
  );

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate overflow-visible min-h-[70vh] sm:min-h-[75vh] lg:min-h-[75vh] flex items-center z-20"
    >
      {/* Background Image - Responsive */}
      <picture>
        <source media="(min-width: 768px)" srcSet={heroBackground} />
        <img
          src={heroBackgroundMobile}
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-full object-cover object-center -z-20"
          width="1920"
          height="1080"
          // @ts-expect-error - fetchpriority is valid HTML but missing from React types
          fetchpriority="high"
          decoding="async"
        />
      </picture>

      {/* Palette-driven gradient overlay */}
      <div className="absolute inset-0 bg-hero-gradient opacity-90 -z-10" />

      {/* Animated gradient orbs for depth - reduced opacity on mobile for better text visibility */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-64 h-64 sm:w-96 sm:h-96 bg-brand-light/10 sm:bg-brand-light/30 rounded-full blur-xl sm:blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 sm:w-96 sm:h-96 bg-accent/10 sm:bg-accent/30 rounded-full blur-xl sm:blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container-wrapper relative z-10 w-full">
        <div className="pt-12 pb-40 sm:pt-16 sm:pb-56 md:pt-20 md:pb-64 lg:pt-24 lg:pb-72 px-4 sm:px-6">
          <div className="max-w-7xl text-center mx-auto space-y-6 sm:space-y-8">
            <h1
              ref={titleRef}
              aria-label="TV Online, Películas y Series disponibles"
              className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
              style={{
                textShadow:
                  "0 2px 10px rgba(0,0,0,0.8), 0 0 20px rgba(84, 86, 213, 0.4)",
              }}
            >
              {(() => {
                const title = "TV Online, Películas y Series disponibles";
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
              className="gsap-hero-subtitle text-sm sm:text-base md:text-lg text-white max-w-2xl mx-auto leading-relaxed px-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              style={{
                textShadow:
                  "0 2px 8px rgba(0,0,0,0.8), 0 0 15px rgba(84, 86, 213, 0.4)",
              }}
            >
              Disfruta de contenido 4K, sin anuncios, en todos tus dispositivos.
            </p>

            {/* CTA Buttons with enhanced styling */}
            <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3 px-2 sm:px-4">
              {/* All buttons in unified container */}
              <div className="w-full max-w-xl space-y-3">
                {/* Top row - Primary CTA buttons */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <a
                    href="#pricing"
                    className="group relative overflow-hidden rounded-lg sm:rounded-xl px-1.5 py-2.5 sm:px-6 sm:py-4 text-[10px] sm:text-base font-black text-[#fff9ee] shadow-lg backdrop-blur-md border border-[#822e6a]/30 bg-gradient-to-br from-[#300c49] to-[#1e1e64] md:bg-none md:bg-[#5456d5]/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#822e6a]/50 hover:bg-[#5456d5]/30 md:hover:bg-[#5456d5]/20 hover:shadow-[0_0_30px_rgba(130,46,106,0.3),0_0_60px_rgba(84,86,213,0.2)]"
                    onClick={handleSmoothAnchor("#pricing")}
                  >
                    {/* Glass sheen */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <span className="relative z-10 flex flex-row items-center justify-center gap-1 sm:gap-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] text-center leading-tight">
                      <span className="tracking-wider break-words">
                        ✨ SUSCRÍBETE AHORA
                      </span>
                      <svg
                        className="w-3.5 h-3.5 sm:w-5 sm:h-5 transform group-hover:translate-x-2 transition-transform duration-300 hidden sm:block"
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
                    href="https://aftv.news/513053"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-lg sm:rounded-xl px-1.5 py-2.5 sm:px-6 sm:py-4 text-[10px] sm:text-base font-black text-[#fff9ee] shadow-lg backdrop-blur-md border border-[#822e6a]/30 bg-gradient-to-br from-[#300c49] to-[#1e1e64] md:bg-none md:bg-[#5456d5]/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#822e6a]/50 hover:bg-[#5456d5]/30 md:hover:bg-[#5456d5]/20 hover:shadow-[0_0_30px_rgba(130,46,106,0.3),0_0_60px_rgba(84,86,213,0.2)]"
                  >
                    {/* Glass sheen */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <span className="relative z-10 flex flex-row items-center justify-center gap-1 sm:gap-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] text-center leading-tight">
                      <span className="tracking-wider break-words">
                        📱 APP OFICIAL
                      </span>
                      <svg
                        className="w-3.5 h-3.5 sm:w-5 sm:h-5 transform group-hover:translate-x-2 transition-transform duration-300 hidden sm:block"
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
                </div>

                {/* Bottom row - Secondary info buttons */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <a
                    href="#devices"
                    className="group relative flex items-center justify-between rounded-lg border border-[#822e6a]/30 bg-gradient-to-br from-[#300c49] to-[#1e1e64] md:bg-none md:bg-[#5456d5]/10 backdrop-blur-md px-1.5 py-2 sm:px-4 sm:py-3 text-[10px] font-semibold text-[#fff9ee] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-[#822e6a]/50 hover:bg-[#5456d5]/30 md:hover:bg-[#5456d5]/20 hover:shadow-[0_4px_20px_rgba(84,86,213,0.2)]"
                    onClick={handleSmoothAnchor("#devices")}
                  >
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-start">
                      <span className="inline-flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-md bg-[#5456d5]/20 text-[#fff9ee] text-sm backdrop-blur-md border border-white/10">
                        <FaLaptop aria-hidden />
                      </span>
                      <div className="flex flex-col text-left min-w-0 flex-1 sm:flex-initial">
                        <span className="text-[10px] sm:text-sm leading-tight break-words sm:truncate">
                          Dispositivos Compatibles
                        </span>
                        <span className="text-[9px] sm:text-xs text-[#fff9ee]/80 hidden sm:block truncate">
                          TV, móvil, tablet y más
                        </span>
                      </div>
                    </div>
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-[#fff9ee]/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#fff9ee] hidden sm:block"
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
                    className="group relative flex items-center justify-between rounded-lg border border-[#822e6a]/30 bg-gradient-to-br from-[#300c49] to-[#1e1e64] md:bg-none md:bg-[#5456d5]/10 backdrop-blur-md px-1.5 py-2 sm:px-4 sm:py-3 text-[10px] font-semibold text-[#fff9ee] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-[#822e6a]/50 hover:bg-[#5456d5]/30 md:hover:bg-[#5456d5]/20 hover:shadow-[0_4px_20px_rgba(130,46,106,0.2)]"
                    onClick={handleSmoothAnchor("#downloads")}
                  >
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-start">
                      <span className="inline-flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-md bg-[#822e6a]/20 text-[#fff9ee] text-sm backdrop-blur-md border border-white/10">
                        <FaDownload aria-hidden />
                      </span>
                      <div className="flex flex-col text-left min-w-0 flex-1 sm:flex-initial">
                        <span className="text-[10px] sm:text-sm leading-tight break-words sm:truncate">
                          Centro de Descargas
                        </span>
                        <span className="text-[9px] sm:text-xs text-[#fff9ee]/80 hidden sm:block truncate">
                          Android, iOS, Windows, Tablets
                        </span>
                      </div>
                    </div>
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-[#fff9ee]/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#fff9ee] hidden sm:block"
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
              <div className="flex flex-col items-center justify-center gap-2.5 text-sm sm:text-base text-[#fcf3e1] mt-3">
                <span className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#1f1f66]/60 sm:bg-[#1f1f66]/40 backdrop-blur-sm border border-[#5456d5]/30">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#822e6a]"
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
                <span className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#1f1f66]/60 sm:bg-[#1f1f66]/40 backdrop-blur-sm border border-[#5456d5]/30">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#822e6a]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Tenemos Demo GRATIS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Scrolling Reel - positioned in the empty purple space above Stats title */}
      <div className="absolute -bottom-8 sm:-bottom-12 md:-bottom-20 left-0 right-0 w-full overflow-hidden py-4 sm:py-6 z-20">
        {/* Scrolling container - 4 copies ensure full screen coverage */}
        <div
          className="flex gap-8 sm:gap-12 md:gap-16"
          style={{
            width: "max-content",
            animation: "scroll-left 28s linear infinite",
          }}
        >
          {/* 4 sets of posters for seamless full-width coverage */}
          {[1, 2, 3, 4].map((setNum) =>
            moviePosters.map((poster, index) => (
              <div
                key={`poster-${setNum}-${index}`}
                className="relative flex-shrink-0 w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-44 rounded-md sm:rounded-lg overflow-hidden shadow-[0_0_15px_rgba(130,46,106,0.4)] ring-1 ring-[#fcf3e1]/20 hover:ring-[#fcf3e1]/50 hover:scale-105 transition-all duration-300"
              >
                <img
                  src={poster}
                  alt={`Movie poster ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f66]/40 via-transparent to-transparent pointer-events-none" />
              </div>
            )),
          )}
        </div>
      </div>

      {/* Wave Divider - matching Stats section top wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-[1px]">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto min-h-[120px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#822e6a" stopOpacity="1" />
              <stop offset="50%" stopColor="#5456d5" stopOpacity="1" />
              <stop offset="100%" stopColor="#1f1f66" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            fillOpacity="1"
            d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
