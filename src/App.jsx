import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
import { ListingsProvider } from './context/ListingsContext';

import PublicLayout from './components/PublicLayout';
import MemberLayout from './components/MemberLayout';
import AdminLayout from './components/AdminLayout';
import PlaceholderPage from './components/PlaceholderPage';
import NavDrawer from './components/NavDrawer';

import Home from './pages/Home';
import Inventory from './pages/Inventory';
import VehicleDetails from './pages/VehicleDetails';
import SellCar from './pages/SellCar';
import OwnerListings from './pages/OwnerListings';
import Login from './pages/Login';
import RequestMembership from './pages/RequestMembership';
import RequestStatus from './pages/RequestStatus';

import MemberDashboard from './pages/MemberDashboard';
import Chat from './pages/Chat';
import MemberDocuments from './pages/MemberDocuments';
import MemberListings from './pages/MemberListings';
import MemberNotifications from './pages/MemberNotifications';
import MemberProfile from './pages/MemberProfile';
import MemberSettings from './pages/MemberSettings';

import AdminDashboard from './pages/AdminDashboard';
import AdminMemberRequests from './pages/AdminMemberRequests';
import AdminUsers from './pages/AdminUsers';
import AdminVehicles from './pages/AdminVehicles';
import AdminSellListings from './pages/AdminSellListings';

export default function App() {
  return (
    <AuthProvider>
      <ListingsProvider>
      <BrowserRouter>
        <NavDrawer />
        <Routes>
          {/* Public / visitor routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/:id" element={<VehicleDetails />} />
            <Route
              path="/financing"
              element={<PlaceholderPage title="Financing" description="Flexible financing options tailored to your needs." icon={Wallet} />}
            />
            <Route path="/sell" element={<SellCar />} />
            <Route path="/owner-listings" element={<OwnerListings />} />
          </Route>

          {/* Auth flow — no navbar/footer chrome */}
          <Route path="/login" element={<Login />} />
          <Route path="/request-membership" element={<RequestMembership />} />
          <Route path="/request-status" element={<RequestStatus />} />

          {/* Member dashboard */}
          <Route path="/dashboard" element={<MemberLayout />}>
            <Route index element={<MemberDashboard />} />
            <Route path="vehicles" element={<Inventory />} />
            <Route path="messages" element={<Chat />} />
            <Route path="documents" element={<MemberDocuments />} />
            <Route path="listings" element={<MemberListings />} />
            <Route path="notifications" element={<MemberNotifications />} />
            <Route path="profile" element={<MemberProfile />} />
            <Route path="settings" element={<MemberSettings />} />
          </Route>

          {/* Admin dashboard */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="requests" element={<AdminMemberRequests />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="vehicles" element={<AdminVehicles />} />
            <Route path="listings" element={<AdminSellListings />} />
            <Route path="conversations" element={<PlaceholderPage title="Conversations" description="Monitor buyer–seller conversations across the platform." />} />
            <Route path="reports" element={<PlaceholderPage title="Reports" description="Sales and engagement analytics." />} />
            <Route path="settings" element={<PlaceholderPage title="Settings" description="Platform configuration." />} />
          </Route>

          <Route path="*" element={<PlaceholderPage title="Page not found" description="The page you're looking for doesn't exist." />} />
        </Routes>
      </BrowserRouter>
      </ListingsProvider>
    </AuthProvider>
  );
}