import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// Replaced lucide-react icons with react-icons (already installed) to avoid adding new dependency
import { FaTv, FaMobileAlt, FaTabletAlt, FaLaptop } from "react-icons/fa";
import { gsap } from "gsap";
import mobileDevicePng from "../assets/images/phone_mockup_bg-landscape-min.png";
import tvDevicePng from "../assets/images/tv_mockup_bg-front-min.png";
import tabletDevicePng from "../assets/images/tablet_mockup-min.png";
import laptopDevicePng from "../assets/images/laptop_mockup_bg-front-min.png";

type DeviceID = "tv" | "mobile" | "tablet" | "laptop";

interface DeviceSpec {
  id: DeviceID;
  label: string;
  icon: React.ReactNode;
  aspectRatio: string;
  radius: number;
}

interface DeviceContent {
  title: string;
  description: string;
  items: string[];
  color: string;
}

const DEVICE_SPECS: DeviceSpec[] = [
  {
    id: "tv",
    label: "TV",
    icon: <FaTv className="h-5 w-5" />,
    aspectRatio: "16/9",
    radius: 12,
  },
  // Phone PNG is now horizontal/landscape orientation
  {
    id: "mobile",
    label: "Móvil",
    icon: <FaMobileAlt className="h-5 w-5" />,
    aspectRatio: "16/9",
    radius: 20,
  },
  {
    id: "tablet",
    label: "Tablet",
    icon: <FaTabletAlt className="h-5 w-5" />,
    aspectRatio: "16/9",
    radius: 16,
  },
  {
    id: "laptop",
    label: "Laptop",
    icon: <FaLaptop className="h-5 w-5" />,
    aspectRatio: "16/9",
    radius: 12,
  },
];

const DEVICE_CONTENT: Record<DeviceID, DeviceContent> = {
  tv: {
    title: "Streaming en Pantalla Grande",
    description:
      "Vive tus películas y series favoritas en calidad 4K con sonido envolvente",
    items: ["Samsung", "LG", "Sony", "Xiaomi TV", "Android TV"],
    color: "from-blue-600/20 to-blue-400/10",
  },
  mobile: {
    title: "Streaming Sin Límites",
    description:
      "Lleva miles de canales, series y películas en tu bolsillo. Mira donde quieras",
    items: ["Android", "iPhone"],
    color: "from-purple-600/20 to-purple-400/10",
  },
  tablet: {
    title: "Tu Cine Personal",
    description:
      "Disfruta del streaming en una pantalla más grande mientras te relajas",
    items: ["iPad", "Xiaomi Pad", "Samsung Tab"],
    color: "from-pink-600/20 to-pink-400/10",
  },
  laptop: {
    title: "Streaming en tu Escritorio",
    description:
      "Accede a todo tu contenido favorito mientras trabajas o estudias",
    items: ["Windows", "macOS"],
    color: "from-cyan-600/20 to-cyan-400/10",
  },
};

function parseAspect(aspect: string): number {
  const [w, h] = aspect.split("/").map(Number);
  if (!w || !h) return 16 / 9;
  return w / h;
}

const Devices = forwardRef<HTMLElement>((_, ref) => {
  const [activeDeviceID, setActiveDeviceID] = useState<DeviceID>("tv");
  const prevIDRef = useRef<DeviceID>("tv");

  const tabsRef = useRef<HTMLDivElement>(null);
  const previewOuterRef = useRef<HTMLDivElement>(null);
  const ratioBoxRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<Record<DeviceID, HTMLDivElement | null>>({
    tv: null,
    mobile: null,
    tablet: null,
    laptop: null,
  });
  const contentRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false,
    []
  );
  const hoverCapable = useMemo(
    () =>
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(hover: hover) and (pointer: fine)").matches
        : false,
    []
  );
  const isMobile = useMemo(
    () =>
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(max-width: 768px)").matches
        : false,
    []
  );

  // We now use a CSS-only active state for the tab "pill" to simplify mobile behavior
  // and avoid JS-driven position/Flip work. Keep tabsRef for hover animations.

  // Animate preview and content with creative transitions
  useLayoutEffect(() => {
    const currentID = activeDeviceID;
    const prevID = prevIDRef.current;
    if (prevID === currentID) return;

    const nextSpec = DEVICE_SPECS.find((d) => d.id === currentID)!;
    const box = ratioBoxRef.current;
    const outer = previewOuterRef.current;
    const prevFrame = framesRef.current[prevID];
    const nextFrame = framesRef.current[currentID];
    const content = contentRef.current;
    if (!box || !outer || !nextFrame) {
      prevIDRef.current = currentID;
      return;
    }

    const nextPad = 100 / parseAspect(nextSpec.aspectRatio);

    const isNarrow =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(max-width: 640px)").matches
        : false;
    const adjPad = isNarrow ? nextPad * 0.68 : nextPad;

    // On reduced motion or narrow screens prefer simple direct style changes for performance
    if (prefersReducedMotion || isNarrow) {
      box.style.paddingTop = `${adjPad}%`;
      outer.style.borderRadius = `${nextSpec.radius}px`;
      if (prevFrame) prevFrame.style.opacity = "0";
      nextFrame.style.opacity = "1";
      if (content) content.style.opacity = "1";
      prevIDRef.current = currentID;
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    // Animate container shape and size
    tl.to(box, { paddingTop: `${adjPad}%`, duration: 0.7 }, 0).to(
      outer,
      {
        borderRadius: nextSpec.radius,
        duration: 0.7,
        ease: "power2.inOut",
      },
      0
    );

    // Previous frame exits with 3D rotation and fade
    if (prevFrame) {
      tl.to(
        prevFrame,
        {
          opacity: 0,
          rotateY: -15,
          scale: 0.92,
          duration: 0.45,
          ease: "power2.in",
        },
        0
      );
    }

    // Next frame enters with 3D rotation, scale, and float
    tl.fromTo(
      nextFrame,
      {
        opacity: 0,
        scale: 0.88,
        rotateY: 15,
        y: 20,
      },
      {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        y: 0,
        duration: 0.65,
        ease: "power2.out",
      },
      0.2
    );

    // Content fades in with slight upward motion
    if (content) {
      tl.to(
        content,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
        },
        0.25
      );
    }

    prevIDRef.current = currentID;
  }, [activeDeviceID, prefersReducedMotion]);

  // (floating animation removed per request)

  // Parallax effect on mouse move
  // Parallax effect on mouse move - disabled on mobile for performance
  useEffect(() => {
    if (!hoverCapable || prefersReducedMotion || isMobile) return;

    const outer = previewOuterRef.current;
    if (!outer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = outer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const activeFrame = framesRef.current[activeDeviceID];
      if (activeFrame) {
        gsap.to(activeFrame, {
          rotateY: x * 8,
          rotateX: -y * 8,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      const activeFrame = framesRef.current[activeDeviceID];
      if (activeFrame) {
        gsap.to(activeFrame, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    };

    outer.addEventListener("mousemove", handleMouseMove);
    outer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      outer.removeEventListener("mousemove", handleMouseMove);
      outer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeDeviceID, hoverCapable, prefersReducedMotion]);

  // Hover animations
  useEffect(() => {
    if (!hoverCapable) return;
    const tabs = tabsRef.current;
    if (!tabs) return;
    const cleanups: Array<() => void> = [];
    tabs
      .querySelectorAll<HTMLButtonElement>("button[data-device]")
      .forEach((btn) => {
        const icon = btn.querySelector(".icon");
        const onEnter = () => {
          if (btn.dataset.device === activeDeviceID) return;
          gsap.to(btn, { opacity: 1, duration: 0.2 });
          if (icon) {
            gsap.fromTo(
              icon,
              { scale: 0.9 },
              { scale: 1.1, duration: 0.3, ease: "back.out" }
            );
          }
        };
        const onLeave = () => {
          if (btn.dataset.device === activeDeviceID) return;
          gsap.to(btn, { opacity: 0.6, duration: 0.2 });
          if (icon) {
            gsap.to(icon, { scale: 1, duration: 0.3 });
          }
        };
        btn.addEventListener("mouseenter", onEnter);
        btn.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          btn.removeEventListener("mouseenter", onEnter);
          btn.removeEventListener("mouseleave", onLeave);
        });
      });
    return () => cleanups.forEach((fn) => fn());
  }, [hoverCapable, activeDeviceID]);

  // No JS-inserted pill needed: active state is handled by CSS classes on the button itself.

  const activeSpec = DEVICE_SPECS.find((d) => d.id === activeDeviceID)!;
  const activeContent = DEVICE_CONTENT[activeDeviceID];
  const padTop = 100 / parseAspect(activeSpec.aspectRatio);
  const isNarrowScreen =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(max-width: 640px)").matches
      : false;
  // Reduce the displayed padding-top on narrow screens so the preview height is not excessively tall
  const displayPadTop = isNarrowScreen ? padTop * 0.68 : padTop;

  return (
    <section
      ref={ref}
      id="devices"
      className="relative py-16 sm:py-20 md:py-24 overflow-hidden -mt-1"
    >
      {/* Background gradient - new palette */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#822e6a] via-[#5456d5] to-[#1f1f66] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-2 items-center">
          {/* Left: Tabs and Info */}
          <div className="space-y-6 sm:space-y-8">
            {/* Header with badge */}
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fcf3e1]/20 border border-[#fcf3e1]/30 backdrop-blur-sm">
                <span className="w-2 h-2 bg-[#fcf3e1] rounded-full animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold text-[#fcf3e1] uppercase tracking-wider">
                  Multiplataforma
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#fcf3e1] leading-tight drop-shadow-lg">
                Disponible en{" "}
                <span className="bg-gradient-to-r from-[#fcf3e1] via-[#fcf3e1]/90 to-[#fcf3e1]/70 bg-clip-text">
                  tus dispositivos favoritos
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#fcf3e1]/90 font-medium leading-relaxed max-w-lg">
                Transmite sin interrupciones en{" "}
                <strong className="text-[#fcf3e1]">TV</strong>,{" "}
                <strong className="text-[#fcf3e1]">móvil</strong>,{" "}
                <strong className="text-[#fcf3e1]">tablet</strong> o{" "}
                <strong className="text-[#fcf3e1]">laptop</strong>. Tu
                contenido, en cualquier pantalla.
              </p>
            </div>

            {/* Device Tabs - Mobile optimized */}
            <div
              ref={tabsRef}
              className="relative inline-flex items-center gap-1.5 sm:gap-2 rounded-2xl sm:rounded-full border-2 border-[#fcf3e1]/30 bg-[#fcf3e1]/15 p-1 sm:p-1.5 backdrop-blur-lg overflow-x-auto touch-pan-x flex-nowrap whitespace-nowrap shadow-lg scrollbar-hide max-w-full"
            >
              {DEVICE_SPECS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  data-device={d.id}
                  onClick={() => {
                    prevIDRef.current = activeDeviceID;
                    setActiveDeviceID(d.id);
                  }}
                  className={`relative z-10 flex items-center gap-1.5 sm:gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-300 shrink-0 ${
                    activeDeviceID === d.id
                      ? "text-[#1f1f66] bg-[#fcf3e1] border-2 border-[#fcf3e1] shadow-[0_0_15px_rgba(249,231,195,0.6)] scale-105"
                      : "text-[#fcf3e1]/90 hover:text-[#fcf3e1] hover:bg-[#fcf3e1]/20 active:scale-95"
                  }`}
                >
                  <span className="icon inline-flex text-base sm:text-lg">
                    {d.icon}
                  </span>
                  <span className="hidden sm:inline">{d.label}</span>
                </button>
              ))}
            </div>

            {/* Device Info - Enhanced mobile typography */}
            <div
              ref={contentRef}
              className="space-y-4 sm:space-y-6 opacity-100"
            >
              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#fcf3e1] leading-snug drop-shadow-md">
                  {activeContent.title}
                </h3>
                <p className="text-sm sm:text-base text-[#fcf3e1]/85 font-medium leading-relaxed">
                  {activeContent.description}
                </p>
              </div>

              {/* Feature list - Mobile optimized cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {activeContent.items.map((item, index) => (
                  <div
                    key={item}
                    className="group flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl bg-[#fcf3e1]/20 border border-[#fcf3e1]/25 sm:border-2 sm:border-[#fcf3e1]/30 backdrop-blur-md shadow-md sm:shadow-lg hover:bg-[#fcf3e1]/30 hover:border-[#fcf3e1]/50 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-300 cursor-default"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#fcf3e1] flex-shrink-0 shadow-[0_0_8px_rgba(249,231,195,0.8)] sm:shadow-[0_0_12px_rgba(249,231,195,1)] group-hover:shadow-[0_0_16px_rgba(249,231,195,1)] transition-shadow duration-300" />
                    <span className="text-xs sm:text-sm font-semibold text-[#fcf3e1] truncate drop-shadow-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Device Preview */}
          <div className="flex justify-center lg:justify-end">
            <div
              ref={previewOuterRef}
              className="relative w-full max-w-[90vw] sm:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] overflow-visible perspective-1000"
              style={{ perspective: "1200px" }}
            >
              {/* Animated glow background */}
              <div
                className="absolute inset-0 -z-10 rounded-[inherit] blur-3xl opacity-30 transition-all duration-700"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 70%)",
                  transform: "scale(1.1)",
                }}
              />

              <div
                className="relative overflow-hidden border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md transition-all duration-700"
                style={{
                  borderRadius: `${activeSpec.radius}px`,
                  boxShadow: `0 20px 60px -15px rgba(0,0,0,0.5)`,
                }}
              >
                {/* Ratio box for aspect ratio */}
                <div
                  ref={ratioBoxRef}
                  className="w-full"
                  style={{ paddingTop: `${displayPadTop}%` }}
                />

                {/* Animated gradient overlay for depth */}
                <div
                  className="absolute inset-0 opacity-40 pointer-events-none transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255, 0.1) 0%, transparent 60%)",
                  }}
                />

                {/* Device frames */}
                {DEVICE_SPECS.map((d) => (
                  <div
                    key={d.id}
                    ref={(el) => (framesRef.current[d.id] = el)}
                    className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300`}
                    style={{
                      opacity: activeDeviceID === d.id ? 1 : 0,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {
                      // Render the matching PNG mockup asset for each device.
                      d.id === "mobile" ? (
                        <img
                          src={mobileDevicePng}
                          alt={`${d.label} frame`}
                          className="w-[85%] h-[85%] object-contain drop-shadow-2xl"
                          draggable={false}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : d.id === "tv" ? (
                        <img
                          src={tvDevicePng}
                          alt={`${d.label} frame`}
                          className="w-full h-full object-contain drop-shadow-2xl scale-150"
                          draggable={false}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : d.id === "tablet" ? (
                        <img
                          src={tabletDevicePng}
                          alt={`${d.label} frame`}
                          className="w-full h-full object-contain drop-shadow-2xl scale-[1.75] sm:scale-125"
                          draggable={false}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : d.id === "laptop" ? (
                        <img
                          src={laptopDevicePng}
                          alt={`${d.label} frame`}
                          className="w-full h-full object-contain drop-shadow-2xl"
                          draggable={false}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <svg
                          className="max-h-[95%] max-w-[95%]"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="xMidYMid meet"
                          aria-hidden="true"
                        />
                      )
                    }
                  </div>
                ))}

                {/* Shine effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                    transform: "translateX(-100%)",
                    animation: "shine 3s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider removed */}
    </section>
  );
});

Devices.displayName = "Devices";

export default Devices;
