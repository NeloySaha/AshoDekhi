import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { ShowtimesCard } from "./ShowtimesCard";
import HashLoader from "react-spinners/HashLoader";

export const ShowTimesCollection = ({
  userLocation,
  userGenre,
  currentMovieDetails,
  handleLoginState,
  signedPerson,
}) => {
  const override = {
    display: "block",
    margin: "4.8rem auto",
  };

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [showtimesData, setShowtimesData] = useState([]);
  const theatreName = userLocation && userLocation.name;
  const initialRender = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading1(true);
      await dataFetch();
      setLoading1(false);
    };
    console.log(userLocation);
    fetchData();
  }, [userLocation]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading2(true);
      await dataFetch();
      setLoading2(false);
    };

    fetchData();
  }, [userGenre]);

  const dataFetch = async () => {
    await axios
      .post(`${import.meta.env.VITE_API_URL}/showtimes`, {
        theatreName,
        userGenre,
      })
      .then((res) => {
        setShowtimesData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const movieShowtimes = [];

  for (let i = 0; i < showtimesData.length; i++) {
    const curMovieDate = showtimesData[i].showtime_date;
    const curMovieName = showtimesData[i].movie_name;
    const curMovieImagePath = showtimesData[i].image_path;
    const curMovieStartTime = showtimesData[i].movie_start_time;
    const curMovieType = showtimesData[i].show_type;
    const curMovieGenre = showtimesData[i].genre;
    const curMovieId = showtimesData[i].id;

    let isPresent = movieShowtimes.some(
      (movie) => movie.movie_name === curMovieName
    );

    if (isPresent) {
      let currentMovie = movieShowtimes.find(
        (movie) => movie.movie_name === curMovieName
      );

      if (!currentMovie.genre.includes(curMovieGenre)) {
        currentMovie.genre.push(curMovieGenre);
      }

      if (curMovieType in currentMovie) {
        if (curMovieDate in currentMovie[curMovieType]) {
          if (
            !currentMovie[curMovieType][curMovieDate].includes(
              curMovieStartTime
            )
          ) {
            currentMovie[curMovieType][curMovieDate].push(curMovieStartTime);
          }
        } else {
          currentMovie[curMovieType][curMovieDate] = [curMovieStartTime];
        }
      } else {
        currentMovie[curMovieType] = {
          [curMovieDate]: [curMovieStartTime],
        };
      }
    } else {
      movieShowtimes.push({
        id: curMovieId,
        movie_name: curMovieName,
        image_path: curMovieImagePath,
        genre: [curMovieGenre],
        [curMovieType]: {
          [curMovieDate]: [curMovieStartTime],
        },
      });
    }
  }

  const showtimesCards = movieShowtimes.map((showtime, idx) => {
    return (
      <ShowtimesCard
        key={idx}
        {...showtime}
        handleLoginState={handleLoginState}
        signedPerson={signedPerson}
        currentMovieDetails={currentMovieDetails}
      />
    );
  });

  return (
    <section className="section-showtimes">
      <div className="showtimes-collection container">
        {loading1 || loading2 ? (
          <HashLoader cssOverride={override} color="#eb3656" />
        ) : (
          showtimesCards
        )}
      </div>
    </section>
  );
};
