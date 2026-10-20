import { Link } from 'react-router-dom';
import { Heart, Gauge, Fuel, Cog } from 'lucide-react';
import { formatKES } from '../data/mockData';

export default function VehicleCard({ vehicle }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-ink-700 bg-ink-850 transition-all duration-300 hover:-translate-y-1 hover:border-gold-700/60 hover:shadow-gold">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.make} ${vehicle.model}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {vehicle.badge && (
          <span className="absolute left-3 top-3 rounded-md bg-gold-500 px-2 py-1 text-[11px] font-bold tracking-wide text-ink-950">
            {vehicle.badge}
          </span>
        )}
        <button
          aria-label="Save vehicle"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink-950/70 text-[#c9c2b4] backdrop-blur transition-colors hover:text-gold-500"
        >
          <Heart size={16} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-display text-lg font-medium text-[#f2ede4]">
          {vehicle.make} {vehicle.model}
        </h3>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#8f8778]">
          <span className="flex items-center gap-1"><Gauge size={13} /> {vehicle.mileageKm.toLocaleString()} km</span>
          <span className="flex items-center gap-1"><Fuel size={13} /> {vehicle.fuel}</span>
          <span className="flex items-center gap-1"><Cog size={13} /> {vehicle.transmission}</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-base font-semibold text-gold-500">{formatKES(vehicle.price)}</span>
          <Link
            to={`/inventory/${vehicle.id}`}
            className="rounded-md border border-gold-700/50 px-3 py-1.5 text-xs font-semibold text-gold-500 transition-colors hover:bg-gold-500 hover:text-ink-950"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
