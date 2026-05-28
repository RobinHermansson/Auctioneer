import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Auction from './pages/Auction/Auction';
import Home from './pages/Home/Home';
import CreateAuction from './pages/CreateAuction/CreateAuction';
import MyDetails from './pages/MyDetails/MyDetails';
import EditAuction from './pages/EditAuction/EditAuction';
import UserManagement from './pages/UserManagement/UserManagement';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);


  return (
    <div className={`app-layout ${isCollapsed ? "sidebar-collapsed" : "sidebar-expanded"}`}>
      <NavBar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auction/:auctionId" element={<Auction />} />

            {/* Requires login */}
            <Route path="/create-auction" element={
                <ProtectedRoute><CreateAuction /></ProtectedRoute>
            } />
            <Route path="/my-details" element={
                <ProtectedRoute><MyDetails /></ProtectedRoute>
            } />
            <Route path="/auction/edit/:auctionId" element={
                <ProtectedRoute><EditAuction /></ProtectedRoute>
            } />

            {/* Requires admin */}
            <Route path="/admin/users" element={
                <ProtectedRoute requireAdmin><UserManagement /></ProtectedRoute>
            } /> 
          </Routes>
      </main>
    </div>
  )
}

export default App
