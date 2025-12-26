import React, { useEffect, useRef, useState } from "react";
import { Smartphone, Tablet, Laptop, Download, ArrowRight } from "lucide-react";

interface DownloadPlatform {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  link: string;
}

const downloadPlatforms: DownloadPlatform[] = [
  {
    id: "mobile",
    label: "App Móvil",
    sublabel: "iPhone • Android",
    icon: Smartphone,
    link: "https://fullvision.com/download/mobile",
  },
  {
    id: "tablet",
    label: "Tablets",
    sublabel: "iPad • Android Tabs",
    icon: Tablet,
    link: "https://fullvision.com/download/tablet",
  },
  {
    id: "windows",
    label: "Desktop",
    sublabel: "Windows",
    icon: Laptop,
    link: "https://fullvision.com/download/windows",
  },
];

const DownloadLinksSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="downloads"
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-white overflow-hidden"
      aria-labelledby="downloads-heading"
    >
      {/* Top Wave Transition - New Organic Multi-Layered Style - Height Reduced */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
        <svg
          className="relative block w-full h-[180px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="pricingGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#822e6a" />
              <stop offset="50%" stopColor="#5456d5" />
              <stop offset="100%" stopColor="#1f1f66" />
            </linearGradient>
            <linearGradient
              id="pricingGradientLight"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#822e6a" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#5456d5" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1f1f66" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient
              id="pricingGradientLighter"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#822e6a" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#5456d5" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#1f1f66" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Layer 3 - Lightest Back Wave */}
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="url(#pricingGradientLighter)"
          />

          {/* Layer 2 - Mid Opacity Wave */}
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05c99.41,75.32,252.6,75.32,380.62,11.23s143-69.88,280.85-69.88c94.69,0,165,58,230,81.1,51.84,18.4,116,21.55,176.47,9.75,44.75-8.74,68.8-23.76,84.37-34.92V0Z"
            fill="url(#pricingGradientLight)"
          />

          {/* Layer 1 - Solid Front Wave */}
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="url(#pricingGradient)"
          />
        </svg>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none mt-[100px]">
        {/* Purple Blob */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
        {/* Pink Blob */}
        <div className="absolute top-40 right-10 w-96 h-96 bg-pink-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000" />
        {/* Blue Blob */}
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 max-w-6xl pt-8">
        {/* Title Section - Reduced Spacing */}
        <div
          className={`text-center mb-10 sm:mb-14 transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-purple-500/20">
            <Download className="w-3.5 h-3.5 mr-2" aria-hidden="true" />
            Disponible en todas las plataformas
          </div>

          <h2
            id="downloads-heading"
            className="text-4xl sm:text-5xl font-extrabold text-[#1f1f66] mb-8 tracking-tight drop-shadow-sm"
          >
            Descarga la app
          </h2>

          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Lleva tu entretenimiento a donde vayas.
            <span className="block mt-1 text-slate-400">
              Calidad premium en todos tus dispositivos.
            </span>
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {downloadPlatforms.map((platform, index) => {
            const Icon = platform.icon;
            const isHovered = hoveredCard === platform.id;

            return (
              <a
                key={platform.id}
                href={platform.link}
                onMouseEnter={() => setHoveredCard(platform.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onFocus={() => setHoveredCard(platform.id)}
                onBlur={() => setHoveredCard(null)}
                className={`group relative flex flex-col items-center gap-1.5 px-7 py-7 rounded-2xl border-[3px] border-[#4a5fc9] bg-[linear-gradient(135deg,#131c67_0%,#1d2570_35%,#331165_70%,#4d0c68_100%)] backdrop-blur-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 hover:border-[#6b7fd9] hover:shadow-[0_20px_50px_-10px_rgba(100,150,255,0.3)] min-h-[320px] ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
                }}
                aria-label={`Descargar para ${platform.label} - ${platform.sublabel}`}
              >
                {/* Stats Card Effect 1: Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[1.1rem]" />

                {/* Stats Card Effect 2: Glow */}
                <div
                  className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-purple-500/20 via-blue-500/15 to-purple-500/20 opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-300"
                  aria-hidden
                />

                {/* Card Sheen */}
                <div className="card-sheen z-30 opacity-30" aria-hidden>
                  <div className="sheen group-hover:animate-shine" />
                </div>

                {/* Icon Container - Matching Stats Style */}
                <div className="relative z-10 flex items-center justify-center w-20 h-20 mb-4 rounded-xl bg-gradient-to-br from-[#4a5fc9]/40 via-[#6b7fd9]/30 to-[#4a5fc9]/20 text-[#fcf3e1] shadow-lg ring-2 ring-[#6b7fd9]/60 group-hover:ring-[#8fa0e9]/80 group-hover:shadow-[#4a5fc9]/30 transition-all duration-300">
                  <Icon
                    className="w-10 h-10 text-[#fcf3e1] drop-shadow-lg"
                    aria-hidden="true"
                  />
                </div>

                {/* Typography */}
                <h3 className="text-2xl font-bold text-[#fcf3e1] mb-1 tracking-tight transition-colors">
                  {platform.label}
                </h3>

                <p className="text-[#fcf3e1]/70 text-sm font-medium mb-6 text-center uppercase tracking-widest">
                  {platform.sublabel}
                </p>

                {/* Action Button - Reverted to Cream/White */}
                <div className="mt-auto w-full">
                  <div
                    className={`flex items-center justify-center gap-2 w-full h-12 px-6 rounded-xl font-bold text-[#131c67] bg-[#fcf3e1] shadow-lg transition-all duration-300 transform group-hover:shadow-[0_0_20px_rgba(252,243,225,0.4)] group-hover:scale-[1.02] group-active:scale-95 ring-2 ring-transparent group-hover:ring-[#fcf3e1]/50`}
                  >
                    <span>Descargar</span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isHovered ? "translate-x-1" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-3 left-1/2 h-0.5 w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-purple-400/60 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Bottom Transition - Smooth Concave Arc */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
        <svg
          className="relative block w-full h-[100px] sm:h-[150px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="bottomGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#822e6a" />
              <stop offset="50%" stopColor="#5456d5" />
              <stop offset="100%" stopColor="#1f1f66" />
            </linearGradient>
          </defs>
          <path
            d="M0,0 Q600,140 1200,0 L1200,120 L0,120 Z"
            fill="url(#bottomGradient)"
          />
        </svg>
      </div>
    </section>
  );
};

export default DownloadLinksSection;
