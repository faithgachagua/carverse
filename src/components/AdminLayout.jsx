import { Navigate, Outlet } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== 'admin') return <Navigate to="/dashboard" replace />;

  return (
    <div className="flex min-h-screen bg-ink-950">
      <AdminSidebar />
      <div className="flex-1 overflow-x-hidden">
        <div className="flex items-center justify-end gap-2 border-b border-ink-700 px-6 py-3">
          <span className="text-xs text-[#8f8778]">Admin</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/10 text-xs font-semibold text-gold-500">
            {currentUser.fullName?.slice(0, 1)}
          </div>
          <ChevronDown size={14} className="text-[#8f8778]" />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
