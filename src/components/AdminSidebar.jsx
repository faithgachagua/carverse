import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UserCheck, Users, Car, ListChecks, MessageSquare, BarChart2, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/requests', label: 'Member Requests', icon: UserCheck, badge: true },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/vehicles', label: 'Vehicles', icon: Car },
  { to: '/admin/listings', label: 'Listings', icon: ListChecks },
  { to: '/admin/conversations', label: 'Conversations', icon: MessageSquare },
  { to: '/admin/reports', label: 'Reports', icon: BarChart2 },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
  const { logout, pendingRequests } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-ink-700 bg-ink-900 p-5">
      <Logo />
      <nav className="mt-8 flex-1 space-y-1">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              `flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-gold-500/10 text-gold-500' : 'text-[#8f8778] hover:bg-ink-800 hover:text-[#f2ede4]'
              }`
            }
          >
            <span className="flex items-center gap-3"><l.icon size={17} /> {l.label}</span>
            {l.badge && pendingRequests.length > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-ink-950">
                {pendingRequests.length}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
      <button
        onClick={() => {
          logout();
          navigate('/');
        }}
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#8f8778] transition-colors hover:bg-ink-800 hover:text-[#f2ede4]"
      >
        <LogOut size={17} /> Log Out
      </button>
    </aside>
  );
}
