import React, { useEffect, useState } from "react";
import { CollectionCard } from "../../../components/CollectionCard";
import axios from "axios";

export const MovieInfoCollection = ({
  currentMovieDetails,
  movieDetailsId,
  signedPerson,
  handleLoginState,
}) => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .post("http://localhost:7000/otherMovies", { movieDetailsId })
        .then((res) => setMovieData(res.data))
        .catch((err) => console.log(err));
    };

    fetchData();
  }, [movieDetailsId]);

  const latestMoviesCards = movieData.map((latestMovie, idx) => {
    return (
      idx < 6 && (
        <CollectionCard
          key={latestMovie.id}
          {...latestMovie}
          signedPerson={signedPerson}
          handleLoginState={handleLoginState}
          currentMovieDetails={currentMovieDetails}
        />
      )
    );
  });

  return (
    <section className="section-movie-info-collection">
      <div className="home-collection-heading-container">
        <h1 className="heading-secondary heading-collection">
          Find other movies &rarr;
        </h1>
      </div>
      <div className="details-collection-container">{latestMoviesCards}</div>
    </section>
  );
};
