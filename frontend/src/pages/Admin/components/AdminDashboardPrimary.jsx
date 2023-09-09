import axios from "axios";
import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";

export const AdminDashboardPrimary = () => {
  const [ticketData, setTicketData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/totalTickets`)
        .then((res) => setTicketData(res.data))
        .catch((err) => console.log(err));
      setLoading1(false);

      await axios
        .get(`${import.meta.env.VITE_API_URL}/totalPayment`)
        .then((res) => setPaymentData(res.data))
        .catch((err) => console.log(err));
      setLoading2(false);

      await axios
        .get(`${import.meta.env.VITE_API_URL}/totalCustomers`)
        .then((res) => setCustomerData(res.data))
        .catch((err) => console.log(err));
      setLoading3(false);
    };

    fetchData();
  }, []);

  return (
    <section className="section-admin-summary container">
      <h2 className="form-admin-heading dash-heading">Summary</h2>
      <div className="admin-dashboard-primary">
        <div className="dashboard-pri-card">
          {loading1 ? (
            <HashLoader size={30} color="#eb3656" />
          ) : (
            <p className="admin-dashboard-val">
              {ticketData.length > 0 && ticketData[0].total_tickets}
            </p>
          )}
          <div className="admin-dashboard-category">
            <p>Total Tickets Sold</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="admin-icon"
              viewBox="0 0 512 512"
            >
              <circle
                cx="176"
                cy="416"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              />
              <circle
                cx="400"
                cy="416"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M48 80h64l48 272h256"
              />
              <path
                d="M160 288h249.44a8 8 0 007.85-6.43l28.8-144a8 8 0 00-7.85-9.57H128"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              />
            </svg>
          </div>
        </div>

        <div className="dashboard-pri-card">
          {loading2 ? (
            <HashLoader size={30} color="#eb3656" />
          ) : (
            <p className="admin-dashboard-val">
              BDT{" "}
              {paymentData.length > 0 &&
                paymentData[0].total_amount.toLocaleString("en-US")}
              Tk
            </p>
          )}
          <div className="admin-dashboard-category">
            <p>Total Payment Received</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="admin-icon"
              viewBox="0 0 512 512"
            >
              <rect
                x="48"
                y="96"
                width="416"
                height="320"
                rx="56"
                ry="56"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="60"
                d="M48 192h416M128 300h48v20h-48z"
              />
            </svg>
          </div>
        </div>

        <div className="dashboard-pri-card">
          {loading3 ? (
            <HashLoader size={26} color="#eb3656" />
          ) : (
            <p className="admin-dashboard-val">
              {customerData.length > 0 && customerData[0].total_customers}
            </p>
          )}
          <div className="admin-dashboard-category">
            <p>Total Customers</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="admin-icon"
              viewBox="0 0 512 512"
            >
              <path
                d="M402 168c-2.93 40.67-33.1 72-66 72s-63.12-31.32-66-72c-3-42.31 26.37-72 66-72s69 30.46 66 72z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              />
              <path
                d="M336 304c-65.17 0-127.84 32.37-143.54 95.41-2.08 8.34 3.15 16.59 11.72 16.59h263.65c8.57 0 13.77-8.25 11.72-16.59C463.85 335.36 401.18 304 336 304z"
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="32"
              />
              <path
                d="M200 185.94c-2.34 32.48-26.72 58.06-53 58.06s-50.7-25.57-53-58.06C91.61 152.15 115.34 128 147 128s55.39 24.77 53 57.94z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              />
              <path
                d="M206 306c-18.05-8.27-37.93-11.45-59-11.45-52 0-102.1 25.85-114.65 76.2-1.65 6.66 2.53 13.25 9.37 13.25H154"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="32"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
