// src/components/internship/InternshipCard.js
import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const InternshipCard = ({ internship }) => {
  const statusColor = internship.status === 'Open' 
    ? 'success' 
    : internship.status === 'Upcoming' 
      ? 'warning' 
      : 'secondary';
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <Card className="internship-card h-100">
      <div className="card-badge">
        <Badge bg={statusColor}>{internship.status}</Badge>
      </div>
      
      <Card.Header className="company-header">
        <img src={internship.logo} alt={internship.company} className="company-logo" />
        <h5>{internship.company}</h5>
      </Card.Header>
      
      <Card.Body>
        <div className="position-info mb-3">
          <h6>{internship.position}</h6>
          <div className="location">
            <i className="bi bi-geo-alt"></i>
            <span>{internship.location}</span>
          </div>
        </div>
        
        <div className="internship-details">
          <div className="detail-item">
            <span className="detail-label">Stipend:</span>
            <span className="detail-value highlight">{internship.stipend}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Duration:</span>
            <span className="detail-value">{internship.duration}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Last Date to Apply:</span>
            <span className="detail-value">{formatDate(internship.lastDateToApply)}</span>
          </div>
        </div>
        
        <div className="eligibility-summary mt-3">
          <h6>Eligibility:</h6>
          <div className="branch-tags">
            {internship.eligibility.branches.map(branch => (
              <Badge key={branch} bg="light" text="dark" className="me-1 mb-1">
                {branch}
              </Badge>
            ))}
          </div>
          <div className="eligibility-year mt-2">
            <i className="bi bi-mortarboard"></i>
            <span>{internship.eligibility.year} Students</span>
          </div>
        </div>
      </Card.Body>
      
      <Card.Footer>
        <Link to={`/internships/${internship.id}`} className="btn btn-primary btn-sm w-100">
          View Details
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default InternshipCard;
