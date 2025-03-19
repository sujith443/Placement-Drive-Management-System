// src/components/internship/Internships.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import BranchFilter from '../common/BranchFilter';
import InternshipCard from './InternshipCard';
import { internships } from '../../data/internship';

const Internships = ({ selectedBranch, onBranchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('lastDate');
  const [filteredInternships, setFilteredInternships] = useState([]);
  
  useEffect(() => {
    let filtered = [...internships];
    
    // Filter by branch
    if (selectedBranch !== 'all') {
      filtered = filtered.filter(internship => 
        internship.eligibility.branches.includes(selectedBranch)
      );
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(internship => 
        internship.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(internship => 
        internship.company.toLowerCase().includes(term) ||
        internship.position.toLowerCase().includes(term) ||
        internship.location.toLowerCase().includes(term)
      );
    }
    
    // Sort internships
    switch (sortBy) {
      case 'company':
        filtered.sort((a, b) => a.company.localeCompare(b.company));
        break;
      case 'stipend':
        filtered.sort((a, b) => {
          const aStipend = parseInt(a.stipend.replace(/[^\d]/g, ''));
          const bStipend = parseInt(b.stipend.replace(/[^\d]/g, ''));
          return bStipend - aStipend;
        });
        break;
      case 'lastDate':
      default:
        filtered.sort((a, b) => new Date(a.lastDateToApply) - new Date(b.lastDateToApply));
    }
    
    setFilteredInternships(filtered);
  }, [selectedBranch, statusFilter, searchTerm, sortBy]);
  
  return (
    <div className="internships-container">
      <Container fluid>
        <div className="page-header">
          <h1>Internship Opportunities</h1>
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
                  <option value="open">Open</option>
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
                  <option value="lastDate">Sort by Last Date</option>
                  <option value="company">Sort by Company</option>
                  <option value="stipend">Sort by Stipend</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </div>
        
        <div className="internships-list">
          <Row>
            {filteredInternships.length > 0 ? (
              filteredInternships.map(internship => (
                <Col key={internship.id} lg={4} md={6} className="mb-4">
                  <InternshipCard internship={internship} />
                </Col>
              ))
            ) : (
              <Col className="text-center py-5">
                <div className="no-results">
                  <i className="bi bi-search fs-1"></i>
                  <h4>No internships found</h4>
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

export default Internships;