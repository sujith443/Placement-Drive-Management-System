// src/components/dashboard/Dashboard.js
import React from 'react';
import { Container, Row, Col, Card, Carousel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BranchFilter from '../common/BranchFilter';
import Stats from './Stats';
import RecentActivity from './RecentActivity';
import { placementDrives } from '../../data/placementDrives';
import { internships } from '../../data/internship';
import { crtData } from '../../data/crtData';

const Dashboard = ({ selectedBranch, onBranchChange }) => {
  // Filter data based on selected branch
  const filteredDrives = selectedBranch === 'all' 
    ? placementDrives.slice(0, 3)
    : placementDrives
        .filter(drive => drive.eligibility.branches.includes(selectedBranch))
        .slice(0, 3);
  
  const filteredInternships = selectedBranch === 'all'
    ? internships.slice(0, 3)
    : internships
        .filter(internship => internship.eligibility.branches.includes(selectedBranch))
        .slice(0, 3);
  
  const filteredSessions = selectedBranch === 'all'
    ? crtData.slice(0, 3)
    : crtData
        .filter(session => session.eligibility.branches.includes(selectedBranch) || 
                session.eligibility.branches.includes('All Branches'))
        .slice(0, 3);

  return (
    <div className="dashboard-container">
      <Container fluid>
        <div className="dashboard-header">
          <h1>Campus Placement Portal</h1>
          <BranchFilter selectedBranch={selectedBranch} onBranchChange={onBranchChange} />
        </div>
        
        <Row className="mb-4">
          <Col>
            <Carousel className="dashboard-carousel">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/assets/images/carousel/slide1.jpg"
                  alt="Placement Drive"
                />
                <Carousel.Caption>
                  <h3>Upcoming Placement Drives</h3>
                  <p>Get ready for top companies visiting our campus</p>
                  <Button as={Link} to="/placement-drives" variant="primary">View Drives</Button>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/assets/images/carousel/slide2.jpg"
                  alt="Internship Opportunities"
                />
                <Carousel.Caption>
                  <h3>Internship Opportunities</h3>
                  <p>Explore internships with leading organizations</p>
                  <Button as={Link} to="/internships" variant="primary">Browse Internships</Button>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/assets/images/carousel/slide3.jpg"
                  alt="CRT Sessions"
                />
                <Carousel.Caption>
                  <h3>CRT Sessions</h3>
                  <p>Prepare for placements with our specialized training sessions</p>
                  <Button as={Link} to="/crt-timetable" variant="primary">Check Schedule</Button>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
        
        <Stats />
        
        <Row className="mb-4">
          <Col md={4}>
            <Card className="dashboard-card">
              <Card.Header>
                <h5>Latest Placement Drives</h5>
                <Link to="/placement-drives" className="view-all">View All</Link>
              </Card.Header>
              <Card.Body>
                {filteredDrives.length > 0 ? (
                  filteredDrives.map(drive => (
                    <div key={drive.id} className="dashboard-item">
                      <div className="item-header">
                        <img src={drive.logo} alt={drive.company} className="company-logo" />
                        <div>
                          <h6>{drive.company}</h6>
                          <p className="text-muted">{drive.position}</p>
                        </div>
                      </div>
                      <div className="item-details">
                        <span className="badge bg-primary">{drive.package.ctc}</span>
                        <span className={`badge ${drive.status === 'Active' ? 'bg-success' : drive.status === 'Upcoming' ? 'bg-warning' : 'bg-secondary'}`}>
                          {drive.status}
                        </span>
                      </div>
                      <Link to={`/placement-drives/${drive.id}`} className="stretched-link"></Link>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted">No placement drives available for your branch</p>
                )}
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="dashboard-card">
              <Card.Header>
                <h5>Latest Internships</h5>
                <Link to="/internships" className="view-all">View All</Link>
              </Card.Header>
              <Card.Body>
                {filteredInternships.length > 0 ? (
                  filteredInternships.map(internship => (
                    <div key={internship.id} className="dashboard-item">
                      <div className="item-header">
                        <img src={internship.logo} alt={internship.company} className="company-logo" />
                        <div>
                          <h6>{internship.company}</h6>
                          <p className="text-muted">{internship.position}</p>
                        </div>
                      </div>
                      <div className="item-details">
                        <span className="badge bg-info">{internship.duration}</span>
                        <span className={`badge ${internship.status === 'Open' ? 'bg-success' : internship.status === 'Upcoming' ? 'bg-warning' : 'bg-secondary'}`}>
                          {internship.status}
                        </span>
                      </div>
                      <Link to={`/internships/${internship.id}`} className="stretched-link"></Link>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted">No internships available for your branch</p>
                )}
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="dashboard-card">
              <Card.Header>
                <h5>Upcoming CRT Sessions</h5>
                <Link to="/crt-timetable" className="view-all">View All</Link>
              </Card.Header>
              <Card.Body>
                {filteredSessions.length > 0 ? (
                  filteredSessions.map(session => (
                    <div key={session.id} className="dashboard-item">
                      <div className="item-header">
                        <div className="session-icon">
                          <i className="bi bi-calendar-event"></i>
                        </div>
                        <div>
                          <h6>{session.title}</h6>
                          <p className="text-muted">{new Date(session.date).toLocaleDateString()}, {session.time}</p>
                        </div>
                      </div>
                      <div className="item-details">
                        <span className="badge bg-primary">{session.venue}</span>
                      </div>
                      <Link to={`/crt-timetable/${session.id}`} className="stretched-link"></Link>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted">No CRT sessions available for your branch</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <RecentActivity />
      </Container>
    </div>
  );
};

export default Dashboard;