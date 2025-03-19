// src/components/admin/internship/AdminInternshipList.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Badge, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { internships } from '../../../data/internship';

const AdminInternshipList = () => {
  const navigate = useNavigate();
  const [internshipsList, setInternshipsList] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Check admin auth
  useEffect(() => {
    const isAdmin = localStorage.getItem('adminAuth') === 'true';
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [navigate]);
  
  // Initialize internships from mock data
  useEffect(() => {
    setInternshipsList(internships);
    setFilteredInternships(internships);
  }, []);
  
  // Filter internships based on search term and status
  useEffect(() => {
    let result = [...internshipsList];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(internship => 
        internship.company.toLowerCase().includes(term) ||
        internship.position.toLowerCase().includes(term)
      );
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(internship => internship.status.toLowerCase() === statusFilter.toLowerCase());
    }
    
    setFilteredInternships(result);
  }, [searchTerm, statusFilter, internshipsList]);
  
  // Delete an internship (in a real app, this would call an API)
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this internship?")) {
      // Filter out the internship with the matching id
      const updatedInternships = internshipsList.filter(internship => internship.id !== id);
      setInternshipsList(updatedInternships);
    }
  };
  
  // Get badge color based on status
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'success';
      case 'upcoming':
        return 'warning';
      case 'closed':
        return 'secondary';
      default:
        return 'primary';
    }
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
    <Container fluid className="admin-internship-list py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="admin-page-title">Manage Internships</h2>
        <Button variant="success" as={Link} to="/admin/internships/add">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Internship
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
                  placeholder="Search by company or position"
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
                  <option value="all">All Statuses</option>
                  <option value="open">Open</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="closed">Closed</option>
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
                <th>Company</th>
                <th>Position</th>
                <th>Stipend</th>
                <th>Duration</th>
                <th>Last Date to Apply</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInternships.length > 0 ? (
                filteredInternships.map(internship => (
                  <tr key={internship.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img 
                          src={internship.logo} 
                          alt={internship.company} 
                          className="company-logo-sm me-2"
                          width="30"
                          height="30"
                        />
                        <span>{internship.company}</span>
                      </div>
                    </td>
                    <td>{internship.position}</td>
                    <td>{internship.stipend}</td>
                    <td>{internship.duration}</td>
                    <td>{formatDate(internship.lastDateToApply)}</td>
                    <td>
                      <Badge bg={getStatusBadge(internship.status)}>
                        {internship.status}
                      </Badge>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="me-1"
                          onClick={() => navigate(`/admin/internships/view/${internship.id}`)}
                        >
                          <i className="bi bi-eye-fill"></i>
                        </Button>
                        <Button 
                          variant="outline-warning" 
                          size="sm" 
                          className="me-1"
                          onClick={() => navigate(`/admin/internships/edit/${internship.id}`)}
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete(internship.id)}
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
                      <p>No internships found</p>
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

export default AdminInternshipList;