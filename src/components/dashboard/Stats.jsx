// src/components/dashboard/Stats.js
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const Stats = () => {
  return (
    <Row className="stats-row mb-4">
      <Col md={3} sm={6}>
        <Card className="stats-card bg-primary text-white">
          <Card.Body>
            <div className="stats-icon">
              <i className="bi bi-briefcase-fill"></i>
            </div>
            <div className="stats-content">
              <h2>13</h2>
              <p>Active Drives</p>
            </div>
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={3} sm={6}>
        <Card className="stats-card bg-success text-white">
          <Card.Body>
            <div className="stats-icon">
              <i className="bi bi-person-check-fill"></i>
            </div>
            <div className="stats-content">
              <h2>186</h2>
              <p>Students Placed</p>
            </div>
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={3} sm={6}>
        <Card className="stats-card bg-info text-white">
          <Card.Body>
            <div className="stats-icon">
              <i className="bi bi-journal-text"></i>
            </div>
            <div className="stats-content">
              <h2>8</h2>
              <p>Open Internships</p>
            </div>
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={3} sm={6}>
        <Card className="stats-card bg-warning text-white">
          <Card.Body>
            <div className="stats-icon">
              <i className="bi bi-calendar-check-fill"></i>
            </div>
            <div className="stats-content">
              <h2>12</h2>
              <p>Upcoming CRT Sessions</p>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Stats;