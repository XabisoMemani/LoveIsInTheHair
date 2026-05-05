import { useEffect, useRef } from 'react'

interface Props {
  text: string
  className?: string
}

export default function RollingText({ text, className = '' }: Props) {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const innerText = element.innerText
    element.innerHTML = ''

    const createBlock = () => {
      const textContainer = document.createElement('div')
      textContainer.classList.add('block')

      for (let i = 0; i < innerText.length; i++) {
        const letter = innerText[i]
        const span = document.createElement('span')
        span.classList.add('letter')

        if (letter.trim() === '') {
          span.innerHTML = '&nbsp;'
        } else {
          span.innerText = letter
        }

        span.style.display = 'inline-block'
        span.style.transition = `transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)`
        span.style.transitionDelay = `${i * 0.015}s`

        textContainer.appendChild(span)
      }

      return textContainer
    }

    const block1 = createBlock()
    const block2 = createBlock()

    element.appendChild(block1)
    element.appendChild(block2)

    const style = document.createElement('style')
    style.textContent = `
      .rolling-text { display: inline-block; overflow: hidden; line-height: 1.5em; text-decoration: none; }
      .rolling-text .block:last-child { color: #e055a0; }
      .rolling-text:hover .letter { transform: translateY(-100%); }
      .rolling-text .block { display: block; }
    `
    document.head.appendChild(style)

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [text])

  return (
    <span
      ref={containerRef}
      className={`rolling-text ${className}`}
    >
      {text}
    </span>
  )
}
