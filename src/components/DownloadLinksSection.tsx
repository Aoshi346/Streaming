import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaMobileAlt, FaTabletAlt, FaWindows } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

interface DownloadPlatform {
  id: string;
  label: string;
  icon: React.ReactNode;
  link: string;
  storeName: string;
}

const downloadPlatforms: DownloadPlatform[] = [
  {
    id: "mobile",
    label: "Móvil",
    icon: (
      <FaMobileAlt
        className="h-8 w-8 md:h-12 md:w-12 text-white drop-shadow-md transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        aria-hidden
      />
    ),
    link: "https://fullvision.com/download/mobile",
    storeName: "Android & iOS",
  },
  {
    id: "tablet",
    label: "Tablet",
    icon: (
      <FaTabletAlt
        className="h-8 w-8 md:h-12 md:w-12 text-white drop-shadow-md transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        aria-hidden
      />
    ),
    link: "https://fullvision.com/download/tablet",
    storeName: "Android & iPad",
  },
  {
    id: "windows",
    label: "Windows",
    icon: (
      <FaWindows
        className="h-8 w-8 md:h-12 md:w-12 text-white drop-shadow-md transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        aria-hidden
      />
    ),
    link: "https://fullvision.com/download/windows",
    storeName: "Descargar para PC",
  },
];

const DownloadLinksSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      const targets = section.querySelectorAll(
        ".gsap-section-title, .gsap-section-subtitle, .gsap-card, .label-char, .store-char"
      );
      if (targets.length) {
        gsap.set(targets, { opacity: 1, y: 0 });
      }
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { immediateRender: false },
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // Title/subtitle are handled globally by SectionTitleAnimator
      // Cards come in with a slightly slower timing for a more deliberate feel
      tl.from(
        ".gsap-card",
        {
          opacity: 0,
          y: 40,
          scale: 0.96,
          stagger: 0.16,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.35"
      )
        // Animate label characters with a gentle stagger
        .from(
          ".gsap-card .label-char",
          {
            opacity: 0,
            y: 10,
            stagger: 0.02,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.45"
        )
        // Animate store name characters slightly after labels
        .from(
          ".gsap-card .store-char",
          {
            opacity: 0,
            y: 8,
            stagger: 0.03,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.42"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  // Hover micro-interactions: card lift + icon bounce
  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const cards = Array.from(
      section.querySelectorAll<HTMLElement>(".gsap-card")
    );
    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      const icon = card.querySelector<HTMLElement>(".platform-icon");
      const labelChars = Array.from(
        card.querySelectorAll<HTMLElement>(".label-char")
      );
      const storeChars = Array.from(
        card.querySelectorAll<HTMLElement>(".store-char")
      );
      // prepare text animation timeline (paused) for hover — performs a subtle pop/bounce
      let textTl: gsap.core.Timeline | null = null;
      if (labelChars.length || storeChars.length) {
        textTl = gsap.timeline({ paused: true });
        if (labelChars.length)
          textTl.to(
            labelChars,
            {
              y: -6,
              scale: 1.02,
              stagger: 0.02,
              duration: 0.22,
              yoyo: true,
              repeat: 1,
              ease: "power2.out",
            },
            0
          );
        if (storeChars.length)
          textTl.to(
            storeChars,
            {
              y: -4,
              scale: 1.01,
              stagger: 0.025,
              duration: 0.2,
              yoyo: true,
              repeat: 1,
              ease: "power2.out",
            },
            0.04
          );
      }
      const onEnter = () => {
        gsap.killTweensOf(card);
        gsap.to(card, {
          y: -8,
          scale: 1.03,
          duration: 0.3,
          ease: "power2.out",
        });
        if (icon) {
          gsap.killTweensOf(icon);
          gsap.fromTo(
            icon,
            { y: -4 },
            { y: 4, duration: 0.4, yoyo: true, repeat: 1, ease: "power2.inOut" }
          );
        }
        // play hover text animation (subtle pop) — don't hide text on leave
        if (textTl) {
          textTl.restart();
        }
      };
      const onLeave = () => {
        gsap.killTweensOf(card);
        gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
        if (icon) {
          gsap.killTweensOf(icon);
          gsap.to(icon, { y: 0, scale: 1, duration: 0.18, ease: "power2.out" });
        }
        // let the hover text animation finish naturally; ensure chars remain visible
        if (textTl) {
          // fast-forward to end to ensure they settle back to original
          textTl.progress(1);
        }
      };
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section
      id="downloads"
      ref={sectionRef}
      className="relative border-t-0 py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-page-gradient -z-20" />

      {/* Top Divider - Layered Big Curves (Left to Right) */}
      <div
        className="absolute top-0 left-0 right-0 z-0 pointer-events-none overflow-hidden"
        style={{
          height: "320px",
        }}
      >
        <svg
          className="absolute w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 320"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Primary gradient - matches StatsCounter waveBottomGrad1 */}
            <linearGradient
              id="curveGradient1"
              x1="100%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#581c87" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#a21caf" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.7" />
            </linearGradient>
            {/* Secondary gradient - matches StatsCounter waveBottomGrad2 */}
            <linearGradient
              id="curveGradient2"
              x1="100%"
              y1="0%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#581c87" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#a21caf" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.5" />
            </linearGradient>
            {/* Tertiary gradient - lighter accent */}
            <linearGradient
              id="curveGradient3"
              x1="100%"
              y1="0%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#581c87" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#a21caf" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {/* Layer 1 - Foreground: smooth flowing curve */}
          <path
            d="M0,0 L0,200 Q350,240 650,130 Q950,40 1200,25 L1200,0 Z"
            fill="url(#curveGradient1)"
          />
          {/* Layer 2 - Middle: tighter curve, more dramatic bend */}
          <path
            d="M0,0 L0,260 Q200,290 500,200 Q850,100 1200,55 L1200,0 Z"
            fill="url(#curveGradient2)"
          />
          {/* Layer 3 - Background: wider, gentler curve */}
          <path
            d="M0,0 L0,310 Q450,340 700,240 Q1000,130 1200,80 L1200,0 Z"
            fill="url(#curveGradient3)"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Bottom Divider - Layered Big Curves (Right to Left) */}
      <div
        className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none overflow-hidden"
        style={{
          height: "320px",
        }}
      >
        <svg
          className="absolute w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 320"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Primary gradient - matches StatsCounter style */}
            <linearGradient
              id="bottomCurveGradient1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#a21caf" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#581c87" stopOpacity="0.5" />
            </linearGradient>
            {/* Secondary gradient */}
            <linearGradient
              id="bottomCurveGradient2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#a21caf" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#581c87" stopOpacity="0.3" />
            </linearGradient>
            {/* Tertiary gradient */}
            <linearGradient
              id="bottomCurveGradient3"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#a21caf" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#581c87" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Layer 1 - Foreground: smooth flowing curve from right */}
          <path
            d="M1200,320 L1200,120 Q850,80 550,190 Q250,280 0,295 L0,320 Z"
            fill="url(#bottomCurveGradient1)"
          />
          {/* Layer 2 - Middle: tighter curve */}
          <path
            d="M1200,320 L1200,60 Q1000,30 700,120 Q350,220 0,255 L0,320 Z"
            fill="url(#bottomCurveGradient2)"
          />
          {/* Layer 3 - Background: wider, gentler curve */}
          <path
            d="M1200,320 L1200,10 Q750,-20 500,80 Q200,180 0,220 L0,320 Z"
            fill="url(#bottomCurveGradient3)"
            opacity="0.7"
          />
        </svg>
      </div>

      <div className="container-wrapper relative z-10 -mt-12 pb-12">
        <h2 className="gsap-section-title text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl mb-4 text-left text-[#3b0764] drop-shadow-sm pb-2">
          Descarga la app
        </h2>
        <p className="gsap-section-subtitle mb-8 text-left text-lg sm:text-xl text-slate-700 font-medium">
          Descarga la app en tu movil o tablet.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {downloadPlatforms.map((platform) => {
            const renderChars = (text: string, baseClass = "") =>
              text.split("").map((ch, i) => (
                <span
                  key={i}
                  className={`${baseClass} inline-block align-middle will-change-transform backface-hidden`}
                  aria-hidden
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ));

            return (
              <a
                key={platform.id}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="gsap-card group flex flex-col items-center justify-center gap-3 md:gap-4 rounded-xl border-2 border-white/20 bg-gradient-to-br from-[#460869] via-[#4e0b6a] to-[#802369] px-5 py-6 md:px-8 md:py-10 shadow-lg shadow-[#460869]/50 transition-all duration-300 hover:-translate-y-2 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.6),0_0_40px_rgba(236,72,153,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 relative overflow-hidden"
                aria-label={`Descargar para ${platform.label} (${platform.storeName})`}
              >
                <span className="platform-icon inline-flex">
                  {platform.icon}
                </span>
                <span
                  className="text-lg md:text-xl font-bold text-white label-text drop-shadow-sm transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                  aria-hidden
                >
                  {renderChars(platform.label, "label-char")}
                </span>
                <span
                  className="text-sm text-white/90 font-medium store-text drop-shadow-sm transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]"
                  aria-hidden
                >
                  {renderChars(platform.storeName, "store-char")}
                </span>
              </a>
            );
          })}
        </div>
      </div>
      {/* Wave divider removed */}
    </section>
  );
};

export default DownloadLinksSection;
