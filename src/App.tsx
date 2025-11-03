import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header'
import Hero from './components/Hero'
import FeaturesSection from './components/FeaturesSection'
import Devices from './components/Devices'
import DownloadLinksSection from './components/DownloadLinksSection'
import PricingCTA from './components/PricingCTA'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import { ThemeProvider } from './theme'
import SectionTitleAnimator from './components/SectionTitleAnimator'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const headerRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const devicesRef = useRef<HTMLElement>(null)
  const pricingRef = useRef<HTMLElement>(null)
  const faqRef = useRef<HTMLElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const animations: gsap.core.Tween[] = []

    if (headerRef.current) {
      const headerChildren = Array.from(headerRef.current.children)
      if (headerChildren.length) {
        animations.push(
          gsap.fromTo(
            headerChildren,
            { opacity: 0, y: -20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
            }
          )
        )
      }
    }

    if (heroRef.current) {
      const heroButtons = heroRef.current.querySelectorAll('a')
      if (heroButtons.length) {
        animations.push(
          gsap.fromTo(heroButtons, { opacity: 0, y: 20 }, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: { trigger: heroRef.current, start: 'top 80%' },
          })
        )
      }
    }

    if (pricingRef.current) {
      const pricingCards = pricingRef.current.querySelectorAll('.pricing-card')
      if (pricingCards.length) {
        animations.push(
          gsap.fromTo(pricingCards, { opacity: 0, y: 50 }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: { trigger: pricingRef.current, start: 'top 80%' },
          })
        )
      }
    }

    if (faqRef.current) {
      const faqDetails = faqRef.current.querySelectorAll('details')
      if (faqDetails.length) {
        animations.push(
          gsap.fromTo(faqDetails, { opacity: 0, x: -20 }, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: faqRef.current, start: 'top 80%' },
          })
        )
      }
    }

    if (footerRef.current) {
      const footerChildren = Array.from(footerRef.current.children)
      if (footerChildren.length) {
        animations.push(
          gsap.fromTo(footerChildren, { opacity: 0, y: 20 }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
          })
        )
      }
    }

    return () => {
      animations.forEach((anim) => anim.kill())
    }
  }, [])

  return (
    <ThemeProvider>
      <div className="min-h-full bg-[color:var(--color-background)] bg-page-gradient">
        <SectionTitleAnimator />
        <Header ref={headerRef} />
        <main>
          <Hero ref={heroRef} />
          <DownloadLinksSection />
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
