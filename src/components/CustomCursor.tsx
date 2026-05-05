import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const isHovering = useRef(false)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'pointer'
      ) {
        isHovering.current = true
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'pointer'
      ) {
        isHovering.current = false
      }
    }

    let rafId: number

    const tick = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.08
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.08

      dot.style.transform = `translate(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px)`
      ring.style.transform = `translate(${ringPos.current.x - 22}px, ${ringPos.current.y - 22}px) scale(${isHovering.current ? 1.65 : 1})`

      if (isHovering.current) {
        ring.style.borderColor = '#ffd0e5'
        ring.style.backgroundColor = 'rgba(255, 208, 229, 0.12)'
        ring.style.mixBlendMode = 'normal'
      } else {
        ring.style.borderColor = 'rgba(255, 208, 229, 0.78)'
        ring.style.backgroundColor = 'rgba(214, 93, 154, 0.08)'
        ring.style.mixBlendMode = 'normal'
      }

      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#ffd0e5',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: '0 0 16px rgba(255, 185, 217, 0.8)',
        }}
      />
      <div
        ref={ringRef}
        className="custom-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '1px solid rgba(255, 208, 229, 0.78)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'border-color 0.3s ease, background-color 0.3s ease',
          display: 'block',
        }}
      />
    </>
  )
}
