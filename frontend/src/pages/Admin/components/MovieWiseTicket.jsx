import React, { useState, useEffect } from "react";
import axios from "axios";

export const MovieWiseTicket = () => {
  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:7000/totalTicketPerMovie")
        .then((res) => setTicketData(res.data))
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  const ticketDataHtml = ticketData.map((ticket, idx) => {
    return (
      <div key={idx} className="movie-ticket">
        <p>{ticket.tickets_per_movie}</p>
        <p>{ticket.name}</p>
      </div>
    );
  });

  return (
    <section className="admin-movie-wise-ticket container">
      <h3 className="form-admin-heading">Tickets Sold per Movie</h3>

      {ticketData.length > 0 && (
        <div className="movie-ticket-container">{ticketDataHtml}</div>
      )}
    </section>
  );
};
