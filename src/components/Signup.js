import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        // Show success alert
        document.getElementById("successAlert").classList.remove("d-none");
        setTimeout(() => {
          document.getElementById("successAlert").classList.add("d-none");
        }, 5000);
      } else {
        // Show error alert
        document.getElementById("errorMessage").innerText = data.message || "Signup failed";
        document.getElementById("errorAlert").classList.remove("d-none");
        setTimeout(() => {
          document.getElementById("errorAlert").classList.add("d-none");
        }, 5000);
      }
    } catch (err) {
      console.error(err);
      document.getElementById("errorMessage").innerText = "Something went wrong";
      document.getElementById("errorAlert").classList.remove("d-none");
      setTimeout(() => {
        document.getElementById("errorAlert").classList.add("d-none");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5 bg-light" id="signup">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-6">
            {/* Card with shadow */}
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              {/* Colored top accent */}
              <div className="bg-primary p-1"></div>
              
              <div className="card-body p-4 p-lg-5">
                {/* Form header */}
                <div className="text-center mb-4">
                  <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 p-3 rounded-circle mb-3">
                    <i className="bi bi-person-plus text-primary fs-3"></i>
                  </div>
                  <h2 className="fw-bold">Create Account</h2>
                  <p className="text-muted">Join Evana to start planning your events</p>
                </div>
                
                {/* Alert boxes */}
                <div className="alert alert-success d-none" role="alert" id="successAlert">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Account created successfully! Redirecting...
                </div>
                
                <div className="alert alert-danger d-none" role="alert" id="errorAlert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <span id="errorMessage">Signup failed</span>
                </div>
                
                {/* Signup form */}
                <form onSubmit={handleSubmit}>
                  {/* Name field */}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingName"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="floatingName">
                      <i className="bi bi-person me-2 text-muted"></i>
                      Full Name
                    </label>
                  </div>
                  
                  {/* Email field */}
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingEmail"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="floatingEmail">
                      <i className="bi bi-envelope me-2 text-muted"></i>
                      Email Address
                    </label>
                  </div>
                  
                  {/* Password field */}
                  <div className="form-floating mb-3 position-relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className="form-control"
                      id="floatingPassword"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength="6"
                    />
                    <label htmlFor="floatingPassword">
                      <i className="bi bi-lock me-2 text-muted"></i>
                      Password
                    </label>
                    <button 
                      type="button"
                      className="btn position-absolute top-50 end-0 translate-middle-y me-2 text-muted border-0 bg-transparent"
                      onClick={togglePasswordVisibility}
                    >
                      <i className={`bi ${passwordVisible ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                  </div>
                  
                  {/* Confirm Password field */}
                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingConfirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="floatingConfirmPassword">
                      <i className="bi bi-shield-lock me-2 text-muted"></i>
                      Confirm Password
                    </label>
                  </div>
                  
                  {/* Terms checkbox */}
                  <div className="form-check mb-4">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="termsCheck" 
                      required
                    />
                    <label className="form-check-label text-muted" htmlFor="termsCheck">
                      I agree to the <a href="#" className="text-decoration-none">Terms of Service</a> and <a href="#" className="text-decoration-none">Privacy Policy</a>
                    </label>
                  </div>
                  
                  {/* Submit button */}
                  <div className="d-grid">
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg rounded-pill py-3"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-person-plus me-2"></i>
                          Sign Up
                        </>
                      )}
                    </button>
                  </div>
                </form>
                
                {/* Social signup options */}
                <div className="my-4 position-relative">
                  <hr/>
                  <div className="position-absolute top-50 start-50 translate-middle bg-white px-3">
                    <span className="text-muted">or sign up with</span>
                  </div>
                </div>
                
                <div className="row g-2 mb-4">
                  <div className="col-6">
                    <a href="#" className="btn btn-outline-secondary w-100 rounded-pill">
                      <i className="bi bi-google me-2"></i>
                      Google
                    </a>
                  </div>
                  <div className="col-6">
                    <a href="#" className="btn btn-outline-secondary w-100 rounded-pill">
                      <i className="bi bi-facebook me-2"></i>
                      Facebook
                    </a>
                  </div>
                </div>
                
                {/* Login link */}
                <div className="text-center mt-4">
                  <p className="mb-0 text-muted">
                    Already have an account? <a href="/login" className="text-decoration-none fw-semibold">Log In</a>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Security note */}
            <div className="text-center mt-3">
              <small className="text-muted d-flex align-items-center justify-content-center">
                <i className="bi bi-shield-lock me-1"></i>
                Your information is secure and encrypted
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
