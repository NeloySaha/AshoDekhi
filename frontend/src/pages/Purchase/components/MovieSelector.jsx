import { useEffect, useState } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";

export const MovieSelector = ({
  userMovieId,
  handleUserMovieChange,
  movieData,
  getMovieData,
  userDate,
  theatreId,
}) => {
  const override = {
    display: "block",
    margin: "1.6rem auto",
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/uniqueMovies`,
          {
            theatreId,
            userDate,
          }
        );
        getMovieData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userDate, getMovieData, theatreId]);

  const movieOptions = movieData.map((movie, idx) => {
    return (
      <div className="movie-input-container" key={idx}>
        <input
          type="radio"
          id={idx}
          name="Select Movie"
          value={movie.id}
          onChange={(e) => handleUserMovieChange(e)}
          checked={movie.id === userMovieId}
        />

        <label className="form-movie-detail" htmlFor={movie.id}>
          <div className="movie-option-box">
            <div className="movie-option-img-box">
              <img
                src={movie.image_path}
                className="movie-option-img"
                alt={movie.movie_name}
              />
            </div>

            <div>
              <p className="movie-option-name">{movie.movie_name}</p>
            </div>
          </div>
        </label>

        <div
          className="checkmark-icon"
          style={{ zIndex: userMovieId === movie.id && 2 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="movie-selector-icon"
            viewBox="0 0 512 512"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M464 128L240 384l-96-96M144 384l-96-96M368 128L232 284"
            />
          </svg>
        </div>
      </div>
    );
  });

  return (
    <div>
      <form>
        <div className="form-item-heading">Select a movie</div>
        {loading && <HashLoader cssOverride={override} color="#eb3656" />}
        {!loading && <div className="form-movie-options">{movieOptions}</div>}
      </form>
    </div>
  );
};
