import { forwardRef } from 'react'

const Hero = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} id="top" className="relative isolate overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover -z-20"
      >
        {/* 
          TODO: Replace with actual video source. 
          This is a placeholder from https://videos.pexels.com/
        */}
        <source src="https://videos.pexels.com/video-files/3254013/3254013-hd_1920_1080_25fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-950/40 to-black/80 -z-10" />

      <div className="container-wrapper relative">
        <div className="py-20 md:py-28 lg:py-36">
          <div className="max-w-3xl text-center mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
              Películas, series y más ilimitadas
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Mira en cualquier lugar. Cancela en cualquier momento.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <a
                href="#pricing"
                className="shrink-0 rounded-md bg-purple-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/80 hover:-translate-y-0.5 hover:shadow-purple-600/50"
              >
                SUSCRÍBETE AHORA
              </a>
              <a
                href="#features"
                className="shrink-0 rounded-md border border-white/50 bg-transparent px-8 py-3 text-base font-semibold text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 hover:bg-white/10"
              >
                EXPLORAR CATÁLOGO
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

Hero.displayName = 'Hero'

export default Hero
