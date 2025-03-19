// src/components/placement/PlacementDrives.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import BranchFilter from '../common/BranchFilter';
import DriveCard from './DriveCard';
import { placementDrives } from '../../data/placementDrives';

const PlacementDrives = ({ selectedBranch, onBranchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [filteredDrives, setFilteredDrives] = useState([]);
  
  useEffect(() => {
    let filtered = [...placementDrives];
    
    // Filter by branch
    if (selectedBranch !== 'all') {
      filtered = filtered.filter(drive => 
        drive.eligibility.branches.includes(selectedBranch)
      );
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(drive => 
        drive.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(drive => 
        drive.company.toLowerCase().includes(term) ||
        drive.position.toLowerCase().includes(term) ||
        drive.location.toLowerCase().includes(term)
      );
    }
    
    // Sort drives
    switch (sortBy) {
      case 'company':
        filtered.sort((a, b) => a.company.localeCompare(b.company));
        break;
      case 'package':
        filtered.sort((a, b) => {
          const aPackage = parseFloat(a.package.ctc.replace('LPA', '').trim());
          const bPackage = parseFloat(b.package.ctc.replace('LPA', '').trim());
          return bPackage - aPackage;
        });
        break;
      case 'date':
      default:
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    
    setFilteredDrives(filtered);
  }, [selectedBranch, statusFilter, searchTerm, sortBy]);
  
  return (
    <div className="placement-drives-container">
      <Container fluid>
        <div className="page-header">
          <h1>Placement Drives</h1>
          <BranchFilter selectedBranch={selectedBranch} onBranchChange={onBranchChange} />
        </div>
        
        <div className="filter-section">
          <Row>
            <Col md={5}>
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search by company, position, or location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            
            <Col md={3}>
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
            
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Sort by Date</option>
                  <option value="company">Sort by Company</option>
                  <option value="package">Sort by Package</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </div>
        
        <div className="drives-list">
          <Row>
            {filteredDrives.length > 0 ? (
              filteredDrives.map(drive => (
                <Col key={drive.id} lg={4} md={6} className="mb-4">
                  <DriveCard drive={drive} />
                </Col>
              ))
            ) : (
              <Col className="text-center py-5">
                <div className="no-results">
                  <i className="bi bi-search fs-1"></i>
                  <h4>No placement drives found</h4>
                  <p>Try changing your filters or search term</p>
                </div>
              </Col>
            )}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default PlacementDrives;
