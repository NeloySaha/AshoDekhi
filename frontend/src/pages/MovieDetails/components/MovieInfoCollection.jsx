import { useEffect, useState } from "react";
import { CollectionCard } from "../../../components/CollectionCard";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { useParams } from "react-router-dom";

export const MovieInfoCollection = ({
  currentMovieDetails,

  signedPerson,
  handleLoginState,
}) => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const override = {
    display: "block",
    margin: "4.8rem auto",
  };
  const movieDetailsId = Number(id);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/otherMovies`,
          {
            movieDetailsId,
          }
        );
        setMovieData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
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
      {loading ? (
        <HashLoader cssOverride={override} color="#eb3656" />
      ) : (
        <div className="details-collection-container">{latestMoviesCards}</div>
      )}
    </section>
  );
};
