import { Star } from 'lucide-react'

const reviews = [
  {
    name: 'Karabo M.',
    review: 'Absolutely love my knotless braids! They are so neat and painless. Definitely coming back.',
    service: 'Knotless Braids',
    rating: 5,
  },
  {
    name: 'Tshepiso',
    review: 'The service is amazing, and she was very quick. My sew-in looks natural and feels secure.',
    service: 'Sew In',
    rating: 5,
  },
  {
    name: 'Lerato S.',
    review: 'Very professional. She did my freehand perfectly. Highly recommend her services.',
    service: 'Free Hand',
    rating: 5,
  },
]

export default function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="section-pad"
      style={{ backgroundColor: '#fff7fb' }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono-accent mb-4 text-xs uppercase tracking-widest text-[#d65d9a]">
              Client Love
            </p>
            <h2
              className="font-display text-[#30101f]"
              style={{
                fontSize: 'clamp(2.75rem, 6vw, 5.5rem)',
                lineHeight: 0.95,
                letterSpacing: 0,
              }}
            >
              Hear from
              <br />
              <span className="italic text-[#d65d9a]">our clients.</span>
            </h2>
          </div>
          <p className="max-w-sm font-body text-sm leading-6 text-[#674456]">
            We pride ourselves on providing the best service and leaving our clients feeling beautiful and confident.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((review, i) => (
            <article
              key={i}
              className="rounded-lg border border-[#f0b6d0] bg-white p-6 shadow-[0_20px_60px_rgba(168,55,111,0.08)]"
            >
              <div className="mb-4 flex items-center gap-1 text-[#d65d9a]">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="font-body text-sm leading-6 text-[#674456] mb-6">
                "{review.review}"
              </p>
              <div className="mt-auto border-t border-[#f6d7e5] pt-4 flex justify-between items-center">
                <span className="font-body font-bold text-[#30101f]">{review.name}</span>
                <span className="font-body text-xs text-[#d65d9a] bg-[#fff0f6] px-2 py-1 rounded-full">{review.service}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
