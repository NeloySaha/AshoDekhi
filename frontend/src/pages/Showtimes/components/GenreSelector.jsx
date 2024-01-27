import React, { useEffect, useState } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";

export const GenreSelector = ({ userGenre, handleGenreChange }) => {
  const [genreData, setGenreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const override = {
    display: "block",
    margin: "4.8rem auto",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/genres`
        );
        setGenreData([{ genre: "All" }, ...response.data]);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const checkedColor = (val) => {
    return {
      backgroundColor: val === userGenre ? "#ef5e78" : "",
      border: val === userGenre ? "2px solid transparent" : "",
    };
  };

  const genreOptions = genreData?.map(({ genre }, idx) => {
    return (
      <div
        className="genre-input-container"
        key={idx}
        style={checkedColor(genre)}
      >
        <input
          type="radio"
          id={idx}
          name="Select Genre"
          value={genre}
          onChange={(e) => handleGenreChange(e)}
          checked={genre === userGenre}
        />

        <label className="form-genre-detail" htmlFor={genre}>
          {genre}
        </label>
      </div>
    );
  });

  return loading ? (
    <HashLoader cssOverride={override} color="#eb3656" />
  ) : (
    <div className="genre-container">
      <div className="genre-icon-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="genre-icon"
          viewBox="0 0 512 512"
        >
          <path
            d="M35.4 87.12l168.65 196.44A16.07 16.07 0 01208 294v119.32a7.93 7.93 0 005.39 7.59l80.15 26.67A7.94 7.94 0 00304 440V294a16.07 16.07 0 014-10.44L476.6 87.12A14 14 0 00466 64H46.05A14 14 0 0035.4 87.12z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
          />
        </svg>
      </div>
      {genreOptions}
    </div>
  );
};
