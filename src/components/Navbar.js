import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import evanaLogo from "../images/evana.png";
import axios from "axios";

const Navbar = ({ onRoleUpdate }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [isEventManagerRegistered, setIsEventManagerRegistered] = useState(false);

  useEffect(() => {
    const onStorageChange = () => {
      setToken(localStorage.getItem("token"));
      setUsername(localStorage.getItem("username"));
      setRole(localStorage.getItem("role"));
    };
    window.addEventListener("storage", onStorageChange);
    onStorageChange();
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  useEffect(() => {
    const fetchEventManagerStatus = async () => {
      if (!token) {
        setIsEventManagerRegistered(false);
        return;
      }

      try {
        const res = await axios.get("https://evana-spk5.onrender.com/api/event-manager/status", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.registered) {
          setIsEventManagerRegistered(true);
          if (role !== "event_manager") {
            setRole("event_manager");
            localStorage.setItem("role", "event_manager");
            onRoleUpdate && onRoleUpdate("event_manager");
          }
        } else {
          setIsEventManagerRegistered(false);
        }
      } catch (err) {
        console.error("Failed to fetch event manager status:", err);
        setIsEventManagerRegistered(false);
      }
    };

    fetchEventManagerStatus();
  }, [token, role, onRoleUpdate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setToken(null);
    setUsername(null);
    setRole(null);
    setIsEventManagerRegistered(false);
    onRoleUpdate && onRoleUpdate(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-black fs-3 d-flex align-items-center" to="/">
          <img src={evanaLogo} alt="Evana Logo" style={{ height: "40px", marginRight: "8px" }} />
          Evana
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link text-black" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link text-black" to="/services">Services</Link></li>
            <li className="nav-item"><Link className="nav-link text-black" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link text-black" to="/contact">Contact</Link></li>

            {/* 🔹 Hire Section visible for all logged-in users */}
            {token && (
              <li className="nav-item">
                <Link className="nav-link text-black fw-bold" to="/hire">Hire</Link>
              </li>
            )}
          </ul>

          <div className="input-group mx-3" style={{ maxWidth: "550px", flexGrow: 1 }}>
            <input type="search" className="form-control" placeholder="Search events or managers..." aria-label="Search" />
            <span className="input-group-text bg-white border-start-0"><i className="fas fa-search"></i></span>
          </div>

          <div className="dropdown me-3">
            <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="locationDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              Select Location
            </button>
            <ul className="dropdown-menu" aria-labelledby="locationDropdown">
              <li><button className="dropdown-item">Bangalore</button></li>
              <li><button className="dropdown-item">Delhi</button></li>
              <li><button className="dropdown-item">Mumbai</button></li>
            </ul>
          </div>

          {!token ? (
            <>
              <Link to="/signup" className="btn btn-dark me-2">Signup</Link>
              <Link to="/login" className="btn btn-outline-dark">Login</Link>
            </>
          ) : (
            <div className="dropdown">
              <button className="btn btn-outline-dark dropdown-toggle d-flex align-items-center" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false" style={{ gap: "0.5rem" }}>
                <i className="fas fa-user-circle" style={{ fontSize: "1.3rem" }}></i>
                {username || "User"}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>

                {isEventManagerRegistered && (
                  <li><Link className="dropdown-item" to="/event-manager-dashboard">Event Manager Dashboard</Link></li>
                )}

                {!isEventManagerRegistered && (
                  <li><Link className="dropdown-item" to="/register-organizer">Register as Event Organizer</Link></li>
                )}

                <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                <li><Link className="dropdown-item" to="/my-bookings">My Bookings</Link></li>
                <li><Link className="dropdown-item" to="/notifications">Notifications</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
