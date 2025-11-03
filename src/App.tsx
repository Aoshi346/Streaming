import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Header from './components/Header'
import Hero from './components/Hero'
import FeaturesSection from './components/FeaturesSection'
import Devices from './components/Devices'
import PricingCTA from './components/PricingCTA'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import { ThemeProvider } from './theme'

export default function App() {
  const headerRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const devicesRef = useRef<HTMLElement>(null)
  const pricingRef = useRef<HTMLElement>(null)
  const faqRef = useRef<HTMLElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Header animation
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: headerRef.current, start: 'top 80%' } }
      )
    }

    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.querySelector('h1'), 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: heroRef.current, start: 'top 80%' } }
      )
      gsap.fromTo(heroRef.current.querySelector('p'), 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power2.out', scrollTrigger: { trigger: heroRef.current, start: 'top 80%' } }
      )
      gsap.fromTo(heroRef.current.querySelector('form'), 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: 'power2.out', scrollTrigger: { trigger: heroRef.current, start: 'top 80%' } }
      )
    }

    // Features animation
    if (featuresRef.current) {
      gsap.fromTo(featuresRef.current.querySelector('h2'), 
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: featuresRef.current, start: 'top 80%' } }
      )
      gsap.fromTo(featuresRef.current.querySelector('p'), 
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.1, ease: 'power2.out', scrollTrigger: { trigger: featuresRef.current, start: 'top 80%' } }
      )
      gsap.fromTo(featuresRef.current.querySelectorAll('.feature-item'), 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: featuresRef.current, start: 'top 80%' } }
      )
    }

    // Devices animation
    if (devicesRef.current) {
      gsap.fromTo(devicesRef.current.querySelector('h2'), 
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: devicesRef.current, start: 'top 80%' } }
      )
      gsap.fromTo(devicesRef.current.querySelector('p'), 
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.1, ease: 'power2.out', scrollTrigger: { trigger: devicesRef.current, start: 'top 80%' } }
      )
      gsap.fromTo(devicesRef.current.querySelectorAll('.device-item'), 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)', scrollTrigger: { trigger: devicesRef.current, start: 'top 80%' } }
      )
    }

    // Pricing animation
    if (pricingRef.current) {
      gsap.fromTo(pricingRef.current.querySelector('h2'), 
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: pricingRef.current, start: 'top 80%' } }
      )
      gsap.fromTo(pricingRef.current.querySelectorAll('.pricing-card'), 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out', scrollTrigger: { trigger: pricingRef.current, start: 'top 80%' } }
      )
    }

    // FAQ animation
    if (faqRef.current) {
      gsap.fromTo(faqRef.current.querySelector('h2'), 
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: faqRef.current, start: 'top 80%' } }
      )
      gsap.fromTo(faqRef.current.querySelectorAll('details'), 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: faqRef.current, start: 'top 80%' } }
      )
    }

    // Footer animation
    if (footerRef.current) {
      gsap.fromTo(footerRef.current.children, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: footerRef.current, start: 'top 90%' } }
      )
    }
  }, [])

  return (
    <ThemeProvider>
      <div className="min-h-full bg-[color:var(--color-background)] bg-page-gradient">
        <Header ref={headerRef} />
        <main>
          <Hero ref={heroRef} />
          <FeaturesSection ref={featuresRef} />
          <Devices ref={devicesRef} />
          <PricingCTA ref={pricingRef} />
          <FAQ ref={faqRef} />
        </main>
        <Footer ref={footerRef} />
      </div>
    </ThemeProvider>
  )
}
