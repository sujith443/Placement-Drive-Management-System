// src/components/crt/SessionDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Alert } from 'react-bootstrap';
import { crtData } from '../../data/crtData';

const SessionDetails = () => {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Simulating API fetch with timeout
    const timeout = setTimeout(() => {
      const foundSession = crtData.find(s => s.id === parseInt(id));
      
      if (foundSession) {
        setSession(foundSession);
      } else {
        setError('CRT session not found');
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
        <p className="mt-3">Loading session details...</p>
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
            <Button as={Link} to="/crt-timetable" variant="outline-danger">
              Back to CRT Timetable
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
  
  const isSessionPast = new Date(session.date) < new Date();
  
  return (
    <Container className="session-details-container py-4">
      <div className="mb-4">
        <Link to="/crt-timetable" className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-arrow-left"></i> Back to CRT Timetable
        </Link>
      </div>
      
      <Row>
        <Col lg={8}>
          <Card className="session-details-card mb-4">
            <Card.Header className="session-header">
              <div className={`session-status ${isSessionPast ? 'past' : 'upcoming'}`}>
                {isSessionPast ? 'Past Session' : 'Upcoming Session'}
              </div>
              <h3>{session.title}</h3>
              <p className="instructor">By {session.instructor}</p>
            </Card.Header>
            
            <Card.Body>
              <div className="session-datetime mb-4">
                <div className="date-display">
                  <i className="bi bi-calendar-date"></i>
                  <span>{formatDate(session.date)}</span>
                </div>
                <div className="time-display">
                  <i className="bi bi-clock"></i>
                  <span>{session.time}</span>
                </div>
                <div className="venue-display">
                  <i className="bi bi-geo-alt"></i>
                  <span>{session.venue}</span>
                </div>
              </div>
              
              <div className="session-description mb-4">
                <h5>About this Session</h5>
                <p>{session.description}</p>
              </div>
              
              <div className="session-topics mb-4">
                <h5>Topics Covered</h5>
                <ul className="topics-list-detailed">
                  {session.topics.map((topic, index) => (
                    <li key={index} className="topic-item">
                      <div className="topic-bullet">{index + 1}</div>
                      <div className="topic-text">{topic}</div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {session.materials && (
                <div className="session-materials mb-4">
                  <h5>Required Materials</h5>
                  <div className="materials-note">
                    <i className="bi bi-info-circle"></i>
                    <p>{session.materials}</p>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
          
          <Card className="registration-card mb-4">
            <Card.Header>
              <h5>Registration</h5>
            </Card.Header>
            <Card.Body>
              <p className="registration-info">{session.registration}</p>
              
              {!isSessionPast && (
                <div className="d-grid gap-2">
                  {session.registration.toLowerCase().includes('registration required') ? (
                    <Button variant="primary">Register Now</Button>
                  ) : (
                    <Alert variant="info" className="mb-0">
                      <i className="bi bi-info-circle"></i> No prior registration required.
                    </Alert>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
          
          <Card className="related-sessions-card">
            <Card.Header>
              <h5>Related Training Sessions</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <ul className="related-sessions-list">
                {crtData
                  .filter(s => s.id !== session.id)
                  .slice(0, 3)
                  .map(relatedSession => (
                    <li key={relatedSession.id} className="related-session-item">
                      <Link to={`/crt-timetable/${relatedSession.id}`} className="related-session-link">
                        <div className="session-title">{relatedSession.title}</div>
                        <div className="session-date">
                          <i className="bi bi-calendar3"></i>
                          <span>{formatDate(relatedSession.date)}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SessionDetails;