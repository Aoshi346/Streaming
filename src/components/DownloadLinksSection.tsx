import React from 'react'
import { FaAndroid, FaApple, FaWindows, FaDesktop } from 'react-icons/fa'

interface DownloadPlatform {
  id: string
  label: string
  icon: React.ReactNode
  link: string
  storeName: string
}

const downloadPlatforms: DownloadPlatform[] = [
  {
    id: 'android',
    label: 'Android',
    icon: <FaAndroid className="h-6 w-6 text-green-500" aria-hidden />,
    link: 'https://play.google.com/store/apps/details?id=com.fullvision',
    storeName: 'Google Play',
  },
  {
    id: 'ios',
    label: 'iOS',
    icon: <FaApple className="h-6 w-6 text-gray-300" aria-hidden />,
    link: 'https://apps.apple.com/app/fullvision/id123456789',
    storeName: 'App Store',
  },
  {
    id: 'macos',
    label: 'MacOS',
    icon: <FaDesktop className="h-6 w-6 text-blue-400" aria-hidden />,
    link: 'https://fullvision.com/download/macos',
    storeName: 'Descargar para Mac',
  },
  {
    id: 'windows',
    label: 'Windows',
    icon: <FaWindows className="h-6 w-6 text-blue-600" aria-hidden />,
    link: 'https://fullvision.com/download/windows',
    storeName: 'Descargar para Windows',
  },
]

const DownloadLinksSection: React.FC = () => {
  return (
    <section id="downloads" className="border-t border-white/10 py-14 sm:py-18">
      <div className="container-wrapper">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-3">Descarga la app</h2>
        <p className="mb-8 text-text-secondary/90">Obtén FullVision en tu dispositivo favorito. Elige tu plataforma y descarga la aplicación oficial.</p>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          {downloadPlatforms.map((platform) => (
            <a
              key={platform.id}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-6 shadow-theme-soft transition hover:-translate-y-1 hover:shadow-theme-strong focus:outline-none focus-visible:ring focus-visible:ring-brand-light/60"
              aria-label={`Descargar para ${platform.label} (${platform.storeName})`}
            >
              {platform.icon}
              <span className="text-base font-semibold text-white">{platform.label}</span>
              <span className="text-xs text-text-secondary">{platform.storeName}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DownloadLinksSection
