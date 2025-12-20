import { forwardRef, useCallback, useState, useEffect, useRef } from "react";
import type React from "react";
import { gsap } from "gsap";
import Logo from "./Logo";
import { smoothScrollTo } from "../utils/smoothScroll";

const links = [
  {
    href: "#features",
    label: "Características",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
  {
    href: "#devices",
    label: "Dispositivos",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    href: "#pricing",
    label: "Precios",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    href: "#faq",
    label: "Preguntas Frecuentes",
    icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const Header = forwardRef<HTMLElement>((_, ref) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const assignRefs = useCallback(
    (node: HTMLElement | null) => {
      headerRef.current = node;
      if (!ref) return;
      if (typeof ref === "function") {
        ref(node);
      } else {
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    },
    [ref]
  );

  // Close the menu on resize / orientation changes
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close on outside click or Escape key when open
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        event.target instanceof Node &&
        !headerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  const onLinkEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      y: -2,
      scale: 1.04,
      duration: 0.2,
      ease: "power3.out",
    });
  }, []);

  const onLinkLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.2,
      ease: "power3.out",
    });
  }, []);

  const getScrollOffset = useCallback(() => {
    if (!headerRef.current) return 72;
    return headerRef.current.getBoundingClientRect().height + 12;
  }, []);

  const onNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const href = e.currentTarget.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        smoothScrollTo(href, { offset: getScrollOffset(), duration: 0.65 });
      }
    },
    [getScrollOffset]
  );

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;
    gsap.set(mobileMenuRef.current, {
      autoAlpha: 0,
      y: -8,
      scale: 0.98,
      pointerEvents: "none",
      display: "none",
    });
  }, []);

  useEffect(() => {
    const menuEl = mobileMenuRef.current;
    if (!menuEl) return;

    gsap.killTweensOf(menuEl);

    if (menuOpen) {
      gsap
        .timeline()
        .set(menuEl, { display: "block", pointerEvents: "auto" })
        .fromTo(
          menuEl,
          { autoAlpha: 0, y: -8, scale: 0.98 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.32, ease: "power2.out" }
        );
    } else {
      gsap
        .timeline()
        .to(menuEl, {
          autoAlpha: 0,
          y: -8,
          scale: 0.98,
          duration: 0.22,
          ease: "power2.in",
        })
        .set(menuEl, { pointerEvents: "none", display: "none" });
    }
  }, [menuOpen]);

  return (
    <header
      ref={assignRefs}
      className="sticky top-0 z-50 border-b border-border-subtle bg-background shadow-theme-soft"
    >
      {/* Background Waves */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 500 100"
          preserveAspectRatio="none"
          className="absolute right-0 top-0 h-full w-[70%]"
        >
          {/* Navy blue wave - extends furthest left */}
          <path
            d="M0,100 C50,75 100,62 180,67 C260,72 320,50 400,35 C450,28 480,25 500,20 L500,100 Z"
            className="fill-[#1e3a5f]"
          />
          {/* Deep purple wave */}
          <path
            d="M80,100 C130,72 180,58 260,63 C340,68 400,45 460,32 C485,28 500,30 500,30 L500,100 Z"
            className="fill-[#581c87]"
          />
          {/* Rich purple wave */}
          <path
            d="M180,100 C230,68 280,56 350,60 C420,64 460,45 485,38 C495,35 500,38 500,38 L500,100 Z"
            className="fill-[#7c3aed]"
          />
          {/* Magenta/pink wave - closest to right edge */}
          <path
            d="M280,100 C330,72 370,60 420,63 C470,66 490,52 500,45 L500,100 Z"
            className="fill-[#c026d3]"
          />
        </svg>
        {/* Gradient fade to blend waves into background */}
        <div className="absolute right-0 top-0 h-full w-[70%] bg-gradient-to-r from-background via-transparent to-transparent" />
      </div>
      <div className="container-wrapper relative z-10 flex h-16 sm:h-20 items-center justify-between gap-3 px-4 sm:px-6">
        {/* Logo - responsive sizing */}
        <div className="flex-shrink-0">
          <Logo className="relative overflow-visible flex items-center rounded focus:outline-none focus-visible:ring focus-visible:ring-brand-light/60" />
        </div>

        {/* Desktop Navigation - centered */}
        <nav
          role="navigation"
          aria-label="Principal"
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-base font-medium text-text-muted"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={onLinkEnter}
              onMouseLeave={onLinkLeave}
              onClick={(e) => {
                onNavClick(e);
                closeMenu();
              }}
              className="group relative px-1 pb-1 transition-colors duration-200 hover:text-text-primary will-change-transform whitespace-nowrap"
            >
              {link.label}
              <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex items-center justify-center rounded-lg p-2.5 bg-surface-muted text-text-secondary transition-all duration-200 hover:bg-[rgb(var(--color-background-rgb))/0.7] hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light/60 active:scale-95"
          >
            <span className="sr-only">
              {menuOpen ? "Cerrar menú" : "Abrir menú"}
            </span>
            <div className="relative h-6 w-6">
              <span
                className={`absolute inset-x-0 block h-0.5 rounded-full bg-current transition-transform duration-300 ease-out ${
                  menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-1"
                }`}
              />
              <span
                className={`absolute left-0 right-0 block h-0.5 rounded-full bg-current transition-all duration-200 ease-out ${
                  menuOpen
                    ? "top-1/2 -translate-y-1/2 opacity-0"
                    : "top-1/2 -translate-y-1/2 opacity-100"
                }`}
              />
              <span
                className={`absolute inset-x-0 block h-0.5 rounded-full bg-current transition-transform duration-300 ease-out ${
                  menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-1"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className="md:hidden absolute z-20 left-0 right-0 top-full px-4 pb-4 origin-top will-change-transform"
        aria-hidden={!menuOpen}
      >
        <div className="mx-auto max-w-3xl rounded-2xl border border-border-subtle bg-background shadow-theme-strong overflow-hidden">
          {/* Gradient accent bar at top */}
          <div className="h-1 bg-gradient-to-r from-[#581c87] via-[#a21caf] to-[#ec4899]" />
          <nav className="flex flex-col py-2" aria-label="Menú móvil">
            {links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  onNavClick(e);
                  closeMenu();
                }}
                className="group flex items-center gap-4 px-5 py-4 text-base font-medium text-gray-900 transition-all duration-200 hover:bg-[#581c87]/10 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light/60 border-l-4 border-transparent hover:border-[#a21caf]"
                style={{
                  transitionDelay: menuOpen ? `${index * 40}ms` : "0ms",
                }}
              >
                <svg
                  className="w-6 h-6 text-[#7c3aed] group-hover:text-[#a21caf] transition-colors duration-200 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={link.icon}
                  />
                </svg>
                <span className="flex-1">{link.label}</span>
                <svg
                  className="w-5 h-5 text-text-muted transition-all duration-200 group-hover:text-[#a21caf] group-hover:translate-x-1"
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
            ))}
          </nav>
          <div className="border-t border-border-subtle px-5 py-4 text-center">
            <span className="text-sm font-medium bg-gradient-to-r from-[#581c87] via-[#a21caf] to-[#ec4899] bg-clip-text text-transparent">
              FullVisionTV
            </span>
            <span className="text-sm text-text-muted"> © 2024</span>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
