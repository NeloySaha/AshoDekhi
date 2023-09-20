import "./styles/styles.css";
import "./styles/queries.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { SignupModal } from "./modals/SignupModal";
import { LoginModal } from "./modals/LoginModal";

import { HomePage } from "./pages/Home/HomePage";
import { PurchasePage } from "./pages/Purchase/PurchasePage";
import { ShowtimesPage } from "./pages/Showtimes/ShowtimesPage";
import { MovieDetailsPage } from "./pages/MovieDetails/MovieDetailsPage";
import { AboutUsPage } from "./pages/AboutUs/AboutUsPage";
import { CustomerInfoPage } from "./pages/CustomerInfo/CustomerInfoPage";
import { AdminPage } from "./pages/Admin/AdminPage";
import { AnimatePresence } from "framer-motion";
import { MobileNav } from "./components/MobileNav";

function App() {
  // //////////
  // Variables
  // //////////

  const [signModalState, setSignModalState] = useState(false);
  const [loginModalState, setLoginModalState] = useState(false);
  const [menuState, setMenuState] = useState(false);
  const menuStyle = {
    opacity: "1",
    pointerEvents: "auto",
    visibility: "visible",
    transform: "translateX(0)",
  };
  const [signedPerson, setSignedPerson] = useState(
    JSON.parse(window.localStorage.getItem("signedInPerson")) || {}
  );

  const [userLocation, setUserLocation] = useState({});
  const [locationData, setLocationData] = useState([]);
  const [datesData, setDatesData] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [hallData, setHallData] = useState([]);
  const [seatsData, setSeatsData] = useState([]);

  const [userPurchaseInfo, setUserPurchaseInfo] = useState({});
  const [movieDetailsId, setMovieDetailsId] = useState(
    JSON.parse(window.localStorage.getItem("selectedMovie")) || ""
  );

  const location = useLocation();

  const blurredStyle = {
    filter: "blur(5px)",
    pointerEvents: "none",
    userSelect: "none",
  };

  const toastPrimaryCategories = {
    position: "top-right",
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  };
  const toastFontStyle = {
    fontFamily: "Inter",
    fontSize: "1.6rem",
    fontWeight: 500,
    letterSpacing: "0.75px",
    color: "#1a1d2c",
  };

  const currentMovieDetails = (val) => {
    setMovieDetailsId(val);
  };

  const formattedDate =
    userPurchaseInfo.showtime_date &&
    new Date(userPurchaseInfo.showtime_date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const currentMovie =
    userPurchaseInfo.movie_id !== "" &&
    movieData.find((movieObj) => movieObj.id === userPurchaseInfo.movie_id);

  const curHallObj =
    userPurchaseInfo.hall_id &&
    hallData.find(
      (hall) =>
        hall.hall_id === userPurchaseInfo.hall_id &&
        userPurchaseInfo.showtime_id === hall.showtime_id
    );

  const userSeatListName =
    seatsData &&
    seatsData.filter((seatData) =>
      userPurchaseInfo.seat_id_list.includes(seatData.seat_id)
    );

  // /////////////
  // Use Effects
  // /////////////

  useEffect(() => {
    window.localStorage.setItem("signedInPerson", JSON.stringify(signedPerson));
  }, [signedPerson]);

  useEffect(() => {
    window.localStorage.setItem(
      "selectedMovie",
      JSON.stringify(movieDetailsId)
    );
  }, [movieDetailsId]);

  useEffect(() => {
    setUserLocation(() => locationData[0]);
  }, [locationData]);

  useEffect(() => {
    handleUserPurchaseLocationInfo();
  }, [userLocation]);

  // ////////////////////////////
  // Data fetching and setting
  // ////////////////////////////

  const getTheatreData = (val) => {
    setLocationData(val);
  };

  const getShowDatesData = (val) => {
    setDatesData(val);
  };

  const getMovieData = (val) => {
    setMovieData(val);
  };

  const getHallData = (val) => {
    setHallData(val);
  };

  const getSeatsData = (val) => {
    setSeatsData(val);
  };

  // //////////////////
  // Handler Functions
  // //////////////////

  const handleLocationSelection = (e) => {
    const selectedLocationObj = locationData.find(
      (locationObj) => locationObj.location === e.target.value
    );

    e ? setUserLocation(selectedLocationObj) : setUserLocation(locationData[0]);
  };

  const handleSignState = () => {
    setSignModalState((prevState) => !prevState);
  };

  const handleLoginState = () => {
    setLoginModalState((prevState) => !prevState);
  };

  const handleSignedPerson = (data) => {
    setSignedPerson(data[0]);
    toast.success("Signed in successfully", {
      ...toastPrimaryCategories,
      theme: "colored",
      style: toastFontStyle,
    });
  };

  const handlelogout = () => {
    setSignedPerson({});
  };

  const handleUserPurchaseLocationInfo = () => {
    setUserPurchaseInfo(() => ({
      theatre_id: userLocation?.id,
      showtime_date: "",
      movie_id: "",
      hall_id: "",
      showtime_id: "",
      seat_id_list: [],
      seat_price: "",
      payment_method: "",
    }));
  };

  const handleUserDateChange = (e) => {
    setUserPurchaseInfo((prevData) => ({
      ...prevData,
      showtime_date: e.target.value,
      movie_id: "",
      hall_id: "",
      showtime_id: "",
      seat_id_list: [],
      seat_price: "",
      payment_method: "",
    }));
  };

  const handleUserMovieChange = (e) => {
    setUserPurchaseInfo((prevData) => ({
      ...prevData,
      movie_id: parseInt(e.target.value),
      hall_id: "",
      showtime_id: "",
      seat_id_list: [],
      seat_price: "",
      payment_method: "",
    }));
  };

  const handleUserHallShow = (e) => {
    const arr = e.target.value.split(",");
    setUserPurchaseInfo((prevData) => ({
      ...prevData,
      showtime_id: parseInt(arr[0]),
      hall_id: parseInt(arr[1]),
      seat_price: parseInt(arr[2]),
      seat_id_list: [],
      payment_method: "",
    }));
  };

  const handleUserSeats = (seat) => {
    setUserPurchaseInfo((prevData) => {
      if (prevData.seat_id_list.includes(seat)) {
        const tempArr = [...prevData.seat_id_list];
        const newSeats = tempArr.filter((seatId) => seatId !== seat);

        return {
          ...prevData,
          seat_id_list: [...newSeats],
          payment_method: "",
        };
      }

      return {
        ...prevData,
        seat_id_list: [...prevData.seat_id_list, seat],
        payment_method: "",
      };
    });
  };

  const handleUserPaymentMethod = (e) => {
    setUserPurchaseInfo((prevData) => {
      return {
        ...prevData,
        payment_method: e.target.value,
      };
    });
  };

  // //////////////////
  // Toasts handlers
  // /////////////////
  const loginFailedToast = (msg) => {
    toast.error(msg, {
      ...toastPrimaryCategories,
      theme: "colored",
      style: toastFontStyle,
    });
  };

  const signupSuccessToast = (msg) => {
    toast.success(msg, {
      ...toastPrimaryCategories,
      theme: "colored",
      style: toastFontStyle,
    });
  };

  const signupFailedToast = (msg) => {
    toast.error(msg, {
      ...toastPrimaryCategories,
      theme: "colored",
      style: toastFontStyle,
    });
  };

  const ticketPurchaseError = () => {
    toast.error("Sorry, couldn't complete your purchase", {
      ...toastPrimaryCategories,
      theme: "colored",
      style: toastFontStyle,
    });
  };

  const purchaseCompletion = (tickets) => {
    toast.success("🎉Congratulations on your purchase!", {
      ...toastPrimaryCategories,
      theme: "colored",
      style: toastFontStyle,
    });

    toast.success(`Your ticket ID:${tickets.join(",")}`, {
      position: "top-right",
      autoClose: 8000,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
      style: toastFontStyle,
    });
  };

  const adminMovieToast = () => {
    toast.success("Movie Added Successfully", {
      ...toastPrimaryCategories,
      theme: "light",
      style: toastFontStyle,
    });
  };

  const adminShowtimeToast = () => {
    toast.success("Showtime Added Successfully", {
      ...toastPrimaryCategories,
      theme: "light",
      style: toastFontStyle,
    });
  };

  const adminShowninToast = () => {
    toast.success("Showtime Slot updated Successfully", {
      ...toastPrimaryCategories,
      theme: "light",
      style: toastFontStyle,
    });
  };

  const adminErrorToast = () => {
    toast.error("Couldn't update. Please try again!", {
      ...toastPrimaryCategories,
      theme: "colored",
      style: toastFontStyle,
    });
  };

  // Ticket Info Tracker Object
  // console.log(userPurchaseInfo);

  return (
    <>
      <div
        style={
          signModalState || loginModalState || menuState ? blurredStyle : {}
        }
      >
        <ToastContainer />
        <AnimatePresence wait>
          <Routes key={location.pathname} location={location}>
            <Route
              path="/"
              element={
                <HomePage
                  signedPerson={signedPerson}
                  handleSignState={handleSignState}
                  handleLoginState={handleLoginState}
                  handlelogout={handlelogout}
                  currentMovieDetails={currentMovieDetails}
                  setMenuState={setMenuState}
                />
              }
            />

            <Route
              path="/showtimes"
              element={
                <ShowtimesPage
                  signedPerson={signedPerson}
                  handleSignState={handleSignState}
                  handleLoginState={handleLoginState}
                  handlelogout={handlelogout}
                  getTheatreData={getTheatreData}
                  locationData={locationData}
                  userLocation={userLocation}
                  handleLocationSelection={handleLocationSelection}
                  currentMovieDetails={currentMovieDetails}
                  setMenuState={setMenuState}
                />
              }
            />

            <Route
              element={
                <ProtectedRoute
                  condition={
                    Object.keys(signedPerson).length !== 0 &&
                    signedPerson.person_type === "Customer"
                  }
                />
              }
            >
              <Route
                path="/purchase"
                element={
                  <PurchasePage
                    theatreId={userPurchaseInfo.theatre_id}
                    userDate={userPurchaseInfo.showtime_date}
                    userMovieId={userPurchaseInfo.movie_id}
                    userHallId={userPurchaseInfo.hall_id}
                    userShowtimeId={userPurchaseInfo.showtime_id}
                    userSeatPrice={userPurchaseInfo.seat_price}
                    userSeatList={userPurchaseInfo.seat_id_list}
                    userPayMethod={userPurchaseInfo.payment_method}
                    clearUserSelection={handleUserPurchaseLocationInfo}
                    signedPerson={signedPerson}
                    handleSignState={handleSignState}
                    handleLoginState={handleLoginState}
                    handlelogout={handlelogout}
                    getTheatreData={getTheatreData}
                    locationData={locationData}
                    userLocation={userLocation}
                    handleLocationSelection={handleLocationSelection}
                    handleUserDateChange={handleUserDateChange}
                    datesData={datesData}
                    getMovieData={getMovieData}
                    movieData={movieData}
                    handleUserMovieChange={handleUserMovieChange}
                    getHallData={getHallData}
                    hallData={hallData}
                    handleUserHallShow={handleUserHallShow}
                    getShowDatesData={getShowDatesData}
                    seatsData={seatsData}
                    getSeatsData={getSeatsData}
                    handleUserSeats={handleUserSeats}
                    formattedDate={formattedDate}
                    curHallObj={curHallObj}
                    currentMovie={currentMovie}
                    userSeatListName={userSeatListName}
                    handleUserPaymentMethod={handleUserPaymentMethod}
                    purchaseCompletion={purchaseCompletion}
                    ticketPurchaseError={ticketPurchaseError}
                    setMenuState={setMenuState}
                  />
                }
              />

              <Route
                path="/customer"
                element={
                  <CustomerInfoPage
                    signedPerson={signedPerson}
                    handleSignState={handleSignState}
                    handleLoginState={handleLoginState}
                    handlelogout={handlelogout}
                    setMenuState={setMenuState}
                  />
                }
              />
            </Route>

            <Route
              element={
                <ProtectedRoute
                  condition={
                    Object.keys(signedPerson).length !== 0 &&
                    signedPerson.person_type === "Admin"
                  }
                />
              }
            >
              <Route
                path="/admin"
                element={
                  <AdminPage
                    signedPerson={signedPerson}
                    handleSignState={handleSignState}
                    handleLoginState={handleLoginState}
                    handlelogout={handlelogout}
                    adminErrorToast={adminErrorToast}
                    adminMovieToast={adminMovieToast}
                    adminShowtimeToast={adminShowtimeToast}
                    adminShowninToast={adminShowninToast}
                    setMenuState={setMenuState}
                  />
                }
              />
            </Route>

            <Route
              path="/aboutus"
              element={
                <AboutUsPage
                  signedPerson={signedPerson}
                  handleSignState={handleSignState}
                  handleLoginState={handleLoginState}
                  handlelogout={handlelogout}
                  setMenuState={setMenuState}
                />
              }
            />

            <Route
              path="/movieDetails"
              element={
                <MovieDetailsPage
                  signedPerson={signedPerson}
                  handleSignState={handleSignState}
                  handleLoginState={handleLoginState}
                  handlelogout={handlelogout}
                  getTheatreData={getTheatreData}
                  locationData={locationData}
                  userLocation={userLocation}
                  handleLocationSelection={handleLocationSelection}
                  movieDetailsId={movieDetailsId}
                  currentMovieDetails={currentMovieDetails}
                  setMenuState={setMenuState}
                />
              }
            />
          </Routes>
        </AnimatePresence>
      </div>

      {signModalState && (
        <SignupModal
          handleSignState={handleSignState}
          signupSuccessToast={signupSuccessToast}
          signupFailedToast={signupFailedToast}
        />
      )}
      {loginModalState && (
        <LoginModal
          handleLoginState={handleLoginState}
          handleSignedPerson={handleSignedPerson}
          loginFailedToast={loginFailedToast}
        />
      )}
      <MobileNav
        menuState={menuState}
        menuStyle={menuStyle}
        setMenuState={setMenuState}
        signedPerson={signedPerson}
        handlelogout={handlelogout}
        handleSignState={handleSignState}
        handleLoginState={handleLoginState}
      />
    </>
  );
}

export default App;
