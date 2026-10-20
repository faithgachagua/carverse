// src/components/scroll/HoverCard3D.jsx
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function HoverCard3D({ children, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-0.5, 0.5], ['4deg', '-4deg'])
  const rotateY = useTransform(x, [-0.5, 0.5], ['-4deg', '4deg'])

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  function onMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top)  / rect.height - 0.5)
  }

  function onMouseLeave() { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      data-3d
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}