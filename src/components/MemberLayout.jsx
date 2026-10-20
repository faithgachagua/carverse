import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MemberSidebar from './MemberSidebar';

export default function MemberLayout() {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role === 'admin') return <Navigate to="/admin" replace />;

  return (
    <div className="flex min-h-screen bg-ink-950">
      <MemberSidebar />
      <div className="flex-1 overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
}
