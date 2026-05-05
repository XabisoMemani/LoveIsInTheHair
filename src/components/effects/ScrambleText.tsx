import { useEffect, useRef } from 'react'

interface Props {
  text: string
  className?: string
  duration?: number
  revealDelay?: number
  trigger?: boolean
}

export default function ScrambleText({
  text,
  className = '',
  duration = 1.5,
  revealDelay = 0.2,
  trigger = true,
}: Props) {
  const elRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = elRef.current
    if (!el || !trigger || hasAnimated.current) return

    hasAnimated.current = true
    const chars = '0123456789ABCDEF'
    const totalChars = text.length
    const revealStartTime = duration * revealDelay
    const startTime = performance.now()

    const element = el

    function tick() {
      const elapsed = (performance.now() - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      let output = ''

      for (let i = 0; i < totalChars; i++) {
        if (text[i] === ' ') {
          output += ' '
          continue
        }

        const charRevealTime = revealStartTime + (i / totalChars) * (duration - revealStartTime)

        if (elapsed >= charRevealTime) {
          output += text[i]
        } else {
          output += chars[Math.floor(Math.random() * chars.length)]
        }
      }

      element.textContent = output

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        element.textContent = text
      }
    }

    requestAnimationFrame(tick)
  }, [text, duration, revealDelay, trigger])

  return (
    <span ref={elRef} className={className}>
      {text}
    </span>
  )
}
