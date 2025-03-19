// src/components/admin/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { placementDrives } from '../../data/placementDrives';
import { internships } from '../../data/internship';
import { crtData } from '../../data/crtData';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Check if admin is authenticated
  useEffect(() => {
    const isAdmin = localStorage.getItem('adminAuth') === 'true';
    if (!isAdmin) {
      navigate('/admin/login');
    } else {
      setLoading(false);
    }
  }, [navigate]);
  
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  // Count statuses for placements
  const activePlacements = placementDrives.filter(drive => drive.status === 'Active').length;
  const upcomingPlacements = placementDrives.filter(drive => drive.status === 'Upcoming').length;
  const closedPlacements = placementDrives.filter(drive => drive.status === 'Closed').length;
  
  // Count statuses for internships
  const openInternships = internships.filter(internship => internship.status === 'Open').length;
  const upcomingInternships = internships.filter(internship => internship.status === 'Upcoming').length;
  const closedInternships = internships.filter(internship => internship.status === 'Closed').length;
  
  // Count upcoming CRT sessions
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingSessions = crtData.filter(session => new Date(session.date) >= today).length;
  const pastSessions = crtData.filter(session => new Date(session.date) < today).length;
  
  // Recent updates for activity feed
  const recentUpdates = [
    { id: 1, type: 'placement', text: 'Added new Microsoft placement drive', time: '1 hour ago' },
    { id: 2, type: 'internship', text: 'Updated Amazon internship details', time: '3 hours ago' },
    { id: 3, type: 'crt', text: 'Modified Resume Building Workshop schedule', time: '1 day ago' },
    { id: 4, type: 'placement', text: 'Closed Google placement drive registrations', time: '2 days ago' }
  ];
  
  return (
    <Container fluid className="admin-dashboard py-4">
      <h2 className="admin-page-title mb-4">Admin Dashboard</h2>
      
      <Row className="mb-4">
        <Col md={3}>
          <Card className="admin-stat-card border-primary">
            <Card.Body>
              <div className="stat-icon bg-primary">
                <i className="bi bi-briefcase-fill"></i>
              </div>
              <div className="stat-content">
                <h3>{placementDrives.length}</h3>
                <p>Total Placement Drives</p>
                <div className="stat-details">
                  <span className="text-success">{activePlacements} Active</span> | 
                  <span className="text-warning"> {upcomingPlacements} Upcoming</span> | 
                  <span className="text-secondary"> {closedPlacements} Closed</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="admin-stat-card border-info">
            <Card.Body>
              <div className="stat-icon bg-info">
                <i className="bi bi-journal-text"></i>
              </div>
              <div className="stat-content">
                <h3>{internships.length}</h3>
                <p>Total Internships</p>
                <div className="stat-details">
                  <span className="text-success">{openInternships} Open</span> | 
                  <span className="text-warning"> {upcomingInternships} Upcoming</span> | 
                  <span className="text-secondary"> {closedInternships} Closed</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="admin-stat-card border-warning">
            <Card.Body>
              <div className="stat-icon bg-warning">
                <i className="bi bi-calendar-check-fill"></i>
              </div>
              <div className="stat-content">
                <h3>{crtData.length}</h3>
                <p>Total CRT Sessions</p>
                <div className="stat-details">
                  <span className="text-primary">{upcomingSessions} Upcoming</span> | 
                  <span className="text-secondary"> {pastSessions} Past</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="admin-stat-card border-success">
            <Card.Body>
              <div className="stat-icon bg-success">
                <i className="bi bi-person-check-fill"></i>
              </div>
              <div className="stat-content">
                <h3>186</h3>
                <p>Students Placed</p>
                <div className="stat-details">
                  <span className="text-primary">68% Placement Rate</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={8}>
          <Card className="admin-quick-actions mb-4">
            <Card.Header>
              <h5>Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={4} className="mb-3">
                  <Card 
                    className="action-card" 
                    onClick={() => navigate('/admin/placements/add')}
                  >
                    <Card.Body className="text-center">
                      <div className="action-icon bg-primary">
                        <i className="bi bi-plus-circle-fill"></i>
                      </div>
                      <h6>Add Placement Drive</h6>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col sm={4} className="mb-3">
                  <Card 
                    className="action-card" 
                    onClick={() => navigate('/admin/internships/add')}
                  >
                    <Card.Body className="text-center">
                      <div className="action-icon bg-info">
                        <i className="bi bi-plus-circle-fill"></i>
                      </div>
                      <h6>Add Internship</h6>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col sm={4} className="mb-3">
                  <Card 
                    className="action-card" 
                    onClick={() => navigate('/admin/crt/add')}
                  >
                    <Card.Body className="text-center">
                      <div className="action-icon bg-warning">
                        <i className="bi bi-plus-circle-fill"></i>
                      </div>
                      <h6>Add CRT Session</h6>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col sm={4} className="mb-3">
                  <Card 
                    className="action-card" 
                    onClick={() => navigate('/admin/placements')}
                  >
                    <Card.Body className="text-center">
                      <div className="action-icon bg-secondary">
                        <i className="bi bi-gear-fill"></i>
                      </div>
                      <h6>Manage Placements</h6>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col sm={4} className="mb-3">
                  <Card 
                    className="action-card" 
                    onClick={() => navigate('/admin/internships')}
                  >
                    <Card.Body className="text-center">
                      <div className="action-icon bg-secondary">
                        <i className="bi bi-gear-fill"></i>
                      </div>
                      <h6>Manage Internships</h6>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col sm={4} className="mb-3">
                  <Card 
                    className="action-card" 
                    onClick={() => navigate('/admin/crt')}
                  >
                    <Card.Body className="text-center">
                      <div className="action-icon bg-secondary">
                        <i className="bi bi-gear-fill"></i>
                      </div>
                      <h6>Manage CRT Sessions</h6>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          
          <Card className="admin-recent-applications">
            <Card.Header>
              <h5>Recent Student Applications</h5>
            </Card.Header>
            <Card.Body>
              <table className="table table-hover application-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Applied For</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Rahul Sharma</td>
                    <td>Microsoft - SDE</td>
                    <td>Mar 15, 2025</td>
                    <td><span className="badge bg-warning">Pending</span></td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-1">
                        <i className="bi bi-eye-fill"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-success">
                        <i className="bi bi-check-circle-fill"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Priya Patel</td>
                    <td>Google - SDE</td>
                    <td>Mar 14, 2025</td>
                    <td><span className="badge bg-success">Shortlisted</span></td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-1">
                        <i className="bi bi-eye-fill"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-info">
                        <i className="bi bi-envelope-fill"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Arjun Kumar</td>
                    <td>Amazon - Intern</td>
                    <td>Mar 13, 2025</td>
                    <td><span className="badge bg-danger">Rejected</span></td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-1">
                        <i className="bi bi-eye-fill"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-info">
                        <i className="bi bi-envelope-fill"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Neha Singh</td>
                    <td>TCS - Digital</td>
                    <td>Mar 12, 2025</td>
                    <td><span className="badge bg-success">Shortlisted</span></td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-1">
                        <i className="bi bi-eye-fill"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-info">
                        <i className="bi bi-envelope-fill"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="admin-activity-feed mb-4">
            <Card.Header>
              <h5>Recent Activity</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="admin-timeline">
                {recentUpdates.map(update => (
                  <div key={update.id} className="timeline-item">
                    <div className={`timeline-icon ${
                      update.type === 'placement' ? 'bg-primary' :
                      update.type === 'internship' ? 'bg-info' : 'bg-warning'
                    }`}>
                      <i className={`bi ${
                        update.type === 'placement' ? 'bi-briefcase-fill' :
                        update.type === 'internship' ? 'bi-journal-text' : 'bi-calendar-check-fill'
                      }`}></i>
                    </div>
                    <div className="timeline-content">
                      <p>{update.text}</p>
                      <span className="timeline-time">{update.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
          
          <Card className="admin-calendar">
            <Card.Header>
              <h5>Upcoming Events</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <ul className="event-list">
                <li className="event-item">
                  <div className="event-date">
                    <span className="date">25</span>
                    <span className="month">Mar</span>
                  </div>
                  <div className="event-content">
                    <h6>Advanced DSA Session</h6>
                    <p>10:00 AM - 12:00 PM</p>
                    <span className="badge bg-primary">CRT</span>
                  </div>
                </li>
                <li className="event-item">
                  <div className="event-date">
                    <span className="date">27</span>
                    <span className="month">Mar</span>
                  </div>
                  <div className="event-content">
                    <h6>Resume Building Workshop</h6>
                    <p>2:00 PM - 4:00 PM</p>
                    <span className="badge bg-primary">CRT</span>
                  </div>
                </li>
                <li className="event-item">
                  <div className="event-date">
                    <span className="date">30</span>
                    <span className="month">Mar</span>
                  </div>
                  <div className="event-content">
                    <h6>Microsoft Drive</h6>
                    <p>9:00 AM onwards</p>
                    <span className="badge bg-success">Placement</span>
                  </div>
                </li>
                <li className="event-item">
                  <div className="event-date">
                    <span className="date">5</span>
                    <span className="month">Apr</span>
                  </div>
                  <div className="event-content">
                    <h6>Google Drive</h6>
                    <p>10:00 AM onwards</p>
                    <span className="badge bg-success">Placement</span>
                  </div>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;