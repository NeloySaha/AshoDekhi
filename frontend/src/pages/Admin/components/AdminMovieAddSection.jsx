import axios from "axios";
import React, { useState } from "react";

export const AdminMovieAddSection = ({ adminErrorToast, adminMovieToast }) => {
  const [movieInfo, setMovieInfo] = useState({
    movieName: "",
    imagePath: "",
    language: "",
    description: "",
    rating: "",
    duration: "",
    cast: "",
    relDate: "",
    genres: "",
    directors: "",
  });
  const [adminMovieDropDown, setAdminMovieDropDown] = useState(false);

  const toggleAdminSection = () => {
    setAdminMovieDropDown((prevState) => !prevState);
  };

  const handleMovieInfo = (e) => {
    const name = e.target.name;
    const value =
      name === "genres" || name === "directors"
        ? e.target.value.split(",")
        : e.target.value;

    setMovieInfo((prevInfo) => {
      return {
        ...prevInfo,
        [name]: name === "rating" ? parseFloat(value) : value,
      };
    });
  };

  const movieAdd = async (e) => {
    e.preventDefault();
    let movieId;

    if (
      movieInfo.movieName !== "" &&
      movieInfo.imagePath !== "" &&
      movieInfo.language !== "" &&
      movieInfo.description !== "" &&
      movieInfo.rating !== "" &&
      movieInfo.duration !== "" &&
      movieInfo.cast !== "" &&
      movieInfo.relDate !== "" &&
      movieInfo.genres !== "" &&
      movieInfo.directors !== ""
    ) {
      await axios
        .post("http://localhost:7000/adminMovieAdd", {
          name: movieInfo.movieName,
          image_path: movieInfo.imagePath,
          language: movieInfo.language,
          synopsis: movieInfo.description,
          rating: movieInfo.rating,
          duration: movieInfo.duration,
          top_cast: movieInfo.cast,
          release_date: movieInfo.relDate,
        })
        .then((res) => (movieId = res.data && res.data[0].last_id))
        .catch((err) => {
          console.log(err);
          adminErrorToast();
        });

      movieId !== "" &&
        (await movieInfo.genres.forEach((genre) => {
          axios
            .post("http://localhost:7000/genreInsert", {
              movieId,
              genre,
            })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
              adminErrorToast();
            });
        }));

      movieId !== "" &&
        (await movieInfo.directors.forEach((director, idx) => {
          axios
            .post("http://localhost:7000/directorInsert", {
              movieId,
              director,
            })
            .then((res) => {
              if (movieInfo.directors.length - 1 === idx) {
                adminMovieToast();
                setMovieInfo({
                  movieName: "",
                  imagePath: "",
                  language: "",
                  description: "",
                  rating: "",
                  duration: "",
                  cast: "",
                  relDate: "",
                  genres: "",
                  directors: "",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              adminErrorToast();
            });
        }));

      toggleAdminSection();
    }
  };

  return (
    <section className="section-admin-movie-add container">
      <div className="form-heading-container">
        <h2 className="form-admin-heading">Add a Movie</h2>
        <button className="btn-admin-arrow" onClick={toggleAdminSection}>
          {!adminMovieDropDown ? (
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

      {adminMovieDropDown && (
        <form
          className="form-movie-add"
          onSubmit={(e) => {
            movieAdd(e);
          }}
        >
          <div>
            <p>Movie Name:</p>
            <input
              name="movieName"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="Enter Movie Name"
            />
          </div>

          <div>
            <p>Movie Photo Path:</p>
            <input
              name="imagePath"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="Enter Image path"
            />
          </div>

          <div>
            <p>Language:</p>
            <input
              name="language"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="Enter Movie Language"
            />
          </div>

          <div>
            <p>Synopsis:</p>
            <input
              name="description"
              onChange={(e) => handleMovieInfo(e)}
              placeholder="Enter Movie's Brief Description"
            />
          </div>

          <div>
            <p>Rating:</p>
            <input
              name="rating"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="Enter Movie Rating"
            />
          </div>

          <div>
            <p>Duration:</p>
            <input
              name="duration"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="Enter Movie Duration"
            />
          </div>

          <div>
            <p>Top Cast:</p>
            <input
              name="cast"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="Enter Movie's Main Actor/Actress Name"
            />
          </div>

          <div>
            <p>Release Date:</p>
            <input
              name="relDate"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="(yyyy-mm-dd) format"
            />
          </div>

          <div>
            <p>Movie Genres:</p>
            <input
              name="genres"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="Enter separate Genres with comma"
            />
          </div>

          <div>
            <p>Movie Directors:</p>
            <input
              name="directors"
              onChange={(e) => handleMovieInfo(e)}
              type="text"
              placeholder="Enter separate Directors with comma"
            />
          </div>

          <button type="submit" className="btn-admin">
            CONFIRM
          </button>
        </form>
      )}
    </section>
  );
};
