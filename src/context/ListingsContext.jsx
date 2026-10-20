import { createContext, useContext, useEffect, useState } from 'react';

const ListingsContext = createContext(null);
const LS_LISTINGS = 'carverse_owner_listings';

function loadOrSeed(key, seed) {
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // fall through to reseed on corrupt data
    }
  }
  localStorage.setItem(key, JSON.stringify(seed));
  return seed;
}

// A couple of seed listings so the admin queue and public page aren't empty on first load.
const seedListings = [
  {
    id: 'ol-1',
    make: 'Subaru',
    model: 'Forester XT',
    year: 2019,
    mileageKm: 58000,
    fuel: 'Petrol',
    transmission: 'Automatic',
    condition: 'Good',
    price: 3200000,
    description: 'Well maintained, single owner, full service records available.',
    photos: [],
    sellerName: 'Grace Njeri',
    sellerEmail: 'grace.njeri@example.com',
    sellerPhone: '+254 700 222 111',
    branch: 'Carverse Nairobi HQ',
    meetingDay: 'Wed, Jul 29',
    meetingTime: '11:30 AM',
    proposedCommissionRate: 5,
    finalCommissionRate: null,
    status: 'pending',
    submittedAt: new Date().toISOString(),
  },
];

export function ListingsProvider({ children }) {
  const [listings, setListings] = useState(() => loadOrSeed(LS_LISTINGS, seedListings));

  useEffect(() => {
    try {
      localStorage.setItem(LS_LISTINGS, JSON.stringify(listings));
    } catch {
      // localStorage quota exceeded (large base64 photos) — fail silently in this prototype.
      console.warn('Could not persist listings to localStorage (likely quota exceeded).');
    }
  }, [listings]);

  function submitListing(data) {
    const newListing = {
      id: `ol-${Date.now()}`,
      status: 'pending',
      finalCommissionRate: null,
      submittedAt: new Date().toISOString(),
      ...data,
    };
    setListings((prev) => [newListing, ...prev]);
    return newListing;
  }

  function approveListing(id, finalCommissionRate) {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'approved', finalCommissionRate } : l))
    );
  }

  function rejectListing(id, reason) {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'rejected', rejectionReason: reason || '' } : l))
    );
  }

  const value = {
    listings,
    submitListing,
    approveListing,
    rejectListing,
    pendingListings: listings.filter((l) => l.status === 'pending'),
    approvedListings: listings.filter((l) => l.status === 'approved'),
  };

  return <ListingsContext.Provider value={value}>{children}</ListingsContext.Provider>;
}

export function useListings() {
  const ctx = useContext(ListingsContext);
  if (!ctx) throw new Error('useListings must be used within ListingsProvider');
  return ctx;
}