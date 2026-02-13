import React, { useEffect, useState } from 'react';
import './ClientDashboard.css'; // We'll create this stylesheet next

/**
 * Client Dashboard component for managing user bookings and profile
 */
const ClientDashboard = () => {
  // State management
  const [userData, setUserData] = useState({
    username: '',
    isLoaded: false
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data and bookings
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load username from localStorage with fallback
        const storedUsername = localStorage.getItem('username') || 'Guest';
        setUserData({
          username: storedUsername,
          isLoaded: true
        });

        // Simulate API fetch with timeout
        // In production, replace with actual API call
        setTimeout(() => {
          // Example API call structure:
          // const response = await fetch('/api/bookings');
          // const data = await response.json();
          // setBookings(data);
          
          setBookings([
            { 
              id: 1, 
              event: 'Wedding Reception', 
              date: '2025-09-15',
              status: 'confirmed',
              location: 'Grand Hall'
            },
            { 
              id: 2, 
              event: 'Corporate Meeting', 
              date: '2025-10-03',
              status: 'pending',
              location: 'Conference Room B'
            },
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to format date in a more readable way
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle booking cancellation
  const handleCancelBooking = (id) => {
    // In production, make an API call to cancel booking
    // For now, just filter it out from state
    setBookings(bookings.filter(booking => booking.id !== id));
  };

  // Render loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="error-container">
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button 
          className="btn btn-primary" 
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  // Get upcoming and past bookings
  const currentDate = new Date();
  const upcomingBookings = bookings.filter(
    booking => new Date(booking.date) >= currentDate
  );
  const pastBookings = bookings.filter(
    booking => new Date(booking.date) < currentDate
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome, {userData.username}!</h2>
        <p className="dashboard-subtitle">Manage your bookings and profile</p>
      </header>

      <section className="dashboard-stats">
        <div className="stat-card">
          <h4>Total Bookings</h4>
          <p className="stat-number">{bookings.length}</p>
        </div>
        <div className="stat-card">
          <h4>Upcoming</h4>
          <p className="stat-number">{upcomingBookings.length}</p>
        </div>
      </section>

      <section className="bookings-section">
        <h3>Your Upcoming Bookings</h3>
        {upcomingBookings.length === 0 ? (
          <div className="empty-state">
            <p>You have no upcoming bookings.</p>
            <button className="btn btn-primary">Make a Reservation</button>
          </div>
        ) : (
          <div className="booking-cards">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-header">
                  <h4>{booking.event}</h4>
                  <span className={`status-badge ${booking.status}`}>
                    {booking.status}
                  </span>
                </div>
                <div className="booking-details">
                  <p><i className="calendar-icon"></i> {formatDate(booking.date)}</p>
                  <p><i className="location-icon"></i> {booking.location}</p>
                </div>
                <div className="booking-actions">
                  <button className="btn btn-outline">View Details</button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {pastBookings.length > 0 && (
        <section className="bookings-section past-bookings">
          <h3>Past Bookings</h3>
          <div className="booking-list">
            {pastBookings.map((booking) => (
              <div key={booking.id} className="booking-list-item">
                <div className="booking-list-details">
                  <h5>{booking.event}</h5>
                  <p>{formatDate(booking.date)} - {booking.location}</p>
                </div>
                <button className="btn btn-sm btn-outline">Leave Review</button>
              </div>
            ))}
          </div>
        </section>
      )}
      
      <section className="profile-section">
        <h3>Account Settings</h3>
        <div className="settings-buttons">
          <button className="btn btn-outline">Edit Profile</button>
          <button className="btn btn-outline">Change Password</button>
          <button className="btn btn-outline">Notification Preferences</button>
        </div>
      </section>
    </div>
  );
};

export default ClientDashboard;