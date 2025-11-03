import logo from '../assets/fullvision_logo1.svg'

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center ${className}`} aria-label="FullVision Home">
      <img
        src={logo}
        alt="Logo"
        className="h-12 w-12 select-none object-contain"
      />
      <span className="ml-3 text-2xl font-extrabold tracking-tight leading-none">FullVisionTV</span>
    </a>
  )
}
