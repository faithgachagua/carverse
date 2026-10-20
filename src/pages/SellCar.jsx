import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, X, ImagePlus, CheckCircle2, MapPin, Tag, Percent, CalendarClock, Loader2 } from 'lucide-react';
import { contactInfo, formatKES } from '../data/mockData';
import { useListings } from '../context/ListingsContext';
import { resizeImageFile } from '../utils/image';

const SUGGESTED_COMMISSION_RATE = 5; // shown as a starting point — final rate is agreed at the meeting

const emptyForm = {
  make: '',
  model: '',
  year: '',
  mileageKm: '',
  fuel: 'Petrol',
  transmission: 'Automatic',
  condition: 'Excellent',
  price: '',
  description: '',
  sellerName: '',
  sellerEmail: '',
  sellerPhone: '',
  branch: contactInfo.agencies[0].name,
};

// Builds the next N weekdays (Mon–Sat) with a few open time slots each,
// standing in for real meeting-room availability from a backend/calendar.
function getAvailableSlots(days = 6) {
  const times = ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'];
  const slots = [];
  const d = new Date();
  while (slots.length < days) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) continue; // skip Sundays
    slots.push({
      label: d.toLocaleDateString('en-KE', { weekday: 'short', month: 'short', day: 'numeric' }),
      times,
    });
  }
  return slots;
}

export default function SellCar() {
  const { submitListing } = useListings();
  const [form, setForm] = useState(emptyForm);
  const [photos, setPhotos] = useState([]); // [{ url, uploading }]
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState('form'); // 'form' | 'done'
  const [referenceId, setReferenceId] = useState('');
  const slots = getAvailableSlots();

  function update(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handlePhotos(e) {
    const files = Array.from(e.target.files || []).slice(0, 8 - photos.length);
    e.target.value = ''; // allow re-selecting the same file

    // Show placeholders immediately, then fill in compressed data URLs as they resolve.
    const placeholders = files.map(() => ({ url: null, uploading: true }));
    setPhotos((prev) => [...prev, ...placeholders]);
    const startIndex = photos.length;

    files.forEach(async (file, i) => {
      try {
        const url = await resizeImageFile(file);
        setPhotos((prev) => {
          const next = [...prev];
          if (next[startIndex + i]) next[startIndex + i] = { url, uploading: false };
          return next;
        });
      } catch {
        setPhotos((prev) => prev.filter((_, idx) => idx !== startIndex + i));
      }
    });
  }

  function removePhoto(index) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const listing = submitListing({
      make: form.make,
      model: form.model,
      year: Number(form.year),
      mileageKm: Number(form.mileageKm),
      fuel: form.fuel,
      transmission: form.transmission,
      condition: form.condition,
      price: Number(form.price),
      description: form.description,
      photos: photos.filter((p) => p.url).map((p) => p.url),
      sellerName: form.sellerName,
      sellerEmail: form.sellerEmail,
      sellerPhone: form.sellerPhone,
      branch: form.branch,
      meetingDay: selectedDay.label,
      meetingTime: selectedTime,
      proposedCommissionRate: SUGGESTED_COMMISSION_RATE,
    });
    setReferenceId(listing.id.toUpperCase());
    setStep('done');
  }

  const selectedBranch = contactInfo.agencies.find((a) => a.name === form.branch) || contactInfo.agencies[0];
  const askingPrice = Number(form.price) || 0;
  const suggestedPayout = askingPrice - Math.round(askingPrice * (SUGGESTED_COMMISSION_RATE / 100));
  const photosStillUploading = photos.some((p) => p.uploading);
  const canSubmit = selectedDay && selectedTime && !photosStillUploading;

  if (step === 'done') {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-lg flex-col items-center justify-center px-5 py-16 text-center">
        <CheckCircle2 className="mb-4 text-gold-500" size={48} />
        <h1 className="font-display text-2xl font-medium text-[#f2ede4]">Listing Submitted for Review</h1>
        <p className="mt-2 text-sm text-[#8f8778]">
          Thanks, {form.sellerName.split(' ')[0] || 'there'}! Your {form.year} {form.make} {form.model} has been sent
          to our team. Reference <span className="font-mono text-gold-500">{referenceId}</span>.
        </p>

        <div className="mt-6 w-full rounded-xl border border-ink-700 bg-ink-850 p-5 text-left">
          <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[#8f8778]">
            <CalendarClock size={13} className="text-gold-500" /> Negotiation Meeting
          </p>
          <p className="text-sm text-[#f2ede4]">{selectedDay?.label} at {selectedTime}</p>
          <p className="text-xs text-[#8f8778]">{selectedBranch.name} — {selectedBranch.location}</p>
          <a href={`tel:${selectedBranch.phone.replace(/\s/g, '')}`} className="mt-1 block text-xs text-gold-500 hover:underline">
            {selectedBranch.phone}
          </a>
        </div>

        <div className="mt-4 w-full rounded-xl border border-ink-700 bg-ink-850 p-5 text-left">
          <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[#8f8778]">
            <Percent size={13} className="text-gold-500" /> What Happens Next
          </p>
          <ol className="space-y-1.5 text-xs text-[#c9c2b4]">
            <li>1. Our team reviews your submission and photos.</li>
            <li>2. You'll meet at {selectedBranch.name} on {selectedDay?.label} to inspect the car and agree the
              final commission rate (we suggest {SUGGESTED_COMMISSION_RATE}%, negotiable).</li>
            <li>3. Once approved, your listing goes live on Carverse for buyers to see.</li>
          </ol>
        </div>

        <Link to="/" className="mt-6 rounded-lg border border-ink-600 px-5 py-2.5 text-sm font-medium text-[#f2ede4] hover:border-gold-600">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 md:px-8">
      <h1 className="font-display text-3xl font-medium text-[#f2ede4]">Sell Your Car With Carverse</h1>
      <p className="mt-1 text-sm text-[#8f8778]">
        List your vehicle with us — our team markets it, handles buyer inquiries and paperwork, and pays you out
        once it sells. Nothing upfront; we suggest a {SUGGESTED_COMMISSION_RATE}% commission, which you can
        negotiate at your in-person meeting.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        {/* Vehicle details */}
        <section className="rounded-xl border border-ink-700 bg-ink-850 p-5">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg text-[#f2ede4]">
            <Tag size={16} className="text-gold-500" /> Vehicle Details
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Make" value={form.make} onChange={update('make')} placeholder="e.g. Toyota" required />
            <Field label="Model" value={form.model} onChange={update('model')} placeholder="e.g. Land Cruiser VX" required />
            <Field label="Year" type="number" value={form.year} onChange={update('year')} placeholder="e.g. 2021" required />
            <Field label="Mileage (km)" type="number" value={form.mileageKm} onChange={update('mileageKm')} placeholder="e.g. 45000" required />
            <div>
              <label className="mb-1 block text-xs font-medium text-[#c9c2b4]">Fuel Type</label>
              <select
                value={form.fuel}
                onChange={update('fuel')}
                className="w-full rounded-lg border border-ink-600 bg-ink-800 px-3 py-2.5 text-sm text-[#f2ede4] outline-none focus:border-gold-600"
              >
                {['Petrol', 'Diesel', 'Hybrid', 'Electric'].map((f) => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#c9c2b4]">Transmission</label>
              <select
                value={form.transmission}
                onChange={update('transmission')}
                className="w-full rounded-lg border border-ink-600 bg-ink-800 px-3 py-2.5 text-sm text-[#f2ede4] outline-none focus:border-gold-600"
              >
                {['Automatic', 'Manual'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#c9c2b4]">Condition</label>
              <select
                value={form.condition}
                onChange={update('condition')}
                className="w-full rounded-lg border border-ink-600 bg-ink-800 px-3 py-2.5 text-sm text-[#f2ede4] outline-none focus:border-gold-600"
              >
                {['Excellent', 'Good', 'Fair', 'Needs Work'].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <Field label="Asking Price (KES)" type="number" value={form.price} onChange={update('price')} placeholder="e.g. 6500000" required />
          </div>

          {askingPrice > 0 && (
            <div className="mt-4 rounded-lg border border-gold-700/30 bg-gold-500/5 p-3">
              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-gold-500">
                <Percent size={13} /> Suggested payout (negotiable at your meeting)
              </p>
              <dl className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <dt className="text-[#8f8778]">Asking price</dt>
                  <dd className="text-[#f2ede4]">{formatKES(askingPrice)}</dd>
                </div>
                <div>
                  <dt className="text-[#8f8778]">Suggested commission ({SUGGESTED_COMMISSION_RATE}%)</dt>
                  <dd className="text-[#f2ede4]">− {formatKES(askingPrice - suggestedPayout)}</dd>
                </div>
                <div>
                  <dt className="text-[#8f8778]">You'd receive</dt>
                  <dd className="font-medium text-gold-500">{formatKES(suggestedPayout)}</dd>
                </div>
              </dl>
            </div>
          )}
          <div className="mt-4">
            <label className="mb-1 block text-xs font-medium text-[#c9c2b4]">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={update('description')}
              placeholder="Service history, notable features, reason for selling..."
              className="w-full rounded-lg border border-ink-600 bg-ink-800 px-3 py-2.5 text-sm text-[#f2ede4] placeholder:text-[#6f6858] outline-none focus:border-gold-600"
            />
          </div>
        </section>

        {/* Photos */}
        <section className="rounded-xl border border-ink-700 bg-ink-850 p-5">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg text-[#f2ede4]">
            <ImagePlus size={16} className="text-gold-500" /> Photos
          </h2>
          <p className="mb-3 text-xs text-[#8f8778]">Add up to 8 photos — exterior, interior, and any damage.</p>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {photos.map((p, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-lg border border-ink-600 bg-ink-800">
                {p.uploading ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <Loader2 size={18} className="animate-spin text-gold-500" />
                  </div>
                ) : (
                  <>
                    <img src={p.url} alt="" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink-950/80 text-[#f2ede4] hover:bg-red-500"
                      aria-label="Remove photo"
                    >
                      <X size={13} />
                    </button>
                  </>
                )}
              </div>
            ))}

            {photos.length < 8 && (
              <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-ink-600 text-[#6f6858] transition-colors hover:border-gold-600 hover:text-gold-500">
                <Upload size={20} />
                <span className="text-[11px]">Add photo</span>
                <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotos} />
              </label>
            )}
          </div>
        </section>

        {/* Seller + branch */}
        <section className="rounded-xl border border-ink-700 bg-ink-850 p-5">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg text-[#f2ede4]">
            <MapPin size={16} className="text-gold-500" /> Your Details &amp; Branch
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" value={form.sellerName} onChange={update('sellerName')} placeholder="Enter your full name" required />
            <Field label="Phone Number" value={form.sellerPhone} onChange={update('sellerPhone')} placeholder="Enter your phone number" required />
            <Field label="Email" type="email" value={form.sellerEmail} onChange={update('sellerEmail')} placeholder="Enter your email" required />
            <div>
              <label className="mb-1 block text-xs font-medium text-[#c9c2b4]">Preferred Branch</label>
              <select
                value={form.branch}
                onChange={update('branch')}
                className="w-full rounded-lg border border-ink-600 bg-ink-800 px-3 py-2.5 text-sm text-[#f2ede4] outline-none focus:border-gold-600"
              >
                {contactInfo.agencies.map((a) => (
                  <option key={a.name} value={a.name}>{a.name} — {a.location}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Meeting scheduler */}
        <section className="rounded-xl border border-ink-700 bg-ink-850 p-5">
          <h2 className="mb-1 flex items-center gap-2 font-display text-lg text-[#f2ede4]">
            <CalendarClock size={16} className="text-gold-500" /> Schedule a Negotiation Meeting
          </h2>
          <p className="mb-4 text-xs text-[#8f8778]">
            Meet an agent at {selectedBranch.name} to inspect the car and agree the final commission rate.
          </p>

          <label className="mb-1.5 block text-xs font-medium text-[#c9c2b4]">Available Dates</label>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {slots.map((slot) => (
              <button
                key={slot.label}
                type="button"
                onClick={() => {
                  setSelectedDay(slot);
                  setSelectedTime(null);
                }}
                className={`shrink-0 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                  selectedDay?.label === slot.label
                    ? 'border-gold-500 bg-gold-500 text-ink-950'
                    : 'border-ink-600 text-[#c9c2b4] hover:border-gold-600'
                }`}
              >
                {slot.label}
              </button>
            ))}
          </div>

          {selectedDay && (
            <>
              <label className="mb-1.5 mt-3 block text-xs font-medium text-[#c9c2b4]">Available Times</label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {selectedDay.times.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                      selectedTime === t
                        ? 'border-gold-500 bg-gold-500 text-ink-950'
                        : 'border-ink-600 text-[#c9c2b4] hover:border-gold-600'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </>
          )}
        </section>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full rounded-lg bg-gold-500 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {photosStillUploading ? 'Processing photos…' : 'Submit Listing for Review'}
        </button>
        {!selectedDay && <p className="text-center text-xs text-[#6f6858]">Pick a meeting date and time to continue.</p>}
      </form>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text', required }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-[#c9c2b4]">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-ink-600 bg-ink-800 px-3 py-2.5 text-sm text-[#f2ede4] placeholder:text-[#6f6858] outline-none focus:border-gold-600"
      />
    </div>
  );
}