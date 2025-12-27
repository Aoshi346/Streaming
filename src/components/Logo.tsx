import logo from "../assets/images/fullvision_logo_color.svg";

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
      <span className="text-base sm:text-lg md:text-xl tracking-tight leading-none bg-gradient-to-r from-[#822e6a] via-[#5456d5] to-[#1f1f66] bg-clip-text text-transparent uppercase">
        <span className="font-extrabold">FULL</span>
        <span className="font-normal">VISIONTV</span>
      </span>
    </a>
  );
}
