import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
  Badge,
  Tabs,
  Tab,
  Spinner,
} from "react-bootstrap";
import { motion } from "framer-motion";
import YourWork from "./YourWork";

const EventManagerDashboard = () => {
  const navigate = useNavigate();

  // Role-based access control - redirect if not event_manager
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "event_manager") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const [username, setUsername] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshWorks, setRefreshWorks] = useState(false);
  const [activeTab, setActiveTab] = useState("portfolio");
  const [stats, setStats] = useState({
    totalWorks: 0,
    approvedWorks: 0,
    pendingWorks: 0,
  });

  const [newWork, setNewWork] = useState({
    category: "",
    title: "",
    description: "",
    images: "",
    tags: "",
    status: "pending",
  });

  useEffect(() => {
    // Fetch user info
    const storedUsername = localStorage.getItem("username") || "Event Manager";
    setUsername(storedUsername);

    // Get stats for the dashboard
    fetchStats();
  }, [refreshWorks]);

  // Fetch basic stats
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://evana-spk5.onrender.com/api/eventworks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        const works = response.data;
        const approved = works.filter((work) => work.status === "approved")
          .length;
        const pending = works.filter((work) => work.status === "pending").length;

        setStats({
          totalWorks: works.length,
          approvedWorks: approved,
          pendingWorks: pending,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleChange = (e) => {
    setNewWork({
      ...newWork,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddWork = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!newWork.category || !newWork.title) {
      setMessage({ text: "Category and Title are required.", type: "danger" });
      setIsSubmitting(false);
      return;
    }

    try {
      setMessage({ text: "", type: "" });
      const token = localStorage.getItem("token");

      // Process images and tags
      const imagesArray = newWork.images
        ? newWork.images.split(",").map((url) => url.trim())
        : [];

      const tagsArray = newWork.tags
        ? newWork.tags.split(",").map((tag) => tag.trim())
        : [];

      const response = await axios.post(
        "http://evana-spk5.onrender.com/api/eventworks",
        {
          category: newWork.category,
          title: newWork.title,
          description: newWork.description,
          images: imagesArray,
          tags: tagsArray,
          status: newWork.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setMessage({
          text: "Work added successfully! It will appear in your portfolio once reviewed.",
          type: "success",
        });
        setNewWork({
          category: "",
          title: "",
          description: "",
          images: "",
          tags: "",
          status: "pending",
        });
        setRefreshWorks((prev) => !prev); // Refresh works list

        // Auto-switch to portfolio tab after submission
        setTimeout(() => {
          setActiveTab("portfolio");
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      setMessage({
        text: `Failed to add work: ${
          error.response?.data?.message || "Please try again."
        }`,
        type: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear message after a certain time
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const StatCard = ({ title, value, icon, color }) => (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="h-100 shadow-sm border-0">
        <Card.Body className="d-flex align-items-center">
          <div className={`rounded-circle bg-${color} bg-opacity-10 p-3 me-3`}>
            <i className={`bi ${icon} fs-3 text-${color}`}></i>
          </div>
          <div>
            <h4 className="mb-0">{value}</h4>
            <p className="text-muted mb-0">{title}</p>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );

  return (
    <Container className="py-4">
      {/* Header section with greeting and stats */}
      <section className="mb-4">
        <Row className="align-items-center mb-4">
          <Col>
            <h1 className="display-5 fw-bold">Welcome, {username}</h1>
            <p className="text-muted lead">
              Manage your portfolio and showcase your professional work to potential clients.
            </p>
          </Col>
          <Col xs="auto">
            <Badge bg="primary" pill className="px-3 py-2">
              <i className="bi bi-person-circle me-2"></i>
              Professional Event Manager
            </Badge>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row className="g-4">
          <Col md={4}>
            <StatCard title="Total Works" value={stats.totalWorks} icon="bi-collection" color="primary" />
          </Col>
          <Col md={4}>
            <StatCard title="Approved Works" value={stats.approvedWorks} icon="bi-check-circle" color="success" />
          </Col>
          <Col md={4}>
            <StatCard title="Pending Review" value={stats.pendingWorks} icon="bi-hourglass-split" color="warning" />
          </Col>
        </Row>
      </section>

      {/* Tabs for different sections */}
      <Tabs activeKey={activeTab} onSelect={(key) => setActiveTab(key)} className="mb-4" fill>
        <Tab
          eventKey="portfolio"
          title={
            <>
              <i className="bi bi-grid-3x3-gap me-2"></i>Your Portfolio
            </>
          }
        >
          {/* YourWork component will fetch and show works */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <YourWork key={refreshWorks} />
          </motion.div>
        </Tab>

        <Tab
          eventKey="add-work"
          title={
            <>
              <i className="bi bi-plus-circle me-2"></i>Add New Work
            </>
          }
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h4 className="mb-4">Add New Work to Your Portfolio</h4>

                {message.text && (
                  <Alert variant={message.type} dismissible onClose={() => setMessage({ text: "", type: "" })}>
                    {message.text}
                  </Alert>
                )}

                <Form onSubmit={handleAddWork}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Category <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select name="category" value={newWork.category} onChange={handleChange} required>
                          <option value="">Select category</option>
                          <option value="photography">Photography</option>
                          <option value="catering">Catering</option>
                          <option value="decoration">Decoration</option>
                          <option value="entertainment">Entertainment</option>
                          <option value="venue">Venue Management</option>
                          <option value="other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Title <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="title"
                          value={newWork.title}
                          onChange={handleChange}
                          placeholder="Title of your work"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="description"
                      value={newWork.description}
                      onChange={handleChange}
                      placeholder="Describe your work in detail - mention your role, project scope, and outcomes"
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Images (comma-separated URLs)</Form.Label>
                        <Form.Control
                          type="text"
                          name="images"
                          value={newWork.images}
                          onChange={handleChange}
                          placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                        />
                        <Form.Text className="text-muted">Add multiple images by separating URLs with commas</Form.Text>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Tags (comma-separated)</Form.Label>
                        <Form.Control
                          type="text"
                          name="tags"
                          value={newWork.tags}
                          onChange={handleChange}
                          placeholder="wedding, corporate, outdoor, etc."
                        />
                        <Form.Text className="text-muted">Add tags to make your work more searchable</Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        setNewWork({
                          category: "",
                          title: "",
                          description: "",
                          images: "",
                          tags: "",
                          status: "pending",
                        });
                        setMessage({ text: "", type: "" });
                      }}
                      disabled={isSubmitting}
                      className="me-md-2"
                    >
                      Clear Form
                    </Button>
                    <Button type="submit" variant="primary" disabled={isSubmitting} className="px-4">
                      {isSubmitting ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-cloud-upload me-2"></i>
                          Add to Portfolio
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </motion.div>
        </Tab>
      </Tabs>

      {/* Footer */}
      <footer className="mt-5 pt-3 border-top text-center text-muted">
        <p className="small">© {new Date().getFullYear()} Event Management Platform</p>
      </footer>
    </Container>
  );
};

export default EventManagerDashboard;
