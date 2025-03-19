// src/components/crt/CRTTimetable.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Tabs, Tab } from 'react-bootstrap';
import BranchFilter from '../common/BranchFilter';
import SessionCard from './SessionCard';
import { crtData } from '../../data/crtData';

const CRTTimetable = ({ selectedBranch, onBranchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  
  useEffect(() => {
    let filtered = [...crtData];
    
    // Filter by branch
    if (selectedBranch !== 'all') {
      filtered = filtered.filter(session => 
        session.eligibility.branches.includes(selectedBranch) || 
        session.eligibility.branches.includes('All Branches')
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(session => 
        session.title.toLowerCase().includes(term) ||
        session.instructor.toLowerCase().includes(term) ||
        session.venue.toLowerCase().includes(term) ||
        session.topics.some(topic => topic.toLowerCase().includes(term))
      );
    }
    
    // Sort sessions by date
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Separate into upcoming and past sessions
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    setFilteredSessions({
      upcoming: filtered.filter(session => new Date(session.date) >= today),
      past: filtered.filter(session => new Date(session.date) < today)
    });
  }, [selectedBranch, searchTerm]);
  
  return (
    <div className="crt-timetable-container">
      <Container fluid>
        <div className="page-header">
          <h1>CRT Timetable</h1>
          <BranchFilter selectedBranch={selectedBranch} onBranchChange={onBranchChange} />
        </div>
        
        <div className="filter-section">
          <Row>
            <Col md={6}>
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
          </Row>
        </div>
        
        <div className="sessions-tabs">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4"
          >
            <Tab eventKey="upcoming" title={`Upcoming Sessions (${filteredSessions.upcoming?.length || 0})`}>
              <div className="sessions-list">
                <Row>
                  {filteredSessions.upcoming?.length > 0 ? (
                    filteredSessions.upcoming.map(session => (
                      <Col key={session.id} lg={4} md={6} className="mb-4">
                        <SessionCard session={session} />
                      </Col>
                    ))
                  ) : (
                    <Col className="text-center py-5">
                      <div className="no-results">
                        <i className="bi bi-calendar-x fs-1"></i>
                        <h4>No upcoming CRT sessions found</h4>
                        <p>Check back later for new sessions</p>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            </Tab>
            
            <Tab eventKey="past" title={`Past Sessions (${filteredSessions.past?.length || 0})`}>
              <div className="sessions-list">
                <Row>
                  {filteredSessions.past?.length > 0 ? (
                    filteredSessions.past.map(session => (
                      <Col key={session.id} lg={4} md={6} className="mb-4">
                        <SessionCard session={session} isPast={true} />
                      </Col>
                    ))
                  ) : (
                    <Col className="text-center py-5">
                      <div className="no-results">
                        <i className="bi bi-calendar-x fs-1"></i>
                        <h4>No past CRT sessions found</h4>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            </Tab>
          </Tabs>
        </div>
      </Container>
    </div>
  );
};

export default CRTTimetable;