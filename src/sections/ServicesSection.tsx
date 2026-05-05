const services = [
  {
    title: 'Knotless Braids / Twists',
    icon: '/images/bow-2.png',
    items: [
      { name: 'Big blocks', price: 'R150' },
      { name: 'Medium blocks', price: 'R200' },
      { name: 'Small blocks', price: 'R250' },
    ],
    note: 'Hair extensions excluded.',
  },
  {
    title: 'Sew Ins',
    icon: '/images/clip-1.png',
    items: [
      { name: 'Including bundles', price: 'R250' },
      { name: 'Excluding bundles', price: 'R200' },
    ],
    note: 'Add a wash for R50.',
  },
  {
    title: 'Free Hand',
    icon: '/images/heart-1.png',
    items: [{ name: 'Free hand styling', price: 'R70' }],
    note: 'Simple, neat everyday styling.',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="section-pad"
      style={{ backgroundColor: '#fff7fb' }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono-accent mb-4 text-xs uppercase tracking-widest text-[#d65d9a]">
              Price list
            </p>
            <h2
              className="font-display text-[#30101f]"
              style={{
                fontSize: 'clamp(2.75rem, 6vw, 5.5rem)',
                lineHeight: 0.95,
                letterSpacing: 0,
              }}
            >
              Choose your
              <br />
              <span className="italic text-[#d65d9a]">next style.</span>
            </h2>
          </div>
          <p className="max-w-sm font-body text-sm leading-6 text-[#674456]">
            Prices are from the current list. All clients use the same booking flow; final timing and prep can be confirmed on WhatsApp.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-lg border border-[#f0b6d0] bg-white p-6 shadow-[0_20px_60px_rgba(168,55,111,0.08)]"
            >
              <div className="mb-6 flex items-center gap-3">
                <img src={service.icon} alt="" className="h-10 w-10 object-contain" />
                <h3 className="font-display text-2xl leading-none text-[#30101f]">
                  {service.title}
                </h3>
              </div>

              <ul>
                {service.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between gap-4 border-t border-[#f6d7e5] py-4"
                  >
                    <span className="font-body text-sm text-[#674456]">{item.name}</span>
                    <span className="font-display text-2xl text-[#d65d9a]">{item.price}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-2 font-body text-xs text-[#91697d]">{service.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
