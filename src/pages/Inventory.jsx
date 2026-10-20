import { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { vehicles } from '../data/mockData';
import VehicleCard from '../components/VehicleCard';

export default function Inventory() {
  const [params] = useSearchParams();
  const [make, setMake] = useState(params.get('make') || 'All Makes');
  const [sort, setSort] = useState('featured');

  const makes = useMemo(() => ['All Makes', ...new Set(vehicles.map((v) => v.make))], []);

  const filtered = useMemo(() => {
    let list = vehicles.filter((v) => make === 'All Makes' || v.make === make);
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'mileage') list = [...list].sort((a, b) => a.mileageKm - b.mileageKm);
    return list;
  }, [make, sort]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
      <nav className="mb-2 text-xs text-[#8f8778]">
        <Link to="/" className="hover:text-gold-500">Home</Link> <span className="mx-1">/</span> Inventory
      </nav>
      <h1 className="font-display text-3xl font-medium text-[#f2ede4]">Browse Our Inventory</h1>
      <p className="mt-1 text-sm text-[#8f8778]">{filtered.length} vehicles available</p>

      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-ink-700 bg-ink-850 p-3">
        <SlidersHorizontal size={16} className="text-gold-500" />
        <select
          value={make}
          onChange={(e) => setMake(e.target.value)}
          className="rounded-lg border border-ink-600 bg-ink-800 px-3 py-2 text-sm text-[#f2ede4] outline-none focus:border-gold-600"
        >
          {makes.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-ink-600 bg-ink-800 px-3 py-2 text-sm text-[#f2ede4] outline-none focus:border-gold-600"
        >
          <option value="featured">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="mileage">Mileage: Low to High</option>
        </select>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-[#8f8778]">No vehicles match those filters.</p>
      )}
    </div>
  );
}
