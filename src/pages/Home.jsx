import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShieldCheck, ListChecks, Wallet, Headset } from 'lucide-react';
import { motion } from 'framer-motion';
import { vehicles, stats } from '../data/mockData';
import VehicleCard from '../components/VehicleCard';
import TrustStrip from '../components/TrustStrip';
import IntroSection from '../components/IntroSection';
import ScrollReveal from '../components/scroll/ScrollReveal';
import ParallaxLayer from '../components/scroll/ParallaxLayer';
import { StaggerGrid, StaggerItem } from '../components/scroll/StaggerGrid';
import HoverCard3D from '../components/scroll/HoverCard3D';

const iconMap = [ShieldCheck, ListChecks, Wallet, Headset];
const badgeIcons = ['Quality Assured', 'Verified Listings', 'Easy Financing', '7-Day Support'];

export default function Home() {
  const navigate = useNavigate();
  const [make, setMake] = useState('All Makes');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const makes = useMemo(() => ['All Makes', ...new Set(vehicles.map((v) => v.make))], []);

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (make !== 'All Makes') params.set('make', make);
    if (minPrice) params.set('min', minPrice);
    if (maxPrice) params.set('max', maxPrice);
    navigate(`/inventory?${params.toString()}`);
  }

  return (
    <div>

      {/* ── INTRO ── */}
      <IntroSection />

      <div className="bg-noise">

        {/* ── INTRODUCE — Hero ── */}
        <section className="mx-auto max-w-7xl px-5 pb-10 pt-14 md:px-8 md:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1200 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full border border-gold-700/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold-500"
              >
                <ShieldCheck size={13} /> Premium Cars. Trusted Deals.
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 font-display text-4xl font-medium leading-[1.1] text-[#f2ede4] md:text-6xl"
              >
                Find Your Perfect Car.
                <br />
                <span className="text-gradient-gold">Every Mile Matters.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.26 }}
                className="mt-5 max-w-md text-[#b3ab9c]"
              >
                Browse our wide selection of quality vehicles from trusted dealers.
              </motion.p>

              <motion.form
                onSubmit={handleSearch}
                initial={{ opacity: 0, y: 20, scale: 0.97, rotateX: 4 }}
                animate={{ opacity: 1, y: 0,  scale: 1,    rotateX: 0 }}
                transition={{ duration: 0.85, delay: 0.34, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ transformPerspective: 1000 }}
                className="mt-8 rounded-xl border border-ink-700 bg-ink-850 p-3"
              >
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <select
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    className="rounded-lg border border-ink-600 bg-ink-800 px-3 py-2 text-sm text-[#f2ede4] outline-none focus:border-gold-600"
                  >
                    {makes.map((m) => <option key={m}>{m}</option>)}
                  </select>
                  <select className="rounded-lg border border-ink-600 bg-ink-800 px-3 py-2 text-sm text-[#f2ede4] outline-none focus:border-gold-600">
                    <option>All Models</option>
                  </select>
                  <input
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min Price"
                    className="rounded-lg border border-ink-600 bg-ink-800 px-3 py-2 text-sm text-[#f2ede4] placeholder:text-[#6f6858] outline-none focus:border-gold-600"
                  />
                  <input
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max Price"
                    className="rounded-lg border border-ink-600 bg-ink-800 px-3 py-2 text-sm text-[#f2ede4] placeholder:text-[#6f6858] outline-none focus:border-gold-600"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-gold-500 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-400"
                >
                  <Search size={16} /> Search Vehicles
                </button>
              </motion.form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-6 flex flex-wrap gap-x-6 gap-y-2"
              >
                {badgeIcons.map((b) => (
                  <span key={b} className="flex items-center gap-1.5 text-xs text-[#8f8778]">
                    <ShieldCheck size={13} className="text-gold-600" /> {b}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            <ParallaxLayer speed={-0.1} className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <img
                  src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=80"
                  alt="Featured Land Rover"
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-gold"
                />
              </motion.div>
            </ParallaxLayer>
          </div>

          <ScrollReveal preset="discover" className="mt-14">
            <div className="grid grid-cols-2 gap-6 rounded-xl border border-ink-700 bg-ink-850 p-6 sm:grid-cols-4">
              {stats.map((s, i) => {
                const Icon = iconMap[i];
                return (
                  <ScrollReveal key={s.label} preset="text" delay={i * 0.08}>
                    <div className="flex items-center gap-3">
                      <Icon className="text-gold-500" size={22} />
                      <div>
                        <p className="font-display text-lg font-semibold text-[#f2ede4]">{s.value}</p>
                        <p className="text-xs text-[#8f8778]">{s.label}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </ScrollReveal>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-4 md:px-8">
          <ScrollReveal preset="text" className="mb-6">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-2xl font-medium text-[#f2ede4]">Featured Vehicles</h2>
              <button
                onClick={() => navigate('/inventory')}
                className="text-sm font-medium text-gold-500 hover:underline"
              >
                View All Vehicles →
              </button>
            </div>
          </ScrollReveal>

          <StaggerGrid className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {vehicles.slice(0, 4).map((v) => (
              <StaggerItem key={v.id}>
                <HoverCard3D>
                  <VehicleCard vehicle={v} />
                </HoverCard3D>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <ScrollReveal preset="connect">
            <TrustStrip />
          </ScrollReveal>
        </section>

      </div>
    </div>
  );
}