// src/components/admin/placement/AdminPlacementList.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Badge, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { placementDrives } from '../../../data/placementDrives';

const AdminPlacementList = () => {
  const navigate = useNavigate();
  const [drives, setDrives] = useState([]);
  const [filteredDrives, setFilteredDrives] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Check admin auth
  useEffect(() => {
    const isAdmin = localStorage.getItem('adminAuth') === 'true';
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [navigate]);
  
  // Initialize drives from mock data
  useEffect(() => {
    setDrives(placementDrives);
    setFilteredDrives(placementDrives);
  }, []);
  
  // Filter drives based on search term and status
  useEffect(() => {
    let result = [...drives];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(drive => 
        drive.company.toLowerCase().includes(term) ||
        drive.position.toLowerCase().includes(term)
      );
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(drive => drive.status.toLowerCase() === statusFilter.toLowerCase());
    }
    
    setFilteredDrives(result);
  }, [searchTerm, statusFilter, drives]);
  
  // Delete a drive (in a real app, this would call an API)
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this placement drive?")) {
      // Filter out the drive with the matching id
      const updatedDrives = drives.filter(drive => drive.id !== id);
      setDrives(updatedDrives);
    }
  };
  
  // Get badge color based on status
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
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
    <Container fluid className="admin-placement-list py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="admin-page-title">Manage Placement Drives</h2>
        <Button variant="success" as={Link} to="/admin/placements/add">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Drive
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
                  <option value="active">Active</option>
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
                <th>Package</th>
                <th>Drive Date</th>
                <th>Last Date to Apply</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrives.length > 0 ? (
                filteredDrives.map(drive => (
                  <tr key={drive.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img 
                          src={drive.logo} 
                          alt={drive.company} 
                          className="company-logo-sm me-2"
                          width="30"
                          height="30"
                        />
                        <span>{drive.company}</span>
                      </div>
                    </td>
                    <td>{drive.position}</td>
                    <td>{drive.package.ctc}</td>
                    <td>{formatDate(drive.date)}</td>
                    <td>{formatDate(drive.lastDateToApply)}</td>
                    <td>
                      <Badge bg={getStatusBadge(drive.status)}>
                        {drive.status}
                      </Badge>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="me-1"
                          onClick={() => navigate(`/admin/placements/view/${drive.id}`)}
                        >
                          <i className="bi bi-eye-fill"></i>
                        </Button>
                        <Button 
                          variant="outline-warning" 
                          size="sm" 
                          className="me-1"
                          onClick={() => navigate(`/admin/placements/edit/${drive.id}`)}
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete(drive.id)}
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
                      <p>No placement drives found</p>
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

export default AdminPlacementList;
