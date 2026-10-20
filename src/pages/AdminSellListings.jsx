import { useState } from 'react';
import { Check, X, Eye, CalendarClock, MapPin, Percent } from 'lucide-react';
import { useListings } from '../context/ListingsContext';
import { formatKES } from '../data/mockData';

export default function AdminSellListings() {
  const { listings, approveListing, rejectListing } = useListings();
  const [filter, setFilter] = useState('pending');
  const [viewing, setViewing] = useState(null);
  const [commissionInput, setCommissionInput] = useState('5');

  const filtered = listings.filter((l) => filter === 'all' || l.status === filter);
  const pendingCount = listings.filter((l) => l.status === 'pending').length;

  function openReview(listing) {
    setViewing(listing);
    setCommissionInput(String(listing.finalCommissionRate ?? listing.proposedCommissionRate ?? 5));
  }

  function handleApprove() {
    approveListing(viewing.id, Number(commissionInput));
    setViewing(null);
  }

  function handleReject() {
    rejectListing(viewing.id, 'Did not meet listing criteria');
    setViewing(null);
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-display text-2xl font-medium text-[#f2ede4]">Owner Car Listings</h1>
      <p className="mt-1 text-sm text-[#8f8778]">{pendingCount} pending review</p>

      <div className="mt-5 flex gap-2">
        {['pending', 'approved', 'rejected', 'all'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
              filter === f ? 'bg-gold-500 text-ink-950' : 'border border-ink-600 text-[#8f8778] hover:text-[#f2ede4]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((l) => (
          <div key={l.id} className="overflow-hidden rounded-xl border border-ink-700 bg-ink-850">
            <div className="aspect-[4/3] bg-ink-800">
              {l.photos?.[0] ? (
                <img src={l.photos[0]} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-[#6f6858]">No photo</div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium text-[#f2ede4]">{l.year} {l.make} {l.model}</p>
                <StatusPill status={l.status} />
              </div>
              <p className="mt-1 font-mono text-sm text-gold-500">{formatKES(l.price)}</p>
              <p className="mt-1 text-xs text-[#8f8778]">{l.sellerName} · {l.mileageKm?.toLocaleString()} km</p>
              <button
                onClick={() => openReview(l)}
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-ink-600 py-2 text-xs font-medium text-[#f2ede4] hover:border-gold-600"
              >
                <Eye size={13} /> Review
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-8 text-center text-sm text-[#8f8778]">No listings in this category.</p>
        )}
      </div>

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setViewing(null)}>
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-ink-700 bg-ink-850 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-xl text-[#f2ede4]">{viewing.year} {viewing.make} {viewing.model}</h3>
              <StatusPill status={viewing.status} />
            </div>

            {viewing.photos?.length > 0 && (
              <div className="mb-4 flex gap-2 overflow-x-auto">
                {viewing.photos.map((p, i) => (
                  <img key={i} src={p} alt="" className="h-20 w-28 shrink-0 rounded-lg object-cover" />
                ))}
              </div>
            )}

            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <Row label="Asking Price" value={formatKES(viewing.price)} />
              <Row label="Mileage" value={`${viewing.mileageKm?.toLocaleString()} km`} />
              <Row label="Fuel" value={viewing.fuel} />
              <Row label="Transmission" value={viewing.transmission} />
              <Row label="Condition" value={viewing.condition} />
              <Row label="Seller" value={viewing.sellerName} />
              <Row label="Phone" value={viewing.sellerPhone} />
              <Row label="Email" value={viewing.sellerEmail} />
            </dl>

            {viewing.description && (
              <div className="mt-3">
                <p className="text-xs font-medium text-[#8f8778]">Description</p>
                <p className="mt-1 text-sm text-[#c9c2b4]">{viewing.description}</p>
              </div>
            )}

            <div className="mt-4 rounded-lg border border-ink-700 bg-ink-800 p-3 text-xs text-[#c9c2b4]">
              <p className="mb-1 flex items-center gap-1.5 font-medium text-[#8f8778]">
                <CalendarClock size={13} className="text-gold-500" /> Negotiation Meeting
              </p>
              {viewing.meetingDay} at {viewing.meetingTime}
              <p className="mt-1 flex items-center gap-1.5">
                <MapPin size={13} className="text-gold-500" /> {viewing.branch}
              </p>
            </div>

            {viewing.status === 'pending' && (
              <div className="mt-4">
                <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-[#c9c2b4]">
                  <Percent size={13} className="text-gold-500" /> Final agreed commission rate (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  value={commissionInput}
                  onChange={(e) => setCommissionInput(e.target.value)}
                  className="w-full rounded-lg border border-ink-600 bg-ink-800 px-3 py-2 text-sm text-[#f2ede4] outline-none focus:border-gold-600"
                />
                <p className="mt-1 text-[11px] text-[#6f6858]">
                  Seller proposed {viewing.proposedCommissionRate}% — set the rate agreed at the meeting before approving.
                </p>
              </div>
            )}

            {viewing.status === 'approved' && (
              <p className="mt-4 text-sm text-emerald-400">
                Approved at {viewing.finalCommissionRate}% commission — now live on Owner Listings.
              </p>
            )}
            {viewing.status === 'rejected' && (
              <p className="mt-4 text-sm text-red-400">Rejected{viewing.rejectionReason ? `: ${viewing.rejectionReason}` : '.'}</p>
            )}

            <div className="mt-5 flex gap-2">
              {viewing.status === 'pending' && (
                <>
                  <button
                    onClick={handleApprove}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gold-500 py-2.5 text-sm font-semibold text-ink-950 hover:bg-gold-400"
                  >
                    <Check size={15} /> Approve &amp; Publish
                  </button>
                  <button
                    onClick={handleReject}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-500/50 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500 hover:text-ink-950"
                  >
                    <X size={15} /> Reject
                  </button>
                </>
              )}
              <button
                onClick={() => setViewing(null)}
                className="rounded-lg border border-ink-600 px-4 py-2.5 text-sm font-medium text-[#f2ede4] hover:border-gold-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusPill({ status }) {
  const styles = {
    pending: 'bg-gold-500/10 text-gold-500',
    approved: 'bg-emerald-500/10 text-emerald-400',
    rejected: 'bg-red-500/10 text-red-400',
  };
  return <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${styles[status]}`}>{status}</span>;
}

function Row({ label, value }) {
  return (
    <div>
      <dt className="text-xs text-[#8f8778]">{label}</dt>
      <dd className="text-[#f2ede4]">{value}</dd>
    </div>
  );
}