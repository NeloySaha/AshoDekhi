import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

export const Footer = ({ handleSignState, handleLoginState }) => {
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/locationDetails`)
        .then((res) => setLocationData(res.data))
        .catch((err) => console.log(err));
      setLoading(false);
    };

    fetchData();
  }, []);

  const locations = locationData.map((location, idx) => {
    return (
      <p key={idx} className="address">
        {location.location_details}
      </p>
    );
  });

  return (
    <section className="section-footer container">
      <Link className="footer-logo-container" to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="footer-logo-icon"
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
        <h1 className="footer-logo-text">Asho Dekhi</h1>
      </Link>

      <div></div>
      <div className="footer-link-container">
        <button className="footer-btn" onClick={handleSignState}>
          Create account
        </button>
      </div>

      <div className="footer-link-container">
        <button className="footer-btn" onClick={handleLoginState}>
          Sign in
        </button>
      </div>

      <div className="footer-link-container">
        <Link className="footer-link" to="/aboutus">
          About us
        </Link>
      </div>

      <h3 className="footer-heading">Our Theatres</h3>

      <p className="copyright">
        Copyright &copy; 2023 by NELOY SAHA, Inc. All rights reserved.
      </p>

      <div className="footer-address-container">
        {loading ? <HashLoader color="#eb3656" /> : locations}
      </div>
    </section>
  );
};
