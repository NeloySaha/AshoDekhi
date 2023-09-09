import React, { useEffect, useState } from "react";
import axios from "axios";
import { DateSelector } from "./DateSelector";
import { MovieSelector } from "./MovieSelector";
import { PictureQualitySelector } from "./PictureQualitySelector";
import { SeatSelector } from "./SeatSelector";
import { LocationSelector } from "../../../components/LocationSelector";
import { PayMethodSelector } from "./PayMethodSelector";
import BarLoader from "react-spinners/BarLoader";

export const PurchaseSection = ({
  locationData,
  userLocation,
  handleLocationSelection,
  theatreId,
  handleUserDateChange,
  userDate,
  datesData,
  getMovieData,
  movieData,
  userMovieId,
  handleUserMovieChange,
  userShowtimeId,
  userHallId,
  getHallData,
  hallData,
  handleUserHallShow,
  getTheatreData,
  signedPerson,
  userSeatPrice,
  getShowDatesData,
  seatsData,
  getSeatsData,
  handleUserSeats,
  userSeatList,
  formattedDate,
  curHallObj,
  currentMovie,
  userSeatListName,
  handleUserPaymentMethod,
  userPayMethod,
  clearUserSelection,
  ticketPurchaseError,
  purchaseCompletion,
}) => {
  const [ticketIds, setTicketIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleTicketPurchase = async () => {
    let paymentID;

    setLoading(true);
    await axios
      .post("http://localhost:7000/payment", {
        amount: userSeatPrice * userSeatListName.length,
        userPayMethod,
        email: signedPerson.email,
      })
      .then((res) => (paymentID = res.data && res.data[0].last_id))
      .catch((err) => {
        console.log(err);
        ticketPurchaseError();
      });

    userSeatList.forEach(async (seatId) => {
      await axios
        .post(`${import.meta.env.VITE_API_URL}/purchaseTicket`, {
          price: userSeatPrice,
          purchase_date: currentDate(),
          paymentID,
          seatId,
          userHallId,
          userMovieId,
          userShowtimeId,
        })
        .catch((err) => {
          console.log(err);
          ticketPurchaseError();
        });
    });

    await axios
      .post(`${import.meta.env.VITE_API_URL}/recentPurchase`, { paymentID })
      .then((res) => setTicketIds(res.data))
      .catch((err) => {
        console.log(err);
        ticketPurchaseError();
      });

    await clearUserSelection();
    setLoading(false);
  };

  useEffect(() => {
    const tickets = [];

    if (ticketIds.length > 0) {
      ticketIds.forEach((ticket) => {
        tickets.push(ticket.id);
      });
      console.log(tickets);
      purchaseCompletion(tickets);
    }
  }, [ticketIds]);

  return (
    <section className="section-purchase">
      <div className="purchase-container container">
        <div className="purchase-section-left">
          <div className="purchase-heading">
            <LocationSelector
              locationData={locationData}
              userLocation={userLocation}
              handleLocationSelection={handleLocationSelection}
              getTheatreData={getTheatreData}
            />
          </div>

          {theatreId && theatreId !== "" && (
            <DateSelector
              theatreId={theatreId}
              userDate={userDate}
              handleUserDateChange={handleUserDateChange}
              datesData={datesData}
              userLocation={userLocation}
              getShowDatesData={getShowDatesData}
            />
          )}

          {userDate?.length !== 0 && (
            <MovieSelector
              theatreId={theatreId}
              movieData={movieData}
              getMovieData={getMovieData}
              userDate={userDate}
              userMovieId={userMovieId}
              handleUserMovieChange={handleUserMovieChange}
            />
          )}
          {userMovieId !== "" && (
            <PictureQualitySelector
              theatreId={theatreId}
              userDate={userDate}
              userShowtimeId={userShowtimeId}
              userHallId={userHallId}
              getHallData={getHallData}
              hallData={hallData}
              userMovieId={userMovieId}
              handleUserHallShow={handleUserHallShow}
              userSeatPrice={userSeatPrice}
            />
          )}

          {userShowtimeId !== "" && (
            <SeatSelector
              userShowtimeId={userShowtimeId}
              userHallId={userHallId}
              userMovieId={userMovieId}
              seatsData={seatsData}
              getSeatsData={getSeatsData}
              handleUserSeats={handleUserSeats}
              userSeatList={userSeatList}
            />
          )}

          {userSeatList && userSeatList.length > 0 && (
            <PayMethodSelector
              handleUserPaymentMethod={handleUserPaymentMethod}
              userPayMethod={userPayMethod}
            />
          )}
        </div>

        <div className="purchase-section-right">
          <h2 className="ticket-container-heading">Ticket Summary</h2>

          <div className="ticket-container">
            {currentMovie && (
              <div className="ticket-heading">
                <div className="ticket-movie-img-cont">
                  <img
                    className="ticket-movie-img"
                    src={currentMovie.image_path}
                    alt="selected movie image"
                  />
                </div>

                {currentMovie && (
                  <div className="ticket-primary-info">
                    {curHallObj && (
                      <p className="ticket-movie-screen">
                        {curHallObj.show_type}
                      </p>
                    )}
                    <p className="ticket-movie-name">
                      {currentMovie.movie_name}
                    </p>
                    <p className="ticket-movie-dur">{currentMovie.duration}</p>
                  </div>
                )}
              </div>
            )}

            <div className="ticket-info">
              <ul className="ticket-info-list">
                <li className="ticket-info-item">
                  <div className="ticket-info-category">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ticket-icon"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0025.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                      />
                      <circle
                        cx="256"
                        cy="192"
                        r="48"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                      />
                    </svg>
                    <p>Location</p>
                  </div>

                  <p className="ticket-info-val">
                    {userLocation ? userLocation.location : "--"}
                  </p>
                </li>

                <li className="ticket-info-item">
                  <div className="ticket-info-category">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ticket-icon"
                      viewBox="0 0 512 512"
                    >
                      <rect
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="32"
                        x="48"
                        y="80"
                        width="416"
                        height="384"
                        rx="48"
                      />
                      <circle cx="296" cy="232" r="24" />
                      <circle cx="376" cy="232" r="24" />
                      <circle cx="296" cy="312" r="24" />
                      <circle cx="376" cy="312" r="24" />
                      <circle cx="136" cy="312" r="24" />
                      <circle cx="216" cy="312" r="24" />
                      <circle cx="136" cy="392" r="24" />
                      <circle cx="216" cy="392" r="24" />
                      <circle cx="296" cy="392" r="24" />
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="32"
                        strokeLinecap="round"
                        d="M128 48v32M384 48v32"
                      />
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="32"
                        d="M464 160H48"
                      />
                    </svg>
                    <p>Show Date</p>
                  </div>

                  <p className="ticket-info-val">
                    {formattedDate ? formattedDate : "--"}
                  </p>
                </li>

                <li className="ticket-info-item">
                  <div className="ticket-info-category">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ticket-icon"
                      viewBox="0 0 512 512"
                    >
                      <rect
                        x="32"
                        y="96"
                        width="448"
                        height="272"
                        rx="32.14"
                        ry="32.14"
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="32"
                      />
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="32"
                        d="M128 416h256"
                      />
                    </svg>
                    <p>Hall number</p>
                  </div>

                  <p className="ticket-info-val">
                    {curHallObj ? curHallObj.hall_name : "--"}
                  </p>
                </li>

                <li className="ticket-info-item">
                  <div className="ticket-info-category">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ticket-icon"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M112.91 128A191.85 191.85 0 0064 254c-1.18 106.35 85.65 193.8 192 194 106.2.2 192-85.83 192-192 0-104.54-83.55-189.61-187.5-192a4.36 4.36 0 00-4.5 4.37V152"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                      />
                      <path d="M233.38 278.63l-79-113a8.13 8.13 0 0111.32-11.32l113 79a32.5 32.5 0 01-37.25 53.26 33.21 33.21 0 01-8.07-7.94z" />
                    </svg>
                    <p>Show Time</p>
                  </div>

                  <p className="ticket-info-val">
                    {userHallId ? curHallObj.movie_start_time : "--"}
                  </p>
                </li>

                <li className="ticket-info-item">
                  <div className="ticket-info-category">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ticket-icon"
                      viewBox="0 0 512 512"
                    >
                      <path d="M490.18,181.4l-44.13-44.13a20,20,0,0,0-27-1,30.81,30.81,0,0,1-41.68-1.6h0A30.81,30.81,0,0,1,375.77,93a20,20,0,0,0-1-27L330.6,21.82a19.91,19.91,0,0,0-28.13,0L232.12,92.16a39.87,39.87,0,0,0-9.57,15.5,7.71,7.71,0,0,1-4.83,4.83,39.78,39.78,0,0,0-15.5,9.58L21.82,302.47a19.91,19.91,0,0,0,0,28.13L66,374.73a20,20,0,0,0,27,1,30.69,30.69,0,0,1,43.28,43.28,20,20,0,0,0,1,27l44.13,44.13a19.91,19.91,0,0,0,28.13,0l180.4-180.4a39.82,39.82,0,0,0,9.58-15.49,7.69,7.69,0,0,1,4.84-4.84,39.84,39.84,0,0,0,15.49-9.57l70.34-70.35A19.91,19.91,0,0,0,490.18,181.4ZM261.81,151.75a16,16,0,0,1-22.63,0l-11.51-11.51a16,16,0,0,1,22.63-22.62l11.51,11.5A16,16,0,0,1,261.81,151.75Zm44,44a16,16,0,0,1-22.62,0l-11-11a16,16,0,1,1,22.63-22.63l11,11A16,16,0,0,1,305.83,195.78Zm44,44a16,16,0,0,1-22.63,0l-11-11a16,16,0,0,1,22.63-22.62l11,11A16,16,0,0,1,349.86,239.8Zm44.43,44.54a16,16,0,0,1-22.63,0l-11.44-11.5a16,16,0,1,1,22.68-22.57l11.45,11.49A16,16,0,0,1,394.29,284.34Z" />
                    </svg>
                    <p>Ticket Amount</p>
                  </div>

                  <p className="ticket-info-val">
                    {userSeatListName ? userSeatListName.length : "--"}
                  </p>
                </li>

                <li className="ticket-info-item">
                  <div className="ticket-info-category">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ticket-icon"
                      viewBox="0 0 512 512"
                    >
                      <path d="M490.18,181.4l-44.13-44.13a20,20,0,0,0-27-1,30.81,30.81,0,0,1-41.68-1.6h0A30.81,30.81,0,0,1,375.77,93a20,20,0,0,0-1-27L330.6,21.82a19.91,19.91,0,0,0-28.13,0L232.12,92.16a39.87,39.87,0,0,0-9.57,15.5,7.71,7.71,0,0,1-4.83,4.83,39.78,39.78,0,0,0-15.5,9.58L21.82,302.47a19.91,19.91,0,0,0,0,28.13L66,374.73a20,20,0,0,0,27,1,30.69,30.69,0,0,1,43.28,43.28,20,20,0,0,0,1,27l44.13,44.13a19.91,19.91,0,0,0,28.13,0l180.4-180.4a39.82,39.82,0,0,0,9.58-15.49,7.69,7.69,0,0,1,4.84-4.84,39.84,39.84,0,0,0,15.49-9.57l70.34-70.35A19.91,19.91,0,0,0,490.18,181.4ZM261.81,151.75a16,16,0,0,1-22.63,0l-11.51-11.51a16,16,0,0,1,22.63-22.62l11.51,11.5A16,16,0,0,1,261.81,151.75Zm44,44a16,16,0,0,1-22.62,0l-11-11a16,16,0,1,1,22.63-22.63l11,11A16,16,0,0,1,305.83,195.78Zm44,44a16,16,0,0,1-22.63,0l-11-11a16,16,0,0,1,22.63-22.62l11,11A16,16,0,0,1,349.86,239.8Zm44.43,44.54a16,16,0,0,1-22.63,0l-11.44-11.5a16,16,0,1,1,22.68-22.57l11.45,11.49A16,16,0,0,1,394.29,284.34Z" />
                    </svg>
                    <p>Seats</p>
                  </div>

                  <p className="ticket-info-val">
                    {userSeatListName && userSeatListName.length !== 0
                      ? userSeatListName
                          .map((seat) => seat.seat_name)
                          .join(", ")
                      : "--"}
                  </p>
                </li>

                <li className="ticket-info-item">
                  <div className="ticket-info-category">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ticket-icon"
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
                    <p>Payment Method</p>
                  </div>

                  <p className="ticket-info-val">
                    {userPayMethod && userPayMethod.length > 0
                      ? userPayMethod
                      : "--"}
                  </p>
                </li>

                <li className="ticket-info-item">
                  <div className="ticket-info-category">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ticket-icon"
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
                    <p>Total Price</p>
                  </div>

                  <p className="ticket-info-val">
                    {userSeatPrice && userSeatListName
                      ? `BDT ${userSeatPrice * userSeatListName.length}TK`
                      : "--"}
                  </p>
                </li>
              </ul>
            </div>

            <button
              className={
                userPayMethod === "" ? "ticket-btn-disabled" : "ticket-btn"
              }
              onClick={handleTicketPurchase}
              disabled={userPayMethod === ""}
            >
              {loading ? <BarLoader color="#e6e6e8" /> : "purchase ticket"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
