import logo from "../assets/fullvision_logo_color.svg";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#top"
      className={`flex items-center gap-2 ${className}`}
      aria-label="FullVision Home"
    >
      <div className="bg-white rounded-full p-1 shadow-sm">
        <img
          src={logo}
          alt=""
          className="h-12 w-12 sm:h-16 sm:w-16 select-none object-contain"
        />
      </div>
      <span className="text-xl sm:text-2xl font-extrabold tracking-tight leading-none text-gray-900">
        FullVisionTV
      </span>
    </a>
  );
}
