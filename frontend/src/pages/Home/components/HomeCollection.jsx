import React, { useEffect, useState } from "react";
import { CollectionCard } from "../../../components/CollectionCard";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";

export const HomeCollection = ({
  currentMovieDetails,
  signedPerson,
  handleLoginState,
}) => {
  const override = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading((prevState) => !prevState);
      await axios
        .get(`${import.meta.env.VITE_API_URL}/latestMovies`)
        .then((res) => {
          setMovieData(res.data);
        })
        .catch((err) => console.log(err));

      setLoading((prevState) => !prevState);
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
      {loading && <HashLoader cssOverride={override} color="#eb3656" />}
      <div className="home-collection-container">
        {!loading && latestMoviesCards}
      </div>
    </section>
  );
};
