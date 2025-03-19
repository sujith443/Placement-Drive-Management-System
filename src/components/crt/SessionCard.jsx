// src/components/crt/SessionCard.js
import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SessionCard = ({ session, isPast = false }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getBranchLabel = (branches) => {
    if (branches.includes('All Branches')) {
      return 'All Branches';
    }
    if (branches.length > 2) {
      return `${branches[0]}, ${branches[1]} & ${branches.length - 2} more`;
    }
    return branches.join(', ');
  };
  
  return (
    <Card className={`session-card h-100 ${isPast ? 'past-session' : ''}`}>
      <Card.Header className="session-header">
        <div className="session-date">
          <div className="date-badge">
            <div className="date-month">
              {new Date(session.date).toLocaleDateString('en-US', { month: 'short' })}
            </div>
            <div className="date-day">
              {new Date(session.date).getDate()}
            </div>
          </div>
        </div>
        <h5 className="session-title">{session.title}</h5>
      </Card.Header>
      
      <Card.Body>
        <div className="session-info">
          <div className="info-item">
            <i className="bi bi-person"></i>
            <span>{session.instructor}</span>
          </div>
          
          <div className="info-item">
            <i className="bi bi-clock"></i>
            <span>{session.time}</span>
          </div>
          
          <div className="info-item">
            <i className="bi bi-geo-alt"></i>
            <span>{session.venue}</span>
          </div>
        </div>
        
        <div className="session-topics mt-3">
          <h6>Topics:</h6>
          <ul className="topics-list">
            {session.topics.slice(0, 2).map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
            {session.topics.length > 2 && (
              <li className="more-topics">+ {session.topics.length - 2} more topics</li>
            )}
          </ul>
        </div>
        
        <div className="session-eligibility mt-3">
          <div className="eligibility-item">
            <span className="label">For:</span>
            <span className="value">{session.eligibility.year}</span>
          </div>
          
          <div className="eligibility-item">
            <span className="label">Branches:</span>
            <span className="value">{getBranchLabel(session.eligibility.branches)}</span>
          </div>
          
          {session.registration && (
            <div className="registration-info mt-2">
              <Badge bg="info">{session.registration}</Badge>
            </div>
          )}
        </div>
      </Card.Body>
      
      <Card.Footer>
        <Link to={`/crt-timetable/${session.id}`} className="btn btn-primary btn-sm w-100">
          View Details
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default SessionCard;