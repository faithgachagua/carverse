import { useState } from 'react';
import { Check, X, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminMemberRequests() {
  const { requests, approveRequest, rejectRequest } = useAuth();
  const [filter, setFilter] = useState('pending');
  const [viewing, setViewing] = useState(null);

  const filtered = requests.filter((r) => filter === 'all' || r.status === filter);
  const pendingCount = requests.filter((r) => r.status === 'pending').length;

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-display text-2xl font-medium text-[#f2ede4]">Member Requests</h1>
      <p className="mt-1 text-sm text-[#8f8778]">{pendingCount} pending requests</p>

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

      <div className="mt-5 overflow-hidden rounded-xl border border-ink-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-850 text-xs uppercase tracking-wide text-[#8f8778]">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Username</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Submitted</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-ink-700 hover:bg-ink-850">
                <td className="px-4 py-3 text-[#f2ede4]">{r.fullName}</td>
                <td className="px-4 py-3 text-[#8f8778]">{r.username}</td>
                <td className="px-4 py-3 text-[#8f8778]">{r.email}</td>
                <td className="px-4 py-3 text-[#8f8778]">{r.submitted}</td>
                <td className="px-4 py-3">
                  <StatusPill status={r.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {r.status === 'pending' && (
                      <>
                        <button
                          onClick={() => approveRequest(r.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-md bg-gold-500/10 text-gold-500 hover:bg-gold-500 hover:text-ink-950"
                          aria-label="Approve"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={() => rejectRequest(r.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-md bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-ink-950"
                          aria-label="Reject"
                        >
                          <X size={14} />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setViewing(r)}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-[#8f8778] hover:text-[#f2ede4]"
                      aria-label="View details"
                    >
                      <Eye size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-[#8f8778]">No requests in this category.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setViewing(null)}>
          <div className="w-full max-w-md rounded-xl border border-ink-700 bg-ink-850 p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-xl text-[#f2ede4]">{viewing.fullName}</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <Row label="Username" value={viewing.username} />
              <Row label="Email" value={viewing.email} />
              <Row label="Phone" value={viewing.phone} />
              <Row label="Referral" value={viewing.referral || '—'} />
              <Row label="Status" value={<StatusPill status={viewing.status} />} />
            </dl>
            <div>
              <p className="mt-4 text-xs font-medium text-[#8f8778]">Reason for joining</p>
              <p className="mt-1 text-sm text-[#c9c2b4]">{viewing.reason}</p>
            </div>
            <button
              onClick={() => setViewing(null)}
              className="mt-5 w-full rounded-lg border border-ink-600 py-2 text-sm font-medium text-[#f2ede4] hover:border-gold-600"
            >
              Close
            </button>
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
  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${styles[status]}`}>{status}</span>;
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-ink-700 pb-2">
      <dt className="text-[#8f8778]">{label}</dt>
      <dd className="text-[#f2ede4]">{value}</dd>
    </div>
  );
}
