import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/265947/pexels-photo-265947.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          color: "white",
        }}
        className="d-flex align-items-center justify-content-center text-center"
      >
        <div style={{ backgroundColor: "rgba(0,0,0,0.5)", padding: "20px" }}>
          <h1 className="display-4 fw-bold">Welcome to Evana</h1>
          <p className="lead">
            Your ultimate destination to connect with the best event managers
            and organizers near you.
          </p>
          <button className="btn btn-danger btn-lg mt-3">Explore Events</button>
        </div>
      </section>

      {/* Sliding Ads Section */}
      <section className="mt-5 container">
        <h2 className="mb-4 fw-bold">Featured Ads</h2>
        <div
          id="adsCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="3000"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#adsCarousel"
              data-bs-slide-to="0"
              className="active"
            ></button>
            <button
              type="button"
              data-bs-target="#adsCarousel"
              data-bs-slide-to="1"
            ></button>
            <button
              type="button"
              data-bs-target="#adsCarousel"
              data-bs-slide-to="2"
            ></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1531058020387-3be344556be6"
                className="d-block w-100"
                style={{ height: "300px", objectFit: "cover" }}
                alt="Ad 1"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1718568081670-47b9a0ee772d?w=900&auto=format&fit=crop&q=60"
                className="d-block w-100"
                style={{ height: "300px", objectFit: "cover" }}
                alt="Ad 2"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1524824267900-2fa9cbf7a506?w=900&auto=format&fit=crop&q=60"
                className="d-block w-100"
                style={{ height: "300px", objectFit: "cover" }}
                alt="Ad 3"
              />
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#adsCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#adsCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </section>

      {/* Popular Event Companies */}
      <section className="mt-5 container">
        <h2 className="mb-4 fw-bold">Popular Event Companies</h2>
        <div className="row g-4">
          {[
            {
              name: "Dream Events",
              img: "https://images.unsplash.com/photo-1511578314322-379afb476865",
            },
            {
              name: "Royal Weddings",
              img: "https://images.unsplash.com/photo-1625076932159-61a032e2b7ad?w=900&auto=format&fit=crop&q=60",
            },
            {
              name: "Party Planners Pro",
              img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
            },
          ].map((company, index) => (
            <div className="col-md-4" key={index}>
              <div className="card shadow-lg border-0">
                <img
                  src={company.img}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  alt={company.name}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{company.name}</h5>
                  <p className="card-text">
                    We specialize in making your events unforgettable.
                  </p>
                  <button className="btn btn-primary">View Profile</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Organizers in Your City */}
      <section className="mt-5 container">
  <h2 className="mb-4 fw-bold">Organizers in Your City</h2>
  <div
    id="organizersCarousel"
    className="carousel slide"
    data-bs-ride="carousel"
  >
    <div className="carousel-inner">
      {[
        { name: "Rajesh Kumar", spec: "Wedding Photography", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e" },
        { name: "Meera Patel", spec: "Catering Services", img: "https://images.unsplash.com/photo-1543353071-873f17a7a088" },
        { name: "Anil Verma", spec: "Cinematic Reels", img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
        { name: "Sunita Rao", spec: "Birthday Planning", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba" },
        { name: "Karan Singh", spec: "Corporate Events", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d" },
        { name: "Pooja Mehta", spec: "Floral Decoration", img: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5" },
        { name: "Ajay Sharma", spec: "Destination Weddings", img: "https://images.unsplash.com/photo-1521310192545-4ac7951413d0" },
        { name: "Sneha Kapoor", spec: "Live Music", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d" },
        { name: "Ravi Yadav", spec: "Stage Setup", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d" },
        { name: "Neha Bansal", spec: "Event Anchoring", img: "https://images.unsplash.com/photo-1544717305-2782549b5136" },
      ]
        .reduce((acc, _, i, arr) => {
          if (i % 5 === 0) acc.push(arr.slice(i, i + 5));
          return acc;
        }, [])
        .map((group, idx) => (
          <div
            className={`carousel-item ${idx === 0 ? "active" : ""}`}
            key={idx}
          >
            <div className="row">
              {group.map((org, index) => (
                <div className="col-md-2 mx-auto" key={index}>
                  <div className="card shadow-sm border-0">
                    <img
                      src={org.img}
                      className="card-img-top"
                      style={{ height: "150px", objectFit: "cover" }}
                      alt={org.name}
                    />
                    <div className="card-body text-center">
                      <h6 className="fw-bold">{org.name}</h6>
                      <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                        {org.spec}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>

    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#organizersCarousel"
      data-bs-slide="prev"
    >
      <span className="carousel-control-prev-icon"></span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#organizersCarousel"
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon"></span>
    </button>
  </div>
</section>


      {/* Testimonials */}
      <section className="mt-5 container mb-5">
        <h2 className="mb-4 fw-bold text-center text-gradient">
          What Our Clients Say
        </h2>

        <div className="row g-4">
          {[
            {
              name: "Amit Sharma",
              feedback:
                "Evana made my wedding unforgettable! The event manager was so professional.",
              image: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            {
              name: "Priya Singh",
              feedback:
                "Great experience! Found the best birthday planner in my city.",
              image: "https://randomuser.me/api/portraits/women/44.jpg",
            },
            {
              name: "Rahul Verma",
              feedback:
                "Highly recommend Evana for any event. Seamless and professional.",
              image: "https://randomuser.me/api/portraits/men/45.jpg",
            },
          ].map((testimonial, index) => (
            <div className="col-md-4" key={index}>
              <div
                className="card border-0 shadow-lg h-100 p-3 testimonial-card"
                style={{
                  background: "linear-gradient(135deg, #f9f9f9, #ffffff)",
                }}
              >
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="rounded-circle me-3"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <h6 className="fw-bold mb-0">{testimonial.name}</h6>
                    <small className="text-muted">Verified Client</small>
                  </div>
                </div>
                <p className="fst-italic text-secondary">
                  <i className="bi bi-quote"></i> {testimonial.feedback}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>
        {`
          .testimonial-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-radius: 15px;
          }
          .testimonial-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          }
          .text-gradient {
            background: linear-gradient(90deg, #ff7e5f, #feb47b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}
      </style>
    </div>
  );
};

export default Hero;
