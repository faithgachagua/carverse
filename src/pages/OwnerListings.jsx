import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gauge, Fuel, Cog, X, CheckCircle2 } from 'lucide-react';
import { useListings } from '../context/ListingsContext';
import { formatKES } from '../data/mockData';

function ContactSellerModal({ listing, onClose }) {
  const [step, setStep] = useState('form');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  function submit(e) {
    e.preventDefault();
    setStep('done');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl border border-ink-700 bg-ink-850 p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-xl text-[#f2ede4]">
            {step === 'done' ? 'Message Sent' : `Enquire about the ${listing.make} ${listing.model}`}
          </h3>
          <button onClick={onClose} className="text-[#8f8778] hover:text-[#f2ede4]"><X size={18} /></button>
        </div>

        {step === 'form' ? (
          <form onSubmit={submit} className="space-y-3">
            <p className="text-sm text-[#8f8778]">
              Carverse relays your enquiry to the seller — your contact details aren't shared until they respond.
            </p>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#c9c2b4]">Full Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-ink-600 bg-ink-800 px-3 py-2 text-sm text-[#f2ede4] outline-none focus:border-gold-600"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#c9c2b4]">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-ink-600 bg-ink-800 px-3 py-2 text-sm text-[#f2ede4] outline-none focus:border-gold-600"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#c9c2b4]">Phone Number</label>
              <input
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-lg border border-ink-600 bg-ink-800 px-3 py-2 text-sm text-[#f2ede4] outline-none focus:border-gold-600"
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-gold-500 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-400"
            >
              Send via Carverse
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center py-4 text-center">
            <CheckCircle2 className="mb-3 text-gold-500" size={40} />
            <p className="text-sm text-[#c9c2b4]">
              Thanks, {form.name.split(' ')[0] || 'there'}! We've passed your enquiry to the seller through Carverse
              — expect a response soon.
            </p>
            <button
              onClick={onClose}
              className="mt-5 rounded-lg border border-gold-700/50 px-4 py-2 text-sm font-semibold text-gold-500 hover:bg-gold-500 hover:text-ink-950"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function OwnerListingCard({ listing, onContact }) {
  return (
    <div className="overflow-hidden rounded-xl border border-ink-700 bg-ink-850 transition-colors hover:border-gold-700/60">
      <div className="aspect-[4/3] bg-ink-800">
        {listing.photos?.[0] ? (
          <img src={listing.photos[0]} alt={`${listing.make} ${listing.model}`} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-[#6f6858]">No photo provided</div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-medium text-[#f2ede4]">{listing.year} {listing.make} {listing.model}</h3>
          <span className="rounded-full bg-gold-500/10 px-2 py-0.5 text-[10px] font-medium text-gold-500">Owner Listing</span>
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#8f8778]">
          <span className="flex items-center gap-1"><Gauge size={13} /> {listing.mileageKm?.toLocaleString()} km</span>
          <span className="flex items-center gap-1"><Fuel size={13} /> {listing.fuel}</span>
          <span className="flex items-center gap-1"><Cog size={13} /> {listing.transmission}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-base font-semibold text-gold-500">{formatKES(listing.price)}</span>
          <button
            onClick={() => onContact(listing)}
            className="rounded-md border border-gold-700/50 px-3 py-1.5 text-xs font-semibold text-gold-500 transition-colors hover:bg-gold-500 hover:text-ink-950"
          >
            Contact Seller
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OwnerListings() {
  const { approvedListings } = useListings();
  const [contacting, setContacting] = useState(null);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
      <nav className="mb-2 text-xs text-[#8f8778]">
        <Link to="/" className="hover:text-gold-500">Home</Link> <span className="mx-1">/</span> Owner Listings
      </nav>
      <h1 className="font-display text-3xl font-medium text-[#f2ede4]">Owner Listings</h1>
      <p className="mt-1 text-sm text-[#8f8778]">
        Cars listed for sale directly by their owners, reviewed and verified by Carverse.{' '}
        <Link to="/sell" className="text-gold-500 hover:underline">Sell yours here</Link>.
      </p>

      {approvedListings.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-ink-600 bg-ink-850 py-16 text-center">
          <p className="text-sm text-[#8f8778]">No owner listings are live yet — check back soon.</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {approvedListings.map((l) => (
            <OwnerListingCard key={l.id} listing={l} onContact={setContacting} />
          ))}
        </div>
      )}

      {contacting && <ContactSellerModal listing={contacting} onClose={() => setContacting(null)} />}
    </div>
  );
}