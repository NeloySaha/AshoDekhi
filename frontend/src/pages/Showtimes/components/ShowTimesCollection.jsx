import axios from "axios";
import React, { useEffect, useState } from "react";
import { ShowtimesCard } from "./ShowtimesCard";

export const ShowTimesCollection = ({
  userLocation,
  userGenre,
  currentMovieDetails,
  handleLoginState,
  signedPerson,
}) => {
  const [showtimesData, setShowtimesData] = useState([]);

  const theatreName = userLocation && userLocation.name;

  useEffect(() => {
    const fetchData = async () => {
      axios
        .post("http://localhost:7000/showtimes", { theatreName, userGenre })
        .then((res) => {
          setShowtimesData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, [userLocation, userGenre]);

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
      <div className="showtimes-collection container">{showtimesCards}</div>
    </section>
  );
};
