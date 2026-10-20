import { vehicles, formatKES } from '../data/mockData';
import { Pencil, Trash2 } from 'lucide-react';

export default function AdminVehicles() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium text-[#f2ede4]">Vehicles</h1>
          <p className="mt-1 text-sm text-[#8f8778]">{vehicles.length} vehicles in inventory.</p>
        </div>
        <button className="rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-ink-950 hover:bg-gold-400">
          + Add Vehicle
        </button>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-ink-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-850 text-xs uppercase tracking-wide text-[#8f8778]">
            <tr>
              <th className="px-4 py-3 font-medium">Vehicle</th>
              <th className="px-4 py-3 font-medium">Year</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Mileage</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v.id} className="border-t border-ink-700 hover:bg-ink-850">
                <td className="flex items-center gap-3 px-4 py-3 text-[#f2ede4]">
                  <img src={v.images[0]} alt="" className="h-10 w-14 rounded-md object-cover" />
                  {v.make} {v.model}
                </td>
                <td className="px-4 py-3 text-[#8f8778]">{v.year}</td>
                <td className="px-4 py-3 text-gold-500">{formatKES(v.price)}</td>
                <td className="px-4 py-3 text-[#8f8778]">{v.mileageKm.toLocaleString()} km</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="text-[#8f8778] hover:text-gold-500"><Pencil size={14} /></button>
                    <button className="text-[#8f8778] hover:text-red-400"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
