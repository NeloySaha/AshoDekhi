import { useEffect, useState } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { useDispatch, useSelector } from "react-redux";
import { resetCart, setShowDate } from "../../../reducers/cartSlice";

export const DateSelector = () => {
  const [showDatesData, setShowDatesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id: theatreId } = useSelector((store) => store.currentLocation);
  const { showtime_date: userDate } = useSelector((store) => store.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/showtimesDates`,
          {
            theatreId,
          }
        );
        setShowDatesData(response.data);
        dispatch(resetCart());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [theatreId, dispatch]);

  const checkedColor = (val) => {
    return {
      backgroundColor: val === userDate ? "#ef5e78" : "",
      color: val === userDate ? "#e6e6e8" : "",
    };
  };

  const dateOptions = showDatesData?.map((dateData, idx) => {
    const day = new Date(dateData.showtime_date).toLocaleString("en-us", {
      weekday: "short",
    });

    const month = new Date(dateData.showtime_date).toLocaleString("en-us", {
      month: "short",
    });

    const date = new Date(dateData.showtime_date).toLocaleString("en-us", {
      day: "numeric",
    });

    const year = new Date(dateData.showtime_date).toLocaleString("en-us", {
      year: "numeric",
    });

    const monthNumber = new Date(dateData.showtime_date).toLocaleString(
      "en-us",
      {
        month: "numeric",
      }
    );

    const formattedDate = `${year}-${monthNumber}-${date}`;

    return (
      <div
        className="date-input-container"
        key={idx}
        style={checkedColor(formattedDate)}
      >
        <input
          type="radio"
          id={idx}
          name="Select Date"
          value={formattedDate}
          onChange={(e) => dispatch(setShowDate(e.target.value))}
          checked={formattedDate === userDate}
        />

        <label className="form-date-detail" htmlFor={idx}>
          <p className="form-day">{day}</p>
          <div className="form-date-month">
            <p className="form-date">{date}</p>
            <p className="form-month">{month}</p>
          </div>
        </label>
      </div>
    );
  });

  return (
    <div>
      <form>
        <div className="form-item-heading">Select Date</div>
        {!loading ? (
          <div className="form-item-options">{dateOptions}</div>
        ) : (
          <HashLoader color="#eb3656" />
        )}
      </form>
    </div>
  );
};
