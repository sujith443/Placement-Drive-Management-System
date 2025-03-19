// src/components/placement/DriveCard.js
import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DriveCard = ({ drive }) => {
  const statusColor = drive.status === 'Active' 
    ? 'success' 
    : drive.status === 'Upcoming' 
      ? 'warning' 
      : 'secondary';
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <Card className="drive-card h-100">
      <div className="card-badge">
        <Badge bg={statusColor}>{drive.status}</Badge>
      </div>
      
      <Card.Header className="company-header">
        <img src={drive.logo} alt={drive.company} className="company-logo" />
        <h5>{drive.company}</h5>
      </Card.Header>
      
      <Card.Body>
        <div className="position-info mb-3">
          <h6>{drive.position}</h6>
          <div className="location">
            <i className="bi bi-geo-alt"></i>
            <span>{drive.location}</span>
          </div>
        </div>
        
        <div className="drive-details">
          <div className="detail-item">
            <span className="detail-label">Package:</span>
            <span className="detail-value highlight">{drive.package.ctc}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Drive Date:</span>
            <span className="detail-value">{formatDate(drive.date)}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Last Date to Apply:</span>
            <span className="detail-value">{formatDate(drive.lastDateToApply)}</span>
          </div>
        </div>
        
        <div className="eligibility-summary mt-3">
          <h6>Eligibility:</h6>
          <div className="branch-tags">
            {drive.eligibility.branches.map(branch => (
              <Badge key={branch} bg="light" text="dark" className="me-1 mb-1">
                {branch}
              </Badge>
            ))}
          </div>
          <div className="eligibility-cgpa mt-2">
            <i className="bi bi-mortarboard"></i>
            <span>Min. CGPA: {drive.eligibility.minCGPA}</span>
          </div>
        </div>
      </Card.Body>
      
      <Card.Footer>
        <Link to={`/placement-drives/${drive.id}`} className="btn btn-primary btn-sm w-100">
          View Details
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default DriveCard;