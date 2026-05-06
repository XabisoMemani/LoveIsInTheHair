const getVideoPoster = (videoPath: string) => videoPath.replace('_compressed.webm', '_small.jpg')

const media = [
  {
    type: 'video',
    src: '/videos%20and%20images/WhatsApp%20Video%202026-03-27%20at%2010.11.46_compressed.webm',
    title: 'Fresh braid finish',
  },
  {
    type: 'video',
    src: '/videos%20and%20images/WhatsApp%20Video%202026-03-27%20at%2010.11.48_compressed.webm',
    title: 'Protective style detail',
  },
  {
    type: 'video',
    src: '/videos%20and%20images/WhatsApp%20Video%202026-03-27%20at%2010.12.40_compressed.webm',
    title: 'Braiding process',
  },
  {
    type: 'video',
    src: '/videos%20and%20images/WhatsApp%20Video%202026-03-27%20at%2010.13.49_compressed.webm',
    title: 'Styled finish',
  },
  {
    type: 'video',
    src: '/videos%20and%20images/WhatsApp%20Video%202026-03-27%20at%2010.13.50_compressed.webm',
    title: 'Hair detail reel',
  },
  {
    type: 'video',
    src: '/videos%20and%20images/littleone-1_compressed.webm',
    title: 'Kids styling',
  },
  {
    type: 'video',
    src: '/videos%20and%20images/WhatsApp%20Video%202026-04-14%20at%2010.20.42_compressed.webm',
    title: 'Recent client style',
  },
  {
    type: 'video',
    src: '/videos%20and%20images/WhatsApp%20Video%202026-03-27%20at%2010.16.03_compressed.webm',
    title: 'Men braid style one',
  },
  {
    type: 'video',
    src: '/videos%20and%20images/WhatsApp%20Video%202026-03-27%20at%2010.16.06_compressed.webm',
    title: 'Men braid style two',
  },
  {
    type: 'image',
    src: '/videos%20and%20images/681030771_18070419623404425_6111048027283774904_n.jpg',
    title: 'Men braid style photo',
  },
]

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="section-pad"
      style={{ backgroundColor: '#30101f' }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono-accent mb-4 text-xs uppercase tracking-widest text-[#ffb9d9]">
              Real work
            </p>
            <h2
              className="font-display text-[#fff8fb]"
              style={{
                fontSize: 'clamp(2.75rem, 6vw, 5.5rem)',
                lineHeight: 0.95,
                letterSpacing: 0,
              }}
            >
              Styles in
              <br />
              <span className="italic text-[#ffb9d9]">motion.</span>
            </h2>
          </div>
          <p className="max-w-sm font-body text-sm leading-6 text-[#f3c9dc]">
            Short muted reels play inline so visitors can see the texture, parts and finished movement without leaving the page.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
          {media.map((item) => (
            <figure
              key={item.src}
              className="group overflow-hidden rounded-lg border border-white/10 bg-[#4a1a30] p-1 shadow-[0_18px_50px_rgba(0,0,0,0.16)]"
            >
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  poster={getVideoPoster(item.src)}
                  className="h-[260px] w-full rounded-md object-cover transition-transform duration-700 group-hover:scale-[1.03] md:h-[360px]"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={item.title}
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  className="h-[260px] w-full rounded-md object-cover transition-transform duration-700 group-hover:scale-[1.03] md:h-[360px]"
                  loading="lazy"
                />
              )}
              <figcaption className="sr-only">{item.title}</figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-lg border border-[#ffb9d9]/20 bg-white/[0.06] p-5 md:flex-row md:items-center md:justify-between">
          <p className="font-body text-sm leading-6 text-[#f3c9dc]">
            Braids and freehand styles are not gendered here. Choose the style you want and send the same booking request.
          </p>
          <a
            href="https://instagram.com/loveisinthe.hair19"
            target="_blank"
            rel="noopener noreferrer"
            className="hair-button hair-button-outline-dark border border-[#ffb9d9]/55 text-[#fff8fb]"
            data-cursor="pointer"
          >
            More on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
