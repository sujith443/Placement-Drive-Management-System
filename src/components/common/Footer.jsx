// src/components/common/Footer.js
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Campus Placement Portal</h5>
            <p className="small">Helping BTech students connect with top companies</p>
          </div>
          <div className="col-md-3">
            <h6>Quick Links</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="/">Dashboard</a></li>
              <li><a href="/placement-drives">Placement Drives</a></li>
              <li><a href="/internships">Internships</a></li>
              <li><a href="/crt-timetable">CRT Schedule</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6>Contact</h6>
            <p className="small">Placement Cell<br />Email: placements@college.ac.in<br />Phone: +91 98765 43210</p>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="text-center">
          <p className="small mb-0">&copy; {currentYear} Campus Placement Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;