import { useAuth } from '../context/AuthContext';

export default function MemberProfile() {
  const { currentUser } = useAuth();

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-display text-2xl font-medium text-[#f2ede4]">Profile</h1>
      <p className="mt-1 text-sm text-[#8f8778]">Your account information.</p>

      <div className="mt-6 max-w-lg rounded-xl border border-ink-700 bg-ink-850 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/10 text-xl font-semibold text-gold-500">
            {currentUser?.fullName?.slice(0, 1) || 'U'}
          </div>
          <div>
            <p className="font-display text-lg text-[#f2ede4]">{currentUser?.fullName}</p>
            <p className="text-xs text-[#8f8778]">Member since {currentUser?.joined || '—'}</p>
          </div>
        </div>

        <dl className="mt-6 space-y-3 text-sm">
          <Row label="Username" value={currentUser?.username} />
          <Row label="Email" value={currentUser?.email} />
          <Row label="Phone" value={currentUser?.phone || '—'} />
          <Row label="Status" value={<span className="capitalize text-gold-500">{currentUser?.status}</span>} />
        </dl>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-ink-700 pb-3">
      <dt className="text-[#8f8778]">{label}</dt>
      <dd className="text-[#f2ede4]">{value}</dd>
    </div>
  );
}
