export default function ManifestoSection() {
  return (
    <section
      className="section-pad relative overflow-hidden"
      style={{ backgroundColor: '#fff7fb' }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.78fr_1fr] md:items-end">
        <div>
          <p className="font-mono-accent mb-5 text-xs uppercase tracking-widest text-[#d65d9a]">
            The studio
          </p>
          <h2
            className="font-display text-[#30101f]"
            style={{
              fontSize: 'clamp(2.6rem, 6vw, 5.75rem)',
              lineHeight: 0.95,
              letterSpacing: 0,
            }}
          >
            Soft detail,
            <br />
            strong <span className="italic text-[#d65d9a]">finishes.</span>
          </h2>
        </div>

        <div className="max-w-xl md:justify-self-end">
          <p className="font-body text-base leading-7 text-[#674456]">
            Love Is In The Hair is built around neat parts, comfortable installs and styles that still look fresh after the appointment. Browse the price list, pick a style, then send the booking details straight to WhatsApp.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {['Protective styles', 'Clean installs', 'Appointment only'].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-[#f2b7d2] bg-white/70 px-3 py-4 text-center"
              >
                <p className="font-body text-xs font-semibold uppercase tracking-wider text-[#7b294f]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
