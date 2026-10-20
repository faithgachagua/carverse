// src/components/scroll/ScrollReveal.jsx
// ─────────────────────────────────────────────────────────────────
// Drop-in scroll-triggered 3D reveal. Uses framer-motion's
// whileInView so no scroll listeners are needed — pure IntersectionObserver.
//
// Usage:
//   <ScrollReveal preset="card" delay={i * 0.06}>
//     <VehicleCard ... />
//   </ScrollReveal>
// ─────────────────────────────────────────────────────────────────
import { motion } from 'framer-motion'

// Each preset maps to a section's "feel"
const PRESETS = {

  // INTRODUCE — hero text/content eases forward from slight depth
  hero: {
    hidden:  { opacity: 0, y: 24, scale: 0.97 },
    visible: { opacity: 1, y: 0,  scale: 1 },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },

  // DISCOVER — content rises gently with subtle tilt
  discover: {
    hidden:  { opacity: 0, y: 40, rotateX: 7 },
    visible: { opacity: 1, y: 0,  rotateX: 0 },
    transition: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1] },
  },

  // SEARCH — interface slides forward from the page
  search: {
    hidden:  { opacity: 0, y: 32, scale: 0.96, rotateX: 5 },
    visible: { opacity: 1, y: 0,  scale: 1,    rotateX: 0 },
    transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] },
  },

  // EXPLORE — car cards pop forward with depth
  card: {
    hidden:  { opacity: 0, y: 36, scale: 0.94, rotateX: 8 },
    visible: { opacity: 1, y: 0,  scale: 1,    rotateX: 0 },
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
  },

  // UNDERSTAND — info reveals with a layered slide
  detail: {
    hidden:  { opacity: 0, x: -24, rotateY: 4 },
    visible: { opacity: 1, x: 0,   rotateY: 0 },
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },

  // CONNECT — final section settles in cinematically
  connect: {
    hidden:  { opacity: 0, y: 56, scale: 0.96 },
    visible: { opacity: 1, y: 0,  scale: 1 },
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },

  // Generic text line — lightweight, no tilt
  text: {
    hidden:  { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },

  // Image reveal — scales in slightly, no tilt
  image: {
    hidden:  { opacity: 0, scale: 1.04, y: 10 },
    visible: { opacity: 1, scale: 1,    y: 0 },
    transition: { duration: 1.1, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function ScrollReveal({
  children,
  preset   = 'discover',
  delay    = 0,
  className = '',
  once     = true,
  margin   = '-60px',
  as       = 'div',
}) {
  const { hidden, visible, transition } = PRESETS[preset] ?? PRESETS.discover
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      data-3d
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={{ hidden, visible }}
      transition={{ ...transition, delay }}
      // transformPerspective applies perspective to this element only
      // — no wrapper needed, keeps DOM clean
      style={{ transformPerspective: 1200 }}
      className={className}
    >
      {children}
    </Tag>
  )
}