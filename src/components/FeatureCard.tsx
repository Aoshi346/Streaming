import React, { forwardRef, useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

export type FeatureVariant = "tv" | "download" | "kids" | "bolt";

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant: FeatureVariant;
  layout?: "vertical" | "horizontal";
  featured?: boolean;
  onClick?: () => void;
}

// Helper function to parse *emphasized* text and render as styled spans
const parseEmphasis = (text: string): React.ReactNode[] => {
  const parts = text.split(/(\*[^*]+\*)/);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      const content = part.slice(1, -1);
      return (
        <em
          key={i}
          className="italic font-extrabold text-[#f8d675] text-base sm:text-lg"
        >
          {content}
        </em>
      );
    }
    return part;
  });
};

const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  (
    {
      icon,
      title,
      description,
      variant,
      layout = "vertical",
      featured = false,
      onClick,
    },
    ref
  ) => {
    const localRef = useRef<HTMLDivElement | null>(null);
    const iconRef = useRef<HTMLDivElement | null>(null);
    const spotRef = useRef<HTMLDivElement | null>(null);
    // allow parent to get the node
    const setRefs = (node: HTMLDivElement | null) => {
      localRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref && "current" in ref) (ref as any).current = node;
    };

    const prefersReducedMotion = useMemo(
      () =>
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      []
    );
    const hoverCapable = useMemo(() => {
      if (typeof window === "undefined" || !window.matchMedia) return false;
      // hover: hover and pointer: fine -> likely desktop
      return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    }, []);

    const descriptionBlocks = useMemo(
      () => description.split("\n\n"),
      [description]
    );

    useEffect(() => {
      const card = localRef.current;
      const iconEl = iconRef.current;
      const spot = spotRef.current;
      if (!card) return;
      if (!hoverCapable || prefersReducedMotion) return;

      const maxDeg = 6;
      const ctx = gsap.context(() => {
        const onEnter = () => {
          gsap.to(card, {
            duration: 0.25,
            y: -6,
            scale: 1.02,
            ease: "power3.out",
          });
          if (spot)
            gsap.to(spot, { duration: 0.2, opacity: 0.6, ease: "power3.out" });
          if (iconEl) {
            switch (variant) {
              case "tv":
                gsap.fromTo(
                  iconEl,
                  { scale: 0.95 },
                  {
                    scale: 1.05,
                    duration: 0.25,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.out",
                  }
                );
                break;
              case "download":
                gsap.fromTo(
                  iconEl,
                  { y: -2 },
                  {
                    y: 2,
                    duration: 0.24,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut",
                  }
                );
                break;
              case "kids":
                gsap.fromTo(
                  iconEl,
                  { x: -2 },
                  {
                    x: 2,
                    duration: 0.24,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut",
                  }
                );
                break;
              case "bolt":
                gsap.fromTo(
                  iconEl,
                  { opacity: 0.9 },
                  {
                    opacity: 1,
                    duration: 0.18,
                    yoyo: true,
                    repeat: 2,
                    ease: "power1.inOut",
                  }
                );
                break;
            }
          }
        };
        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const dx = e.clientX - (rect.left + rect.width / 2);
          const dy = e.clientY - (rect.top + rect.height / 2);
          const rx = gsap.utils.clamp(
            -maxDeg,
            maxDeg,
            (-dy / rect.height) * maxDeg
          );
          const ry = gsap.utils.clamp(
            -maxDeg,
            maxDeg,
            (dx / rect.width) * maxDeg
          );
          gsap.to(card, {
            rotateX: rx,
            rotateY: ry,
            transformPerspective: 800,
            transformOrigin: "center",
            duration: 0.15,
            ease: "power2.out",
          });
          if (spot) {
            const px = ((e.clientX - rect.left) / rect.width) * 100;
            const py = ((e.clientY - rect.top) / rect.height) * 100;
            gsap.to(spot, {
              x: (px - 50) / 2,
              y: (py - 50) / 2,
              duration: 0.15,
              ease: "power2.out",
            });
          }
        };
        const onLeave = () => {
          // return to neutral smoothly
          gsap.to(card, {
            duration: 0.25,
            rotateX: 0,
            rotateY: 0,
            y: 0,
            scale: 1,
            ease: "power3.out",
          });
          if (spot)
            gsap.to(spot, {
              duration: 0.2,
              opacity: 0,
              x: 0,
              y: 0,
              ease: "power3.out",
            });
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        return () => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        };
      }, localRef);
      return () => ctx.revert();
    }, [hoverCapable, prefersReducedMotion, variant]);

    const baseLayoutClasses =
      layout === "horizontal"
        ? "border-[3px] border-[#4a5fc9] bg-[linear-gradient(135deg,#131c67_0%,#1d2570_35%,#331165_70%,#4d0c68_100%)] backdrop-blur-lg p-8 sm:p-10 flex items-center gap-6"
        : "border-[3px] border-[#4a5fc9] bg-[linear-gradient(135deg,#131c67_0%,#1d2570_35%,#331165_70%,#4d0c68_100%)] p-8 sm:p-10 flex flex-col items-center text-center";

    const featuredClasses = featured
      ? "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border-[#6b7fd9] hover:ring-2 hover:ring-[#8fa0e9]/60 focus-within:ring-2 focus-within:ring-[#8fa0e9]/60"
      : "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]";

    return (
      <div
        ref={setRefs}
        className={
          `feature-card group relative rounded-2xl ${baseLayoutClasses} will-change-transform ` +
          "transition-all duration-300 ease-out filter overflow-hidden " +
          // Hover: brighten and lift the whole card
          "hover:-translate-y-1.5 hover:scale-105 hover:border-[#6b7fd9] hover:shadow-[0_20px_50px_-10px_rgba(100,150,255,0.3)] " +
          featuredClasses +
          " cursor-pointer active:scale-95 active:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8fa0e9]/40"
        }
        onClick={onClick}
        role="button"
        tabIndex={0}
      >
        {/* Hover glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* spotlight */}
        <div
          ref={spotRef}
          className={`pointer-events-none absolute inset-0 opacity-0 ${
            featured
              ? "bg-[radial-gradient(circle_at_center,rgba(107,127,217,0.15),transparent_60%)]"
              : ""
          }`}
        >
          <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(107,127,217,0.25),transparent_60%)]" />
        </div>
        <div
          ref={iconRef}
          className={`relative z-10 flex-shrink-0 flex items-center justify-center bg-white shadow-xl ring-4 ring-white/20 group-hover:ring-white/40 group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300 ${
            layout === "horizontal"
              ? "h-24 w-24 rounded-full"
              : "h-32 w-32 rounded-full mb-6"
          }`}
        >
          {icon}
        </div>

        <div
          className={`relative z-10 ${
            layout === "horizontal" ? "flex-1" : "w-full max-w-xl mx-auto mt-2"
          }`}
        >
          <h3
            className={`font-bold tracking-wide text-[#fcf3e1] ${
              layout === "vertical" ? "mt-2" : ""
            } ${
              layout === "horizontal" ? "text-xl" : "text-xl sm:text-2xl"
            } group-hover:text-[#f8d675] transition-colors duration-300`}
          >
            {title}
          </h3>
          <div
            className={`mt-4 space-y-4 ${
              layout === "horizontal"
                ? "text-base"
                : "text-sm sm:text-base leading-relaxed"
            } ${
              featured ? "text-[#fcf3e1]/90" : "text-[#fcf3e1]/80"
            } group-hover:text-[#fcf3e1] transition-colors duration-300`}
          >
            {descriptionBlocks.map((block, idx) => (
              <p
                key={idx}
                className={`${
                  idx <= 1 ? "font-semibold text-[#f8d675]/90" : ""
                } ${idx === 0 ? "text-base sm:text-lg" : ""} ${
                  idx === 1 ? "text-lg sm:text-xl" : ""
                }`}
              >
                {parseEmphasis(block)}
              </p>
            ))}
          </div>
        </div>
        {/* Bottom accent line */}
        <div className="absolute bottom-3 left-1/2 h-0.5 w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-purple-400/60 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    );
  }
);

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
