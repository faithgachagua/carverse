import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Phone, CalendarClock, X, CheckCircle2, Headset, Mail, MapPin } from 'lucide-react';
import { vehicles, formatKES, contactInfo } from '../data/mockData';

const tabs = ['Overview', 'Specifications', 'Features', 'Vehicle History', 'Financing'];

// Builds the next N weekdays (Mon–Sat) with a few open time slots each,
// standing in for real availability data from a backend/calendar.
function getAvailableSlots(days = 6) {
  const times = ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'];
  const slots = [];
  const d = new Date();
  while (slots.length < days) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) continue; // skip Sundays
    slots.push({
      date: new Date(d),
      label: d.toLocaleDateString('en-KE', { weekday: 'short', month: 'short', day: 'numeric' }),
      times,
    });
  }
  return slots;
}

function BuyModal({ vehicle, onClose }) {
  const [step, setStep] = useState('form');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  function submit(e) {
    e.preventDefault();
    setStep('done');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-xl border border-ink-700 bg-ink-850 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-xl text-[#f2ede4]">
            {step === 'done' ? 'Request Received' : `Buy ${vehicle.make} ${vehicle.model}`}
          </h3>
          <button onClick={onClose} className="text-[#8f8778] hover:text-[#f2ede4]"><X size={18} /></button>
        </div>

        {step === 'form' ? (
          <form onSubmit={submit} className="space-y-3">
            <p className="text-sm text-[#8f8778]">
              No account needed — leave your details and our sales team will contact you to complete the purchase.
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
              Submit Purchase Request
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center py-4 text-center">
            <CheckCircle2 className="mb-3 text-gold-500" size={40} />
            <p className="text-sm text-[#c9c2b4]">
              Thanks, {form.name.split(' ')[0] || 'there'}! A Carverse sales associate will reach out to{' '}
              {form.email} shortly to finalize the purchase of the {vehicle.make} {vehicle.model}.
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

function InquiryModal({ vehicle, mode, onClose }) {
  // mode is either 'test-drive' or 'contact-sales' — same shape, different copy.
  const [step, setStep] = useState('form');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [selectedDay, setSelectedDay] = useState(null);   // slot object from getAvailableSlots
  const [selectedTime, setSelectedTime] = useState(null); // e.g. "11:30 AM"
  const isTestDrive = mode === 'test-drive';
  const slots = isTestDrive ? getAvailableSlots() : [];

  function submit(e) {
    e.preventDefault();
    setStep('done');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl border border-ink-700 bg-ink-850 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-xl text-[#f2ede4]">
            {step === 'done'
              ? 'Request Received'
              : isTestDrive
              ? `Book a Test Drive`
              : `Contact Sales`}
          </h3>
          <button onClick={onClose} className="text-[#8f8778] hover:text-[#f2ede4]"><X size={18} /></button>
        </div>

        {step === 'form' ? (
          <>
            {/* Direct contact options — shown above the form on Contact Sales */}
            {!isTestDrive && (
              <div className="mb-4 space-y-2 rounded-lg border border-ink-700 bg-ink-800 p-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#8f8778]">
                  Prefer to talk to someone now?
                </p>
                <a
                  href={`tel:${contactInfo.customerCare.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2.5 text-sm text-[#f2ede4] hover:text-gold-500"
                >
                  <Headset size={15} className="text-gold-500" />
                  <span>
                    Customer Care: {contactInfo.customerCare.phone}
                    <span className="ml-2 text-xs text-[#6f6858]">({contactInfo.customerCare.hours})</span>
                  </span>
                </a>
                <a
                  href={`tel:${contactInfo.salesLine.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2.5 text-sm text-[#f2ede4] hover:text-gold-500"
                >
                  <Phone size={15} className="text-gold-500" />
                  Sales Line: {contactInfo.salesLine.phone}
                </a>
                <a
                  href={`mailto:${contactInfo.salesLine.email}`}
                  className="flex items-center gap-2.5 text-sm text-[#f2ede4] hover:text-gold-500"
                >
                  <Mail size={15} className="text-gold-500" />
                  {contactInfo.salesLine.email}
                </a>

                <div className="mt-3 border-t border-ink-700 pt-3">
                  <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-[#8f8778]">Our Agencies</p>
                  <ul className="space-y-1.5">
                    {contactInfo.agencies.map((a) => (
                      <li key={a.name} className="flex items-start gap-2.5 text-xs text-[#c9c2b4]">
                        <MapPin size={13} className="mt-0.5 shrink-0 text-gold-600" />
                        <span>
                          <span className="text-[#f2ede4]">{a.name}</span> — {a.location} ·{' '}
                          <a href={`tel:${a.phone.replace(/\s/g, '')}`} className="text-gold-500 hover:underline">
                            {a.phone}
                          </a>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <form onSubmit={submit} className="space-y-3">
              <p className="text-sm text-[#8f8778]">
                {isTestDrive
                  ? `Pick an available slot and we'll confirm your test drive for the ${vehicle.make} ${vehicle.model}.`
                  : `Or leave your details below and a Carverse sales associate will get back to you about the ${vehicle.make} ${vehicle.model}.`}
              </p>

              {isTestDrive && (
                <div>
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
                      <div className="grid grid-cols-2 gap-2">
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
                </div>
              )}

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
              {!isTestDrive && (
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#c9c2b4]">Message (optional)</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Any questions for our sales team?"
                    className="w-full rounded-lg border border-ink-600 bg-ink-800 px-3 py-2 text-sm text-[#f2ede4] placeholder:text-[#6f6858] outline-none focus:border-gold-600"
                  />
                </div>
              )}
              <button
                type="submit"
                disabled={isTestDrive && (!selectedDay || !selectedTime)}
                className="mt-2 w-full rounded-lg bg-gold-500 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isTestDrive ? 'Request Test Drive' : 'Send to Sales'}
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center py-4 text-center">
            <CheckCircle2 className="mb-3 text-gold-500" size={40} />
            <p className="text-sm text-[#c9c2b4]">
              {isTestDrive
                ? `Thanks, ${form.name.split(' ')[0] || 'there'}! We'll confirm your test drive for ${selectedDay?.label} at ${selectedTime} by email.`
                : `Thanks, ${form.name.split(' ')[0] || 'there'}! A sales associate will reach out to ${form.email} shortly.`}
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

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = vehicles.find((v) => v.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState('Overview');
  const [showBuy, setShowBuy] = useState(false);
  const [inquiryMode, setInquiryMode] = useState(null); // null | 'test-drive' | 'contact-sales'

  if (!vehicle) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <p className="text-[#f2ede4]">Vehicle not found.</p>
        <button onClick={() => navigate('/inventory')} className="mt-4 text-gold-500 hover:underline">
          Back to Inventory
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
      <nav className="mb-4 text-xs text-[#8f8778]">
        <Link to="/" className="hover:text-gold-500">Home</Link> <span className="mx-1">/</span>{' '}
        <Link to="/inventory" className="hover:text-gold-500">Inventory</Link> <span className="mx-1">/</span>{' '}
        {vehicle.make} {vehicle.model}
      </nav>

      <div className="grid gap-8 lg:grid-cols-[100px_1fr_380px]">
        {/* Thumbnails */}
        <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-visible">
          {vehicle.images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActiveImg(i)}
              className={`h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 lg:w-full ${
                activeImg === i ? 'border-gold-500' : 'border-ink-700'
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        {/* Main image + tabs */}
        <div className="order-1 lg:order-2">
          <img
            src={vehicle.images[activeImg]}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="aspect-[16/10] w-full rounded-xl object-cover"
          />

          <div className="mt-6 flex gap-6 overflow-x-auto border-b border-ink-700">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`whitespace-nowrap border-b-2 pb-3 text-sm font-medium transition-colors ${
                  tab === t ? 'border-gold-500 text-gold-500' : 'border-transparent text-[#8f8778] hover:text-[#c9c2b4]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="py-6 text-sm leading-relaxed text-[#c9c2b4]">
            {tab === 'Overview' && (
              <div className="grid gap-6 sm:grid-cols-2">
                <p>{vehicle.description}</p>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  {[
                    ['Engine', vehicle.engine],
                    ['Drivetrain', vehicle.drivetrain],
                    ['Color', vehicle.color],
                    ['Seats', vehicle.seats],
                    ['Location', vehicle.location],
                  ].map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="text-[#8f8778]">{k}</dt>
                      <dd className="text-[#f2ede4]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            {tab === 'Specifications' && (
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
                {[
                  ['Make', vehicle.make],
                  ['Model', vehicle.model],
                  ['Year', vehicle.year],
                  ['Mileage', `${vehicle.mileageKm.toLocaleString()} km`],
                  ['Fuel Type', vehicle.fuel],
                  ['Transmission', vehicle.transmission],
                  ['Engine', vehicle.engine],
                  ['Drivetrain', vehicle.drivetrain],
                  ['Seats', vehicle.seats],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs text-[#8f8778]">{k}</dt>
                    <dd className="text-[#f2ede4]">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            {tab === 'Features' && (
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {vehicle.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-gold-500" /> {f}
                  </li>
                ))}
              </ul>
            )}
            {tab === 'Vehicle History' && (
              <ul className="space-y-3">
                {vehicle.history.map((h) => (
                  <li key={h.date + h.event} className="flex gap-3">
                    <span className="font-mono text-xs text-gold-500">{h.date}</span>
                    <span>{h.event}</span>
                  </li>
                ))}
              </ul>
            )}
            {tab === 'Financing' && (
              <div>
                <p>
                  Estimated monthly payment based on a 20% down payment over 60 months at a competitive rate —
                  contact our sales team for a personalized quote.
                </p>
                <p className="mt-3 font-mono text-lg text-gold-500">
                  ~{formatKES(Math.round((vehicle.price * 0.8) / 60))}/mo
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Purchase panel */}
        <aside className="order-3 h-fit rounded-xl border border-ink-700 bg-ink-850 p-5">
          <h1 className="font-display text-2xl font-medium text-[#f2ede4]">
            {vehicle.make} {vehicle.model}
          </h1>
          <p className="mt-1 font-mono text-xl font-semibold text-gold-500">{formatKES(vehicle.price)}</p>
          <div className="mt-2 flex items-center gap-1 text-xs text-[#8f8778]">
            <Star size={13} className="fill-gold-500 text-gold-500" /> {vehicle.rating} ({vehicle.reviews} reviews)
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-[#8f8778]">
            <div className="rounded-lg border border-ink-700 py-2">{vehicle.mileageKm.toLocaleString()} km</div>
            <div className="rounded-lg border border-ink-700 py-2">{vehicle.fuel}</div>
            <div className="rounded-lg border border-ink-700 py-2">{vehicle.transmission}</div>
          </div>

          <div className="mt-5 space-y-2">
            <button
              onClick={() => setShowBuy(true)}
              className="w-full rounded-lg bg-gold-500 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-400"
            >
              Buy Vehicle
            </button>
            <button
              onClick={() => setInquiryMode('test-drive')}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-ink-600 py-2.5 text-sm font-medium text-[#f2ede4] transition-colors hover:border-gold-600"
            >
              <CalendarClock size={15} /> Book Test Drive
            </button>
            <button
              onClick={() => setInquiryMode('contact-sales')}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-ink-600 py-2.5 text-sm font-medium text-[#f2ede4] transition-colors hover:border-gold-600"
            >
              <Phone size={15} /> Contact Sales
            </button>
          </div>
          <p className="mt-3 text-center text-[11px] text-[#6f6858]">No login required to purchase</p>
        </aside>
      </div>

      {showBuy && <BuyModal vehicle={vehicle} onClose={() => setShowBuy(false)} />}
      {inquiryMode && (
        <InquiryModal vehicle={vehicle} mode={inquiryMode} onClose={() => setInquiryMode(null)} />
      )}
    </div>
  );
}