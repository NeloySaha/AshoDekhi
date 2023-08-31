import React, { useEffect, useState } from "react";
import axios from "axios";

export const CustomerInfoSection = ({ signedPerson }) => {
  const [cusProData, setCusProData] = useState({});
  const [cusTicketData, setCusTicketData] = useState([]);

  useEffect(() => {
    const fetchData1 = async () => {
      await axios
        .post("http://localhost:7000/customerProfile", {
          email: signedPerson.email,
        })
        .then((res) => {
          setCusProData(res.data[0]);
        })
        .catch((err) => console.log(err));
    };

    const fetchData2 = async () => {
      await axios
        .post("http://localhost:7000/customerPurchases", {
          email: signedPerson.email,
        })
        .then((res) => {
          setCusTicketData(() => {
            const formattedObj = res.data.map((dataObj) => {
              const purDate = new Date(
                dataObj.purchase_date
              ).toLocaleDateString("en-GB");
              const showDate = new Date(
                dataObj.showtime_date
              ).toLocaleDateString("en-GB");

              return {
                ...dataObj,
                showtime_date: showDate,
                purchase_date: purDate,
              };
            });

            return formattedObj;
          });
        })
        .catch((err) => console.log(err));
    };

    fetchData1();
    fetchData2();
  }, [signedPerson]);

  const purchaseHtml = cusTicketData.map((cusTicket) => {
    return (
      <li className="purchase-history-item">
        <div className="purchase-item-categories">
          <div className="purchase-item-category">
            <p>Movie:</p>
            <p>{cusTicket.movie_name}</p>
          </div>

          <div className="purchase-item-category">
            <p>Ticket ID:</p>
            <p>{cusTicket.ticket_ids}</p>
          </div>

          <div className="purchase-item-category">
            <p>Showtime Date:</p>
            <p>{cusTicket.showtime_date}</p>
          </div>

          <div className="purchase-item-category">
            <p>Show type:</p>
            <p>{cusTicket.show_type}</p>
          </div>

          <div className="purchase-item-category">
            <p>Theatre:</p>
            <p>{cusTicket.theatre_name}</p>
          </div>

          <div className="purchase-item-category">
            <p>Hall:</p>
            <p>{cusTicket.hall_name}</p>
          </div>

          <div className="purchase-item-category">
            <p>Seats:</p>
            <p>{cusTicket.seat_numbers}</p>
          </div>

          <div className="purchase-item-category">
            <p>Price:</p>
            <p>BDT {cusTicket.ticket_price}TK</p>
          </div>

          <div className="purchase-item-category">
            <p>Purchase Date:</p>
            <p>{cusTicket.purchase_date}</p>
          </div>

          <div className="purchase-item-category">
            <p>Movie Start time:</p>
            <p>{cusTicket.movie_start_time}</p>
          </div>
        </div>

        <div className="purchase-item-img-box">
          <img
            className="purchase-item-img"
            src={cusTicket.movie_image}
            alt="movie-photo"
          />
        </div>
      </li>
    );
  });

  return (
    <div className="section-customer-info">
      <div className="container">
        <h3 className="customer-info-heading">Customer Info</h3>
        <div className="customer-info-details">
          <div>
            <p>Name</p>
            <p>:</p>
            <p>
              {cusProData && `${cusProData.first_name} ${cusProData.last_name}`}
            </p>
          </div>

          <div>
            <p>Email Address</p>
            <p>:</p>
            <p>{cusProData.email}</p>
          </div>

          <div>
            <p>Phone No.</p>
            <p>:</p>
            <p>{cusProData.phone_number}</p>
          </div>
        </div>

        <h3 className="customer-info-heading">Purchase History</h3>

        <div className="purchase-history-section">
          <ul className="purchase-history-list">{purchaseHtml}</ul>
        </div>
      </div>
    </div>
  );
};
