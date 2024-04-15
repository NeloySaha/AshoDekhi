import axios from "axios";
import { useEffect, useState } from "react";
import { adminErrorToast, adminShowtimeToast } from "../../../toasts/toast";

export const AdminShowtimesAddSection = ({
  selectedShowDate,
  setSelectedShowDate,
  handleSelectedDate,
}) => {
  const [lastShowDate, setLastShowDate] = useState("");
  const [adminShowtimeDropdown, setAdminShowtimeDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  let showDateHtml = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/lastShowDate`
        );
        setLastShowDate(response.data[0].lastDate);
      } catch (err) {
        console.error(err);
        adminErrorToast();
      }
    };

    fetchData();
  }, []);

  const checkedColor = (val) => {
    return {
      backgroundColor: val === selectedShowDate ? "#ef5e78" : "",
      border: val === selectedShowDate ? "2px solid transparent" : "",
    };
  };

  const toggleAdminShowtimesSection = () => {
    setAdminShowtimeDropdown((prevState) => !prevState);
  };

  const addDays = (dateStr, days) => {
    let dateData = new Date(dateStr);
    dateData.setDate(dateData.getDate() + days);

    const day = new Date(dateData).toLocaleString("en-us", {
      day: "numeric",
    });
    const year = new Date(dateData).toLocaleString("en-us", {
      year: "numeric",
    });
    const monthNumber = new Date(dateData).toLocaleString("en-us", {
      month: "numeric",
    });
    const formattedDate = `${year}-${monthNumber}-${day}`;

    return formattedDate;
  };

  for (let i = 0; i < 4; i++) {
    let curDateStr = addDays(lastShowDate, i + 1);

    const formattedDate = new Date(curDateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    showDateHtml.push(
      <div
        className="admin-radio-input-container"
        key={i + 1}
        style={checkedColor(curDateStr)}
      >
        <input
          type="radio"
          id={i + 1}
          name="Select Showdate"
          value={curDateStr}
          onChange={(e) => handleSelectedDate(e)}
          checked={curDateStr === selectedShowDate}
        />

        <label className="form-admin-input-detail" htmlFor={curDateStr}>
          {formattedDate}
        </label>
      </div>
    );
  }

  const showtimeAdd = async (e) => {
    e.preventDefault();
    let showtimeId;

    try {
      setLoading(true);
      const response1 = await axios.post(
        `${import.meta.env.VITE_API_URL}/showdateAdd`,
        {
          selectedShowDate,
        }
      );

      showtimeId = response1.data && response1.data[0].last_id;

      await axios.post(`${import.meta.env.VITE_API_URL}/shownInUpdate`, {
        showtimeId,
      });

      adminShowtimeToast();
    } catch (err) {
      console.error(err);
      adminErrorToast();
    } finally {
      setSelectedShowDate("");
      setLoading(false);
    }
  };

  return (
    <section className="section-admin-showtimes container">
      <div className="form-heading-container">
        <h2 className="form-admin-heading">Add Showtime Date</h2>
        <button
          className="btn-admin-arrow"
          onClick={toggleAdminShowtimesSection}
        >
          {!adminShowtimeDropdown ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="admin-icon"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="48"
                d="M112 184l144 144 144-144"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="admin-icon"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="48"
                d="M112 328l144-144 144 144"
              />
            </svg>
          )}
        </button>
      </div>
      {adminShowtimeDropdown && (
        <form className="form-admin-showtime-add">
          <div className="form-admin-radio-options">{showDateHtml}</div>
          <button
            className="btn-admin"
            type="submit"
            disabled={loading}
            onClick={showtimeAdd}
          >
            {loading ? "Loading..." : "CONFIRM"}
          </button>
        </form>
      )}
    </section>
  );
};
