"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useAccount } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Button } from "@/components/ui/button"
import { ChevronDown, Link } from 'lucide-react'
import { useReveal } from "@/hooks/use-reveal"

function ProblemSection() {
  const { ref, isVisible } = useReveal(0.2)

  const problems = [
    {
      title: "Integrations are slow",
      description: "Every new partner flow means another custom integration, review cycle, and launch delay.",
    },
    {
      title: "Redirects are worse",
      description: "Context is lost the moment users are pushed into a new tab, app, or wallet screen.",
    },
    {
      title: "Teams ship slower",
      description: "Product and growth teams wait on infra work instead of experimenting directly where users are.",
    },
  ]

  return (
    <section
      ref={ref}
      className="relative py-16 px-6 md:px-10 lg:px-12 overflow-hidden"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <div
            className={`inline-block transition-all duration-1000 ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <img
              src="/headers/integrations-slow.svg"
              alt="Integrations are slow. Redirects are worse."
              className="h-24 md:h-32 w-auto mx-auto mb-6"
            />
          </div>
          <p
            className={`text-lg md:text-xl text-black/70 max-w-3xl mx-auto mb-6 transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Users want to do more with their crypto in context, but integrations take time and links send them away.
          </p>
        </div>

        <div className="space-y-6 mb-10 max-w-3xl mx-auto">
          {problems.map((problem, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${400 + i * 150}ms` }}
            >
              <div className="flex items-start gap-4">
                <span className="font-mono text-sm text-black/30 mt-1">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-xl md:text-2xl font-light text-black mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-black/60 text-base leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-2">
          <button
            type="button"
            className={`inline-flex items-center gap-3 rounded-full bg-[#64B3AE] px-6 py-3 text-sm font-semibold text-white transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "850ms" }}
          >
            <span className="w-2 h-2 rounded-full bg-white/80" />
            <span>M Links changes that</span>
          </button>
        </div>
      </div>
    </section>
  )
}

function MlinksSection() {
  const { ref, isVisible } = useReveal(0.2)

  const features = [
    "Embed actions anywhere.",
    "Swap, stake, or buy in one click.",
    "Integrate in minutes.",
  ]

  return (
    <section
      ref={ref}
      className="py-16 px-6 md:px-10 lg:px-12"
      id="mlinks"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <div
            className={`inline-block transition-all duration-1000 ${
              isVisible ? "rotate-0 opacity-100" : "rotate-3 opacity-0"
            }`}
          >
            <img
              src="/headers/blockchain-links.svg"
              alt="Blockchain Links"
              className="h-24 md:h-32 w-auto mx-auto mb-6"
            />
          </div>
          <p
            className={`text-xl md:text-2xl text-black/70 max-w-3xl mx-auto transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            One‑click onchain actions, wherever your users already are.
          </p>
        </div>

        <div
          className={`mt-6 max-w-3xl mx-auto text-left text-base md:text-lg text-black/70 space-y-2 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          {features.map((line, i) => (
            <p key={i}>
              <span className="text-black/40 mr-2">{i + 1}.</span>
              {line}
            </p>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button
            variant="outline"
            className={`border-2 border-black/20 bg-transparent text-black hover:bg-black/5 hover:text-black font-semibold px-8 py-4 rounded-full transition-all duration-700 ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            style={{ transitionDelay: "850ms" }}
          >
            Learn More About Mlinks
          </Button>
        </div>
      </div>
    </section>
  )
}

function AlertsSection() {
  const { ref, isVisible } = useReveal(0.2)

  const alerts = [
    {
      title: "DeFi position updates",
      description: "Liquidations, fills, and key market moves",
    },
    {
      title: "Token activity and market trends",
      description: "Price moves, trends, and spikes",
    },
    {
      title: "Announcements, Governance",
      description: "Votes, proposals, and updates",
    },
    {
      title: "Event detection and monitoring",
      description: "Custom alerts via Monitoring SDK",
    },
  ]

  return (
    <section
      ref={ref}
      className="py-16 px-6 md:px-10 lg:px-12"
      id="alerts"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center md:text-left">
          <div
            className={`inline-block transition-all duration-1000 ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <img
              src="/headers/actionable-notifications.svg"
              alt="Actionable, Onchain Notifications"
              className="h-24 md:h-32 w-auto mb-6"
            />
          </div>
          <p
            className={`text-xl md:text-2xl text-black/70 max-w-2xl transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Deliver real-time updates to your users through multiple channels. Keep them informed and engaged with automated alerts for:
          </p>
        </div>

        <div
          className={`max-w-3xl text-left space-y-2 text-base md:text-lg text-black/70 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          {alerts.map((alert, i) => (
            <p key={i}>
              <span className="text-black/40 mr-2">•</span>
              <span className="font-medium">{alert.title}</span>
              <span className="text-black/50"> — {alert.description}</span>
            </p>
          ))}
        </div>

        <div className="mt-6 text-left">
          <Button
            variant="outline"
            className={`border-2 border-black/20 bg-transparent text-black hover:bg-black/5 hover:text-black font-semibold px-8 py-4 rounded-full transition-all duration-700 ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            Learn More About Alerts
          </Button>
        </div>
      </div>
    </section>
  )
}

function ReadyForBusinessSection() {
  const { ref, isVisible } = useReveal(0.2)

  const partners = ["Mantle core team", "Infra partners", "DeFi protocols", "Apps on Mantle"]

  return (
    <section
      ref={ref}
      className="py-16 px-6 md:px-10 lg:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <div
            className={`inline-block transition-all duration-1000 ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <img
              src="/headers/ready-business.svg"
              alt="Ready for Business"
              className="h-24 md:h-32 w-auto mx-auto mb-6"
            />
          </div>
          <p
            className={`text-lg md:text-xl text-black/70 mb-8 transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Built exclusively for Mantle Network.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-6">
          {partners.map((partner, i) => (
            <span
              key={i}
              className={`font-mono text-sm text-black/40 transition-all duration-700 md:text-base ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: `${400 + i * 100}ms` }}
            >
              {partner}
            </span>
          ))}
        </div>

        <div className="space-y-6 mb-8 max-w-2xl mx-auto">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="text-5xl md:text-6xl font-light text-black mb-2">600+</div>
            <p className="text-black/60 text-sm">Powering Mlinks</p>
          </div>
          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "700ms" }}
          >
            <p className="text-black/60 text-sm mb-3">Trusted by teams building on Mantle Network</p>
            <div className="flex flex-wrap gap-3">
              {["Mantle mainnet"].map((chain, i) => (
                <span
                  key={i}
                  className="font-mono text-xs text-black/50"
                >
                  {chain}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            href="https://meet.google.com/zma-igrq-jmd"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className={`bg-black text-white hover:bg-black/80 font-semibold px-8 py-4 rounded-full transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              Schedule a Demo
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}

function BenefitsSection() {
  const { ref, isVisible } = useReveal(0.2)

  const benefits = [
    {
      title: "One-Click Actions",
      description: "Run onchain actions without redirects.",
    },
    {
      title: "Better Retention",
      description: "Keep users in-flow and engaged.",
    },
    {
      title: "Fast & Easy Integration",
      description: "Ship with minimal code.",
    },
  ]

  return (
    <section
      ref={ref}
      className="py-16 px-6 md:px-10 lg:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <div
            className={`inline-block transition-all duration-1000 ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <img
              src="/headers/better-users.svg"
              alt="It's Just Better for Your Users"
              className="h-24 md:h-32 w-auto mx-auto mb-6"
            />
          </div>
        </div>

        <div
          className={`max-w-3xl mx-auto text-left space-y-3 text-base md:text-lg text-black/70 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {benefits.map((benefit, i) => (
            <p key={i}>
              <span className="text-black/40 mr-2">{i + 1}.</span>
              <span className="font-medium">{benefit.title}</span>
              <span className="text-black/50"> — {benefit.description}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

function IntegrationCTASection() {
  const { ref, isVisible } = useReveal(0.2)

  const features = [
    {
      title: "Mlinks",
      description: "Embed one-click blockchain actions anywhere.",
      link: "Learn More →",
    },
    {
      title: "Alerts",
      description: "Real-time onchain notifications for your users.",
      link: "Learn More →",
    },
  ]

  return (
    <section
      ref={ref}
      className="py-16 px-6 md:px-10 lg:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <div
            className={`inline-block transition-all duration-1000 ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <img
              src="/headers/integrate-code.svg"
              alt="Integrate Mlinks & Alerts with just a few lines of code"
              className="h-24 md:h-32 w-auto mx-auto mb-6"
            />
          </div>
          <p
            className={`text-lg md:text-xl text-black/70 max-w-3xl mx-auto mb-6 transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            APIs and SDKs to ship Web3 UX fast.
          </p>
          <Button
            className={`bg-black text-white hover:bg-black/80 font-semibold px-10 py-4 rounded-full text-lg transition-all duration-700 ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            Read the Docs
          </Button>
        </div>

        <div className="space-y-8 max-w-2xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${600 + i * 150}ms` }}
            >
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-xl font-light text-[#64B3AE]">{feature.title}</span>
              </div>
              <p className="text-black/60 text-base leading-relaxed mb-2">{feature.description}</p>
              <a
                href="#"
                className="text-[#64B3AE] hover:text-[#64B3AE]/80 font-mono text-sm transition-colors"
              >
                {feature.link}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [autoScrollOffset, setAutoScrollOffset] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const { isConnected } = useAccount()
  const router = useRouter()

  // Redirect to dashboard if wallet is connected
  useEffect(() => {
    if (isConnected) {
      router.push('/dashboard')
    }
  }, [isConnected, router])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const containerHeight = containerRef.current.offsetHeight
      const viewportHeight = window.innerHeight
      
      const scrollableDistance = containerHeight - viewportHeight
      const scrolled = -rect.top
      const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1)
      
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (scrollProgress < 0.95) return

    const interval = setInterval(() => {
      setAutoScrollOffset((prev) => prev - 1.5)
    }, 16)

    return () => clearInterval(interval)
  }, [scrollProgress])

  const cards = [
    {
      image: "/images/1.png",
      initial: { x: 0, y: 0, opacity: 0, scale: 0.75 },
      descending: { x: 0, y: 250, opacity: 1, scale: 0.95 },
      exploded: { x: -3200 + (Math.random() * 400 - 200), y: -280, opacity: 1, scale: 0.85, rotation: 0 },
      row: { x: -3200, y: 380, opacity: 1, scale: 1, rotation: 0 },
    },
    {
      image: "/images/2.png",
      initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
      descending: { x: 0, y: 250, opacity: 1, scale: 0.9 },
      exploded: { x: -2800 + (Math.random() * 400 - 200), y: -200, opacity: 1, scale: 0.9, rotation: 0 },
      row: { x: -2800, y: 380, opacity: 1, scale: 1, rotation: 0 },
    },
    {
      image: "/images/3.png",
      initial: { x: 0, y: 0, opacity: 0, scale: 0.85 },
      descending: { x: 0, y: 250, opacity: 1, scale: 0.88 },
      exploded: { x: -2400 + (Math.random() * 400 - 200), y: -150, opacity: 1, scale: 0.95, rotation: 0 },
      row: { x: -2400, y: 380, opacity: 1, scale: 1, rotation: 0 },
    },
    {
      image: "/images/4.png",
      initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
      descending: { x: 0, y: 250, opacity: 1, scale: 0.85 },
      exploded: { x: -2000 + (Math.random() * 400 - 200), y: -100, opacity: 1, scale: 1.1, rotation: 0 },
      row: { x: -2000, y: 380, opacity: 1, scale: 1, rotation: 0 },
    },
    {
      image: "/images/5.png",
      initial: { x: 0, y: 0, opacity: 0, scale: 0.78 },
      descending: { x: 0, y: 250, opacity: 1, scale: 0.82 },
      exploded: { x: -1600 + (Math.random() * 400 - 200), y: -120, opacity: 1, scale: 0.92, rotation: 0 },
      row: { x: -1600, y: 380, opacity: 1, scale: 1, rotation: 0 },
    },
    {
      image: "/images/6.png",
      initial: { x: 0, y: 0, opacity: 0, scale: 0.82 },
      descending: { x: 0, y: 250, opacity: 1, scale: 0.8 },
      exploded: { x: -1200 + (Math.random() * 400 - 200), y: -180, opacity: 1, scale: 0.9, rotation: 0 },
      row: { x: -1200, y: 380, opacity: 1, scale: 1, rotation: 0 },
    },
    {
      image: "/images/7.png",
      initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
      descending: { x: 0, y: 250, opacity: 1, scale: 0.78 },
      exploded: { x: -800 + (Math.random() * 400 - 200), y: -240, opacity: 1, scale: 0.88, rotation: 0 },
      row: { x: -800, y: 380, opacity: 1, scale: 1, rotation: 0 },
    },
    {
      image: "/images/9.png",
      initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
      descending: { x: 0, y: 250, opacity: 1, scale: 0.72 },
      exploded: { x: -400 + (Math.random() * 400 - 200), y: 50, opacity: 1, scale: 0.83, rotation: 0 },
      row: { x: -400, y: 380, opacity: 1, scale: 1, rotation: 0 },
    },
    {
      image: "/images/10.png",
      initial: { x: 0, y: 0, opacity: 0, scale: 0.7 },
      descending: { x: 0, y: 250, opacity: 1, scale: 0.68 },
      exploded: { x: 0 + (Math.random() * 400 - 200), y: -100, opacity: 1, scale: 0.82, rotation: 0 },
      row: { x: 0, y: 380, opacity: 1, scale: 1, rotation: 0 },
    },
    {
      image: "/images/11.png",
      initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
      descending: { x: 0, y: 250, opacity: 1, scale: 0.65 },
      exploded: { x: 400 + (Math.random() * 400 - 200), y: -60, opacity: 1, scale: 0.8, rotation: 0 },
      row: { x: 400, y: 380, opacity: 1, scale: 1, rotation: 0 },
    },
    {
      image: "/images/12.png",
      initial: { x: 0, y: 0, opacity: 0, scale: 0.72 },
      descending: { x: 0, y: 250, opacity: 1, scale: 0.5 },
      exploded: { x: 800 + (Math.random() * 400 - 200), y: 200, opacity: 1, scale: 0.78, rotation: 0 },
      row: { x: 800, y: 380, opacity: 1, scale: 1, rotation: 0 },
    },
    {
      image: "/images/13.png",
      initial: { x: 0, y: 0, opacity: 0, scale: 0.74 },
      descending: { x: 0, y: 250, opacity: 1, scale: 0.6 },
      exploded: { x: 1200 + (Math.random() * 400 - 200), y: 150, opacity: 1, scale: 0.88, rotation: 0 },
      row: { x: 1200, y: 380, opacity: 1, scale: 1, rotation: 0 },
    },
    {
      image: "/images/16.png",
      initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
      descending: { x: 0, y: 250, opacity: 1, scale: 0.58 },
      exploded: { x: 1600 + (Math.random() * 400 - 200), y: -120, opacity: 1, scale: 0.82, rotation: 0 },
      row: { x: 1600, y: 380, opacity: 1, scale: 1, rotation: 0 },
    },
    {
      image: "/images/17.png",
      initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
      descending: { x: 0, y: 250, opacity: 1, scale: 0.52 },
      exploded: { x: 2000 + (Math.random() * 400 - 200), y: 180, opacity: 1, scale: 0.8, rotation: 0 },
      row: { x: 2000, y: 380, opacity: 1, scale: 1, rotation: 0 },
    },
    {
      image: "/images/18.png",
      initial: { x: 0, y: 0, opacity: 0, scale: 0.72 },
      descending: { x: 0, y: 250, opacity: 1, scale: 0.5 },
      exploded: { x: 2400 + (Math.random() * 400 - 200), y: 100, opacity: 1, scale: 0.86, rotation: 0 },
      row: { x: 2400, y: 380, opacity: 1, scale: 1, rotation: 0 },
    },
    {
      image: "/images/19.png",
      initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
      descending: { x: 0, y: 250, opacity: 1, scale: 0.48 },
      exploded: { x: 2800 + (Math.random() * 400 - 200), y: 140, opacity: 1, scale: 0.84, rotation: 0 },
      row: { x: 2800, y: 380, opacity: 1, scale: 1, rotation: 0 },
    },
    {
      image: "/images/20.png",
      initial: { x: 0, y: 0, opacity: 0, scale: 0.68 },
      descending: { x: 0, y: 250, opacity: 1, scale: 0.46 },
      exploded: { x: 3200 + (Math.random() * 400 - 200), y: 200, opacity: 1, scale: 0.82, rotation: 0 },
      row: { x: 3200, y: 380, opacity: 1, scale: 1, rotation: 0 },
    },
  ]

  const displayCards = isMobile ? cards.slice(0, 7) : cards

  const getCardStyle = (card: typeof cards[0], index: number) => {
    let x = card.initial.x
    let y = card.initial.y
    let opacity = 0
    let scale = card.initial.scale

    const isLateCard = index >= 8

    if (scrollProgress > 0 && scrollProgress <= 0.35) {
      const progress = Math.min(scrollProgress / 0.35, 1)
      const delay = index * 0.05
      const adjustedProgress = Math.max(0, Math.min((progress - delay) * 2, 1))
      
      opacity = isLateCard ? 0 : adjustedProgress
    }

    if (scrollProgress > 0.35 && scrollProgress <= 0.55) {
      const progress = Math.min((scrollProgress - 0.35) / 0.2, 1)
      const eased = progress * progress * (3 - 2 * progress)
      
      x = 0
      y = card.descending.y * eased
      scale = card.initial.scale + (card.descending.scale - card.initial.scale) * eased
      opacity = isLateCard ? Math.min(eased * 2, 1) : 1
    }

    if (scrollProgress > 0.55) {
      const progress = Math.min((scrollProgress - 0.55) / 0.2, 1)
      const eased = progress * progress * (3 - 2 * progress)
      
      x = card.descending.x + (card.exploded.x - card.descending.x) * eased
      y = card.descending.y + (card.exploded.y - card.descending.y) * eased
      scale = card.descending.scale + (card.exploded.scale - card.descending.scale) * eased
      opacity = 1
    }

    if (scrollProgress > 0.75) {
      const progress = Math.min((scrollProgress - 0.75) / 0.25, 1)
      const eased = progress * progress * (3 - 2 * progress)
      
      x = card.exploded.x + (card.row.x - card.exploded.x) * eased
      y = card.exploded.y + (card.row.y - card.exploded.y) * eased
      scale = card.exploded.scale + (card.row.scale - card.exploded.scale) * eased
      opacity = card.row.opacity
    }

    if (scrollProgress >= 0.95 && !isMobile) {
      const loopWidth = 6800
      const minX = -3400
      
      const rawPos = card.row.x + autoScrollOffset
      
      const relativePos = rawPos - minX
      const wrappedRelativePos = ((relativePos % loopWidth) + loopWidth) % loopWidth
      x = wrappedRelativePos + minX
      
      const fadeEdge = 2800
      const fadeWidth = 400
      
      if (x < -fadeEdge) {
        opacity = Math.max(0, 1 - ((-fadeEdge - x) / fadeWidth))
      } else if (x > fadeEdge) {
        opacity = Math.max(0, 1 - ((x - fadeEdge) / fadeWidth))
      } else {
        opacity = 1
      }
    }

    return {
      transform: `translate(${x}px, ${y}px) scale(${scale})`,
      opacity,
    }
  }

  return (
    <div className="bg-[#CCF1E7]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-[#CCF1E7]/90 backdrop-blur-sm">
        <div className="flex items-center gap-8">
          <div className="text-black">
            <img
              src="/mlinks-logo.png"
              alt="M Links"
              className="h-16 w-auto"
            />
          </div>
          <div className="hidden md:flex items-center gap-8 text-black/80 text-sm font-medium">
            <a href="#" className="hover:text-black transition-colors">Mlinks</a>
            <a href="#" className="hover:text-black transition-colors">Alerts</a>
            <a href="#" className="hover:text-black transition-colors">Blog</a>
            <a href="#" className="hover:text-black transition-colors">Docs</a>
          </div>
        </div>
        <ConnectButton.Custom>
          {({ openConnectModal, connected, account, chain, openAccountModal, openChainModal }) => {
            if (connected && account) {
              return (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={openChainModal}
                    className="bg-black/10 text-black hover:bg-black/20 font-medium px-3 rounded-full"
                  >
                    {chain?.name || 'Network'}
                  </Button>
                  <Button
                    size="sm"
                    onClick={openAccountModal}
                    className="bg-black text-white hover:bg-black/80 font-medium px-4 rounded-full"
                  >
                    {account.displayName}
                  </Button>
                </div>
              );
            }
            return (
              <Button
                size="sm"
                onClick={openConnectModal}
                className="bg-black text-white hover:bg-black/80 font-medium px-4 rounded-full"
              >
                Connect
              </Button>
            );
          }}
        </ConnectButton.Custom>
      </nav>

      {/* Hero Section - Pinned scroll container */}
      <div ref={containerRef} className="relative" style={{ height: isMobile ? "600vh" : "800vh" }}>
        <div className="sticky top-0 left-0 right-0 h-screen overflow-hidden">
          <div className="relative w-full h-full">
            
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              {displayCards.map((card, index) => (
                <div
                  key={index}
                  className={`absolute w-64 h-64 rounded-2xl overflow-hidden shadow-2xl transition-all duration-200 ${!isMobile ? 'hover:scale-110 hover:z-50' : ''} cursor-pointer`}
                  style={getCardStyle(card, index)}
                >
                  <img
                    src={card.image || "/placeholder.svg"}
                    alt={`Artwork ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Centered Logo (clickable) */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-auto"
                  style={{
                    opacity: scrollProgress < 0.5 ? 1 - (scrollProgress - 0.4) * 5 : 0,
                    transform: `scale(${scrollProgress < 0.5 ? 1 - scrollProgress * 0.2 : 0.8})`,
                    transition: "opacity 0.2s, transform 0.2s",
                  }}
                >
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                    className="text-center inline-block cursor-pointer"
                    aria-label="Back to top"
                  >
                    <img
                      src="/LinkifyThings.png"
                      alt="Designing Thing"
                      className="h-120 w-auto mx-auto"
                    />
                    <p className="text-2xl md:text-3xl text-black/60">through Mlinks</p>
                  </a>
                </div>

                {/* Headline and CTA */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-auto"
                  style={{
                    opacity: scrollProgress > 0.5 ? (scrollProgress - 0.5) * 2 : 0,
                    transform: `scale(${scrollProgress > 0.5 ? 0.85 + (scrollProgress - 0.5) * 0.3 : 0.85}) translateY(-${scrollProgress > 0.75 ? (scrollProgress - 0.75) * 50 : 0}vh)`,
                    transition: "opacity 0.2s, transform 0.2s",
                  }}
                >
                  <div className="text-center px-6">
                    <img
                      src="/headers/ux-stack.svg"
                      alt="The UX Stack for Web3"
                      className="h-28 md:h-36 w-auto mx-auto mb-6"
                    />
                    <p className="text-lg md:text-xl text-black/70 mb-8 max-w-xl mx-auto">
                      Onchain transactions and notifications native to any digital experience.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        size="lg"
                        className="bg-black text-white hover:bg-black/80 font-semibold text-base px-8 py-4 rounded-full"
                      >
                        Read Docs
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-black/30 bg-transparent text-black hover:bg-black/5 font-semibold text-base px-8 py-4 rounded-full"
                      >
                        Start Building
                      </Button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Scroll Indicator */}
            {scrollProgress < 0.1 && (
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30">
                <div className="flex flex-col items-center gap-2 text-black/50 text-sm animate-bounce">
                  <span>Keep scrolling</span>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <ProblemSection />

      {/* Mlinks Section */}
      <MlinksSection />

      {/* Alerts Section */}
      <AlertsSection />

      {/* Ready for Business Section */}
      <ReadyForBusinessSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Integration CTA Section */}
      <IntegrationCTASection />

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-black/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-1">
              <img
                src="/mlinks-logo.png"
                alt="M Links"
                className="h-10 w-auto mb-4"
              />
            </div>
            <div>
              <h4 className="text-black font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-black/60 text-sm">
                <li><a href="#" className="hover:text-black transition-colors">Alerts</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Mlinks</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Dashboard</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Markets</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-black font-semibold mb-4">Developers</h4>
              <ul className="space-y-2 text-black/60 text-sm">
                <li><a href="#" className="hover:text-black transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Release Notes</a></li>
                <li><a href="#" className="hover:text-black transition-colors">MCP Server</a></li>
                <li><a href="#" className="hover:text-black transition-colors">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-black font-semibold mb-4">API Reference</h4>
              <ul className="space-y-2 text-black/60 text-sm">
                <li><a href="#" className="hover:text-black transition-colors">Standard Mlinks Library</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Alerts API</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Mlinks API</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Markets API</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Positions API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-black font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-black/60 text-sm">
                <li><a href="#" className="hover:text-black transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-black transition-colors">X</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-black transition-colors">YouTube</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/10">
            <div className="flex items-center gap-6 mb-4 md:mb-0">
              <a href="#" className="text-black/60 hover:text-black text-sm transition-colors">Mlinks</a>
              <a href="#" className="text-black/60 hover:text-black text-sm transition-colors">Alerts</a>
              <a href="#" className="text-black/60 hover:text-black text-sm transition-colors">Blog</a>
              <a href="#" className="text-black/60 hover:text-black text-sm transition-colors">Docs</a>
              <a href="#" className="text-black/60 hover:text-black text-sm transition-colors">Sign In</a>
            </div>
            <div className="flex items-center gap-6 text-black/40 text-sm">
              <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
