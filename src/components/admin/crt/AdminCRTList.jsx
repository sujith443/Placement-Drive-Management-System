// src/components/admin/crt/AdminCRTList.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Badge, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { crtData } from '../../../data/crtData';

const AdminCRTList = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Check admin auth
  useEffect(() => {
    const isAdmin = localStorage.getItem('adminAuth') === 'true';
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [navigate]);
  
  // Initialize sessions from mock data
  useEffect(() => {
    setSessions(crtData);
    setFilteredSessions(crtData);
  }, []);
  
  // Filter sessions based on search term and status
  useEffect(() => {
    let result = [...sessions];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(session => 
        session.title.toLowerCase().includes(term) ||
        session.instructor.toLowerCase().includes(term) ||
        session.venue.toLowerCase().includes(term) ||
        session.topics.some(topic => topic.toLowerCase().includes(term))
      );
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (statusFilter === 'upcoming') {
        result = result.filter(session => new Date(session.date) >= today);
      } else if (statusFilter === 'past') {
        result = result.filter(session => new Date(session.date) < today);
      }
    }
    
    setFilteredSessions(result);
  }, [searchTerm, statusFilter, sessions]);
  
  // Delete a session (in a real app, this would call an API)
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this CRT session?")) {
      // Filter out the session with the matching id
      const updatedSessions = sessions.filter(session => session.id !== id);
      setSessions(updatedSessions);
    }
  };
  
  // Get session status
  const getSessionStatus = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date) >= today ? 'upcoming' : 'past';
  };
  
  // Get badge color based on status
  const getStatusBadge = (status) => {
    return status === 'upcoming' ? 'primary' : 'secondary';
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <Container fluid className="admin-crt-list py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="admin-page-title">Manage CRT Sessions</h2>
        <Button variant="success" as={Link} to="/admin/crt/add">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Session
        </Button>
      </div>
      
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={6} lg={4}>
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search by title, instructor, venue, or topics"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            
            <Col md={6} lg={3}>
              <Form.Group className="mb-3">
                <Form.Select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Sessions</option>
                  <option value="upcoming">Upcoming Sessions</option>
                  <option value="past">Past Sessions</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      <Card>
        <Card.Body className="p-0">
          <Table responsive hover className="admin-table mb-0">
            <thead>
              <tr>
                <th>Title</th>
                <th>Instructor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Venue</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSessions.length > 0 ? (
                filteredSessions.map(session => (
                  <tr key={session.id}>
                    <td>
                      <div className="session-title-cell">
                        <span className="fw-semibold">{session.title}</span>
                      </div>
                    </td>
                    <td>{session.instructor}</td>
                    <td>{formatDate(session.date)}</td>
                    <td>{session.time}</td>
                    <td>{session.venue}</td>
                    <td>
                      <Badge bg={getStatusBadge(getSessionStatus(session.date))}>
                        {getSessionStatus(session.date) === 'upcoming' ? 'Upcoming' : 'Past'}
                      </Badge>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="me-1"
                          onClick={() => navigate(`/admin/crt/view/${session.id}`)}
                        >
                          <i className="bi bi-eye-fill"></i>
                        </Button>
                        <Button 
                          variant="outline-warning" 
                          size="sm" 
                          className="me-1"
                          onClick={() => navigate(`/admin/crt/edit/${session.id}`)}
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete(session.id)}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    <div className="no-data-message">
                      <i className="bi bi-search fs-1 text-muted"></i>
                      <p>No CRT sessions found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminCRTList;
