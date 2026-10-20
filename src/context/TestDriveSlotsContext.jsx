import { createContext, useContext, useEffect, useState } from 'react';

const SlotsContext = createContext(null);
const LS_SLOTS = 'carverse_test_drive_slots';

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

function labelFor(dateISO) {
  const d = new Date(`${dateISO}T00:00:00`);
  return d.toLocaleDateString('en-KE', { weekday: 'short', month: 'short', day: 'numeric' });
}

function toISODate(d) {
  return d.toISOString().slice(0, 10);
}

// Seed with the next 6 weekdays (Mon–Sat) and a default set of times,
// so the booking flow isn't empty before an admin has configured anything.
function buildSeedSlots() {
  const defaultTimes = ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'];
  const slots = [];
  const d = new Date();
  while (slots.length < 6) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) continue; // skip Sundays
    const dateISO = toISODate(d);
    slots.push({ id: `slot-${dateISO}`, dateISO, times: [...defaultTimes] });
  }
  return slots;
}

export function TestDriveSlotsProvider({ children }) {
  const [slots, setSlots] = useState(() => {
    const loaded = loadOrSeed(LS_SLOTS, buildSeedSlots());
    const todayISO = toISODate(new Date());
    // Drop any dates that have already passed — admins shouldn't have to
    // manually clean these up every day.
    return loaded.filter((s) => s.dateISO >= todayISO);
  });

  useEffect(() => {
    localStorage.setItem(LS_SLOTS, JSON.stringify(slots));
  }, [slots]);

  // Re-check once a day (and whenever the tab regains focus) in case the
  // app is left open across midnight.
  useEffect(() => {
    function pruneExpired() {
      const todayISO = toISODate(new Date());
      setSlots((prev) => prev.filter((s) => s.dateISO >= todayISO));
    }
    const interval = setInterval(pruneExpired, 60 * 60 * 1000); // hourly check
    window.addEventListener('focus', pruneExpired);
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', pruneExpired);
    };
  }, []);

  function addDate(dateISO) {
    if (!dateISO || slots.some((s) => s.dateISO === dateISO)) return;
    setSlots((prev) =>
      [...prev, { id: `slot-${dateISO}`, dateISO, times: [] }].sort((a, b) => a.dateISO.localeCompare(b.dateISO))
    );
  }

  function removeDate(id) {
    setSlots((prev) => prev.filter((s) => s.id !== id));
  }

  function addTime(id, time) {
    const trimmed = time.trim();
    if (!trimmed) return;
    setSlots((prev) =>
      prev.map((s) => (s.id === id && !s.times.includes(trimmed) ? { ...s, times: [...s.times, trimmed] } : s))
    );
  }

  function removeTime(id, time) {
    setSlots((prev) => prev.map((s) => (s.id === id ? { ...s, times: s.times.filter((t) => t !== time) } : s)));
  }

  // Shape consumed by the public booking UI: only future dates with at least one time slot,
  // sorted chronologically, with a human-readable label attached.
  const todayISO = toISODate(new Date());
  const publicSlots = slots
    .filter((s) => s.dateISO >= todayISO && s.times.length > 0)
    .sort((a, b) => a.dateISO.localeCompare(b.dateISO))
    .map((s) => ({ ...s, label: labelFor(s.dateISO) }));

  const value = { slots, publicSlots, addDate, removeDate, addTime, removeTime, labelFor };

  return <SlotsContext.Provider value={value}>{children}</SlotsContext.Provider>;
}

export function useTestDriveSlots() {
  const ctx = useContext(SlotsContext);
  if (!ctx) throw new Error('useTestDriveSlots must be used within TestDriveSlotsProvider');
  return ctx;
}