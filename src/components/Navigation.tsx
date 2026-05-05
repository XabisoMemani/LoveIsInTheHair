import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Props {
  onNavigate: (id: string) => void
}

const links = [
  { label: 'Services', id: 'services' },
  { label: 'Gallery', id: 'portfolio' },
  { label: 'Reviews', id: 'reviews' },
]

export default function Navigation({ onNavigate }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
      setOpen(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const goTo = (id: string) => {
    onNavigate(id)
    setOpen(false)
  }

  return (
    <nav
      className="fixed left-0 top-0 z-50 w-full transition-all duration-500"
      style={{
        backgroundColor: open
          ? '#fff7fb'
          : scrolled
            ? '#fff7fb'
            : '#ffd8ea',
        backdropFilter: 'none',
        borderBottom: '1px solid rgba(214, 93, 154, 0.14)',
      }}
    >
      <div className="grid grid-cols-3 items-center px-5 py-4 md:grid-cols-[1fr_auto_1fr] md:px-8">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-start text-[#30101f] transition-colors hover:text-[#c94e8c] md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          data-cursor="pointer"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        <button
          onClick={() => goTo('hero')}
          className="justify-self-center whitespace-nowrap font-display text-2xl text-[#30101f] transition-colors hover:text-[#c94e8c] md:justify-self-start"
        >
          Love Is In The{' '}
          <span className="relative inline-block pr-3">
            Hair
            <img
              src="/images/bow-1.png"
              alt=""
              className="animate-bow pointer-events-none absolute -right-5 -top-1 w-10 rotate-12 object-contain drop-shadow-md md:-right-8 md:-top-2 md:w-14"
              aria-hidden="true"
            />
          </span>
        </button>

        <div className="hidden items-center justify-center gap-9 md:flex">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => goTo(link.id)}
              className="font-body text-xs uppercase tracking-widest text-[#30101f] transition-colors hover:text-[#c94e8c]"
            >
              {link.label}
            </button>
          ))}
        </div>

        <span className="h-10 w-10 justify-self-end" aria-hidden="true" />
      </div>

      {open && (
        <div className="border-t border-[#f2b7d2] bg-[#fff7fb] px-5 pb-5 pt-2 md:hidden">
          {[...links, { label: 'Book', id: 'footer' }].map((link) => (
            <button
              key={link.id}
              onClick={() => goTo(link.id)}
              className="block w-full border-b border-[#f6d7e5] py-4 text-left font-body text-xs font-bold uppercase tracking-widest text-[#30101f]"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
