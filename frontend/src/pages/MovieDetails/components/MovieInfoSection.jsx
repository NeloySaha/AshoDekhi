import React, { useEffect, useState, useRef } from "react";
import { LocationSelector } from "../../../components/LocationSelector";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

export const MovieInfoSection = ({
  locationData,
  getTheatreData,
  userLocation,
  handleLocationSelection,
  movieDetailsId,
  signedPerson,
  handleLoginState,
}) => {
  const [movieData, setMovieData] = useState({});
  const [showtimesData, setShowtimesData] = useState([]);
  const navigate = useNavigate();
  const [loading1, setLoading1] = useState(false);

  const override = {
    display: "block",
    margin: "9.6rem auto",
  };
  const initialRender = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading1(true);
      await axios
        .post(`${import.meta.env.VITE_API_URL}/movieDetail`, { movieDetailsId })
        .then((res) =>
          setMovieData(() => {
            const formattedRelDate = new Date(
              res.data[0].release_date
            ).toLocaleDateString("en-GB");

            const durationDetail1 = res.data[0].duration.replace("h", " hours");
            const duration = durationDetail1.replace("m", " minutes");

            return {
              ...res.data[0],
              name: res.data[0].name,
              duration,
              release_date: formattedRelDate,
              rating: res.data[0].rating.toFixed(1),
            };
          })
        )
        .catch((err) => console.log(err));

      await axios
        .post(`${import.meta.env.VITE_API_URL}/movieWiseShowtime`, {
          movieDetailsId,
          theatreId: userLocation?.id,
        })
        .then((res) => setShowtimesData(res.data))
        .catch((err) => console.log(err));
      setLoading1(false);
    };

    fetchData();
  }, [movieDetailsId]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .post(`${import.meta.env.VITE_API_URL}/movieWiseShowtime`, {
          movieDetailsId,
          theatreId: userLocation?.id,
        })
        .then((res) => setShowtimesData(res.data))
        .catch((err) => console.log(err));
    };

    fetchData();
  }, [userLocation]);

  const showtimesObj3d = {};
  const showtimesObj2d = {};

  showtimesData.length > 0 &&
    showtimesData.forEach((show) => {
      const curDate = show.showtime_date;

      if (show.show_type === "3D") {
        if (curDate in showtimesObj3d) {
          showtimesObj3d[curDate].push(show);
        } else {
          showtimesObj3d[curDate] = [show];
        }
      }
    });

  showtimesData.length > 0 &&
    showtimesData.forEach((show) => {
      const curDate = show.showtime_date;

      if (show.show_type === "2D") {
        if (curDate in showtimesObj2d) {
          showtimesObj2d[curDate].push(show);
        } else {
          showtimesObj2d[curDate] = [show];
        }
      }
    });

  const showHtml3d = Object.keys(showtimesObj3d).map((showDate) => {
    const times = showtimesObj3d[showDate];

    const timesHtml = times.map((singleTime) => {
      return (
        <li>
          <button
            className="showtimes-startime-btn"
            onClick={() => {
              Object.keys(signedPerson).length !== 0 &&
              signedPerson.person_type === "Customer"
                ? navigate("/purchase")
                : handleLoginState();
            }}
          >
            {singleTime.movie_start_time}
          </button>
        </li>
      );
    });
    const formattedDate = new Date(showDate).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return (
      <div className="showtimes-schedule">
        <h3 className="showtimes-date">{formattedDate}</h3>

        <ul className="showtimes-startime-btn-list">{timesHtml}</ul>
      </div>
    );
  });

  const showHtml2d = Object.keys(showtimesObj2d).map((showDate) => {
    const times = showtimesObj2d[showDate];

    const timesHtml = times.map((singleTime) => {
      return (
        <li>
          <button
            className="showtimes-startime-btn"
            onClick={() => {
              Object.keys(signedPerson).length !== 0 &&
              signedPerson.person_type === "Customer"
                ? navigate("/purchase")
                : handleLoginState();
            }}
          >
            {singleTime.movie_start_time}
          </button>
        </li>
      );
    });
    const formattedDate = new Date(showDate).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return (
      <div className="showtimes-schedule">
        <h3 className="showtimes-date">{formattedDate}</h3>

        <ul className="showtimes-startime-btn-list">{timesHtml}</ul>
      </div>
    );
  });

  return loading1 ? (
    <HashLoader cssOverride={override} size={60} color="#eb3656" />
  ) : (
    <div className="section-movie-info container">
      <div className="movie-info-grid-container">
        <div className="movie-info-img-container">
          <img
            className="movie-info-img"
            src={movieData && movieData.image_path}
            alt="Movie Photo"
          />
        </div>

        <div className="movie-info-attr-container">
          <h2 className="movie-info-name">{movieData && movieData.name}</h2>

          <div className="movie-info-small-container ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="movie-info-icon"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M192 448h128M384 208v32c0 70.4-57.6 128-128 128h0c-70.4 0-128-57.6-128-128v-32M256 368v80"
              />
              <path
                d="M256 64a63.68 63.68 0 00-64 64v111c0 35.2 29 65 64 65s64-29 64-65V128c0-36-28-64-64-64z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              />
            </svg>
            <p>{movieData && movieData.language}</p>
          </div>

          <div className="movie-info-small-container ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="movie-info-icon"
              viewBox="0 0 512 512"
            >
              <path d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z" />
            </svg>
            <p>{movieData.rating}/10</p>
          </div>

          <div className="movie-info-small-container ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="movie-info-icon"
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
            <p>{movieData.release_date}</p>
          </div>

          <div className="movie-info-small-container ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="movie-info-icon"
              viewBox="0 0 512 512"
            >
              <path
                d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z"
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="32"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M256 128v144h96"
              />
            </svg>
            <p>{movieData.duration}</p>
          </div>

          <div className="movie-info-genre-container">
            <p className="movie-info-title">Genre: </p>
            <p>{movieData && movieData.genres}</p>
          </div>

          <div className="movie-info-director-container">
            <p className="movie-info-title">Directed by: </p>
            <p>{movieData && movieData.directors}</p>
          </div>

          <div className="movie-info-cast-container">
            <p className="movie-info-title">Top Cast: </p>
            <p>{movieData && movieData.top_cast}</p>
          </div>
        </div>
      </div>

      <div className="movie-info-description-container">
        <h3 className="movie-info-description-heading">Synopsis</h3>
        <p className="movie-info-description">
          {movieData && movieData.synopsis}
        </p>
      </div>

      <div className="movie-info-location-container">
        <LocationSelector
          getTheatreData={getTheatreData}
          locationData={locationData}
          userLocation={userLocation}
          handleLocationSelection={handleLocationSelection}
        />
      </div>

      <h3 className="movie-info-screen-heading">Showtimes</h3>

      <div className="movie-info-screen-container">
        {showHtml3d.length > 0 && (
          <div className="movie-info-screen-container-3d">
            <h2 className="showtimes-screen">3D</h2>

            {showHtml3d}
          </div>
        )}

        {showHtml2d.length > 0 && (
          <div className="movie-info-screen-container-2d">
            <h2 className="showtimes-screen">2D</h2>

            {showHtml2d}
          </div>
        )}
      </div>
    </div>
  );
};
