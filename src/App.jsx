import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom.css';

// Common Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sidebar';

// Page Components
import Dashboard from './components/dashboard/Dashboard';
import PlacementDrives from './components/placement/PlacementDrives';
import DriveDetails from './components/placement/DriveDetails';
import Internships from './components/internship/Internships.jsx';
import InternshipDetails from './components/internship/InternshipDetails';
import CRTTimetable from './components/crt/CRTTime&Table.jsx';
import SessionDetails from './components/crt/SessionDetails';

function App() {
  const [selectedBranch, setSelectedBranch] = useState('all');
  
  const handleBranchChange = (branch) => {
    setSelectedBranch(branch);
  };

  return (
    <Router>
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
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;