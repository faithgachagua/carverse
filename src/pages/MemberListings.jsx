import { vehicles, formatKES } from '../data/mockData';
import { Eye, Pencil } from 'lucide-react';

const myListings = vehicles.slice(0, 3);

export default function MemberListings() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium text-[#f2ede4]">My Listings</h1>
          <p className="mt-1 text-sm text-[#8f8778]">Vehicles you've listed for sale on Carverse.</p>
        </div>
        <button className="rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-ink-950 hover:bg-gold-400">
          + New Listing
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {myListings.map((v) => (
          <div key={v.id} className="overflow-hidden rounded-xl border border-ink-700 bg-ink-850">
            <img src={v.images[0]} alt="" className="aspect-[4/3] w-full object-cover" />
            <div className="p-4">
              <p className="font-medium text-[#f2ede4]">{v.make} {v.model}</p>
              <p className="mt-1 font-mono text-sm text-gold-500">{formatKES(v.price)}</p>
              <div className="mt-3 flex gap-2">
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-ink-600 py-1.5 text-xs font-medium text-[#f2ede4] hover:border-gold-600">
                  <Eye size={13} /> View
                </button>
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-ink-600 py-1.5 text-xs font-medium text-[#f2ede4] hover:border-gold-600">
                  <Pencil size={13} /> Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
