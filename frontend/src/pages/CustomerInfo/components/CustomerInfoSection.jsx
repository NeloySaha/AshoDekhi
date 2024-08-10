import axios from "axios";
import { useEffect, useState } from "react";
import {
  HiCalendar,
  HiOutlineClock,
  HiOutlineCurrencyBangladeshi,
  HiOutlineMapPin,
  HiOutlineTicket,
  HiOutlineTv,
} from "react-icons/hi2";
import { RiSofaLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

export const CustomerInfoSection = () => {
  const [cusProData, setCusProData] = useState({});
  const [cusTicketData, setCusTicketData] = useState([]);
  const override = {
    display: "block",
    margin: "2.4rem auto",
  };

  const { signedPerson } = useSelector((store) => store.authentication);

  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/customerProfile`,
          {
            email: signedPerson.email,
            password: signedPerson.password,
          }
        );
        setCusProData(response.data[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading1(false);
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/customerPurchases`,
          {
            email: signedPerson.email,
          }
        );
        const formattedData = response.data.map((dataObj) => {
          const purDate = new Date(dataObj.purchase_date).toLocaleDateString(
            "en-GB"
          );
          const showDate = new Date(dataObj.showtime_date).toLocaleDateString(
            "en-GB"
          );
          return {
            ...dataObj,
            showtime_date: showDate,
            purchase_date: purDate,
          };
        });
        setCusTicketData(formattedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading2(false);
      }
    };

    fetchData();
  }, [signedPerson]);

  const purchaseHtml = cusTicketData.map((cusTicket, id) => {
    return (
      <Link
        key={id}
        to={`/movieDetails/${cusTicket.movie_id}`}
        className="purchase-history-item"
      >
        {/* <div className="purchase-first-gap"></div>
        <div className="purchase-second-gap"></div> */}

        <div className="purchase-item-details">
          <div className="purchase-item-header">
            <h2>{cusTicket.movie_name}</h2>

            <div className="purchase-show-quality">
              <HiOutlineTv size={18} />
              <p>{cusTicket.show_type}</p>
            </div>
          </div>

          <div className="purchase-ticket-id">
            <HiOutlineTicket size={16} />
            <p className="ticket-id">Ticket No.: {cusTicket.ticket_ids}</p>
          </div>

          <div className="purchase-hall-info">
            <HiOutlineMapPin size={18} />
            <p>
              {cusTicket.theatre_name} &mdash; {cusTicket.hall_name}
            </p>
          </div>

          <div className="purchase-seat">
            <RiSofaLine size={20} />
            <p>{cusTicket.seat_numbers}</p>
          </div>

          <div className="purchase-date-time">
            <div className="purchase-tags">
              <HiCalendar size={20} />
              <strong>{cusTicket.showtime_date}</strong>
            </div>
            <div className="purchase-tags">
              <HiOutlineClock size={18} />
              <strong>{cusTicket.movie_start_time}</strong>
            </div>
          </div>

          <div className="purchase-price-create">
            <div className="purchase-tags">
              <HiOutlineCurrencyBangladeshi size={18} />
              <strong>{cusTicket.ticket_price}</strong>
            </div>
            <div className="purchase-tags">
              <p>
                Purchased at <strong>{cusTicket.purchase_date}</strong>
              </p>
            </div>
          </div>
        </div>

        <div
          to={`/movieDetails/${cusTicket.movie_id}`}
          className="purchase-item-img-box"
        >
          <img
            className="purchase-item-img"
            src={cusTicket.movie_image}
            alt="movie-photo"
          />
        </div>
      </Link>
    );
  });

  return (
    <div className="section-customer-info">
      <div className="container">
        <h3 className="customer-info-heading">Customer Info</h3>
        {loading1 ? (
          <HashLoader cssOverride={override} color="#eb3656" />
        ) : (
          <div className="customer-info-details">
            <div>
              <p>Name</p>
              <p>:</p>
              <p>
                {cusProData &&
                  `${cusProData.first_name} ${cusProData.last_name}`}
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
        )}

        <h3 className="customer-info-heading">Purchase History</h3>
        {loading2 ? (
          <HashLoader cssOverride={override} color="#eb3656" />
        ) : (
          <>
            {cusTicketData.length === 0 && (
              <p className="customer-empty-status">
                You haven&apos;t purchased any ticket yet
              </p>
            )}
            <div className="purchase-history-section">
              <div className="purchase-history-list">{purchaseHtml}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
