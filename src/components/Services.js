import React from "react";


const Services = () => {
  const serviceItems = [
    {
      icon: "bi bi-calendar-event",
      title: "Event Planning",
      description:
        "From corporate events to weddings, we handle every detail with perfection.",
      color: "primary",
    },
    {
      icon: "bi bi-people",
      title: "Event Manager Hiring",
      description:
        "Get matched with top-rated event managers who suit your requirements.",
      color: "success",
    },
    {
      icon: "bi bi-lightbulb",
      title: "Creative Ideas",
      description:
        "We bring fresh, innovative ideas to make your events stand out.",
      color: "warning",
    },
    {
      icon: "bi bi-headset",
      title: "24/7 Support",
      description:
        "Our team is here to assist you anytime — before, during, and after your event.",
      color: "info",
    },
  ];

  return (
    <section className="py-5 bg-light" id="services">
      <div className="container py-4">
        {/* Section Header */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center position-relative">
            <span className="badge bg-primary px-3 py-2 mb-3">
              Our Services
            </span>
            <h2 className="display-5 fw-bold mb-4">
              Comprehensive <span className="text-primary">Event Solutions</span>
            </h2>
            <p className="lead text-muted mb-0 px-lg-5">
              At Evana, we connect you with the best event managers to make your
              dream event a reality. From planning to execution — we've got you covered.
            </p>
          </div>
        </div>

        {/* Services Cards */}
        <div className="row g-4">
          {serviceItems.map((service, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                
                <div className={`bg-${service.color} p-1`}></div>

                <div className="card-body p-4 text-center p-lg-5">

                  {/* FIXED ICON */}
                  <div
                    className={`d-inline-flex align-items-center justify-content-center bg-${service.color} bg-opacity-10 p-3 rounded-circle mb-4`}
                    style={{ width: "80px", height: "80px" }}
                  >
                    <i className={`${service.icon} text-${service.color} fs-1`}></i>
                  </div>

                  <h3 className="h4 fw-bold mb-3">{service.title}</h3>
                  <p className="text-muted mb-4">{service.description}</p>

                  {/* FIXED BUTTON (no href="#") */}
                  <button
                    type="button"
                    className={`btn btn-sm btn-outline-${service.color} rounded-pill px-4 mt-auto`}
                  >
                    Learn More{" "}
                    <i className="bi bi-arrow-right ms-1"></i>
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="row mt-5 pt-3">
          <div className="col-12 text-center">
            <div
              className="py-4 px-3 px-md-5 rounded-4 shadow-sm"
              style={{
                background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
              }}
            >
              <h3 className="fw-bold mb-3">
                Ready to Create Your Dream Event?
              </h3>
              <p
                className="text-muted mb-4 px-md-5 mx-auto"
                style={{ maxWidth: "700px" }}
              >
                Let us help you plan and execute your next unforgettable event
                with our network of top-tier event professionals
              </p>

              {/* THIS IS CORRECT */}
              <a
                href="#contact"
                className="btn btn-primary btn-lg rounded-pill px-5 py-2"
              >
                Get Started{" "}
                <i className="bi bi-arrow-right ms-2"></i>
              </a>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;