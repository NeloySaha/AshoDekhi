const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const env = require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: ["https://asho-dekhi.vercel.app"],
    methods: ["POST", "GET"],
  })
);
app.use(express.json());

let db;

const configuration = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Manually setting connection
function handleDisconnect() {
  db = mysql.createConnection(configuration);

  db.connect(function (err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log("connection is successful");
    }
  });
  db.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
handleDisconnect();

app.get("/", (req, res) => {
  return res.json("Hello Backend Side");
});

// /////
// HOME
// /////

app.get("/latestMovies", (req, res) => {
  const sql =
    "SELECT m.id, m.name, m.image_path, m.rating, m.duration, m.release_date as release_date, GROUP_CONCAT(g.genre SEPARATOR ', ') as genres FROM movie m INNER JOIN movie_genre g ON m.id = g.movie_id GROUP BY m.id ORDER BY release_date DESC LIMIT 6";

  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.get("/locationDetails", (req, res) => {
  sql = "SELECT location_details FROM theatre";

  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.get("/locationFeatures", (req, res) => {
  sql = "SELECT DISTINCT title,image_path,description FROM features";

  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// /////////
// SHOWTIMES
// /////////

app.get("/theatres", (req, res) => {
  sql = "SELECT id, name,location FROM theatre";

  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/showtimes", (req, res) => {
  const theatreName = req.body.theatreName;
  const userGenre = req.body.userGenre;

  sql1 = `SELECT M.id, M.name AS movie_name, M.image_path, S.showtime_date, S.movie_start_time, S.show_type, MG.genre FROM theatre T JOIN hall H ON T.id = H.theatre_id JOIN shown_in SI ON H.id = SI.hall_id JOIN showtimes S ON SI.showtime_id = S.id JOIN movie M ON SI.movie_id = M.id JOIN movie_genre MG ON MG.movie_id = M.id JOIN ( SELECT DISTINCT showtime_date FROM showtimes ORDER BY showtime_date DESC LIMIT 4 ) AS LatestDates ON S.showtime_date = LatestDates.showtime_date WHERE T.name =? and MG.genre=? ORDER BY S.showtime_date ASC`;

  sql2 = `SELECT M.id, M.name AS movie_name, M.image_path, S.showtime_date, S.movie_start_time, S.show_type, MG.genre FROM theatre T JOIN hall H ON T.id = H.theatre_id JOIN shown_in SI ON H.id = SI.hall_id JOIN showtimes S ON SI.showtime_id = S.id JOIN movie M ON SI.movie_id = M.id JOIN movie_genre MG ON MG.movie_id = M.id JOIN ( SELECT DISTINCT showtime_date FROM showtimes ORDER BY showtime_date DESC LIMIT 4 ) AS LatestDates ON S.showtime_date = LatestDates.showtime_date WHERE T.name =?  ORDER BY S.showtime_date ASC`;

  userGenre === "All"
    ? db.query(sql2, [theatreName], (err, data) => {
        if (err) {
          return res.json({ error: "An error occurred while fetching data." });
        }

        return res.json(data);
      })
    : db.query(sql1, [theatreName, userGenre], (err, data) => {
        if (err) {
          console.error("Database query error:", err);
          return res
            .status(500)
            .json({ error: "An error occurred while fetching data." });
        }

        return res.json(data);
      });
});

app.get("/genres", (req, res) => {
  const sql = "SELECT DISTINCT genre FROM movie_genre";

  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// /////////////
// PAYMENT PAGE
// /////////////

app.post("/showtimesDates", (req, res) => {
  const theatreId = req.body.theatreId;

  const sql = `SELECT subquery.showtime_date
  FROM (
      SELECT DISTINCT showtimes.showtime_date
      FROM showtimes
      JOIN shown_in ON showtimes.id = shown_in.showtime_id
      JOIN hall ON shown_in.hall_id = hall.id
      WHERE hall.theatre_id = ?
      ORDER BY showtimes.id DESC
      LIMIT 4
  ) AS subquery
  ORDER BY subquery.showtime_date ASC`;

  db.query(sql, [theatreId], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/uniqueMovies", (req, res) => {
  const theatreId = req.body.theatreId;
  const showtimeDate = req.body.userDate;

  const sql =
    "SELECT DISTINCT M.id,M.duration, M.name AS movie_name, M.image_path FROM movie M JOIN shown_in SI ON M.id = SI.movie_id JOIN showtimes S ON SI.showtime_id = S.id JOIN hall H ON SI.hall_id = H.id WHERE H.theatre_id = ? AND S.showtime_date = ?";

  db.query(sql, [theatreId, showtimeDate], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/halls", (req, res) => {
  const theatreId = req.body.theatreId;
  const showtimeDate = req.body.userDate;
  const movieId = req.body.userMovieId;

  const sql =
    "SELECT H.id AS hall_id, H.name AS hall_name, SI.showtime_id, S.show_type,S.movie_start_time, S.price_per_seat FROM hall H JOIN shown_in SI ON H.id = SI.hall_id JOIN showtimes S ON SI.showtime_id = S.id WHERE H.theatre_id = ? AND S.showtime_date = ? AND SI.movie_id = ?";
  db.query(sql, [theatreId, showtimeDate, movieId], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/seats", (req, res) => {
  const showtime_id = req.body.userShowtimeId;
  const hall_id = req.body.userHallId;
  const movie_id = req.body.userMovieId;

  const sql = `SELECT
  S.id AS seat_id,
  S.name AS seat_name,
  CASE WHEN T.id IS NULL THEN TRUE ELSE FALSE END AS booked_status
FROM
  seat AS S
  JOIN hallwise_seat AS HS ON S.id = HS.seat_id
  JOIN shown_in AS SI ON HS.hall_id = SI.hall_id
  LEFT JOIN ticket AS T ON
      T.seat_id = S.id AND
      T.showtimes_id = SI.showtime_id AND
      T.hall_id = SI.hall_id AND
      T.movie_id = SI.movie_id
WHERE
  SI.showtime_id = ? AND
  SI.hall_id = ? AND
  SI.movie_id = ?
ORDER BY S.id`;

  db.query(sql, [showtime_id, hall_id, movie_id], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/payment", (req, res) => {
  const amount = req.body.amount;
  const email = req.body.email;
  const paymentType = req.body.userPayMethod;

  const sql1 =
    "INSERT INTO payment(amount,method,customer_email) VALUES(?,?,?)";
  const sql2 = "SELECT LAST_INSERT_ID() as last_id";

  db.query(sql1, [amount, paymentType, email], (err1, data1) => {
    if (err1) return res.json(err1);

    db.query(sql2, (err2, data2) => {
      if (err2) return res.json(err2);

      return res.json(data2);
    });
  });
});

app.post("/purchaseTicket", (req, res) => {
  const price = req.body.price;
  const date = req.body.purchase_date;
  const payment_id = req.body.paymentID;
  const seat_id = req.body.seatId;
  const hall_id = req.body.userHallId;
  const movie_id = req.body.userMovieId;
  const showtime_id = req.body.userShowtimeId;

  const sql =
    "INSERT INTO ticket (price,purchase_date,payment_id,seat_id,hall_id,movie_id,showtimes_id) VALUES (?,?,?,?,?,?,?)";

  db.query(
    sql,
    [price, date, payment_id, seat_id, hall_id, movie_id, showtime_id],
    (err, data) => {
      if (err) return res.json(err);

      return res.json(data);
    }
  );
});

app.post("/recentPurchase", (req, res) => {
  const payment_id = req.body.paymentID;
  const sql = `SELECT id FROM ticket WHERE payment_id=?`;

  db.query(sql, [payment_id], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// ////////
// SIGN UP
// ////////

app.post("/registration", (req, res) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;

  const sql = `INSERT INTO person (email, first_name, last_name, password, phone_number, person_type) VALUES (?, ?, ?, ?, ?, 'Customer')`;

  db.query(
    sql,
    [email, firstName, lastName, password, phoneNumber],
    (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Sorry, Please try again!" });
      }

      return res
        .status(200)
        .json({ message: "Congratulations! We created your account" });
    }
  );
});

// /////
// LOGIN
// /////

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const sql = `SELECT email, first_name, person_type FROM person WHERE email=? AND password=?`;

  db.query(sql, [email, password], (err, data) => {
    if (err) return res.json(err);

    if (data.length === 0) {
      return res.status(404).json({ message: "Sorry, User not found!" });
    }

    return res.json(data);
  });
});

// /////////////////
// MOVIEDETAILS PAGE
// /////////////////

app.post("/movieDetail", (req, res) => {
  const id = req.body.movieDetailsId;

  const sql = `SELECT
  M.*,
  GROUP_CONCAT(DISTINCT MD.director SEPARATOR ', ') AS directors,
  GROUP_CONCAT(DISTINCT MG.genre SEPARATOR ', ') AS genres
FROM
  movie M
 JOIN
  movie_directors MD ON M.id = MD.movie_id
 JOIN
  movie_genre MG ON M.id = MG.movie_id
WHERE
  M.id = ?
GROUP BY
  M.id
`;

  db.query(sql, [id], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/movieWiseShowtime", (req, res) => {
  const movieId = req.body.movieDetailsId;
  const theatreId = req.body.theatreId;

  const sql = `SELECT S.id AS showtime_id, H.id AS hall_id, M.id AS movie_id, S.showtime_date, S.movie_start_time, S.show_type, S.price_per_seat FROM theatre T JOIN hall H ON T.id = H.theatre_id JOIN shown_in SI ON H.id = SI.hall_id JOIN showtimes S ON SI.showtime_id = S.id JOIN movie M ON SI.movie_id = M.id JOIN ( SELECT DISTINCT showtime_date FROM showtimes ORDER BY showtime_date DESC LIMIT 4 ) AS LatestDates ON S.showtime_date = LatestDates.showtime_date WHERE T.id = ? AND M.id = ? ORDER BY S.showtime_date ASC`;

  db.query(sql, [theatreId, movieId], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/otherMovies", (req, res) => {
  const movieId = req.body.movieDetailsId;

  sql =
    "SELECT m.id, m.name, m.image_path, m.rating, m.duration, m.release_date as release_date, GROUP_CONCAT(g.genre SEPARATOR ', ') as genres FROM movie m INNER JOIN movie_genre g ON m.id = g.movie_id GROUP BY m.id HAVING m.id!=?";

  db.query(sql, [movieId], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
});

// ///////////////////
// CUSTOMER INFO PAGE
// ///////////////////

app.post("/customerProfile", (req, res) => {
  const email = req.body.email;
  const sql = `SELECT * FROM person where email=?`;

  db.query(sql, [email], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/customerPurchases", (req, res) => {
  const email = req.body.email;

  const sql = `SELECT
  P.email AS customer_email,
  PA.id AS payment_id,
  GROUP_CONCAT(T.id) AS ticket_ids,
  GROUP_CONCAT(ST.name) AS seat_numbers,
  TH.name AS theatre_name,
  H.name AS hall_name,
  M.name AS movie_name,
  M.image_path AS movie_image,
  S.movie_start_time AS movie_start_time,
  S.show_type AS show_type,
  S.showtime_date AS showtime_date,
  PA.amount AS ticket_price,
  T.purchase_date AS purchase_date
FROM person P
JOIN payment PA ON P.email = PA.customer_email
JOIN ticket T ON PA.id = T.payment_id
JOIN showtimes S ON T.showtimes_id = S.id
JOIN movie M ON T.movie_id = M.id
JOIN hall H ON T.hall_id = H.id
JOIN theatre TH ON H.theatre_id = TH.id
JOIN seat ST ON T.seat_id = ST.id
WHERE P.email = ?
GROUP BY PA.id 
ORDER BY payment_id DESC`;

  db.query(sql, [email], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// /////
// ADMIN
// /////

app.get("/totalTickets", (req, res) => {
  const sql = `SELECT COUNT(*) AS total_tickets FROM ticket`;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.get("/totalPayment", (req, res) => {
  const sql = `SELECT sum(amount) AS total_amount FROM payment`;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.get("/totalCustomers", (req, res) => {
  const sql = `SELECT COUNT(*) AS total_customers FROM person WHERE person_type='Customer'`;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.get("/totalTicketPerMovie", (req, res) => {
  const sql = `SELECT M.name,T.movie_id,COUNT(*) AS tickets_per_movie From ticket T JOIN movie M on T.movie_id = M.id GROUP BY movie_id`;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/adminMovieAdd", (req, res) => {
  const name = req.body.name;
  const image_path = req.body.image_path;
  const language = req.body.language;
  const synopsis = req.body.synopsis;
  const rating = req.body.rating;
  const duration = req.body.duration;
  const top_cast = req.body.top_cast;
  const release_date = req.body.release_date;

  const sql1 = `Insert into movie (name,image_path,language,synopsis,rating,duration,top_cast,release_date)
  values
  (?,?,?,?,?,?,?,?)`;

  const sql2 = "SELECT LAST_INSERT_ID() as last_id";

  db.query(
    sql1,
    [
      name,
      image_path,
      language,
      synopsis,
      rating,
      duration,
      top_cast,
      release_date,
    ],
    (err1, data1) => {
      if (err1) return res.json(err1);

      db.query(sql2, (err2, data2) => {
        if (err2) return res.json(err2);

        return res.json(data2);
      });
    }
  );
});

app.post("/genreInsert", (req, res) => {
  const movieId = req.body.movieId;
  const genre = req.body.genre;

  const sql = `Insert into movie_genre(movie_id,genre)
  values
  (?,?)`;

  db.query(sql, [movieId, genre], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/directorInsert", (req, res) => {
  const movieId = req.body.movieId;
  const director = req.body.director;

  const sql = `Insert into movie_directors(movie_id,director)
  values
  (?,?)`;

  db.query(sql, [movieId, director], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.get("/lastShowDate", (req, res) => {
  const sql = `SELECT max(showtime_date) as lastDate FROM showtimes`;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/showdateAdd", (req, res) => {
  const showDate = req.body.selectedShowDate;

  const sql1 = `Insert into showtimes (movie_start_time,show_type,showtime_date,price_per_seat)
  values
  ('11:00 am','2D',?,350),
  ('2:30 pm','3D',?,450),
  ('6:00 pm','3D',?,450)`;

  const sql2 = "SELECT LAST_INSERT_ID() as last_id";

  db.query(sql1, [showDate, showDate, showDate], (err1, data1) => {
    if (err1) return res.json(err1);

    db.query(sql2, (err2, data2) => {
      if (err2) return res.json(err2);

      return res.json(data2);
    });
  });
});

app.post("/shownInUpdate", (req, res) => {
  let showId = req.body.showtimeId;
  let showIdArr = [];

  for (let i = 1; i <= 24; i++) {
    if (i % 8 === 0) {
      showIdArr.push(showId);
      showId += 1;
    } else {
      showIdArr.push(showId);
    }
  }

  const sql = `Insert into shown_in(movie_id,showtime_id,hall_id)
  values
  (1,?,1),(5,?,2),(3,?,3),(4,?,4),(1,?,5),(5,?,6),(3,?,7),(4,?,8),
  (5,?,1),(6,?,2),(1,?,3),(2,?,4),(5,?,5),(6,?,6),(1,?,7),(2,?,8),
  (5,?,1),(6,?,2),(1,?,3),(2,?,4),(4,?,5),(6,?,6),(1,?,7),(2,?,8)`;

  db.query(sql, showIdArr, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.get("/adminLatestShowDates", (req, res) => {
  const sql = `SELECT DISTINCT s.showtime_date
  FROM showtimes s
  JOIN (
      SELECT DISTINCT showtime_date
      FROM showtimes
      ORDER BY showtime_date DESC
      LIMIT 4
  ) latest_dates
  ON s.showtime_date = latest_dates.showtime_date
  ORDER BY s.showtime_date ASC
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/adminShowtimes", (req, res) => {
  const showdate = req.body.selectedShowDate;

  const sql = `SELECT id,movie_start_time,show_type FROM showtimes WHERE showtime_date=?`;

  db.query(sql, [showdate], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/movieReplaceFrom", (req, res) => {
  const showtimeId = req.body.selectedShowtime;

  const sql = `SELECT DISTINCT M.name, Sh.movie_id FROM shown_in Sh JOIN movie M on Sh.movie_id=M.id WHERE Sh.showtime_id = ?`;

  db.query(sql, [showtimeId], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/movieReplaceTo", (req, res) => {
  const showtimeId = req.body.selectedShowtime;

  const sql = `SELECT name, id FROM movie WHERE id NOT IN ( SELECT DISTINCT M.id FROM shown_in Sh JOIN movie M ON Sh.movie_id = M.id WHERE Sh.showtime_id = ? )`;

  db.query(sql, [showtimeId], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/movieSwap", (req, res) => {
  const updatedMovieId = req.body.selectedAlt;
  const showtime_id = req.body.selectedShowtime;
  const prevMovieId = req.body.selectedReplace;

  const sql = `UPDATE shown_in SET movie_id=? WHERE showtime_id=? AND movie_id=?`;

  db.query(sql, [updatedMovieId, showtime_id, prevMovieId], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// For local usage
app.listen(7000, () => {
  console.log("Now, it is listening");
});
