import { useNavigate } from "react-router-dom";

export const ShowtimesCard = (props) => {
  const dates3d = props["3D"] ? Object.keys(props["3D"]) : [];
  const dates2d = props["2D"] ? Object.keys(props["2D"]) : [];

  const navigate = useNavigate();

  const show_types_3d =
    dates3d.length &&
    dates3d.map((curDate, idx) => {
      const curStartTimes = props["3D"][curDate].map((curStartTime) => {
        return (
          <li key={idx}>
            <button
              className="showtimes-startime-btn"
              onClick={() => {
                Object.keys(props.signedPerson).length !== 0 &&
                props.signedPerson.person_type === "Customer"
                  ? navigate("/purchase")
                  : props.handleLoginState();
              }}
            >
              {curStartTime}
            </button>
          </li>
        );
      });

      const formattedDate = new Date(curDate).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      return (
        <div key={`${curDate}3d`} className="showtimes-schedule">
          <h3 className="showtimes-date">{formattedDate}</h3>
          <ul className="showtimes-startime-btn-list">{curStartTimes}</ul>
        </div>
      );
    });

  const show_types_2d =
    dates2d.length &&
    dates2d.map((curDate, idx) => {
      const curStartTimes = props["2D"][curDate].map((curStartTime) => {
        return (
          <li key={idx}>
            <button
              className="showtimes-startime-btn"
              onClick={() => {
                Object.keys(props.signedPerson).length !== 0 &&
                props.signedPerson.person_type === "Customer"
                  ? navigate("/purchase")
                  : props.handleLoginState();
              }}
            >
              {curStartTime}
            </button>
          </li>
        );
      });

      const formattedDate = new Date(curDate).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      return (
        <div key={`${curDate}2d`} className="showtimes-schedule">
          <h3 className="showtimes-date">{formattedDate}</h3>
          <ul className="showtimes-startime-btn-list">{curStartTimes}</ul>
        </div>
      );
    });

  return (
    <div className="showtimes-card">
      <div className="showtimes-card-leftpart">
        <div className="showtimes-img-box">
          <img
            className="showtimes-img"
            src={props.image_path}
            alt={props.movie_name}
          />
        </div>

        <h2 className="showtimes-title">{props.movie_name}</h2>
        <button
          className="showtimes-details-btn"
          onClick={() => {
            props.currentMovieDetails(props.id);
            navigate("/movieDetails");
          }}
        >
          See details
        </button>
      </div>

      <div className="showtimes-screen-container">
        {dates3d.length !== 0 && (
          <div
            className="showtimes-schedule-container-3d"
            style={
              dates2d.length !== 0 ? { borderBottom: "1px solid #313441" } : {}
            }
          >
            <h2 className="showtimes-screen">3D</h2>
            {show_types_3d}
          </div>
        )}

        {dates2d.length !== 0 && (
          <div className="showtimes-schedule-container-2d">
            <h2 className="showtimes-screen">2D</h2>

            {show_types_2d}
          </div>
        )}
      </div>
    </div>
  );
};
