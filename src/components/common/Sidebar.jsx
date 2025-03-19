// src/components/common/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };
  
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <ul className="sidebar-menu">
          <li className={isActive('/')}>
            <Link to="/">
              <i className="bi bi-speedometer2"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={isActive('/placement-drives')}>
            <Link to="/placement-drives">
              <i className="bi bi-briefcase"></i>
              <span>Placement Drives</span>
            </Link>
          </li>
          <li className={isActive('/internships')}>
            <Link to="/internships">
              <i className="bi bi-journal-text"></i>
              <span>Internships</span>
            </Link>
          </li>
          <li className={isActive('/crt-timetable')}>
            <Link to="/crt-timetable">
              <i className="bi bi-calendar-check"></i>
              <span>CRT Schedule</span>
            </Link>
          </li>
          <li className={isActive('/admin/login')}>
            <Link to="/admin/login">
              <i className="bi bi-calendar-check"></i>
              <span>Admin Login</span>
            </Link>
          </li>
        </ul>
        
        <div className="sidebar-footer">
          <div className="placement-stats">
            <h6>Placement Stats</h6>
            <div className="stat-item">
              <span className="stat-label">Ongoing Drives:</span>
              <span className="stat-value">5</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Upcoming Drives:</span>
              <span className="stat-value">8</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Students Placed:</span>
              <span className="stat-value">186</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;