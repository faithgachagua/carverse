import { Link } from 'react-router-dom';
import { UserCheck, Users, Car, MessageSquare, Check, X, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { vehicles } from '../data/mockData';

export default function AdminDashboard() {
  const { pendingRequests, users, approveRequest, rejectRequest } = useAuth();
  const memberCount = users.filter((u) => u.role === 'member' && u.status === 'approved').length;

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-display text-2xl font-medium text-[#f2ede4]">Admin Dashboard</h1>
      <p className="mt-1 text-sm text-[#8f8778]">Overview of Carverse membership and inventory.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={UserCheck} value={pendingRequests.length} label="Pending Requests" accent />
        <StatCard icon={Users} value={memberCount} label="Active Members" />
        <StatCard icon={Car} value={vehicles.length} label="Vehicles Listed" />
        <StatCard icon={MessageSquare} value="27" label="Open Conversations" />
      </div>

      <div className="mt-8 rounded-xl border border-ink-700 bg-ink-850 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg text-[#f2ede4]">Member Requests</h2>
          <Link to="/admin/requests" className="text-xs font-medium text-gold-500 hover:underline">View All</Link>
        </div>
        <div className="space-y-1">
          {pendingRequests.slice(0, 4).map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-lg px-2 py-2.5 hover:bg-ink-800">
              <div>
                <p className="text-sm font-medium text-[#f2ede4]">{r.fullName}</p>
                <p className="text-xs text-[#8f8778]">{r.email} · Submitted {r.submitted}</p>
              </div>
              <div className="flex items-center gap-2">
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
                <Link to="/admin/requests" className="flex h-7 w-7 items-center justify-center rounded-md text-[#8f8778] hover:text-[#f2ede4]">
                  <Eye size={14} />
                </Link>
              </div>
            </div>
          ))}
          {pendingRequests.length === 0 && (
            <p className="px-2 py-4 text-sm text-[#8f8778]">No pending requests right now.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, accent }) {
  return (
    <div className={`rounded-xl border p-4 ${accent ? 'border-gold-700/50 bg-gold-500/5' : 'border-ink-700 bg-ink-850'}`}>
      <Icon className="text-gold-500" size={20} />
      <p className="mt-3 font-display text-2xl font-semibold text-[#f2ede4]">{value}</p>
      <p className="text-xs text-[#8f8778]">{label}</p>
    </div>
  );
}
