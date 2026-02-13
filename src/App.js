import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import RegisterOrganizer from "./components/RegisterOrganizer";
import ClientDashboard from "./components/ClientDashboard";
import EventManagerDashboard from "./components/EventManagerDashboard";
import Notification from "./components/Notification";
import HirePage from "./components/HirePage"; // ✅ Import HirePage

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // ✅ Centralized role state
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  // ✅ Keep localStorage in sync when role changes
  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
  }, [role]);

  return (
    <Router>
      {/* Pass role + updater to Navbar */}
      <Navbar role={role} onRoleUpdate={setRole} />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

        {/* Register Organizer updates role globally */}
        <Route
          path="/register-organizer"
          element={<RegisterOrganizer onRoleUpdate={setRole} />}
        />

        {/* Public dashboard */}
        <Route path="/dashboard" element={<ClientDashboard />} />

        {/* Hire Page (accessible by both client & event manager) */}
        <Route path="/hire" element={<HirePage />} />

        {/* Protected routes for event manager */}
        <Route
          path="/event-manager-dashboard"
          element={
            <ProtectedRoute requiredRole="event_manager">
              <EventManagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute requiredRole="event_manager">
              <Notification />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
