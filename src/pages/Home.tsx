import { useEffect, useState } from 'react'
import SmoothScrollProvider from '../components/SmoothScrollProvider'
import Navigation from '../components/Navigation'
import HeroSection from '../sections/HeroSection'
import ServicesSection from '../sections/ServicesSection'
import PortfolioSection from '../sections/PortfolioSection'
import ReviewsSection from '../sections/ReviewsSection'
import FooterSection from '../sections/FooterSection'

export default function Home() {
  const [bookingVisible, setBookingVisible] = useState(false)

  const handleNavigate = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const footer = document.getElementById('footer')
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setBookingVisible(entry.isIntersecting)
      },
      {
        rootMargin: '0px 0px -28% 0px',
        threshold: 0.08,
      }
    )

    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return (
    <SmoothScrollProvider>
      <Navigation onNavigate={handleNavigate} />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <ReviewsSection />
        <FooterSection />
      </main>
      {!bookingVisible && (
        <a
          href="#footer"
          onClick={(e) => {
            e.preventDefault()
            handleNavigate('footer')
          }}
          className="hair-button hair-button-dark fixed bottom-5 left-5 right-5 z-50 bg-[#30101f] text-[#fff8fb] shadow-[0_18px_50px_rgba(48,16,31,0.34),0_0_0_1px_rgba(255,255,255,0.18)] sm:left-auto sm:right-6 sm:w-auto"
          data-cursor="pointer"
        >
          Book on WhatsApp
        </a>
      )}
    </SmoothScrollProvider>
  )
}
