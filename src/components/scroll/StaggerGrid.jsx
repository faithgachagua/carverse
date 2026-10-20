// src/components/scroll/StaggerGrid.jsx
// Wraps a grid of cards so they stagger-reveal in 3D as they enter the viewport
// Usage:
//   <StaggerGrid>
//     {vehicles.map((v, i) => <VehicleCard key={v.id} {...v} />)}
//   </StaggerGrid>
import { motion } from 'framer-motion'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const item = {
  hidden:  { opacity: 0, y: 36, scale: 0.94, rotateX: 8 },
  visible: { opacity: 1, y: 0,  scale: 1,    rotateX: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
}

export function StaggerGrid({ children, className = '' }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      style={{ transformPerspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Wrap each individual card inside StaggerGrid with this
export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div data-3d variants={item} style={{ transformPerspective: 1000 }} className={className}>
      {children}
    </motion.div>
  )
}