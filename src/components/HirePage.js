import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Badge, Spinner } from "react-bootstrap";
import axios from "axios";

const HirePage = () => {
  const [allEventManagers, setAllEventManagers] = useState([]); // All fetched from backend
  const [filteredManagers, setFilteredManagers] = useState([]); // After applying filters
  const [filters, setFilters] = useState({ purpose: "", location: "" });
  const [loading, setLoading] = useState(false);
  const [hireLoading, setHireLoading] = useState(null);

  // ✅ Use exact same values as registered event managers
  const purposes = [
    "Weddings", "Corporate Events", "Birthday Parties", "Photography", "Concerts", "Exhibitions"
  ];

  const fetchEventManagers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5001/api/event-manager", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAllEventManagers(res.data || []);
      setFilteredManagers(res.data || []);
    } catch (err) {
      console.error("Error fetching event managers:", err);
      setAllEventManagers([]);
      setFilteredManagers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventManagers();
  }, []);

  // ✅ Apply filters whenever filters change
  useEffect(() => {
    let filtered = [...allEventManagers];

    // Filter by purpose (eventTypes)
    if (filters.purpose) {
      const purposeLower = filters.purpose.toLowerCase();
      filtered = filtered.filter(manager =>
        manager.eventTypes.some(et => et.toLowerCase() === purposeLower)
      );
    }

    // Filter by location (case-insensitive partial match)
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filtered = filtered.filter(manager =>
        manager.location.toLowerCase().includes(locationLower)
      );
    }

    setFilteredManagers(filtered);
  }, [filters, allEventManagers]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleHire = async (managerId) => {
    setHireLoading(managerId);
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5001/api/hire-request", {
        eventManagerId: managerId,
        purpose: filters.purpose
      }, { headers: { Authorization: `Bearer ${token}` }});
      alert("Hire request sent!");
    } catch (err) {
      console.error("Hire request failed:", err);
      alert("Failed to send hire request.");
    } finally {
      setHireLoading(null);
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">Hire Event Manager</h2>

      {/* Filters */}
      <Form className="mb-4">
        <Row className="g-3">
          <Col md={4}>
            <Form.Select name="purpose" value={filters.purpose} onChange={handleFilterChange}>
              <option value="">Select Purpose</option>
              {purposes.map(p => <option key={p} value={p}>{p}</option>)}
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Location"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
            />
          </Col>
        </Row>
      </Form>

      {/* Event Manager Cards */}
      <Row>
        {loading ? (
          <div className="text-center w-100">
            <Spinner animation="border" />
          </div>
        ) : filteredManagers.length === 0 ? (
          <p>No event managers found.</p>
        ) : (
          filteredManagers.map(manager => (
            <Col md={4} key={manager._id} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>{manager.type === "company" ? manager.companyName : manager.username}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{manager.type}</Card.Subtitle>
                  <p>{manager.bio}</p>
                  <p><strong>Services:</strong> {manager.services.join(", ")}</p>
                  <p>
                    <strong>Event Types:</strong>{" "}
                    {manager.eventTypes.map((et, i) => (
                      <Badge key={i} bg="primary" className="me-1">{et}</Badge>
                    ))}
                  </p>
                  <p><strong>Location:</strong> {manager.location}</p>
                  <Button 
                    variant="success" 
                    onClick={() => handleHire(manager._id)}
                    disabled={hireLoading === manager._id}
                  >
                    {hireLoading === manager._id ? "Sending..." : "Hire"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default HirePage;
