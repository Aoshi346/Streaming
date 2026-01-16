import { forwardRef, useCallback } from "react";
import type React from "react";
import { gsap } from "gsap";
import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";

const Footer = forwardRef<HTMLElement>((_, ref) => {
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

  return (
    <footer
      ref={ref}
      className="relative py-12 sm:py-16 text-white -mt-px"
      style={{
        background:
          "linear-gradient(to right, #1f1f66 0%, #5456d5 50%, #822e6a 100%)",
      }}
    >
      <div className="container-wrapper px-4 sm:px-6">
        {/* Main footer content */}
        <div className="flex flex-col items-center text-center gap-8">
          {/* Logo/Brand */}
          <div>
            <h3 className="text-3xl sm:text-4xl font-bold mb-3">
              FULLVISIONTV
            </h3>
            <p className="text-white/80 text-base sm:text-lg max-w-lg font-medium">
              Tu entretenimiento premium, donde quieras y cuando quieras.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://www.facebook.com/share/17sfeUiuGG/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={onLinkEnter}
              onMouseLeave={onLinkLeave}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-all duration-200"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-5 h-5" />
            </a>

            <a
              href="https://www.instagram.com/fullvisiondigital?igsh=MWVpYWR4MWpnMXh4dw=="
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={onLinkEnter}
              onMouseLeave={onLinkLeave}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-all duration-200"
              aria-label="Instagram"
            >
              <FaInstagram className="w-5 h-5" />
            </a>

            <a
              href="https://wa.me/13434780258?text=%C2%A1Hola!%20Escribo%20de%20*fullvisiontv.com*%20y%20me%20interesa%20el%20servicio"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={onLinkEnter}
              onMouseLeave={onLinkLeave}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-all duration-200"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-white/60 text-sm sm:text-base">
            &copy; {new Date().getFullYear()} FULLVISIONTV. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
