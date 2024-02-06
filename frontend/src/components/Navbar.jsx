import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { logout, showLoginModal, showSignModal } from "../reducers/authSlice";
import { toggleMenuState } from "../reducers/mobileNavSlice";

export const Navbar = () => {
  const [navSignOptionsVis, setNavSignOptionsVis] = useState(false);
  let pageName;
  const navigate = useNavigate();
  const location = useLocation();

  const selectionTab = {
    backgroundColor: "#eb3656",
  };

  const { isAuthenticated, signedPerson } = useSelector(
    (store) => store.authentication
  );

  const dispatch = useDispatch();

  const handlelogout = () => {
    dispatch(logout());
  };

  const toggleNavSignOptionsVis = () => {
    setNavSignOptionsVis((prevState) => !prevState);
  };

  if (location.pathname === "/") {
    pageName = "home";
  } else if (location.pathname === "/showtimes") {
    pageName = "showtimes";
  } else if (location.pathname === "/aboutus") {
    pageName = "aboutUs";
  } else if (location.pathname === "/admin") {
    pageName = "admin";
  } else {
    pageName = "";
  }

  return (
    <header>
      <button className="btn-menu" onClick={() => dispatch(toggleMenuState())}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="menu-icon"
          viewBox="0 0 512 512"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="32"
            d="M80 160h352M80 256h352M80 352h352"
          />
        </svg>
      </button>

      {pageName === "home" ? (
        <HashLink className="logo-container" to="#headerTop">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="main-logo-icon"
            viewBox="0 0 512 512"
          >
            <path
              d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M360 94.59V296M443.13 212.87L296 360M417.41 360H216M299.13 443.13l-144-144M152 416V216M68.87 299.13l144-144M94.59 152H288M212.87 68.87L360 216"
            />
          </svg>
          <h1 className="logo-text">Asho Dekhi</h1>
        </HashLink>
      ) : (
        <Link className="logo-container" to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="main-logo-icon"
            viewBox="0 0 512 512"
          >
            <path
              d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M360 94.59V296M443.13 212.87L296 360M417.41 360H216M299.13 443.13l-144-144M152 416V216M68.87 299.13l144-144M94.59 152H288M212.87 68.87L360 216"
            />
          </svg>
          <h1 className="logo-text">Asho Dekhi</h1>
        </Link>
      )}

      <nav>
        <ul className="nav-items">
          <li>
            <Link
              className="nav-item"
              to="/"
              style={pageName === "home" ? selectionTab : {}}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="nav-item"
              to="/showtimes"
              style={pageName === "showtimes" ? selectionTab : {}}
            >
              Showtimes
            </Link>
          </li>
          <li>
            <Link
              className="nav-item"
              to="/aboutus"
              style={pageName === "aboutUs" ? selectionTab : {}}
            >
              About Us
            </Link>
          </li>
          {isAuthenticated && signedPerson.person_type === "Admin" && (
            <li>
              <Link
                className="nav-item"
                to="/admin"
                style={pageName === "admin" ? selectionTab : {}}
              >
                Admin
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <div className="nav-signup">
        {isAuthenticated && (
          <p className="nav-signed-name">{signedPerson.first_name}</p>
        )}
        <button
          className="customer-profile-btn"
          onClick={(e) => {
            e.stopPropagation();
            isAuthenticated && signedPerson.person_type === "Customer"
              ? navigate("/customer")
              : dispatch(showLoginModal());
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="profile-icon"
            viewBox="0 0 512 512"
          >
            <path
              d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
            />
            <path
              d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
          </svg>
        </button>

        {!isAuthenticated ? (
          <button
            className="btn-signup-arrow"
            onClick={toggleNavSignOptionsVis}
          >
            {!navSignOptionsVis ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="signup-icon"
                viewBox="0 0 512 512"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="48"
                  d="M112 184l144 144 144-144"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="signup-icon"
                viewBox="0 0 512 512"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="48"
                  d="M112 328l144-144 144 144"
                />
              </svg>
            )}
          </button>
        ) : (
          <button className="btn-logout" onClick={handlelogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="logout-icon"
              viewBox="0 0 512 512"
            >
              <path
                d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              />
            </svg>
          </button>
        )}

        {navSignOptionsVis && (
          <div className="signup-options">
            {
              <ul className="signup-buttons">
                <li>
                  <button
                    className="signup-button"
                    onClick={() => {
                      toggleNavSignOptionsVis();
                      dispatch(showSignModal());
                    }}
                  >
                    Sign up
                  </button>
                </li>
                <li>
                  <button
                    className="login-button"
                    onClick={() => {
                      toggleNavSignOptionsVis();
                      dispatch(showLoginModal());
                    }}
                  >
                    Sign in
                  </button>
                </li>
              </ul>
            }
          </div>
        )}
      </div>
    </header>
  );
};
