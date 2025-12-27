import React, { useEffect, useRef, useState, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./components/Header";
import Hero from "./components/Hero";
import StatsCounterSection from "./components/StatsCounterSection";
import WhatsAppBubble from "./components/WhatsAppBubble";
import { ThemeProvider } from "./theme";
import SectionTitleAnimator from "./components/SectionTitleAnimator";
import Footer from "./components/Footer";

// Helper to lazy load components only when they are near viewport
const LazySection = React.forwardRef<
  HTMLDivElement,
  {
    importFn: () => Promise<{ default: React.ComponentType<any> }>;
    fallback?: React.ReactNode;
    [key: string]: any;
  }
>(({ importFn, fallback = <div className="h-96 w-full" />, ...props }, ref) => {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(
    null
  );
  const internalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          importFn().then((mod: { default: React.ComponentType<any> }) =>
            setComponent(() => mod.default)
          );
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Load 200px before visual hit
    );

    if (internalRef.current) observer.observe(internalRef.current);
    return () => observer.disconnect();
  }, [importFn]);

  return (
    <div
      ref={(node) => {
        // Handle both internal ref for intersection observer and external ref
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          // Cast to writeable ref object to avoid TS read-only error
          (ref as any).current = node;
        }
      }}
    >
      {Component ? (
        <Suspense fallback={fallback}>
          <Component {...props} />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
});

// Components declared efficiently
const DevicesImport = () => import("./components/Devices");
const PricingImport = () => import("./components/PricingCTA");
const DownloadImport = () => import("./components/DownloadLinksSection");
const FeaturesImport = () => import("./components/FeaturesSection");
const FAQImport = () => import("./components/ServiceInfo");

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const headerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  // Change refs to HTMLDivElement to match LazySection's wrapper div
  const featuresRef = useRef<HTMLDivElement>(null);
  const devicesRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check if mobile for lighter animations
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(max-width: 768px)").matches;

    const animations: gsap.core.Tween[] = [];

    if (headerRef.current) {
      const headerChildren = Array.from(headerRef.current.children);
      if (headerChildren.length) {
        animations.push(
          gsap.fromTo(
            headerChildren,
            { opacity: 0, y: isMobile ? -10 : -20 },
            {
              opacity: 1,
              y: 0,
              duration: isMobile ? 0.4 : 0.8,
              stagger: isMobile ? 0.05 : 0.1,
              ease: "power2.out",
              scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
            }
          )
        );
      }
    }

    if (heroRef.current) {
      const heroButtons = heroRef.current.querySelectorAll("a");
      if (heroButtons.length) {
        animations.push(
          gsap.fromTo(
            heroButtons,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.3,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: { trigger: heroRef.current, start: "top 80%" },
            }
          )
        );
      }
    }

    if (pricingRef.current) {
      // With LazySection, the content might not be mounted yet when this runs.
      // However, since GSAP animations are usually triggered on scroll,
      // and LazySection mounts when near viewport, we need to ensure GSAP can find elements.
      // Ideally, the animation logic should be inside the lazy component or triggered after mount.
      // But for now, we'll keep the structure. If elements aren't found, animation won't run, which is fine.
      const pricingCards = pricingRef.current.querySelectorAll(".pricing-card");
      if (pricingCards.length) {
        animations.push(
          gsap.fromTo(
            pricingCards,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "power2.out",
              scrollTrigger: { trigger: pricingRef.current, start: "top 80%" },
            }
          )
        );
      }
    }

    if (faqRef.current) {
      const faqDetails = faqRef.current.querySelectorAll("details");
      if (faqDetails.length) {
        animations.push(
          gsap.fromTo(
            faqDetails,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: { trigger: faqRef.current, start: "top 80%" },
            }
          )
        );
      }
    }

    if (footerRef.current) {
      const footerChildren = Array.from(footerRef.current.children);
      if (footerChildren.length) {
        animations.push(
          gsap.fromTo(
            footerChildren,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
            }
          )
        );
      }
    }

    return () => {
      animations.forEach((anim) => anim.kill());
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-full bg-[color:var(--color-background)] bg-page-gradient">
        <SectionTitleAnimator />
        <Header ref={headerRef} />
        <main>
          <Hero ref={heroRef} />
          <StatsCounterSection />

          <LazySection
            importFn={DevicesImport}
            fallback={<div className="h-[600px]" />}
            ref={devicesRef}
          />

          <LazySection
            importFn={PricingImport}
            fallback={<div className="h-[500px]" />}
            ref={pricingRef}
          />

          <LazySection
            importFn={DownloadImport}
            fallback={<div className="h-[400px]" />}
          />

          <LazySection
            importFn={FeaturesImport}
            fallback={<div className="h-[600px]" />}
            ref={featuresRef}
          />

          <LazySection
            importFn={FAQImport}
            fallback={<div className="h-[400px]" />}
            ref={faqRef}
          />
        </main>
        <Footer ref={footerRef} />
        <WhatsAppBubble />
      </div>
    </ThemeProvider>
  );
}
