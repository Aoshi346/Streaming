import { forwardRef } from 'react'
import { FaTv, FaMobileAlt, FaTabletAlt, FaLaptop } from 'react-icons/fa'

const devices = [
  { name: 'TV', icon: FaTv },
  { name: 'Móvil', icon: FaMobileAlt },
  { name: 'Tablet', icon: FaTabletAlt },
  { name: 'Laptop', icon: FaLaptop },
]

const Devices = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} id="devices" className="border-t border-white/10 py-16 sm:py-20">
      <div className="container-wrapper">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Mira en cualquier dispositivo</h2>
            <p className="mt-3 text-text-secondary/90">
              Transmite en tu smartphone, tablet, laptop y TV sin perder el ritmo. Cambia de dispositivos sin problemas y continúa justo donde lo dejaste.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {devices.map(({ name, icon: Icon }) => (
                <span key={name} className="device-item inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-text-secondary">
                  <Icon aria-hidden className="h-4 w-4 text-accent" />
                  {name}
                </span>
              ))}
            </div>
          </div>
          <div className="aspect-video overflow-hidden rounded-xl border border-white/10 bg-black">
            <div className="flex h-full w-full items-center justify-center bg-device-gradient">
              <span className="rounded-full bg-white/[0.04] px-4 py-2 text-text-secondary backdrop-blur">Área de vista previa</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

Devices.displayName = 'Devices'

export default Devices
