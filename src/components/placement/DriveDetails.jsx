// src/components/placement/DriveDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Alert } from 'react-bootstrap';
import { placementDrives } from '../../data/placementDrives';

const DriveDetails = () => {
  const { id } = useParams();
  const [drive, setDrive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Simulating API fetch with timeout
    const timeout = setTimeout(() => {
      const foundDrive = placementDrives.find(d => d.id === parseInt(id));
      
      if (foundDrive) {
        setDrive(foundDrive);
      } else {
        setError('Placement drive not found');
      }
      
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [id]);
  
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading drive details...</p>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error!</Alert.Heading>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button as={Link} to="/placement-drives" variant="outline-danger">
              Back to Placement Drives
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }
  
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const statusColor = drive.status === 'Active' 
    ? 'success' 
    : drive.status === 'Upcoming' 
      ? 'warning' 
      : 'secondary';
  
  const isApplicationOpen = new Date(drive.lastDateToApply) >= new Date();
  
  return (
    <Container className="drive-details-container py-4">
      <div className="mb-4">
        <Link to="/placement-drives" className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-arrow-left"></i> Back to Drives
        </Link>
      </div>
      
      <Card className="drive-details-card">
        <Card.Header className="company-header">
          <Row className="align-items-center">
            <Col md={2} className="text-center">
              <img src={drive.logo} alt={drive.company} className="company-logo-lg" />
            </Col>
            <Col md={8}>
              <h3>{drive.company}</h3>
              <h5 className="text-muted">{drive.position}</h5>
              <div className="location">
                <i className="bi bi-geo-alt"></i>
                <span>{drive.location}</span>
              </div>
            </Col>
            <Col md={2} className="text-md-end">
              <Badge bg={statusColor} className="status-badge">
                {drive.status}
              </Badge>
            </Col>
          </Row>
        </Card.Header>
        
        <Card.Body>
          <Row>
            <Col md={8}>
              <div className="drive-description mb-4">
                <h5>About this Opportunity</h5>
                <p>{drive.description}</p>
              </div>
              
              <div className="drive-process mb-4">
                <h5>Selection Process</h5>
                <ol className="process-steps">
                  {drive.process.map((step, index) => (
                    <li key={index} className="process-step">
                      <div className="step-number">{index + 1}</div>
                      <div className="step-content">{step}</div>
                    </li>
                  ))}
                </ol>
              </div>
              
              <div className="skills-required mb-4">
                <h5>Required Skills</h5>
                <div className="skill-tags">
                  {drive.skills.map((skill, index) => (
                    <Badge key={index} bg="primary" className="me-2 mb-2 skill-badge">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Col>
            
            <Col md={4}>
              <Card className="package-card mb-4">
                <Card.Header>
                  <h5>Package Details</h5>
                </Card.Header>
                <Card.Body>
                  <div className="package-amount">
                    <span className="currency">₹</span>
                    <span className="amount">{drive.package.ctc}</span>
                  </div>
                  <div className="package-breakup">
                    <p>{drive.package.breakup}</p>
                  </div>
                </Card.Body>
              </Card>
              
              <Card className="eligibility-card mb-4">
                <Card.Header>
                  <h5>Eligibility Criteria</h5>
                </Card.Header>
                <Card.Body>
                  <div className="eligibility-item">
                    <span className="eligibility-label">Branches:</span>
                    <div className="branch-tags">
                      {drive.eligibility.branches.map(branch => (
                        <Badge key={branch} bg="light" text="dark" className="me-1 mb-1">
                          {branch}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="eligibility-item">
                    <span className="eligibility-label">Minimum CGPA:</span>
                    <span className="eligibility-value">{drive.eligibility.minCGPA}</span>
                  </div>
                  
                  <div className="eligibility-item">
                    <span className="eligibility-label">Backlog Policy:</span>
                    <span className="eligibility-value">{drive.eligibility.backlogPolicy}</span>
                  </div>
                  
                  {drive.eligibility.otherCriteria && (
                    <div className="eligibility-item">
                      <span className="eligibility-label">Other Criteria:</span>
                      <span className="eligibility-value">{drive.eligibility.otherCriteria}</span>
                    </div>
                  )}
                </Card.Body>
              </Card>
              
              <Card className="dates-card">
                <Card.Header>
                  <h5>Important Dates</h5>
                </Card.Header>
                <Card.Body>
                  <div className="date-item">
                    <span className="date-label">Drive Date:</span>
                    <span className="date-value">{formatDate(drive.date)}</span>
                  </div>
                  
                  <div className="date-item">
                    <span className="date-label">Last Date to Apply:</span>
                    <span className="date-value">{formatDate(drive.lastDateToApply)}</span>
                    {!isApplicationOpen && (
                      <Badge bg="danger" className="ms-2">Closed</Badge>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
        
        <Card.Footer>
          <Row className="align-items-center">
            <Col md={8}>
              <p className="mb-md-0">
                <strong>Note:</strong> All eligible students must bring their college ID, resume, and required documents.
              </p>
            </Col>
            <Col md={4} className="text-md-end">
              <Button
                variant={isApplicationOpen ? "success" : "secondary"}
                disabled={!isApplicationOpen}
                size="lg"
              >
                {isApplicationOpen ? "Apply Now" : "Application Closed"}
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default DriveDetails;