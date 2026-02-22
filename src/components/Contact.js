import React from "react";

const Contact = () => {
  return (
    <section className="py-5 bg-light" id="contact">
      <div className="container py-4">
        {/* Section Header with Decorative Elements */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-7 text-center position-relative">
            {/* Decorative Element - Left */}
            <div className="position-absolute top-0 start-0 translate-middle d-none d-lg-block">
              <div
                className="bg-primary rounded-circle opacity-10"
                style={{ width: "60px", height: "60px" }}
              ></div>
            </div>

            <span className="badge bg-primary px-3 py-2 mb-3">
              Get In Touch
            </span>
            <h2 className="display-5 fw-bold mb-4">
              Contact <span className="text-primary">Us</span>
            </h2>
            <p className="lead text-muted mb-0">
              Have questions or need assistance? Feel free to reach out. We'll
              get back to you as soon as possible.
            </p>

            {/* Decorative Element - Right */}
            <div className="position-absolute bottom-0 end-0 translate-middle-y d-none d-lg-block">
              <div className="d-flex">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="me-2">
                    {[...Array(2)].map((_, j) => (
                      <div
                        key={j}
                        className="bg-primary opacity-25 rounded-circle mb-2"
                        style={{ width: "8px", height: "8px" }}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 justify-content-center align-items-center">
          {/* Contact Information Cards */}
          <div className="col-lg-5 col-xl-4 order-lg-2">
            <div className="row g-4">
              {/* Email */}
              <div className="col-md-6 col-lg-12">
                <div className="card border-0 shadow-sm h-100 rounded-4">
                  <div className="card-body p-4 d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                      <i className="bi bi-envelope text-primary fs-4"></i>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">Email Us</h5>
                      <p className="text-muted mb-0">
                        support@example.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="col-md-6 col-lg-12">
                <div className="card border-0 shadow-sm h-100 rounded-4">
                  <div className="card-body p-4 d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                      <i className="bi bi-telephone text-primary fs-4"></i>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">Call Us</h5>
                      <p className="text-muted mb-0">
                        +91 98765 43210
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="col-md-12 d-md-none d-lg-block">
                <div className="card border-0 shadow-sm h-100 rounded-4">
                  <div className="card-body p-4 d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                      <i className="bi bi-geo-alt text-primary fs-4"></i>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">Visit Us</h5>
                      <p className="text-muted mb-0">
                        123 Event Street, Bangalore, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7 col-xl-6 order-lg-1">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="bg-primary p-1"></div>

              <div className="card-body p-4 p-lg-5">
                <h4 className="fw-bold mb-4">Send Us a Message</h4>
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingName"
                          placeholder="Your Name"
                        />
                        <label htmlFor="floatingName">
                          Your Name
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          id="floatingEmail"
                          placeholder="Your Email"
                        />
                        <label htmlFor="floatingEmail">
                          Your Email
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingSubject"
                          placeholder="Subject"
                        />
                        <label htmlFor="floatingSubject">
                          Subject
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <textarea
                          className="form-control"
                          id="floatingMessage"
                          placeholder="Your Message"
                          style={{ height: "140px" }}
                        ></textarea>
                        <label htmlFor="floatingMessage">
                          Your Message
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg rounded-pill py-3"
                        >
                          <i className="bi bi-send me-2"></i>
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="row mt-5">
          <div className="col-12 text-center">
            <h5 className="fw-bold mb-4">
              Connect With Us
            </h5>
            <div className="d-flex justify-content-center gap-3">
              {["facebook", "twitter", "instagram", "linkedin"].map(
                (social, index) => (
                  <a
                    key={index}
                    href={`https://${social}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-light rounded-circle shadow-sm p-3 d-flex align-items-center justify-content-center"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <i
                      className={`bi bi-${social} text-primary fs-5`}
                    ></i>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;