// src/components/admin/crt/AdminCRTForm.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { crtData } from '../../../data/crtData';

const AdminCRTForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    date: '',
    time: '',
    venue: '',
    eligibility: {
      branches: [],
      year: 'Final Year',
      otherCriteria: ''
    },
    topics: [''],
    materials: '',
    registration: 'No registration required',
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
  
  // If in edit mode, load the session data
  useEffect(() => {
    if (isEditMode) {
      const session = crtData.find(s => s.id === parseInt(id));
      
      if (session) {
        // Format dates for form inputs (YYYY-MM-DD)
        const formatDateForInput = (dateString) => {
          const date = new Date(dateString);
          return date.toISOString().split('T')[0];
        };
        
        setFormData({
          ...session,
          date: formatDateForInput(session.date)
        });
      } else {
        setAlertInfo({
          type: 'danger',
          message: 'CRT session not found'
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
  
  // Handle All Branches selection
  const handleAllBranchesSelection = (e) => {
    const { checked } = e.target;
    
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          eligibility: {
            ...prev.eligibility,
            branches: ["All Branches"]
          }
        };
      } else {
        return {
          ...prev,
          eligibility: {
            ...prev.eligibility,
            branches: []
          }
        };
      }
    });
  };
  
  // Validate form
  const validateForm = () => {
    let errors = {};
    let isValid = true;
    
    if (!formData.title.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }
    
    if (!formData.instructor.trim()) {
      errors.instructor = "Instructor name is required";
      isValid = false;
    }
    
    if (!formData.date) {
      errors.date = "Date is required";
      isValid = false;
    }
    
    if (!formData.time.trim()) {
      errors.time = "Time is required";
      isValid = false;
    }
    
    if (!formData.venue.trim()) {
      errors.venue = "Venue is required";
      isValid = false;
    }
    
    if (formData.eligibility.branches.length === 0) {
      errors.branches = "At least one branch must be selected";
      isValid = false;
    }
    
    if (formData.topics.some(topic => !topic.trim())) {
      errors.topics = "All topics must be filled";
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
            message: 'CRT session updated successfully!'
          });
        } else {
          setAlertInfo({
            type: 'success',
            message: 'New CRT session added successfully!'
          });
        }
        
        setIsSubmitting(false);
        
        // After a brief delay, redirect to the CRT sessions list
        setTimeout(() => {
          navigate('/admin/crt');
        }, 1500);
      }, 800);
    }
  };
  
  return (
    <Container fluid className="admin-crt-form py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="admin-page-title">
          {isEditMode ? 'Edit CRT Session' : 'Add New CRT Session'}
        </h2>
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate('/admin/crt')}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to Sessions
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
                <h5 className="form-section-title">Session Details</h5>
                
                <Form.Group className="mb-3">
                  <Form.Label>Session Title <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    isInvalid={!!formErrors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.title}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Instructor <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleChange}
                    isInvalid={!!formErrors.instructor}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.instructor}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        isInvalid={!!formErrors.date}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.date}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Time <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        placeholder="e.g., 10:00 AM - 12:00 PM"
                        isInvalid={!!formErrors.time}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.time}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Venue <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    placeholder="e.g., Seminar Hall, CRT Lab 1"
                    isInvalid={!!formErrors.venue}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.venue}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Required Materials</Form.Label>
                  <Form.Control
                    type="text"
                    name="materials"
                    value={formData.materials}
                    onChange={handleChange}
                    placeholder="e.g., Laptop, notepad"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Registration Policy</Form.Label>
                  <Form.Select
                    name="registration"
                    value={formData.registration}
                    onChange={handleChange}
                  >
                    <option value="No registration required">No registration required</option>
                    <option value="Registration required through the Placement Cell">Registration required</option>
                    <option value="Limited slots available, register through Placement Cell">Limited slots available</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <h5 className="form-section-title">Topics & Eligibility</h5>
                
                <div className="mb-3">
                  <Form.Label>Topics <span className="text-danger">*</span></Form.Label>
                  {formData.topics.map((topic, index) => (
                    <div key={index} className="d-flex mb-2">
                      <Form.Control
                        type="text"
                        value={topic}
                        onChange={(e) => handleArrayChange(index, 'topics', e.target.value)}
                        placeholder={`Topic ${index + 1}`}
                        isInvalid={!!formErrors.topics && !topic.trim()}
                      />
                      <Button 
                        variant="outline-danger" 
                        className="ms-2"
                        onClick={() => handleRemoveItem('topics', index)}
                        disabled={formData.topics.length <= 1}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </div>
                  ))}
                  {formErrors.topics && (
                    <div className="text-danger mt-1 small">{formErrors.topics}</div>
                  )}
                  <Button 
                    variant="outline-secondary" 
                    className="mt-2"
                    onClick={() => handleAddItem('topics')}
                  >
                    <i className="bi bi-plus-circle me-1"></i>
                    Add Topic
                  </Button>
                </div>
                
                <Form.Group className="mb-3">
                  <Form.Label>Year</Form.Label>
                  <Form.Select
                    name="eligibility.year"
                    value={formData.eligibility.year}
                    onChange={handleChange}
                  >
                    <option value="Final Year">Final Year</option>
                    <option value="Third Year">Third Year</option>
                    <option value="All Years">All Years</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Eligible Branches <span className="text-danger">*</span></Form.Label>
                  <Form.Check
                    type="checkbox"
                    id="branch-all"
                    label="All Branches"
                    checked={formData.eligibility.branches.includes("All Branches")}
                    onChange={handleAllBranchesSelection}
                    className="mb-2"
                  />
                  
                  {!formData.eligibility.branches.includes("All Branches") && (
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
                  )}
                  
                  {formErrors.branches && (
                    <div className="text-danger mt-1 small">{formErrors.branches}</div>
                  )}
                </Form.Group>
                
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
                placeholder="Detailed description of the CRT session"
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
                onClick={() => navigate('/admin/crt')}
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
                  isEditMode ? 'Update Session' : 'Save Session'
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminCRTForm;