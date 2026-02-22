import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="py-5 bg-light" id="about">
      <div className="container">
        <div className="row align-items-center">
          
          {/* Enhanced Image Side */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="position-relative p-3">
              <div className="position-absolute top-0 start-0 bg-primary" style={{width: "30%", height: "30px"}}></div>
              <div className="position-absolute top-0 start-0 bg-primary" style={{width: "30px", height: "30%"}}></div>
              
              <img
                src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2VkZGluZyUyMGV2ZW50fGVufDB8fDB8fHww"
                alt="Event planning"
                className="img-fluid rounded shadow-lg w-100"
                style={{ objectFit: "cover", height: "350px" }}
              />
              
              <img
                src="https://images.unsplash.com/photo-1505236858219-8359eb29e329"
                alt="Event details"
                className="img-fluid rounded shadow-lg position-absolute"
                style={{ 
                  objectFit: "cover", 
                  width: "60%", 
                  height: "220px", 
                  bottom: "-10%", 
                  right: "-5%", 
                  border: "5px solid white"
                }}
              />
              
              <div className="position-absolute bottom-0 start-0 translate-middle-y bg-primary text-white px-4 py-2 rounded-end">
                <h5 className="mb-0">10+ Years Experience</h5>
              </div>
              
              <div className="position-absolute bottom-0 end-0 bg-primary opacity-75" style={{width: "20%", height: "5px", right: "20%"}}></div>
            </div>
          </div>
          
          {/* Text Side */}
          <div className="col-lg-6 ps-lg-5">
            <div className="mb-3">
              <span className="badge bg-primary px-3 py-2">About Us</span>
            </div>
            <h2 className="display-5 fw-bold mb-4">
              Transforming Ideas into <span className="text-primary">Unforgettable Events</span>
            </h2>
            
            <p className="lead mb-4">
              At <strong className="text-primary">Evana</strong>, we believe every event should be
              unforgettable and stress-free. Our platform connects clients with
              top-tier event managers, planners, and companies — all in one
              place.
            </p>
            
            <div className="row g-4 mt-3">
              <div className="col-md-6">
                <div className="d-flex">
                  <div className="flex-shrink-0 bg-primary bg-opacity-10 p-3 rounded-circle me-3 text-center" style={{width: "60px", height: "60px"}}>
                    <i className="bi bi-people-fill text-primary fs-4"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold">Expert Matching</h5>
                    <p className="text-muted">
                      Our admin-assisted matching ensures you connect with the perfect event professionals.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="d-flex">
                  <div className="flex-shrink-0 bg-primary bg-opacity-10 p-3 rounded-circle me-3 text-center" style={{width: "60px", height: "60px"}}>
                    <i className="bi bi-headset text-primary fs-4"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold">Dedicated Support</h5>
                    <p className="text-muted">
                      Enjoy seamless experiences with our integrated customer support at every step.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="d-flex">
                  <div className="flex-shrink-0 bg-primary bg-opacity-10 p-3 rounded-circle me-3 text-center" style={{width: "60px", height: "60px"}}>
                    <i className="bi bi-laptop text-primary fs-4"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold">Tech-Powered</h5>
                    <p className="text-muted">
                      We leverage cutting-edge technology to streamline planning from concept to execution.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="d-flex">
                  <div className="flex-shrink-0 bg-primary bg-opacity-10 p-3 rounded-circle me-3 text-center" style={{width: "60px", height: "60px"}}>
                    <i className="bi bi-lightbulb text-primary fs-4"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold">Creative Excellence</h5>
                    <p className="text-muted">
                      Your special moments deserve nothing less than perfect, backed by our creative expertise.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-5">
              <Link 
                to="/#services" 
                className="btn btn-primary btn-lg rounded-pill px-4"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;