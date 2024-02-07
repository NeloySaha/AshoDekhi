import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { showLoginModal } from "../../../reducers/authSlice";
import { resetCart } from "../../../reducers/cartSlice";

export const HeroSection = () => {
  const navigate = useNavigate();
  const { isAuthenticated, signedPerson } = useSelector(
    (store) => store.authentication
  );
  const dispatch = useDispatch();

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
            movie-watching experience to new heights.
          </p>
          <div className="hero-btn-container">
            <button
              onClick={() => {
                dispatch(resetCart());
                isAuthenticated && signedPerson.person_type === "Customer"
                  ? navigate("/purchase")
                  : dispatch(showLoginModal());
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
            src="/Images/hero-img.webp"
            alt="Hero Image"
          />
        </div>
      </div>
    </section>
  );
};
