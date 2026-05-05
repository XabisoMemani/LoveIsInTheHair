import { useMemo, useState } from 'react'

const serviceOptions = [
  'Knotless Braids - Big blocks (R150)',
  'Knotless Braids - Medium blocks (R200)',
  'Knotless Braids - Small blocks (R250)',
  'Sew In - Including bundles (R250)',
  'Sew In - Excluding bundles (R200)',
  'Free Hand (R70)',
]

export default function FooterSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    notes: '',
  })

  const whatsappUrl = useMemo(() => {
    const whatsappNumber = '27697128499'
    const message = encodeURIComponent(
      `Hi Love Is In The Hair, I would like to book an appointment.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}\nPreferred date: ${formData.date || 'Flexible'}\nNotes: ${formData.notes || 'None'}`
    )

    return `https://wa.me/${whatsappNumber}?text=${message}`
  }, [formData])

  const inputStyle = {
    backgroundColor: 'rgba(255, 248, 251, 0.08)',
    border: '1px solid rgba(255, 208, 229, 0.22)',
    color: '#fff8fb',
  }

  const selectStyle = {
    backgroundColor: '#fff8fb',
    border: '1px solid rgba(255, 208, 229, 0.55)',
    color: '#30101f',
  }

  return (
    <footer
      id="footer"
      className="section-pad"
      style={{
        background:
          'radial-gradient(circle at 20% 0%, rgba(255, 142, 202, 0.22), transparent 32%), linear-gradient(180deg, #30101f 0%, #1d0712 100%)',
        color: '#fff8fb',
      }}
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.82fr_1fr]">
        <div>
          <p className="font-mono-accent mb-5 text-xs uppercase tracking-widest text-[#ffb9d9]">
            Book appointment
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              lineHeight: 0.9,
              letterSpacing: 0,
            }}
          >
            Ready for
            <br />
            your <span className="italic text-[#ffb9d9]">next style?</span>
          </h2>
          <p className="mt-6 max-w-md font-body text-sm leading-6 text-[#f3c9dc]">
            Fill in the basics and send the request through WhatsApp. The message opens with your details already included.
          </p>

          <div className="mt-10 space-y-3 font-body text-sm text-[#f9dbe8]">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block hover:text-white">
              WhatsApp: 069 712 8499
            </a>
            <a
              href="https://instagram.com/loveisinthe.hair19"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-white"
            >
              Instagram: @loveisinthe.hair19
            </a>
            <p>2411 Moletsane Street</p>
          </div>
        </div>

        <form
          className="rounded-lg border border-[#ffd0e5]/20 bg-white/[0.06] p-5 md:p-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="font-body text-xs uppercase tracking-wider text-[#f3c9dc]">
              Name
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-2 w-full rounded-lg px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-[#ffb9d9]"
                style={inputStyle}
                placeholder="Your name"
              />
            </label>

            <label className="font-body text-xs uppercase tracking-wider text-[#f3c9dc]">
              Phone
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-2 w-full rounded-lg px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-[#ffb9d9]"
                style={inputStyle}
                placeholder="069 712 8499"
              />
            </label>
          </div>

          <label className="mt-4 block font-body text-xs uppercase tracking-wider text-[#f3c9dc]">
            Service
            <select
              required
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="mt-2 w-full rounded-lg px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-[#ffb9d9]"
              style={selectStyle}
            >
              <option value="" style={{ color: '#30101f' }}>
                Select a service
              </option>
              {serviceOptions.map((option) => (
                <option key={option} value={option} style={{ color: '#30101f' }}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="font-body text-xs uppercase tracking-wider text-[#f3c9dc]">
              Preferred date
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="mt-2 w-full rounded-lg px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-[#ffb9d9]"
                style={inputStyle}
              />
            </label>

            <label className="font-body text-xs uppercase tracking-wider text-[#f3c9dc]">
              Notes
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-2 w-full rounded-lg px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-[#ffb9d9]"
                style={inputStyle}
                placeholder="Length, colour, timing"
              />
            </label>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hair-button hair-button-pink mt-6 w-full bg-[#ffd0e5] text-[#30101f]"
            data-cursor="pointer"
          >
            Send WhatsApp Request
          </a>
        </form>
      </div>

      <div className="mx-auto mt-14 max-w-6xl border-t border-[#ffd0e5]/15 pt-6 font-body text-xs text-[#d9a9bf]">
        <p>© {new Date().getFullYear()} Love Is In The Hair.</p>
      </div>
    </footer>
  )
}
