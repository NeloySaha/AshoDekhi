import React, { useEffect, useState } from "react";
import axios from "axios";

export const SeatSelector = ({
  userShowtimeId,
  userHallId,
  userMovieId,
  seatsData,
  getSeatsData,
  handleUserSeats,
  userSeatList,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .post("http://localhost:7000/seats", {
          userShowtimeId,
          userHallId,
          userMovieId,
        })
        .then((res) => getSeatsData(res.data))
        .catch((err) => console.log(err));
    };

    fetchData();
  }, [userHallId, userShowtimeId, userMovieId]);

  let rows = [];
  let rowSeat = [];

  seatsData.forEach((seat) => {
    return seat.selected && userSeat.push(seat.seat_id);
  });

  seatsData.forEach((seat, idx) => {
    let seatStatus;

    seat.booked_status === 0
      ? (seatStatus = "booked")
      : (seatStatus = "available");

    const seatHtml = (
      <div
        className={`seat ${seatStatus}`}
        onClick={() => seatStatus !== "booked" && handleUserSeats(seat.seat_id)}
        key={seat.seat_id}
        style={{
          backgroundColor: userSeatList.includes(seat.seat_id) ? "#ef5e78" : "",
        }}
      >
        {seat.seat_name}
      </div>
    );

    if (idx === 0) {
      rowSeat.push(seatHtml);
    } else if (
      seatsData[idx].seat_name[0] !== seatsData[idx - 1].seat_name[0]
    ) {
      rows.push(
        <div className="row" key={seatsData[idx - 1].seat_name[0]}>
          {rowSeat}
        </div>
      );
      rowSeat = [];
      rowSeat.push(seatHtml);
    } else if (idx === seatsData.length - 1) {
      rowSeat.push(seatHtml);
      rows.push(
        <div className="row" key={seatsData[idx - 1].seat_name[0]}>
          {rowSeat}
        </div>
      );
    } else {
      rowSeat.push(seatHtml);
    }
  });

  return (
    <div>
      <div className="form-item-heading">Select Seat</div>
      <div className="seat-guide-container">
        <div className="seat-available-demo"></div>
        <p className="seat-status-details">Available</p>
        <div className="seat-booked-demo"></div>
        <p className="seat-status-details">Booked</p>
        <div className="seat-selected-demo"></div>
        <p className="seat-status-details">Selected</p>
      </div>
      <div className="theatre-screen">
        <div className="screen-1"></div>
        <div className="screen-2"></div>
      </div>
      <div className="theatre-screen-heading">Theatre Screen</div>
      <div className="seat-container">{rows}</div>
    </div>
  );
};
