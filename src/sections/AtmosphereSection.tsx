const points = [
  'Neat sectioning and clean finishes',
  'Protective styling for natural hair',
  'WhatsApp bookings for quicker replies',
]

export default function AtmosphereSection() {
  return (
    <section
      id="atmosphere"
      className="section-pad relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #fff7fb 0%, #ffe3f0 100%)',
      }}
    >
      <img
        src="/images/bow-2.png"
        alt=""
        className="absolute -right-5 top-12 w-28 rotate-12 object-contain opacity-80 md:right-20 md:w-36"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.9fr_1fr] md:items-center">
        <div className="overflow-hidden rounded-lg border border-[#f1b5d0] bg-white p-2 shadow-[0_28px_80px_rgba(168,55,111,0.12)]">
          <video
            src="/videos%20and%20images/WhatsApp%20Video%202026-03-27%20at%2010.16.03.mp4"
            className="aspect-[4/5] w-full rounded-md object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Braiding detail video"
          />
        </div>

        <div>
          <p className="font-mono-accent mb-5 text-xs uppercase tracking-widest text-[#d65d9a]">
            Why book here
          </p>
          <h2
            className="font-display text-[#30101f]"
            style={{
              fontSize: 'clamp(2.75rem, 6vw, 5.5rem)',
              lineHeight: 0.95,
              letterSpacing: 0,
            }}
          >
            Pretty styles,
            <br />
            professionally <span className="italic text-[#d65d9a]">handled.</span>
          </h2>
          <p className="mt-6 max-w-xl font-body text-base leading-7 text-[#674456]">
            The site keeps the process simple: see the work, check the price, send the request. Men, women and kids are welcome, with every appointment focused on comfort, care and a neat final look.
          </p>

          <div className="mt-8 space-y-3">
            {points.map((point) => (
              <div
                key={point}
                className="flex items-center gap-3 rounded-lg border border-[#f2b7d2] bg-white/75 px-4 py-3"
              >
                <span className="h-2 w-2 rounded-full bg-[#d65d9a]" />
                <p className="font-body text-sm font-medium text-[#4f2639]">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
