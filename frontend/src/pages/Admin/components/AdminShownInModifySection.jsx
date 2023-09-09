import axios from "axios";
import React, { useEffect, useState } from "react";

export const AdminShownInModifySection = ({
  selectedDate,
  adminErrorToast,
  adminShowninToast,
}) => {
  const [moviePlaylistDropDown, setMoviePlaylistDropDown] = useState(false);
  const [latestShowDates, setLatestShowDates] = useState([]);
  const [selectedShowDate, setSelectedShowDate] = useState("");
  const [showtimeData, setShowtimeData] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [movieReplaceData, setMovieReplaceData] = useState([]);
  const [selectedReplace, setSelectedReplace] = useState("");
  const [movieAltData, setMovieAltData] = useState([]);
  const [selectedAlt, setSelectedAlt] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/adminLatestShowDates`)
        .then((res) =>
          setLatestShowDates(() => {
            const tempDateList = res.data.map((dateObj) => {
              return dateFormatter(dateObj.showtime_date);
            });

            return tempDateList;
          })
        )
        .catch((err) => {
          console.log(err);
          adminErrorToast();
        });
    };

    fetchData();
  }, [selectedDate]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedShowDate !== "") {
        await axios
          .post(`${import.meta.env.VITE_API_URL}/adminShowtimes`, {
            selectedShowDate,
          })
          .then((res) => {
            console.log(res.data);
            setShowtimeData(res.data);
          })
          .catch((err) => {
            console.log(err);
            adminErrorToast();
          });
      }
    };

    fetchData();
    setSelectedShowtime("");
  }, [selectedShowDate]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .post(`${import.meta.env.VITE_API_URL}/movieReplaceFrom`, {
          selectedShowtime,
        })
        .then((res) => setMovieReplaceData(res.data))
        .catch((err) => {
          console.log(err);
          adminErrorToast();
        });
    };

    fetchData();
    setSelectedReplace("");
  }, [selectedShowtime]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .post(`${import.meta.env.VITE_API_URL}/movieReplaceTo`, {
          selectedShowtime,
        })
        .then((res) => setMovieAltData(res.data))
        .catch((err) => {
          console.log(err);
          adminErrorToast();
        });
    };

    fetchData();
    setSelectedAlt("");
  }, [selectedReplace]);

  const checkedColor = (val, checkVal) => {
    return {
      backgroundColor: val === checkVal ? "#ef5e78" : "",
      border: val === checkVal ? "2px solid transparent" : "",
    };
  };

  const handleSelectedDate = (e) => {
    setSelectedShowDate(e.target.value);
  };

  const handleSelectedShowtime = (e) => {
    setSelectedShowtime(parseInt(e.target.value));
  };

  const handleSelectedReplace = (e) => {
    setSelectedReplace(parseInt(e.target.value));
  };

  const handleSelectedAlt = (e) => {
    setSelectedAlt(parseInt(e.target.value));
  };

  const handleMovieSwap = async (e) => {
    e.preventDefault();

    await axios
      .post(`${import.meta.env.VITE_API_URL}/movieSwap`, {
        selectedAlt,
        selectedShowtime,
        selectedReplace,
      })
      .then((res) => {
        adminShowninToast();
      })
      .catch((err) => {
        console.log(err);
        adminErrorToast();
      });

    setSelectedShowDate("");
  };

  const toggleDropDown = () => {
    setMoviePlaylistDropDown((prevState) => !prevState);
  };

  const dateFormatter = (dateData) => {
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

    const visualDate = new Date(dateData).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return { formattedDate, visualDate };
  };

  const latestShowDatesHtml = latestShowDates.map((dateObj, i) => (
    <div
      className="admin-radio-input-container"
      key={i + 1}
      style={checkedColor(dateObj.formattedDate, selectedShowDate)}
    >
      <input
        type="radio"
        id={i + 1}
        name="Select Showdate"
        value={dateObj.formattedDate}
        onChange={(e) => handleSelectedDate(e)}
        checked={dateObj.formattedDate === selectedShowDate}
      />

      <label
        className="form-admin-input-detail"
        htmlFor={dateObj.formattedDate}
      >
        {dateObj.visualDate}
      </label>
    </div>
  ));

  const latestShowtimesHtml = showtimeData.map((showtimeObj, i) => (
    <div
      className="admin-radio-input-container"
      key={i + 1}
      style={checkedColor(showtimeObj.id, selectedShowtime)}
    >
      <input
        type="radio"
        id={i + 1}
        name="Select Showtime"
        value={showtimeObj.id}
        onChange={(e) => handleSelectedShowtime(e)}
        checked={showtimeObj.id === selectedShowtime}
      />

      <label className="form-admin-input-detail" htmlFor={showtimeObj.id}>
        {`${showtimeObj.movie_start_time}-${showtimeObj.show_type}`}
      </label>
    </div>
  ));

  const replaceOptionsHtml = movieReplaceData.map((movieObj, i) => (
    <div
      className="admin-radio-input-container"
      key={i + 1}
      style={checkedColor(movieObj.movie_id, selectedReplace)}
    >
      <input
        type="radio"
        id={i + 1}
        name="Replace Movie"
        value={movieObj.movie_id}
        onChange={(e) => handleSelectedReplace(e)}
        checked={movieObj.movie_id === selectedReplace}
      />

      <label className="form-admin-input-detail" htmlFor={movieObj.movie_id}>
        {movieObj.name}
      </label>
    </div>
  ));

  const newMovieOptionsHtml = movieAltData.map((movieObj, i) => (
    <div
      className="admin-radio-input-container"
      key={i + 1}
      style={checkedColor(movieObj.id, selectedAlt)}
    >
      <input
        type="radio"
        id={i + 1}
        name="Choose New Movie"
        value={movieObj.id}
        onChange={(e) => handleSelectedAlt(e)}
        checked={movieObj.id === selectedAlt}
      />

      <label className="form-admin-input-detail" htmlFor={movieObj.id}>
        {movieObj.name}
      </label>
    </div>
  ));

  return (
    <section className="section-admin-movie-modify">
      <div className="section-movie-playlist container">
        <div className="form-heading-container">
          <h2 className="form-admin-heading playlist">Update Movie Playlist</h2>
          <button className="btn-admin-arrow" onClick={toggleDropDown}>
            {!moviePlaylistDropDown ? (
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
        {moviePlaylistDropDown && (
          <form className="form-admin-showtime-add">
            <div className="form-admin-radio-options">
              {latestShowDatesHtml}
            </div>

            {selectedShowDate.length > 0 && (
              <>
                <h3 className="admin-heading-secondary">Select a Slot</h3>
                <div className="form-admin-radio-options">
                  {latestShowtimesHtml}
                </div>
              </>
            )}

            {selectedShowtime !== "" && (
              <>
                <h3 className="admin-heading-secondary">Replace</h3>
                <div className="form-admin-radio-options">
                  {replaceOptionsHtml}
                </div>
              </>
            )}

            {selectedReplace !== "" && (
              <>
                <h3 className="admin-heading-secondary">With</h3>
                <div className="form-admin-radio-options">
                  {newMovieOptionsHtml}
                </div>
              </>
            )}
            {selectedAlt !== "" && (
              <button
                className="btn-admin"
                type="submit"
                onClick={(e) => {
                  handleMovieSwap(e);
                }}
              >
                CONFIRM
              </button>
            )}
          </form>
        )}
      </div>
    </section>
  );
};
