import { forwardRef, useCallback, useState, useEffect, useRef } from "react";
import type React from "react";
import { gsap } from "gsap";
import Logo from "./Logo";
import { smoothScrollTo } from "../utils/smoothScroll";

const links = [
  { href: "#features", label: "Características" },
  { href: "#devices", label: "Dispositivos" },
  { href: "#pricing", label: "Precios" },
  { href: "#faq", label: "Preguntas Frecuentes" },
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
        .to(menuEl, { autoAlpha: 0, y: -8, scale: 0.98, duration: 0.22, ease: "power2.in" })
        .set(menuEl, { pointerEvents: "none", display: "none" });
    }
  }, [menuOpen]);

  return (
    <header
      ref={assignRefs}
      className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm"
    >
      <div className="container-wrapper relative flex h-16 sm:h-20 items-center justify-between gap-3 px-4 sm:px-6">
        {/* Logo - responsive sizing */}
        <div className="flex-shrink-0">
          <Logo className="relative overflow-visible flex items-center rounded focus:outline-none focus-visible:ring focus-visible:ring-brand-light/60" />
        </div>

        {/* Desktop Navigation - centered */}
        <nav
          role="navigation"
          aria-label="Principal"
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-base font-medium text-gray-600"
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
              className="group relative px-1 pb-1 transition-colors duration-200 hover:text-gray-900 will-change-transform whitespace-nowrap"
            >
              {link.label}
              <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-brand-light transition-transform duration-300 ease-out group-hover:scale-x-100" />
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
            className="inline-flex items-center justify-center rounded-lg p-2.5 bg-gray-100 text-gray-700 transition-all duration-200 hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light/60 active:scale-95"
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
                  menuOpen ? "top-1/2 -translate-y-1/2 opacity-0" : "top-1/2 -translate-y-1/2 opacity-100"
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
        className="md:hidden absolute left-0 right-0 top-full px-4 pb-4 origin-top will-change-transform"
        aria-hidden={!menuOpen}
      >
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/80">
          <nav className="flex flex-col divide-y divide-gray-100 py-3" aria-label="Menú móvil">
            {links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  onNavClick(e);
                  closeMenu();
                }}
                className="group flex items-center justify-between px-5 py-4 text-base font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light/60"
                style={{ transitionDelay: menuOpen ? `${index * 40}ms` : "0ms" }}
              >
                <span>{link.label}</span>
                <svg
                  className="w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:text-brand-light"
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
          <div className="border-t border-gray-100 px-5 py-4 text-center text-sm text-gray-500">
            FullVisionTV © 2024
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
