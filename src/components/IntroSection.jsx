// src/components/IntroSection.jsx
import { motion } from 'framer-motion'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.4 } },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
}

const particles = Array.from({ length: 24 }, (_, i) => ({
  id:    i,
  size:  1.2 + Math.random() * 2.8,
  left:  4 + Math.random() * 92,
  delay: Math.random() * 8,
  dur:   8 + Math.random() * 10,
  op:    0.1 + Math.random() * 0.28,
}))

export default function IntroSection() {
  return (
    <section
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: '#030303' }}
    >
      {/* ── Your actual image — placed in /public/hero-bg.png ── */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.png"
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* ── Dark overlay — keeps text readable over the bright image ── */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.08) 58%, rgba(0,0,0,0.60) 100%)',
        }}
      />

      {/* ── Vignette — dark edges, open centre ── */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 22%, rgba(0,0,0,0.72) 100%)',
        }}
      />

      {/* ── Atmospheric gold glow behind title ── */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 35% at 50% 36%, rgba(220,150,20,0.12) 0%, rgba(200,130,10,0.04) 55%, transparent 80%)',
        }}
      />

      {/* ── Bottom fade — blends into homepage ── */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-52"
        style={{ background: 'linear-gradient(to top, #050505 0%, transparent 100%)' }}
      />

      {/* ── Top fade ── */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-24"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.48) 0%, transparent 100%)' }}
      />

      {/* ── Floating gold particles ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            style={{
              position: 'absolute',
              left:   `${p.left}%`,
              bottom: '-4px',
              width:  `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              background: `rgba(220,155,30,${p.op})`,
              boxShadow:  `0 0 ${p.size * 3}px rgba(220,155,30,${p.op * 0.5})`,
              animation:  `cParticle ${p.dur}s ${p.delay}s infinite ease-in`,
            }}
          />
        ))}
      </div>

      {/* ── Main content ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        {/* CARVERSE */}
        <motion.h1
          variants={fadeUp}
          className="select-none font-display font-medium leading-none tracking-tight"
          style={{
            fontSize: 'clamp(4rem, 13vw, 10rem)',
            background:
              'linear-gradient(155deg, #8a6010 0%, #c8920a 18%, #e8b820 32%, #fde060 50%, #f0c830 65%, #c08808 82%, #8a6010 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter:
              'drop-shadow(0 0 60px rgba(215,150,20,0.5)) drop-shadow(0 0 20px rgba(215,150,20,0.3))',
          }}
        >
          CARVERSE MOTORS
        </motion.h1>

        {/* WHERE EVERY CAR HAS A STORY */}
        <motion.p
          variants={fadeUp}
          className="mt-5 font-semibold uppercase text-[#cdc5b8]"
          style={{ fontSize: '11px', letterSpacing: '0.34em' }}
        >
          Where Every Car Has a Story.
        </motion.p>

        {/* Body */}
        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-xs leading-relaxed text-[#726a5e]"
          style={{ fontSize: '13px' }}
        >
          Discover the world of automotive excellence.
          Explore iconic machines, uncover their stories,
          and understand what makes every vehicle unique.
        </motion.p>

        {/* DISCOVER · EXPLORE · UNDERSTAND */}
        <motion.p
          variants={fadeUp}
          className="mt-7 font-semibold uppercase text-gold-500"
          style={{ fontSize: '10px', letterSpacing: '0.28em' }}
        >
          Discover.&nbsp;&nbsp;Explore.&nbsp;&nbsp;Understand.
        </motion.p>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.9 }}
        className="absolute bottom-9 z-10 flex flex-col items-center"
        style={{ gap: '6px' }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center"
          style={{ gap: '3px' }}
        >
          <svg width="24" height="13" viewBox="0 0 24 13" fill="none">
            <path d="M1 1.5L12 11.5L23 1.5" stroke="#b89020" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg width="24" height="13" viewBox="0 0 24 13" fill="none" style={{ opacity: 0.32 }}>
            <path d="M1 1.5L12 11.5L23 1.5" stroke="#b89020" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
        <span
          className="font-semibold uppercase text-[#524d45]"
          style={{ fontSize: '9px', letterSpacing: '0.27em' }}
        >
          Scroll to Explore
        </span>
      </motion.div>

      <style>{`
        @keyframes cParticle {
          0%   { transform: translateY(0) scale(1);      opacity: 0; }
          8%   { opacity: 1; }
          88%  { opacity: 0.45; }
          100% { transform: translateY(-96vh) scale(0.25); opacity: 0; }
        }
      `}</style>
    </section>
  )
}