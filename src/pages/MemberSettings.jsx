import { useState } from 'react';

export default function MemberSettings() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-display text-2xl font-medium text-[#f2ede4]">Settings</h1>
      <p className="mt-1 text-sm text-[#8f8778]">Manage how Carverse contacts you.</p>

      <div className="mt-6 max-w-lg space-y-4 rounded-xl border border-ink-700 bg-ink-850 p-6">
        <Toggle label="Email notifications" sub="Get updates about your listings and messages by email" checked={emailNotifs} onChange={setEmailNotifs} />
        <Toggle label="SMS notifications" sub="Get urgent updates by text message" checked={smsNotifs} onChange={setSmsNotifs} />
      </div>
    </div>
  );
}

function Toggle({ label, sub, checked, onChange }) {
  return (
    <div className="flex items-center justify-between border-b border-ink-700 pb-4 last:border-0 last:pb-0">
      <div>
        <p className="text-sm font-medium text-[#f2ede4]">{label}</p>
        <p className="text-xs text-[#8f8778]">{sub}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? 'bg-gold-500' : 'bg-ink-600'}`}
      >
        <span className={`block h-5 w-5 translate-y-0.5 rounded-full bg-ink-950 transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  );
}
