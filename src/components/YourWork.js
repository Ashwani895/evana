import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Badge, Spinner, Alert, Button } from "react-bootstrap";


const YourWork = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchWorks = async () => {
    try {
      setRefreshing(true);
      setError(null);

      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:5001/api/eventworks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWorks(response.data);
    } catch (err) {
      console.error("Error fetching works:", err);
      setError("Failed to fetch works. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  const handleRefresh = () => {
    fetchWorks();
  };

  // Function to truncate text with ellipsis
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Function to get status badge color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "danger";
      default:
        return "secondary";
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
        <div className="text-center">
          <Spinner animation="border" variant="primary" className="mb-2" />
          <p className="text-muted">Loading your works...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger" className="shadow-sm">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="outline-danger" onClick={handleRefresh}>Try Again</Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Your Works</h2>
          <p className="text-muted">
            {works.length === 0
              ? "You haven't posted any works yet"
              : `Showing ${works.length} work${works.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <Button 
          variant="outline-primary" 
          onClick={handleRefresh} 
          disabled={refreshing}
          className="d-flex align-items-center"
        >
          {refreshing ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
              Refreshing...
            </>
          ) : (
            "Refresh"
          )}
        </Button>
      </div>

      {works.length === 0 ? (
        <div className="text-center py-5 my-4 bg-light rounded shadow-sm">
          <i className="bi bi-archive" style={{ fontSize: "3rem", color: "#6c757d" }}></i>
          <h4 className="mt-3">No Works Found</h4>
          <p className="text-muted">You haven't posted any works yet. Create your first work to see it here.</p>
          <Button variant="primary">Create New Work</Button>
        </div>
      ) : (
        <Row>
          {works.map((work) => (
            <Col key={work._id} lg={4} md={6} sm={12} className="mb-4">
              <Card className="h-100 shadow-sm hover-shadow transition-all">
                {work.status && (
                  <Badge 
                    bg={getStatusColor(work.status)} 
                    className="position-absolute m-2 px-2 py-1"
                  >
                    {work.status}
                  </Badge>
                )}
                {work.images && work.images.length > 0 ? (
                  <Card.Img
                    variant="top"
                    src={work.images[0]}
                    alt={work.title}
                    style={{ height: "200px", objectFit: "cover" }}
                    className="img-fluid"
                  />
                ) : (
                  <div 
                    className="d-flex justify-content-center align-items-center bg-light text-muted"
                    style={{ height: "150px" }}
                  >
                    <span>No image available</span>
                  </div>
                )}
                <Card.Body>
                  <div className="d-flex justify-content-between mb-2">
                    <Badge bg="info" className="text-capitalize px-2 py-1">
                      {work.category}
                    </Badge>
                    {work.date && (
                      <small className="text-muted">
                        {new Date(work.date).toLocaleDateString()}
                      </small>
                    )}
                  </div>
                  <Card.Title>{work.title}</Card.Title>
                  <Card.Text>
                    {truncateText(work.description, 100)}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="bg-white">
                  <Button variant="outline-primary" size="sm" className="w-100">
                    View Details
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <style jsx>{`
        .hover-shadow:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        }
        .transition-all {
          transition: all 0.3s ease;
        }
      `}</style>
    </Container>
  );
};

export default YourWork;