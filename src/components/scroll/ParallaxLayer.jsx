// src/components/scroll/ParallaxLayer.jsx
// ─────────────────────────────────────────────────────────────────
// Wraps images or backgrounds so they move at a different speed
// than the scroll — creating a sense of depth.
//
// Usage:
//   <ParallaxLayer speed={-0.15}>          ← image drifts up (feels close)
//     <img src={heroImg} ... />
//   </ParallaxLayer>
//
//   <ParallaxLayer speed={0.12}>           ← drifts down (feels far)
//     <BackgroundDiv ... />
//   </ParallaxLayer>
//
// speed:
//   negative → element moves opposite scroll (appears closer/foreground)
//   positive → element moves with scroll slower (appears farther/background)
//   range ±0.05 – ±0.25 recommended for subtlety
// ─────────────────────────────────────────────────────────────────
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxLayer({ children, speed = -0.12, className = '' }) {
  const ref = useRef(null)

  // Track how far the element has scrolled through the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],  // full traversal: enters bottom → exits top
  })

  // Map 0→1 scroll progress to a y translation
  // speed = -0.12 → moves from +12% to -12% relative to natural position
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div data-3d style={{ y, willChange: 'transform' }}>
        {children}
      </motion.div>
    </div>
  )
}