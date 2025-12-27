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
    label: "Información",
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
          {/* Dark navy wave - extends furthest left */}
          <path
            d="M0,100 C50,75 100,62 180,67 C260,72 320,50 400,35 C450,28 480,25 500,20 L500,100 Z"
            className="fill-[#1f1f66]"
            fillOpacity="0.2"
          />
          {/* Blue-purple wave */}
          <path
            d="M80,100 C130,72 180,58 260,63 C340,68 400,45 460,32 C485,28 500,30 500,30 L500,100 Z"
            className="fill-[#5456d5]"
            fillOpacity="0.3"
          />
          {/* Magenta wave - closest to right edge */}
          <path
            d="M280,100 C330,72 370,60 420,63 C470,66 490,52 500,45 L500,100 Z"
            className="fill-[#822e6a]"
            fillOpacity="0.25"
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
              className="group relative px-1 pb-1 transition-colors duration-200 hover:text-[#822e6a] will-change-transform whitespace-nowrap"
            >
              {link.label}
              <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#822e6a] via-[#5456d5] to-[#1f1f66] transition-transform duration-300 ease-out group-hover:scale-x-100" />
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
            className={`inline-flex items-center justify-center rounded-xl p-2.5 border-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5456d5]/60 active:scale-95 ${
              menuOpen
                ? "bg-gradient-to-r from-[#822e6a] via-[#5456d5] to-[#1f1f66] border-[#fcf3e1]/40 text-[#fcf3e1] shadow-[0_0_20px_rgba(84,86,213,0.4)]"
                : "bg-white border-[#5456d5]/30 text-[#5456d5] hover:border-[#822e6a] hover:text-[#822e6a] shadow-md"
            }`}
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
        <div className="mx-auto max-w-3xl rounded-2xl border-2 border-[#5456d5]/40 bg-white shadow-[0_10px_40px_rgba(31,31,102,0.35)] overflow-hidden">
          {/* Gradient accent bar at top */}
          <div className="h-1.5 bg-gradient-to-r from-[#822e6a] via-[#5456d5] to-[#1f1f66]" />
          <nav className="flex flex-col py-2" aria-label="Menú móvil">
            {links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  onNavClick(e);
                  closeMenu();
                }}
                className="group flex items-center gap-4 px-5 py-4 text-base font-medium text-gray-800 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#822e6a]/10 hover:via-[#5456d5]/10 hover:to-[#1f1f66]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5456d5]/60 border-l-4 border-transparent hover:border-[#822e6a]"
                style={{
                  transitionDelay: menuOpen ? `${index * 40}ms` : "0ms",
                }}
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#822e6a]/20 via-[#5456d5]/15 to-[#1f1f66]/20 group-hover:from-[#822e6a]/30 group-hover:via-[#5456d5]/25 group-hover:to-[#1f1f66]/30 transition-all duration-300">
                  <svg
                    className="w-5 h-5 text-[#5456d5] group-hover:text-[#822e6a] transition-colors duration-200"
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
                </span>
                <span className="flex-1 group-hover:text-[#1f1f66] transition-colors duration-200">
                  {link.label}
                </span>
                <svg
                  className="w-5 h-5 text-[#5456d5]/50 transition-all duration-200 group-hover:text-[#822e6a] group-hover:translate-x-1"
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
          <div className="border-t border-[#5456d5]/20 px-5 py-4 text-center bg-gradient-to-r from-[#822e6a]/5 via-[#5456d5]/5 to-[#1f1f66]/5">
            <span className="text-sm font-bold bg-gradient-to-r from-[#822e6a] via-[#5456d5] to-[#1f1f66] bg-clip-text text-transparent">
              FULLVISIONTV
            </span>
            <span className="text-sm text-[#5456d5]/60"> © 2025</span>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
