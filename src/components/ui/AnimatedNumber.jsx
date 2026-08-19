import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function AnimatedNumber({ value, format = (v) => v.toLocaleString(), duration = 900 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = null
    const from = 0
    function step(ts) {
      if (start === null) start = ts
      const progress = Math.min(1, (ts - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(from + (value - from) * eased)
      if (progress < 1) requestAnimationFrame(step)
      else setDisplay(value)
    }
    const raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return <span ref={ref} className="figure">{format(display)}</span>
}
