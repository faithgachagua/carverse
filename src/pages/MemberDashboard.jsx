import { Link } from 'react-router-dom';
import { MessageSquare, FileText, ListChecks, Bell, Info, CheckCircle2, Heart, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { seedConversations, notifications } from '../data/mockData';

const notifIcon = { message: Info, document: FileText, success: CheckCircle2, reaction: Heart, update: DollarSign };

export default function MemberDashboard() {
  const { currentUser } = useAuth();

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-display text-2xl font-medium text-[#f2ede4]">
        Welcome back, {currentUser?.fullName?.split(' ')[0] || 'there'}!
      </h1>
      <p className="mt-1 text-sm text-[#8f8778]">Here's what's happening with your account.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={MessageSquare} value="12" label="Active Conversations" />
        <StatCard icon={Bell} value="8" label="Unread Messages" />
        <StatCard icon={FileText} value="5" label="New Documents" />
        <StatCard icon={ListChecks} value="3" label="Vehicle Listings" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-ink-700 bg-ink-850 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg text-[#f2ede4]">Recent Conversations</h2>
            <Link to="/dashboard/messages" className="text-xs font-medium text-gold-500 hover:underline">View All</Link>
          </div>
          <div className="space-y-1">
            {seedConversations.map((c) => (
              <Link
                key={c.id}
                to="/dashboard/messages"
                className="flex items-center justify-between rounded-lg px-2 py-2.5 transition-colors hover:bg-ink-800"
              >
                <div>
                  <p className="text-sm font-medium text-[#f2ede4]">{c.withName}</p>
                  <p className="text-xs text-[#8f8778]">Last message: {c.lastMessage}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#6f6858]">{c.time}</span>
                  {c.unread > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-ink-950">
                      {c.unread}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-ink-700 bg-ink-850 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg text-[#f2ede4]">Notifications</h2>
            <Link to="/dashboard/notifications" className="text-xs font-medium text-gold-500 hover:underline">View All</Link>
          </div>
          <div className="space-y-1">
            {notifications.map((n) => {
              const Icon = notifIcon[n.type] || Info;
              return (
                <div key={n.text} className="flex items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-ink-800">
                  <Icon size={15} className="mt-0.5 shrink-0 text-gold-500" />
                  <div>
                    <p className="text-sm text-[#f2ede4]">{n.text}</p>
                    <p className="text-[11px] text-[#6f6858]">{n.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="rounded-xl border border-ink-700 bg-ink-850 p-4">
      <Icon className="text-gold-500" size={20} />
      <p className="mt-3 font-display text-2xl font-semibold text-[#f2ede4]">{value}</p>
      <p className="text-xs text-[#8f8778]">{label}</p>
    </div>
  );
}
