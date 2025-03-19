// src/components/dashboard/RecentActivity.js
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'drive',
      title: 'Microsoft Placement Drive',
      description: 'Registration now open for all eligible students',
      timestamp: '2 hours ago',
      icon: 'briefcase'
    },
    {
      id: 2,
      type: 'internship',
      title: 'Amazon Summer Internship',
      description: 'Last date to apply: March 25, 2025',
      timestamp: '1 day ago',
      icon: 'journal-text'
    },
    {
      id: 3,
      type: 'crt',
      title: 'Advanced Data Structures & Algorithms Session',
      description: 'Session scheduled for March 25, 2025',
      timestamp: '2 days ago',
      icon: 'calendar-event'
    },
    {
      id: 4,
      type: 'announcement',
      title: 'Pre-Placement Talk: Infosys',
      description: 'Scheduled for March 30, 2025 at Main Auditorium',
      timestamp: '3 days ago',
      icon: 'megaphone'
    },
    {
      id: 5,
      type: 'result',
      title: 'Google Placement Results',
      description: '15 students selected for final interviews',
      timestamp: '1 week ago',
      icon: 'check-circle'
    }
  ];

  return (
    <Row className="mb-4">
      <Col>
        <Card className="activity-card">
          <Card.Header>
            <h5>Recent Activities</h5>
          </Card.Header>
          <Card.Body>
            <div className="timeline">
              {activities.map(activity => (
                <div key={activity.id} className="timeline-item">
                  <div className={`timeline-icon ${
                    activity.type === 'drive' ? 'bg-primary' :
                    activity.type === 'internship' ? 'bg-info' :
                    activity.type === 'crt' ? 'bg-warning' :
                    activity.type === 'announcement' ? 'bg-success' : 'bg-secondary'
                  }`}>
                    <i className={`bi bi-${activity.icon}`}></i>
                  </div>
                  <div className="timeline-content">
                    <h6>{activity.title}</h6>
                    <p>{activity.description}</p>
                    <span className="timeline-time">{activity.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default RecentActivity;