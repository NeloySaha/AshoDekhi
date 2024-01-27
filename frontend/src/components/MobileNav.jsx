import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const MobileNav = ({
  menuState,
  menuStyle,
  setMenuState,
  signedPerson,
  handlelogout,
  handleSignState,
  handleLoginState,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mobile-nav-menu" style={menuState ? menuStyle : {}}>
        <button
          className="btn-menu-close"
          onClick={() => setMenuState((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="menu-icon"
            viewBox="0 0 512 512"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M368 368L144 144M368 144L144 368"
            />
          </svg>
        </button>

        <ul className="mobile-nav-items">
          <li className="mobile-nav-list-item">
            <button
              className="mobile-nav-item"
              onClick={() => {
                setMenuState((prev) => !prev);
                navigate("/");
              }}
            >
              Home
            </button>
          </li>
          <li className="mobile-nav-list-item">
            <button
              className="mobile-nav-item"
              onClick={() => {
                setMenuState((prev) => !prev);
                navigate("/showtimes");
              }}
            >
              Showtimes
            </button>
          </li>
          <li className="mobile-nav-list-item">
            <button
              className="mobile-nav-item"
              onClick={() => {
                setMenuState((prev) => !prev);
                navigate("/aboutus");
              }}
            >
              About Us
            </button>
          </li>
          {Object.keys(signedPerson).length !== 0 &&
            signedPerson.person_type === "Admin" && (
              <li className="mobile-nav-list-item">
                <button
                  className="mobile-nav-item"
                  onClick={() => {
                    setMenuState((prev) => !prev);
                    navigate("/admin");
                  }}
                >
                  Admin
                </button>
              </li>
            )}

          <li className="mobile-nav-list-item">
            <button
              className="mobile-nav-item"
              onClick={() => {
                setMenuState((prev) => !prev);
                handleSignState();
              }}
            >
              Sign Up
            </button>
          </li>
          <li className="mobile-nav-list-item">
            <button
              className="mobile-nav-item"
              onClick={() => {
                setMenuState((prev) => !prev);
                handleLoginState();
              }}
            >
              Sign in
            </button>
          </li>

          {Object.keys(signedPerson).length > 0 && (
            <li className="mobile-nav-list-item">
              <button
                className="mobile-nav-item"
                onClick={() => {
                  handlelogout();
                  setMenuState((prev) => !prev);
                }}
              >
                Log out
              </button>
            </li>
          )}
        </ul>

        {Object.keys(signedPerson).length !== 0 && (
          <p className="mobile-nav-name">
            Signed in as ({signedPerson.first_name})
          </p>
        )}
      </div>
    </>
  );
};
