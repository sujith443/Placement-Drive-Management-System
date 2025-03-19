// src/components/admin/internship/AdminInternshipForm.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { internships } from '../../../data/internship';

const AdminInternshipForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  // Form state
  const [formData, setFormData] = useState({
    company: '',
    logo: '',
    position: '',
    location: '',
    stipend: '',
    duration: '',
    eligibility: {
      branches: [],
      minCGPA: 6.0,
      year: '3rd Year',
      otherCriteria: ''
    },
    process: [''],
    skills: [''],
    lastDateToApply: '',
    status: 'Upcoming',
    description: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);
  
  // Check admin auth
  useEffect(() => {
    const isAdmin = localStorage.getItem('adminAuth') === 'true';
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [navigate]);
  
  // If in edit mode, load the internship data
  useEffect(() => {
    if (isEditMode) {
      const internship = internships.find(i => i.id === parseInt(id));
      
      if (internship) {
        // Format dates for form inputs (YYYY-MM-DD)
        const formatDateForInput = (dateString) => {
          const date = new Date(dateString);
          return date.toISOString().split('T')[0];
        };
        
        setFormData({
          ...internship,
          lastDateToApply: formatDateForInput(internship.lastDateToApply)
        });
      } else {
        setAlertInfo({
          type: 'danger',
          message: 'Internship not found'
        });
      }
    }
  }, [isEditMode, id]);
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested objects
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle array field changes
  const handleArrayChange = (index, field, value) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };
  
  // Add new item to an array field
  const handleAddItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };
  
  // Remove item from an array field
  const handleRemoveItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };
  
  // Handle branch selection
  const handleBranchSelection = (e) => {
    const { value, checked } = e.target;
    
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          eligibility: {
            ...prev.eligibility,
            branches: [...prev.eligibility.branches, value]
          }
        };
      } else {
        return {
          ...prev,
          eligibility: {
            ...prev.eligibility,
            branches: prev.eligibility.branches.filter(branch => branch !== value)
          }
        };
      }
    });
  };
  
  // Validate form
  const validateForm = () => {
    let errors = {};
    let isValid = true;
    
    if (!formData.company.trim()) {
      errors.company = "Company name is required";
      isValid = false;
    }
    
    if (!formData.position.trim()) {
      errors.position = "Position is required";
      isValid = false;
    }
    
    if (!formData.location.trim()) {
      errors.location = "Location is required";
      isValid = false;
    }
    
    if (!formData.stipend.trim()) {
      errors.stipend = "Stipend is required";
      isValid = false;
    }
    
    if (!formData.duration.trim()) {
      errors.duration = "Duration is required";
      isValid = false;
    }
    
    if (formData.eligibility.branches.length === 0) {
      errors.branches = "At least one branch must be selected";
      isValid = false;
    }
    
    if (!formData.lastDateToApply) {
      errors.lastDateToApply = "Last date to apply is required";
      isValid = false;
    }
    
    if (!formData.description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        if (isEditMode) {
          setAlertInfo({
            type: 'success',
            message: 'Internship updated successfully!'
          });
        } else {
          setAlertInfo({
            type: 'success',
            message: 'New internship added successfully!'
          });
        }
        
        setIsSubmitting(false);
        
        // After a brief delay, redirect to the internships list
        setTimeout(() => {
          navigate('/admin/internships');
        }, 1500);
      }, 800);
    }
  };
  
  return (
    <Container fluid className="admin-internship-form py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="admin-page-title">
          {isEditMode ? 'Edit Internship' : 'Add New Internship'}
        </h2>
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate('/admin/internships')}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to Internships
        </Button>
      </div>
      
      {alertInfo && (
        <Alert 
          variant={alertInfo.type} 
          onClose={() => setAlertInfo(null)} 
          dismissible
        >
          {alertInfo.message}
        </Alert>
      )}
      
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <h5 className="form-section-title">Basic Details</h5>
                
                <Form.Group className="mb-3">
                  <Form.Label>Company Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    isInvalid={!!formErrors.company}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.company}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Company Logo URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                    placeholder="URL to company logo"
                  />
                  <Form.Text className="text-muted">
                    Enter a URL for the company logo (optional)
                  </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Position <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    isInvalid={!!formErrors.position}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.position}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Location <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Bangalore, Chennai, Hyderabad"
                    isInvalid={!!formErrors.location}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.location}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Stipend <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="stipend"
                        value={formData.stipend}
                        onChange={handleChange}
                        placeholder="e.g., ₹15,000 per month"
                        isInvalid={!!formErrors.stipend}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.stipend}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Duration <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="e.g., 2 months (May-July 2025)"
                        isInvalid={!!formErrors.duration}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.duration}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Last Date to Apply <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="date"
                    name="lastDateToApply"
                    value={formData.lastDateToApply}
                    onChange={handleChange}
                    isInvalid={!!formErrors.lastDateToApply}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.lastDateToApply}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <h5 className="form-section-title">Eligibility & Requirements</h5>
                
                <Form.Group className="mb-3">
                  <Form.Label>Eligible Branches <span className="text-danger">*</span></Form.Label>
                  <div className="branch-checkboxes">
                    {['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL'].map(branch => (
                      <Form.Check
                        key={branch}
                        type="checkbox"
                        id={`branch-${branch}`}
                        label={branch}
                        value={branch}
                        checked={formData.eligibility.branches.includes(branch)}
                        onChange={handleBranchSelection}
                        isInvalid={!!formErrors.branches}
                      />
                    ))}
                  </div>
                  {formErrors.branches && (
                    <div className="text-danger mt-1 small">{formErrors.branches}</div>
                  )}
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Minimum CGPA</Form.Label>
                      <Form.Control
                        type="number"
                        name="eligibility.minCGPA"
                        value={formData.eligibility.minCGPA}
                        onChange={handleChange}
                        step="0.1"
                        min="0"
                        max="10"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Year</Form.Label>
                      <Form.Select
                        name="eligibility.year"
                        value={formData.eligibility.year}
                        onChange={handleChange}
                      >
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Other Criteria</Form.Label>
                  <Form.Control
                    type="text"
                    name="eligibility.otherCriteria"
                    value={formData.eligibility.otherCriteria}
                    onChange={handleChange}
                    placeholder="Any other eligibility criteria"
                  />
                </Form.Group>
                
                <div className="mb-3">
                  <Form.Label>Selection Process</Form.Label>
                  {formData.process.map((step, index) => (
                    <div key={index} className="d-flex mb-2">
                      <Form.Control
                        type="text"
                        value={step}
                        onChange={(e) => handleArrayChange(index, 'process', e.target.value)}
                        placeholder={`Step ${index + 1}`}
                      />
                      <Button 
                        variant="outline-danger" 
                        className="ms-2"
                        onClick={() => handleRemoveItem('process', index)}
                        disabled={formData.process.length <= 1}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </div>
                  ))}
                  <Button 
                    variant="outline-secondary" 
                    className="mt-2"
                    onClick={() => handleAddItem('process')}
                  >
                    <i className="bi bi-plus-circle me-1"></i>
                    Add Step
                  </Button>
                </div>
                
                <div className="mb-3">
                  <Form.Label>Required Skills</Form.Label>
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="d-flex mb-2">
                      <Form.Control
                        type="text"
                        value={skill}
                        onChange={(e) => handleArrayChange(index, 'skills', e.target.value)}
                        placeholder="Skill"
                      />
                      <Button 
                        variant="outline-danger" 
                        className="ms-2"
                        onClick={() => handleRemoveItem('skills', index)}
                        disabled={formData.skills.length <= 1}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </div>
                  ))}
                  <Button 
                    variant="outline-secondary" 
                    className="mt-2"
                    onClick={() => handleAddItem('skills')}
                  >
                    <i className="bi bi-plus-circle me-1"></i>
                    Add Skill
                  </Button>
                </div>
              </Col>
            </Row>
            
            <Form.Group className="mb-4">
              <Form.Label>Description <span className="text-danger">*</span></Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed description of the internship"
                isInvalid={!!formErrors.description}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.description}
              </Form.Control.Feedback>
            </Form.Group>
            
            <div className="d-flex justify-content-end">
              <Button 
                variant="secondary" 
                className="me-2"
                onClick={() => navigate('/admin/internships')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {isEditMode ? 'Updating...' : 'Saving...'}
                  </>
                ) : (
                  isEditMode ? 'Update Internship' : 'Save Internship'
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminInternshipForm;