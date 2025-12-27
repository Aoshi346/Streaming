import { forwardRef } from "react";
import { FaHeadset, FaSync, FaUsers, FaShieldAlt } from "react-icons/fa";

const serviceFeatures = [
  {
    icon: FaHeadset,
    title: "Soporte",
    description:
      "Asistencia técnica especializada disponible para resolver cualquier inconveniente con tu servicio.",
  },
  {
    icon: FaSync,
    title: "Sincronización",
    description:
      "Tu contenido sincronizado en todos tus dispositivos. Continúa donde lo dejaste.",
  },
  {
    icon: FaUsers,
    title: "Atención al Cliente",
    description:
      "Equipo dedicado para atender tus consultas y brindarte la mejor experiencia.",
  },
  {
    icon: FaShieldAlt,
    title: "Estabilidad",
    description:
      "Servidores de alta disponibilidad que garantizan streaming sin interrupciones 24/7.",
  },
];

const ServiceInfo = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      id="service-info"
      className="relative bg-white pt-16 sm:pt-24 pb-0"
    >
      <div className="container-wrapper px-4 sm:px-6 pb-16 sm:pb-24">
        {/* Section header */}
        <div className="text-center mb-14 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#5456d5] via-[#822e6a] to-[#5456d5] bg-clip-text text-transparent mb-5">
            Nuestro Servicio
          </h2>
          <p className="text-gray-700 text-lg sm:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Todo lo que necesitas para disfrutar del mejor entretenimiento.
          </p>
        </div>

        {/* Features grid - 4 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          {serviceFeatures.map((feature, index) => (
            <div key={index} className="group text-center">
              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#822e6a] via-[#5456d5] to-[#1f1f66] flex items-center justify-center shadow-xl shadow-[#5456d5]/20 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-[#5456d5]/30 transition-all duration-300">
                <feature.icon className="w-9 h-9 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Wave divider connecting to footer - no gap */}
      <div className="w-full leading-none">
        <svg
          className="w-full h-24 sm:h-32 block"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="serviceInfoWaveGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#1f1f66" />
              <stop offset="50%" stopColor="#5456d5" />
              <stop offset="100%" stopColor="#822e6a" />
            </linearGradient>
          </defs>
          <path
            d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,70 1440,50 L1440,120 L0,120 Z"
            fill="url(#serviceInfoWaveGradient)"
          />
        </svg>
      </div>
    </section>
  );
});

ServiceInfo.displayName = "ServiceInfo";

export default ServiceInfo;
