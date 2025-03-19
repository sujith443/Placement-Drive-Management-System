// src/components/admin/AdminSidebar.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path) => {
    return location.pathname.startsWith(path) ? 'active' : '';
  };
  
  const handleLogout = () => {
    // Clear admin auth from localStorage
    localStorage.removeItem('adminAuth');
    // Redirect to login page
    navigate('/admin/login');
  };
  
  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h3>Admin Panel</h3>
      </div>
      
      <div className="sidebar-content">
        <ul className="admin-menu">
          <li className={isActive('/admin/dashboard')}>
            <Link to="/admin/dashboard">
              <i className="bi bi-speedometer2"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          
          <li className="menu-header">Placement Management</li>
          
          <li className={isActive('/admin/placements')}>
            <Link to="/admin/placements">
              <i className="bi bi-briefcase"></i>
              <span>Placement Drives</span>
            </Link>
          </li>
          
          <li className={isActive('/admin/internships')}>
            <Link to="/admin/internships">
              <i className="bi bi-journal-text"></i>
              <span>Internships</span>
            </Link>
          </li>
          
          <li className={isActive('/admin/crt')}>
            <Link to="/admin/crt">
              <i className="bi bi-calendar-check"></i>
              <span>CRT Sessions</span>
            </Link>
          </li>
          
          <li className="menu-header">Administration</li>
          
          <li className={isActive('/admin/students')}>
            <Link to="/admin/students">
              <i className="bi bi-people"></i>
              <span>Students</span>
            </Link>
          </li>
          
          <li className={isActive('/admin/companies')}>
            <Link to="/admin/companies">
              <i className="bi bi-building"></i>
              <span>Companies</span>
            </Link>
          </li>
          
          <li className={isActive('/admin/settings')}>
            <Link to="/admin/settings">
              <i className="bi bi-gear"></i>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="sidebar-footer">
        <Button 
          variant="outline-light" 
          className="logout-btn" 
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;