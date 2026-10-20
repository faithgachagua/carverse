import { useState } from 'react';
import { Plus, X, Trash2, CalendarClock } from 'lucide-react';
import { useTestDriveSlots } from '../context/TestDriveSlotsContext';

export default function AdminTestDriveSlots() {
  const { slots, addDate, removeDate, addTime, removeTime, labelFor } = useTestDriveSlots();
  const [newDate, setNewDate] = useState('');
  const [timeDrafts, setTimeDrafts] = useState({}); // { [slotId]: draftString }

  const today = new Date().toISOString().slice(0, 10);
  const sorted = [...slots].sort((a, b) => a.dateISO.localeCompare(b.dateISO));

  function handleAddDate(e) {
    e.preventDefault();
    if (!newDate) return;
    addDate(newDate);
    setNewDate('');
  }

  function handleAddTime(slotId) {
    const draft = (timeDrafts[slotId] || '').trim();
    if (!draft) return;
    addTime(slotId, draft);
    setTimeDrafts((prev) => ({ ...prev, [slotId]: '' }));
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-display text-2xl font-medium text-[#f2ede4]">Test Drive Availability</h1>
      <p className="mt-1 text-sm text-[#8f8778]">
        Manage which dates and times customers can pick when booking a test drive. Dates automatically disappear
        once the day has passed — no manual cleanup needed. Dates with no time slots won't show to customers.
      </p>

      {/* Add a new date */}
      <form onSubmit={handleAddDate} className="mt-6 flex flex-wrap items-end gap-3 rounded-xl border border-ink-700 bg-ink-850 p-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-[#c9c2b4]">Add a date</label>
          <input
            type="date"
            min={today}
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="rounded-lg border border-ink-600 bg-ink-800 px-3 py-2 text-sm text-[#f2ede4] outline-none focus:border-gold-600"
          />
        </div>
        <button
          type="submit"
          disabled={!newDate}
          className="flex items-center gap-1.5 rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-ink-950 hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus size={15} /> Add Date
        </button>
      </form>

      {/* Existing dates */}
      <div className="mt-6 space-y-3">
        {sorted.length === 0 && (
          <p className="rounded-xl border border-dashed border-ink-600 bg-ink-850 py-8 text-center text-sm text-[#8f8778]">
            No dates configured yet — add one above.
          </p>
        )}

        {sorted.map((slot) => (
          <div key={slot.id} className="rounded-xl border border-ink-700 bg-ink-850 p-4">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 font-medium text-[#f2ede4]">
                <CalendarClock size={15} className="text-gold-500" />
                {labelFor(slot.dateISO)}
              </p>
              <button
                onClick={() => removeDate(slot.id)}
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
              >
                <Trash2 size={13} /> Remove date
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {slot.times.length === 0 && (
                <span className="text-xs text-[#6f6858]">No time slots yet — this date won't appear to customers.</span>
              )}
              {slot.times.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1.5 rounded-full border border-ink-600 px-2.5 py-1 text-xs text-[#c9c2b4]"
                >
                  {t}
                  <button onClick={() => removeTime(slot.id, t)} aria-label={`Remove ${t}`} className="text-[#6f6858] hover:text-red-400">
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <input
                value={timeDrafts[slot.id] || ''}
                onChange={(e) => setTimeDrafts((prev) => ({ ...prev, [slot.id]: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTime(slot.id))}
                placeholder="e.g. 10:00 AM"
                className="flex-1 rounded-lg border border-ink-600 bg-ink-800 px-3 py-1.5 text-xs text-[#f2ede4] placeholder:text-[#6f6858] outline-none focus:border-gold-600"
              />
              <button
                onClick={() => handleAddTime(slot.id)}
                className="flex items-center gap-1 rounded-lg border border-ink-600 px-3 py-1.5 text-xs font-medium text-[#f2ede4] hover:border-gold-600"
              >
                <Plus size={13} /> Add Time
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}