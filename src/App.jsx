import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom.css';

// Common Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sidebar';

// Student Page Components
import Dashboard from './components/dashboard/Dashboard';
import PlacementDrives from './components/placement/PlacementDrives';
import DriveDetails from './components/placement/DriveDetails';
import Internships from './components/internship/Internships';
import InternshipDetails from './components/internship/InternshipDetails';
import CRTTimetable from './components/crt/CRTTime&Table';
import SessionDetails from './components/crt/SessionDetails';

// Admin Components
import AdminLogin from './components/admin/Login';
import AdminSidebar from './components/admin/AdminSidebar';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminPlacementList from './components/admin/placement/AdminPlacement';
import AdminPlacementForm from './components/admin/placement/AdminPlacementForm';
import AdminInternshipList from './components/admin/internship/AdminInternshipList';
import AdminInternshipForm from './components/admin/internship/AdminInternshipForm';

// Admin Auth Check
const ProtectedAdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('adminAuth') === 'true';
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        {children}
      </div>
    </div>
  );
};

function App() {
  const [selectedBranch, setSelectedBranch] = useState('all');
  
  const handleBranchChange = (branch) => {
    setSelectedBranch(branch);
  };

  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={
          <ProtectedAdminRoute>
            <AdminLayout>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                
                {/* Placement Drive Management */}
                <Route path="placements" element={<AdminPlacementList />} />
                <Route path="placements/add" element={<AdminPlacementForm />} />
                <Route path="placements/edit/:id" element={<AdminPlacementForm />} />
                
                {/* Internship Management */}
                <Route path="internships" element={<AdminInternshipList />} />
                <Route path="internships/add" element={<AdminInternshipForm />} />
                <Route path="internships/edit/:id" element={<AdminInternshipForm />} />
                
                {/* Default redirect for admin routes */}
                <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
              </Routes>
            </AdminLayout>
          </ProtectedAdminRoute>
        } />
        
        {/* Student Routes */}
        <Route path="/*" element={
          <div className="app-container">
            <Header />
            <div className="main-content">
              <Sidebar />
              <div className="content-area">
                <Routes>
                  <Route path="/" element={<Dashboard selectedBranch={selectedBranch} onBranchChange={handleBranchChange} />} />
                  <Route path="/placement-drives" element={<PlacementDrives selectedBranch={selectedBranch} onBranchChange={handleBranchChange} />} />
                  <Route path="/placement-drives/:id" element={<DriveDetails />} />
                  <Route path="/internships" element={<Internships selectedBranch={selectedBranch} onBranchChange={handleBranchChange} />} />
                  <Route path="/internships/:id" element={<InternshipDetails />} />
                  <Route path="/crt-timetable" element={<CRTTimetable selectedBranch={selectedBranch} onBranchChange={handleBranchChange} />} />
                  <Route path="/crt-timetable/:id" element={<SessionDetails />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </div>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;