import React, { useEffect, useRef, useState } from "react";
import {
  Smartphone,
  Tablet,
  Monitor,
  Download,
  ArrowRight,
} from "lucide-react";

interface DownloadPlatform {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  link: string;
  gradient: string;
  shadowColor: string;
}

const downloadPlatforms: DownloadPlatform[] = [
  {
    id: "mobile",
    label: "Móvil",
    sublabel: "Android & iOS",
    icon: Smartphone,
    link: "https://fullvision.com/download/mobile",
    gradient: "from-[#3b82f6] to-[#06b6d4]", // Brand Blue -> Cyan
    shadowColor: "shadow-blue-500/20",
  },
  {
    id: "tablet",
    label: "Tablet",
    sublabel: "iPad & Android",
    icon: Tablet,
    link: "https://fullvision.com/download/tablet",
    gradient: "from-[#8b5cf6] to-[#ec4899]", // Brand Purple -> Pink
    shadowColor: "shadow-purple-500/20",
  },
  {
    id: "windows",
    label: "Windows",
    sublabel: "PC Desktop",
    icon: Monitor,
    link: "https://fullvision.com/download/windows",
    gradient: "from-[#6366f1] to-[#8b5cf6]", // Brand Indigo -> Violet
    shadowColor: "shadow-indigo-500/20",
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
      className="relative py-24 sm:py-36 bg-white overflow-hidden"
      aria-labelledby="downloads-heading"
    >
      {/* Top Wave Transition - Seamless from PricingCTA (Purple -> Blue -> Navy) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
        <svg
          className="relative block w-full h-[150px] sm:h-[200px]"
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
          </defs>
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="url(#pricingGradient)"
            fillOpacity="1"
          />
        </svg>
      </div>

      {/* Animated Background Elements - Updated to Brand Colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none mt-[150px]">
        {/* Purple Blob */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
        {/* Pink Blob */}
        <div className="absolute top-40 right-10 w-96 h-96 bg-pink-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000" />
        {/* Blue Blob */}
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 max-w-6xl pt-10">
        {/* Title Section */}
        <div
          className={`text-center mb-16 sm:mb-20 transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-purple-500/20">
            <Download className="w-3.5 h-3.5 mr-2" aria-hidden="true" />
            Disponible en todas las plataformas
          </div>

          <h2
            id="downloads-heading"
            className="text-4xl sm:text-5xl font-extrabold text-[#1f1f66] mb-6 tracking-tight drop-shadow-sm"
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
                className={`group relative flex flex-col items-center bg-white rounded-[2rem] p-8 shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 ${
                  platform.shadowColor
                } min-h-[340px] border border-slate-50 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
                }}
                aria-label={`Descargar para ${platform.label} - ${platform.sublabel}`}
              >
                {/* Gradient Border Effect on Hover */}
                <div
                  className={`absolute inset-0 rounded-[2rem] p-[2px] bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
                  aria-hidden="true"
                />

                {/* Inner White Background to simulate border */}
                <div className="absolute inset-[2px] bg-white rounded-[1.9rem] -z-10" />

                {/* Icon Container - Brand Gradient */}
                <div
                  className={`relative mb-6 p-5 rounded-2xl bg-gradient-to-br ${platform.gradient} shadow-lg shadow-gray-200 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <Icon
                    className="w-10 h-10 text-white drop-shadow-md"
                    aria-hidden="true"
                  />

                  {/* Internal Icon Glow */}
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Typography */}
                <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 transition-colors">
                  {platform.label}
                </h3>

                <p className="text-slate-400 text-sm font-medium mb-10 text-center">
                  {platform.sublabel}
                </p>

                {/* Download Button */}
                <div className="mt-auto w-full">
                  <div
                    className={`flex items-center justify-center gap-2 w-full h-12 px-6 rounded-xl font-bold text-white bg-gradient-to-r ${platform.gradient} shadow-lg transition-all duration-300 transform group-hover:shadow-xl group-hover:scale-[1.02] group-active:scale-95`}
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
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DownloadLinksSection;
