import { ShieldCheck, Wallet, Repeat, Lock } from 'lucide-react';

const items = [
  { icon: ShieldCheck, title: 'Verified Listings', body: 'All vehicles are thoroughly inspected and verified.' },
  { icon: Wallet, title: 'Financing Made Easy', body: 'Flexible financing options tailored to your needs.' },
  { icon: Repeat, title: 'Trade-In Accepted', body: 'Get a fair valuation for your current vehicle.' },
  { icon: Lock, title: 'Secure Transactions', body: 'Safe and transparent transactions you can trust.' },
];

export default function TrustStrip() {
  return (
    <div className="grid grid-cols-1 gap-6 border-t border-ink-700 py-10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ icon: Icon, title, body }) => (
        <div key={title} className="flex gap-3">
          <Icon className="mt-0.5 shrink-0 text-gold-500" size={20} />
          <div>
            <p className="text-sm font-semibold text-[#f2ede4]">{title}</p>
            <p className="mt-1 text-xs leading-relaxed text-[#8f8778]">{body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
