import { useEffect, useState } from "react";
import axios from "axios";
import { DateSelector } from "./DateSelector";
import { MovieSelector } from "./MovieSelector";
import { PictureQualitySelector } from "./PictureQualitySelector";
import { SeatSelector } from "./SeatSelector";
import { LocationSelector } from "../../../components/LocationSelector";
import { PayMethodSelector } from "./PayMethodSelector";
import BarLoader from "react-spinners/BarLoader";
import { useDispatch, useSelector } from "react-redux";
import { purchaseCompletion, ticketPurchaseError } from "../../../toasts/toast";
import { resetCart } from "../../../reducers/cartSlice";
import { useNavigate } from "react-router-dom";

const currentDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const PurchaseSection = () => {
  const navigate = useNavigate();
  const [hallData, setHallData] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [seatsData, setSeatsData] = useState([]);

  const [ticketIds, setTicketIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const { signedPerson } = useSelector((store) => store.authentication);
  const { id: theatreId, location: theatreLocation } = useSelector(
    (store) => store.currentLocation
  );
  const {
    payment_method: userPayMethod,
    showtime_date: userDate,
    movie_id: userMovieId,
    showtime_id: userShowtimeId,
    seat_id_list: userSeatList,
    hall_id: userHallId,
    seat_price: userSeatPrice,
  } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const formattedDate =
    userDate !== "" &&
    new Date(userDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const currentMovie =
    userMovieId !== "" &&
    movieData.find((movieObj) => movieObj.id === userMovieId);

  const curHallObj =
    userHallId &&
    hallData.find(
      (hall) =>
        hall.hall_id === userHallId && hall.showtime_id === userShowtimeId
    );

  const userSeats =
    seatsData &&
    seatsData.filter((seatData) => userSeatList.includes(seatData.seat_id));

  const handleTicketPurchase = async () => {
    try {
      setBtnDisabled(true);
      setLoading(true);
      let paymentID;

      // Make the payment request
      const paymentResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/payment`,
        {
          amount: userSeatPrice * userSeats.length,
          userPayMethod,
          email: signedPerson.email,
        }
      );

      paymentID = paymentResponse.data && paymentResponse.data[0].last_id;

      // Purchase tickets for each seat
      for (const seatId of userSeatList) {
        await axios.post(`${import.meta.env.VITE_API_URL}/purchaseTicket`, {
          price: userSeatPrice,
          purchase_date: currentDate(),
          paymentID,
          seatId,
          userHallId,
          userMovieId,
          userShowtimeId,
        });
      }

      // Get recent purchase data
      const recentPurchaseResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/recentPurchase`,
        {
          paymentID,
        }
      );

      setTicketIds(recentPurchaseResponse.data);

      // Clear user selection
      dispatch(resetCart());
    } catch (err) {
      console.error(err);
      ticketPurchaseError();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    userPayMethod.length > 0 ? setBtnDisabled(false) : setBtnDisabled(true);
  }, [userPayMethod]);

  useEffect(() => {
    const tickets = [];

    if (ticketIds.length > 0) {
      ticketIds.forEach((ticket) => {
        tickets.push(ticket.id);
      });

      purchaseCompletion(tickets);
      navigate("/customer");
    }
  }, [ticketIds, navigate]);

  return (
    <section className="section-purchase">
      <div className="purchase-container container">
        <div className="purchase-section-left">
          <div className="purchase-heading">
            <LocationSelector paymentOngoing={loading} />
          </div>

          {theatreId !== "" && <DateSelector paymentOngoing={loading} />}

          {userDate !== "" && (
            <MovieSelector
              movieData={movieData}
              setMovieData={setMovieData}
              paymentOngoing={loading}
            />
          )}

          {userMovieId !== "" && (
            <PictureQualitySelector
              hallData={hallData}
              setHallData={setHallData}
              paymentOngoing={loading}
            />
          )}

          {userShowtimeId !== "" && (
            <SeatSelector
              seatsData={seatsData}
              setSeatsData={setSeatsData}
              paymentOngoing={loading}
            />
          )}

          {userSeatList.length > 0 && (
            <PayMethodSelector paymentOngoing={loading} />
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
                    {theatreLocation !== "" ? theatreLocation : "--"}
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
                    {curHallObj ? curHallObj?.hall_name : "--"}
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
                    {userHallId ? curHallObj?.movie_start_time : "--"}
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
                    {userSeats ? userSeats.length : "--"}
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
                    {userSeats && userSeats.length !== 0
                      ? userSeats.map((seat) => seat.seat_name).join(", ")
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
                    {userSeatPrice && userSeats
                      ? `BDT ${userSeatPrice * userSeats.length}TK`
                      : "--"}
                  </p>
                </li>
              </ul>
            </div>

            <button
              className={btnDisabled ? "ticket-btn-disabled" : "ticket-btn"}
              onClick={handleTicketPurchase}
              disabled={btnDisabled}
            >
              {loading ? <BarLoader color="#e6e6e8" /> : "purchase ticket"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
