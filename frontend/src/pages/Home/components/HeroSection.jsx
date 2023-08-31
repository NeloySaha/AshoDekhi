import React from "react";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export const HeroSection = ({ handleLoginState, signedPerson }) => {
  const navigate = useNavigate();

  return (
    <section className="section-hero">
      <div className="container hero">
        <div className="hero-text">
          <h1 className="heading-primary">
            Unlock the Gateway to Enchanting Movie Magic
          </h1>

          <p className="hero-description">
            Immerse yourself in the captivating allure of cinema as you step
            into our exquisite destination, designed to elevate your
            movie-watching experience to new heights. From the latest
            blockbuster releases to timeless classics, our platform serves as
            your exclusive portal to access the most thrilling, heartwarming,
            and awe-inspiring stories ever told.
          </p>
          <div className="hero-btn-container">
            <button
              onClick={() => {
                Object.keys(signedPerson).length !== 0 &&
                signedPerson.person_type === "Customer"
                  ? navigate("/purchase")
                  : handleLoginState();
              }}
              className="btn btn-full"
            >
              Buy a ticket
            </button>
            <HashLink to="#nowShowing" className="btn btn-outline">
              Learn more &darr;
            </HashLink>
          </div>

          <div className="hero-review-section">
            <div className="customers-img">
              <img
                src="/Images/customers/customer-1.jpg"
                className="customer-img"
                alt="Customer Photo"
              />
              <img
                src="/Images/customers/customer-2.jpg"
                className="customer-img"
                alt="Customer Photo"
              />
              <img
                src="/Images/customers/customer-3.jpg"
                className="customer-img"
                alt="Customer Photo"
              />
              <img
                src="/Images/customers/customer-4.jpg"
                className="customer-img"
                alt="Customer Photo"
              />
              <img
                src="/Images/customers/customer-5.jpg"
                className="customer-img"
                alt="Customer Photo"
              />
              <img
                src="/Images/customers/customer-6.jpg"
                className="customer-img"
                alt="Customer Photo"
              />
            </div>

            <p className="hero-review-text">
              <span>100,000+</span> tickets sold last year
            </p>
          </div>
        </div>

        <div className="hero-img-box">
          <img
            className="hero-img"
            src="/Images/hero-img.png"
            alt="Hero Image"
          />
        </div>
      </div>
    </section>
  );
};
