import React, { useState, useEffect } from 'react';
import { Container, Badge, Card, Row, Col, Button, Spinner, Dropdown, Alert } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';



// Sample data - replace with your API call
const dummyNotifications = [
  {
    id: '1',
    title: 'Booking Confirmed',
    message: 'Your booking with ABC Event Manager is confirmed for August 15th. Please check your email for details.',
    read: false,
    createdAt: '2025-08-10T12:00:00.000Z',
    type: 'success',
    actionable: true,
    action: 'View Booking'
  },
  {
    id: '2',
    title: 'New Message',
    message: 'You have received a new message from XYZ regarding your upcoming event collaboration.',
    read: true,
    createdAt: '2025-08-09T15:30:00.000Z',
    type: 'info',
    actionable: true,
    action: 'Read Message'
  },
  {
    id: '3',
    title: 'Profile Approved',
    message: 'Your Event Manager profile has been approved by Admin. You can now access all platform features.',
    read: false,
    createdAt: '2025-08-08T09:45:00.000Z',
    type: 'success',
    actionable: false
  },
  {
    id: '4',
    title: 'System Maintenance',
    message: 'The platform will undergo maintenance on August 12th from 2:00 AM to 4:00 AM UTC.',
    read: true,
    createdAt: '2025-08-07T11:20:00.000Z',
    type: 'warning',
    actionable: false
  }
];

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching notifications (replace with your API call)
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Set notifications from dummy data
        setNotifications(dummyNotifications);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to load notifications. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const handleAction = (id, action) => {
    // You would implement specific actions here
    console.log(`Performing action "${action}" for notification ${id}`);
    alert(`Action triggered: ${action}`);
    
    // Mark as read when action is taken
    markAsRead(id);
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'success':
        return <i className="bi bi-check-circle-fill text-success me-2"></i>;
      case 'warning':
        return <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>;
      case 'danger':
        return <i className="bi bi-x-circle-fill text-danger me-2"></i>;
      case 'info':
      default:
        return <i className="bi bi-info-circle-fill text-info me-2"></i>;
    }
  };

  // Filter notifications based on selected filter
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true; // 'all' filter
  });

  const unreadCount = notifications.filter(notification => !notification.read).length;

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading notifications...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
          <div className="d-flex justify-content-end">
            <Button onClick={() => window.location.reload()} variant="outline-danger">
              <i className="bi bi-arrow-clockwise me-2"></i>
              Retry
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="mb-1">
            Notifications 
            {unreadCount > 0 && (
              <Badge bg="danger" className="ms-2 rounded-pill">
                {unreadCount} new
              </Badge>
            )}
          </h2>
          <p className="text-muted">
            {notifications.length === 0
              ? "You're all caught up!"
              : `You have ${notifications.length} notification${notifications.length !== 1 ? 's' : ''}`}
          </p>
        </Col>
        <Col xs="auto">
          <div className="d-flex gap-2">
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-filter" size="sm">
                <i className="bi bi-funnel me-1"></i>
                {filter === 'all' ? 'All' : filter === 'unread' ? 'Unread' : 'Read'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFilter('all')} active={filter === 'all'}>All</Dropdown.Item>
                <Dropdown.Item onClick={() => setFilter('unread')} active={filter === 'unread'}>Unread</Dropdown.Item>
                <Dropdown.Item onClick={() => setFilter('read')} active={filter === 'read'}>Read</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" id="dropdown-actions" size="sm">
                <i className="bi bi-gear me-1"></i>
                Actions
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={markAllAsRead} disabled={unreadCount === 0}>
                  <i className="bi bi-check-all me-2"></i>
                  Mark all as read
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={clearAllNotifications} disabled={notifications.length === 0} className="text-danger">
                  <i className="bi bi-trash me-2"></i>
                  Clear all
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>

      {notifications.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-5 mt-4 bg-light rounded shadow-sm"
        >
          <i className="bi bi-bell-slash" style={{ fontSize: "3rem", color: "#6c757d" }}></i>
          <h4 className="mt-3">No notifications</h4>
          <p className="text-muted">You don't have any notifications right now.</p>
        </motion.div>
      ) : filteredNotifications.length === 0 ? (
        <Alert variant="info">
          No {filter} notifications found.
          {filter !== 'all' && (
            <Button 
              variant="link" 
              className="p-0 ms-2" 
              onClick={() => setFilter('all')}
            >
              View all
            </Button>
          )}
        </Alert>
      ) : (
        <AnimatePresence>
          {filteredNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              layout
            >
              <Card 
                className={`mb-3 shadow-sm ${!notification.read ? 'border-start border-4 border-primary' : ''}`}
              >
                <Card.Body>
                  <Row>
                    <Col>
                      <div className="d-flex align-items-start">
                        {getTypeIcon(notification.type)}
                        <div>
                          <div className="d-flex align-items-center">
                            <h5 className={`mb-1 ${!notification.read ? 'fw-bold' : ''}`}>
                              {notification.title}
                            </h5>
                            {!notification.read && (
                              <Badge bg="primary" pill className="ms-2">New</Badge>
                            )}
                          </div>
                          <p className="mb-1">{notification.message}</p>
                          <small className="text-muted">
                            {formatTimeAgo(notification.createdAt)}
                          </small>
                        </div>
                      </div>
                    </Col>
                    <Col xs="auto" className="d-flex align-items-center">
                      <div className="d-flex gap-2">
                        {notification.actionable && (
                          <Button 
                            size="sm" 
                            variant="outline-primary"
                            onClick={() => handleAction(notification.id, notification.action)}
                          >
                            {notification.action}
                          </Button>
                        )}
                        {!notification.read && (
                          <Button 
                            size="sm" 
                            variant="outline-secondary"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <i className="bi bi-check2"></i>
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline-danger"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </Container>
  );
};

export default Notification;