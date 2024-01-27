import React, { useEffect, useState } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";

export const SeatSelector = ({
  userShowtimeId,
  userHallId,
  userMovieId,
  seatsData,
  getSeatsData,
  handleUserSeats,
  userSeatList,
}) => {
  const override = {
    display: "block",
    margin: "1.6rem auto",
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/seats`,
          {
            userShowtimeId,
            userHallId,
            userMovieId,
          }
        );
        getSeatsData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
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

    const handleTouchStart = (e) => {
      e.preventDefault();
      handleUserSeats(seat.seat_id);
    };

    seat.booked_status === 0
      ? (seatStatus = "booked")
      : (seatStatus = "available");

    const seatHtml = (
      <div
        className={`seat ${seatStatus}`}
        onClick={() => seatStatus !== "booked" && handleUserSeats(seat.seat_id)}
        onTouchEnd={seatStatus !== "booked" ? handleTouchStart : undefined}
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
      {loading && <HashLoader cssOverride={override} color="#eb3656" />}
      {!loading && (
        <>
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
        </>
      )}
    </div>
  );
};
