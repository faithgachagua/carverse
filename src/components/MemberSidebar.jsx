import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Car, MessageSquare, FileText, ListChecks, Bell, User, Settings, LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/dashboard/vehicles', label: 'Vehicles', icon: Car },
  { to: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
  { to: '/dashboard/documents', label: 'Documents', icon: FileText },
  { to: '/dashboard/listings', label: 'My Listings', icon: ListChecks },
  { to: '/dashboard/notifications', label: 'Notifications', icon: Bell },
  { to: '/dashboard/profile', label: 'Profile', icon: User },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function MemberSidebar() {
  const { logout } = useAuth();
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
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-gold-500/10 text-gold-500' : 'text-[#8f8778] hover:bg-ink-800 hover:text-[#f2ede4]'
              }`
            }
          >
            <l.icon size={17} /> {l.label}
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
        <LogOut size={17} /> Logout
      </button>
    </aside>
  );
}
