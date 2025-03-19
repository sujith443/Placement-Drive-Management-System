// src/components/internship/InternshipDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Alert } from 'react-bootstrap';
import { internships } from '../../data/internship';

const InternshipDetails = () => {
  const { id } = useParams();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Simulating API fetch with timeout
    const timeout = setTimeout(() => {
      const foundInternship = internships.find(i => i.id === parseInt(id));
      
      if (foundInternship) {
        setInternship(foundInternship);
      } else {
        setError('Internship not found');
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
        <p className="mt-3">Loading internship details...</p>
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
            <Button as={Link} to="/internships" variant="outline-danger">
              Back to Internships
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
  
  const statusColor = internship.status === 'Open' 
    ? 'success' 
    : internship.status === 'Upcoming' 
      ? 'warning' 
      : 'secondary';
  
  const isApplicationOpen = new Date(internship.lastDateToApply) >= new Date();
  
  return (
    <Container className="internship-details-container py-4">
      <div className="mb-4">
        <Link to="/internships" className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-arrow-left"></i> Back to Internships
        </Link>
      </div>
      
      <Card className="internship-details-card">
        <Card.Header className="company-header">
          <Row className="align-items-center">
            <Col md={2} className="text-center">
              <img src={internship.logo} alt={internship.company} className="company-logo-lg" />
            </Col>
            <Col md={8}>
              <h3>{internship.company}</h3>
              <h5 className="text-muted">{internship.position}</h5>
              <div className="location">
                <i className="bi bi-geo-alt"></i>
                <span>{internship.location}</span>
              </div>
            </Col>
            <Col md={2} className="text-md-end">
              <Badge bg={statusColor} className="status-badge">
                {internship.status}
              </Badge>
            </Col>
          </Row>
        </Card.Header>
        
        <Card.Body>
          <Row>
            <Col md={8}>
              <div className="internship-description mb-4">
                <h5>About this Opportunity</h5>
                <p>{internship.description}</p>
              </div>
              
              <div className="internship-process mb-4">
                <h5>Selection Process</h5>
                <ol className="process-steps">
                  {internship.process.map((step, index) => (
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
                  {internship.skills.map((skill, index) => (
                    <Badge key={index} bg="primary" className="me-2 mb-2 skill-badge">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Col>
            
            <Col md={4}>
              <Card className="stipend-card mb-4">
                <Card.Header>
                  <h5>Stipend & Duration</h5>
                </Card.Header>
                <Card.Body>
                  <div className="stipend-amount">
                    <span className="amount">{internship.stipend}</span>
                  </div>
                  <div className="internship-duration mt-3">
                    <i className="bi bi-calendar-range"></i>
                    <span>{internship.duration}</span>
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
                      {internship.eligibility.branches.map(branch => (
                        <Badge key={branch} bg="light" text="dark" className="me-1 mb-1">
                          {branch}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="eligibility-item">
                    <span className="eligibility-label">Year:</span>
                    <span className="eligibility-value">{internship.eligibility.year}</span>
                  </div>
                  
                  <div className="eligibility-item">
                    <span className="eligibility-label">Minimum CGPA:</span>
                    <span className="eligibility-value">{internship.eligibility.minCGPA}</span>
                  </div>
                  
                  {internship.eligibility.otherCriteria && (
                    <div className="eligibility-item">
                      <span className="eligibility-label">Other Criteria:</span>
                      <span className="eligibility-value">{internship.eligibility.otherCriteria}</span>
                    </div>
                  )}
                </Card.Body>
              </Card>
              
              <Card className="date-card">
                <Card.Header>
                  <h5>Last Date to Apply</h5>
                </Card.Header>
                <Card.Body>
                  <div className="date-display">
                    <i className="bi bi-calendar-check fs-3"></i>
                    <span className="date-value">{formatDate(internship.lastDateToApply)}</span>
                  </div>
                  
                  {!isApplicationOpen && (
                    <div className="application-closed-alert mt-3">
                      <Alert variant="danger" className="mb-0 text-center">
                        <i className="bi bi-exclamation-triangle"></i> Application Closed
                      </Alert>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
        
        <Card.Footer>
          <Row className="align-items-center">
            <Col md={8}>
              <p className="mb-md-0">
                <strong>Note:</strong> All eligible students must submit their resume and required documents before the last date.
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

export default InternshipDetails;