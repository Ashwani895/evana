import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Form, 
  Button, 
  Card, 
  Alert, 
  ProgressBar, 
  InputGroup,
  Badge,
  Spinner
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const RegisterOrganizer = ({ onRoleUpdate }) => {
  const [formData, setFormData] = useState({
    type: 'individual',
    bio: '',
    experience: '',
    services: '',
    location: '',
    companyName: '',
    officeAddress: '',
    phone: '',
    website: '',
    socialMedia: {
      instagram: '',
      facebook: '',
      linkedin: ''
    },
    eventTypes: []
  });

  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const eventTypeOptions = [
    'Weddings', 
    'Corporate Events', 
    'Concerts', 
    'Exhibitions', 
    'Conferences',
    'Birthday Parties',
    'Private Parties',
    'Trade Shows',
    'Seminars',
    'Festivals'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested objects like socialMedia.instagram
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEventTypeChange = (eventType) => {
    setFormData(prev => {
      if (prev.eventTypes.includes(eventType)) {
        return { ...prev, eventTypes: prev.eventTypes.filter(type => type !== eventType) };
      } else {
        return { ...prev, eventTypes: [...prev.eventTypes, eventType] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    // Fixed API URL (matches server mounting: /api/event-manager)
    const API_URL = 'http://localhost:5001/api/event-manager/register';

    try {
      const token = localStorage.getItem('token');

      // Ensure services is sent as an array (backend expects array)
      const servicesArray = Array.isArray(formData.services)
        ? formData.services
        : (formData.services ? formData.services.split(',').map(s => s.trim()).filter(Boolean) : []);

      const bodyToSend = {
        ...formData,
        services: servicesArray,
      };

      // Send request
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(bodyToSend),
      });

      // Read raw text so we don't crash if server returns HTML (404 page or error page)
      const raw = await res.text();

      // Try parse JSON if possible
      let data = null;
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch (parseErr) {
        // If parse fails and res.ok === false, show raw HTML/text as error
        if (!res.ok) {
          throw new Error(raw || `Request failed with status ${res.status}`);
        }
        // If parse fails but res.ok, we still proceed (no JSON expected)
        data = {};
      }

      if (!res.ok) {
        // show meaningful error from server JSON or raw text
        const errMsg = data?.message || `Registration failed (status ${res.status})`;
        setMessage({ text: errMsg, type: 'danger' });
        return;
      }

      // Success path
      setMessage({ 
        text: 'Registration submitted successfully! Your profile will be reviewed shortly.', 
        type: 'success' 
      });

      // Update role immediately for Navbar (persist in localStorage + notify parent)
      localStorage.setItem('role', 'event_manager');
      onRoleUpdate && onRoleUpdate('event_manager');

      // Reset form
      setFormData({
        type: 'individual',
        bio: '',
        experience: '',
        services: '',
        location: '',
        companyName: '',
        officeAddress: '',
        phone: '',
        website: '',
        socialMedia: {
          instagram: '',
          facebook: '',
          linkedin: ''
        },
        eventTypes: []
      });
      setCurrentStep(1);
    } catch (error) {
      console.error('RegisterOrganizer error:', error);
      setMessage({ 
        text: error.message || 'Server error. Please try again later.', 
        type: 'danger' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // Calculate form completion percentage
  const calculateCompletion = () => {
    let fields = ['bio', 'experience', 'services', 'location'];
    if (formData.type === 'company') {
      fields.push('companyName', 'officeAddress');
    }
    
    let filledFields = fields.filter(field => {
      const val = formData[field];
      return typeof val === 'string' ? val.trim() !== '' : (Array.isArray(val) ? val.length > 0 : Boolean(val));
    }).length;

    if (formData.eventTypes.length > 0) filledFields += 1;

    const totalFieldCount = formData.type === 'company' ? 7 : 5;
    return Math.round((filledFields / totalFieldCount) * 100);
  };

  // Render step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="mb-4">
              <h5>Basic Information</h5>
              <p className="text-muted">Tell us about yourself or your company</p>
            </div>
            
            <Form.Group className="mb-4">
              <Form.Label>I am registering as</Form.Label>
              <div className="d-flex gap-3">
                <Card 
                  className={`flex-grow-1 p-3 cursor-pointer ${formData.type === 'individual' ? 'border-primary' : 'border'}`}
                  onClick={() => handleChange({ target: { name: 'type', value: 'individual' }})}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center">
                    <div className={`rounded-circle p-2 me-3 ${formData.type === 'individual' ? 'bg-primary text-white' : 'bg-light'}`}>
                      <i className="bi bi-person"></i>
                    </div>
                    <div>
                      <h6 className="mb-1">Individual</h6>
                      <small className="text-muted">Freelance event organizer</small>
                    </div>
                  </div>
                </Card>
                <Card 
                  className={`flex-grow-1 p-3 cursor-pointer ${formData.type === 'company' ? 'border-primary' : 'border'}`} 
                  onClick={() => handleChange({ target: { name: 'type', value: 'company' }})}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center">
                    <div className={`rounded-circle p-2 me-3 ${formData.type === 'company' ? 'bg-primary text-white' : 'bg-light'}`}>
                      <i className="bi bi-building"></i>
                    </div>
                    <div>
                      <h6 className="mb-1">Company</h6>
                      <small className="text-muted">Event management company</small>
                    </div>
                  </div>
                </Card>
              </div>
            </Form.Group>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Bio <span className="text-danger">*</span></Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={4}
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder={`Tell us about ${formData.type === 'individual' ? 'yourself' : 'your company'}`}
                    required
                  />
                  <Form.Text className="text-muted">
                    This will appear on your public profile. Be concise but descriptive.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            {formData.type === 'company' && (
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Company Name <span className="text-danger">*</span></Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-building"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required={formData.type === 'company'}
                        placeholder="Your company name"
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Office Address <span className="text-danger">*</span></Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-geo-alt"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="officeAddress"
                        value={formData.officeAddress}
                        onChange={handleChange}
                        required={formData.type === 'company'}
                        placeholder="Your office address"
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
            )}
          </>
        );
      case 2:
        return (
          <>
            <div className="mb-4">
              <h5>Professional Details</h5>
              <p className="text-muted">Share your expertise and services</p>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Experience <span className="text-danger">*</span></Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-calendar-check"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  placeholder="Years of experience, certifications, etc."
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Event Types <span className="text-danger">*</span></Form.Label>
              <div className="d-flex flex-wrap gap-2 mb-2">
                {eventTypeOptions.map((eventType) => (
                  <Badge 
                    key={eventType}
                    bg={formData.eventTypes.includes(eventType) ? "primary" : "light"}
                    text={formData.eventTypes.includes(eventType) ? "white" : "dark"}
                    className="p-2 cursor-pointer"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleEventTypeChange(eventType)}
                  >
                    {formData.eventTypes.includes(eventType) && (
                      <i className="bi bi-check-circle-fill me-1"></i>
                    )}
                    {eventType}
                  </Badge>
                ))}
              </div>
              <Form.Text className="text-muted">
                Select all event types that you specialize in
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Services <span className="text-danger">*</span></Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="services"
                value={formData.services}
                onChange={handleChange}
                required
                placeholder="Describe your offered services in detail (or comma-separated list)"
              />
              <Form.Text className="text-muted">
                You can type a comma-separated list (e.g. Catering, Decoration) or describe services in detail.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location <span className="text-danger">*</span></Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-geo"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="City, State, Country"
                />
              </InputGroup>
              <Form.Text className="text-muted">
                Areas where you provide services
              </Form.Text>
            </Form.Group>
          </>
        );
      case 3:
        return (
          <>
            <div className="mb-4">
              <h5>Contact Information</h5>
              <p className="text-muted">How clients can reach you</p>
            </div>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-telephone"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your contact number"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Website</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-globe2"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://yourwebsite.com"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <div className="mb-3">
              <Form.Label>Social Media (Optional)</Form.Label>
              <InputGroup className="mb-2">
                <InputGroup.Text>
                  <i className="bi bi-instagram"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="socialMedia.instagram"
                  value={formData.socialMedia.instagram}
                  onChange={handleChange}
                  placeholder="Instagram username or URL"
                />
              </InputGroup>
              <InputGroup className="mb-2">
                <InputGroup.Text>
                  <i className="bi bi-facebook"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="socialMedia.facebook"
                  value={formData.socialMedia.facebook}
                  onChange={handleChange}
                  placeholder="Facebook profile or page URL"
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-linkedin"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="socialMedia.linkedin"
                  value={formData.socialMedia.linkedin}
                  onChange={handleChange}
                  placeholder="LinkedIn profile URL"
                />
              </InputGroup>
            </div>
            
            <div className="mt-4">
              <p className="mb-2">
                <i className="bi bi-info-circle-fill text-primary me-2"></i>
                After submission, our team will review your application and you'll receive a notification when approved.
              </p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="mb-2">Register as Event Organizer</h2>
                <p className="text-muted">Join our platform to showcase your event management services</p>
              </div>

              {message.text && (
                <Alert 
                  variant={message.type} 
                  dismissible 
                  onClose={() => setMessage({ text: '', type: '' })}
                  className="mb-4"
                >
                  <div className="d-flex align-items-center">
                    <i className={`bi ${message.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2`}></i>
                    <div>{message.text}</div>
                  </div>
                </Alert>
              )}

              {/* Progress bar */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="text-muted">Registration progress</small>
                  <Badge bg="primary" pill>{calculateCompletion()}%</Badge>
                </div>
                <ProgressBar 
                  now={calculateCompletion()}
                  variant={calculateCompletion() < 50 ? 'info' : calculateCompletion() < 100 ? 'primary' : 'success'}
                  style={{ height: '8px' }}
                />
              </div>

              {/* Step indicators */}
              <div className="d-flex justify-content-center mb-4">
                <div className="position-relative d-flex align-items-center">
                  {[1, 2, 3].map((step) => (
                    <React.Fragment key={step}>
                      <div 
                        className={`rounded-circle d-flex align-items-center justify-content-center ${
                          currentStep >= step ? 'bg-primary text-white' : 'bg-light text-muted'
                        }`}
                        style={{ width: '36px', height: '36px', cursor: 'pointer', zIndex: 1 }}
                        onClick={() => {
                          if (step < currentStep) {
                            setCurrentStep(step);
                          }
                        }}
                      >
                        {currentStep > step ? (
                          <i className="bi bi-check-lg"></i>
                        ) : (
                          step
                        )}
                      </div>
                      {step < 3 && (
                        <div 
                          className="flex-grow-1 mx-3" 
                          style={{ 
                            height: '2px', 
                            width: '50px',
                            backgroundColor: currentStep > step ? '#0d6efd' : '#e9ecef'
                          }}
                        ></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              
              <Form onSubmit={handleSubmit}>
                {renderStepContent()}
                
                <div className="d-flex justify-content-between mt-4">
                  {currentStep > 1 ? (
                    <Button 
                      variant="outline-secondary" 
                      onClick={prevStep}
                      disabled={isSubmitting}
                    >
                      <i className="bi bi-arrow-left me-1"></i> Back
                    </Button>
                  ) : (
                    <div></div> // Empty div to maintain spacing
                  )}
                  
                  {currentStep < totalSteps ? (
                    <Button 
                      variant="primary" 
                      onClick={nextStep}
                    >
                      Next <i className="bi bi-arrow-right ms-1"></i>
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      variant="success"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check2-circle me-1"></i> Submit Registration
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterOrganizer;
