import logo from '../assets/fullvision_logo2.svg'

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center ${className}`} aria-label="FullVision Home">
      <img
        src={logo}
        alt=""
        className="h-16 w-16 select-none object-contain"
      />
      <span className="ml-2 text-2xl font-extrabold tracking-tight leading-none">FullVisionTV</span>
    </a>
  )
}
