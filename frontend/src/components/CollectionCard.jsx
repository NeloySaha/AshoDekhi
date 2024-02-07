import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoginModal } from "../reducers/authSlice";
import { resetCart } from "../reducers/cartSlice";

export const CollectionCard = ({
  id,
  name,
  image_path,
  rating,
  duration,
  release_date,
  genres,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, signedPerson } = useSelector(
    (store) => store.authentication
  );
  const dispatch = useDispatch();

  const releaseDate = new Date(release_date).toLocaleDateString("en-GB");
  const ourRating = rating;

  return (
    <div
      className="home-movie-card"
      onClick={() => navigate(`/movieDetails/${id}`)}
    >
      <div className="home-movie-img-box">
        <img
          className="home-movie-img"
          src={image_path}
          alt={`${name} photo`}
        />
      </div>

      <div className="movie-card-line line-1">
        <p className="movie-title">{name}</p>

        <div className="movie-rating">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="collection-icon"
            viewBox="0 0 512 512"
          >
            <path d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z" />
          </svg>
          <span>{ourRating.toFixed(1)}</span>
        </div>
      </div>

      <p className="movie-genre">{genres}</p>

      <div className="movie-card-third-line">
        <div className="line-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="collection-icon"
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
          <p className="category">{releaseDate}</p>
        </div>

        <div className="line-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="collection-icon"
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
          <p className="category-value">{duration}</p>
        </div>
      </div>

      <button
        className="book-btn btn"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(resetCart());
          isAuthenticated && signedPerson.person_type === "Customer"
            ? navigate("/purchase")
            : dispatch(showLoginModal());
        }}
      >
        Get ticket
      </button>
    </div>
  );
};
