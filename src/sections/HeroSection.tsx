import { useEffect, useState } from 'react'

const heroVideos = [
  '/videos%20and%20images/WhatsApp%20Video%202026-03-27%20at%2010.11.46_small.webm',
  '/videos%20and%20images/WhatsApp%20Video%202026-03-27%20at%2010.13.50_small.webm',
  '/videos%20and%20images/WhatsApp%20Video%202026-04-14%20at%2010.20.42_small.webm',
  '/videos%20and%20images/WhatsApp%20Video%202026-03-27%20at%2010.16.03_small.webm',
]

export default function HeroSection() {
  const [activeVideo, setActiveVideo] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveVideo((current) => (current + 1) % heroVideos.length)
    }, 5200)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[94vh] w-full items-end overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 18% 14%, rgba(255, 214, 232, 0.95), transparent 26%), radial-gradient(circle at 78% 18%, rgba(255, 157, 205, 0.5), transparent 30%), linear-gradient(135deg, #fff8fb 0%, #ffd8ea 42%, #c94e8c 100%)',
      }}
    >
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className="absolute left-[-12%] top-[12%] h-72 w-72 rounded-full bg-[#ffb9d9] blur-3xl" />
        <div className="absolute bottom-[-15%] right-[-10%] h-96 w-96 rounded-full bg-[#d65d9a] blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-end gap-10 px-5 pb-12 pt-32 md:grid-cols-[1.03fr_0.72fr] md:px-8 md:pb-16">
        <div>
          <p className="font-body mb-5 text-xs font-bold uppercase tracking-widest text-[#9f3268]">
            Braids, twists, sew-ins & protective styling
          </p>
          <h1
            className="font-display text-[#30101f]"
            style={{
              fontSize: 'clamp(4rem, 12.5vw, 10.25rem)',
              lineHeight: 0.88,
              fontWeight: 400,
              letterSpacing: 0,
            }}
          >
            Love Is
            <br />
            In The <span className="italic text-[#c94e8c]">Hair</span>
          </h1>
          <p className="mt-6 max-w-xl font-body text-base leading-7 text-[#674456] md:text-lg">
            Real styles, neat finishes and appointment-only hair care in Moletsane. Women, men and kids book through the same simple WhatsApp flow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#footer"
              className="hair-button hair-button-dark bg-[#30101f] text-[#fff8fb]"
              data-cursor="pointer"
            >
              Book on WhatsApp
            </a>
            <a
              href="#portfolio"
              className="hair-button hair-button-soft border border-[#9f3268]/35 bg-white/45 text-[#30101f]"
              data-cursor="pointer"
            >
              View Gallery
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[360px] md:justify-self-end">
          <div className="absolute -left-5 top-8 h-full w-full rounded-lg border border-[#d65d9a]/20 bg-white/35" />
          <div className="relative overflow-hidden rounded-lg border border-white/70 bg-white p-2 shadow-[0_30px_90px_rgba(168,55,111,0.22)]">
            <video
              key={heroVideos[activeVideo]}
              src={heroVideos[activeVideo]}
              poster={heroVideos[activeVideo].replace('_small.webm', '.jpg')}
              className="aspect-[9/16] w-full rounded-md object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Braiding style video by Love Is In The Hair"
            />
          </div>
          <div className="absolute bottom-5 left-5 rounded-full border border-white/60 bg-[#30101f]/72 px-4 py-2 font-body text-[0.68rem] font-bold uppercase tracking-widest text-[#fff8fb] shadow-lg backdrop-blur-md">
            Real client work
          </div>
        </div>
      </div>
    </section>
  )
}
