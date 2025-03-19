// src/components/common/BranchFilter.js
import React from 'react';
import { Form } from 'react-bootstrap';

const BranchFilter = ({ selectedBranch, onBranchChange }) => {
  const branches = [
    { value: 'all', label: 'All Branches' },
    { value: 'CSE', label: 'Computer Science Engineering' },
    { value: 'IT', label: 'Information Technology' },
    { value: 'ECE', label: 'Electronics & Communication' },
    { value: 'EEE', label: 'Electrical & Electronics' },
    { value: 'MECH', label: 'Mechanical Engineering' },
    { value: 'CIVIL', label: 'Civil Engineering' }
  ];
  
  return (
    <div className="branch-filter">
      <Form.Group>
        <Form.Label className="filter-label">Filter by Branch</Form.Label>
        <Form.Select 
          value={selectedBranch}
          onChange={(e) => onBranchChange(e.target.value)}
          className="branch-select"
        >
          {branches.map(branch => (
            <option key={branch.value} value={branch.value}>
              {branch.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </div>
  );
};

export default BranchFilter;