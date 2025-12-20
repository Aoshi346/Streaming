import logo from "../assets/fullvision_logo_color.svg";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#top"
      className={`flex items-center gap-2 ${className}`}
      aria-label="FullVision Home"
    >
      <img
        src={logo}
        alt="FullVisionTV logo"
        className="h-14 sm:h-20 md:h-24 w-auto select-none object-contain"
      />
      <span className="text-base sm:text-lg md:text-xl tracking-tight leading-none text-text-primary uppercase">
        <span className="font-extrabold">FULL</span>
        <span className="font-bold">VISIONTV</span>
      </span>
    </a>
  );
}
