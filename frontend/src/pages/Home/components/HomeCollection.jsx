import React, { useEffect, useState } from "react";
import { CollectionCard } from "../../../components/CollectionCard";
import axios from "axios";

export const HomeCollection = ({
  currentMovieDetails,
  signedPerson,
  handleLoginState,
}) => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:7000/latestMovies")
        .then((res) => {
          setMovieData(res.data);
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  const latestMoviesCards = movieData.map((latestMovie, idx) => {
    return (
      <CollectionCard
        key={latestMovie.id}
        {...latestMovie}
        signedPerson={signedPerson}
        handleLoginState={handleLoginState}
        currentMovieDetails={currentMovieDetails}
      />
    );
  });

  return (
    <section className="section-home-collection" id="nowShowing">
      <div className="home-collection-heading-container">
        <h1 className="heading-secondary heading-collection">
          Now Playing &rarr;
        </h1>
      </div>
      <div className="home-collection-container">{latestMoviesCards}</div>
    </section>
  );
};
