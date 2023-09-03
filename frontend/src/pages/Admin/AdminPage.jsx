import React, { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { AdminMovieAddSection } from "./components/AdminMovieAddSection";
import { AdminShowtimesAddSection } from "./components/AdminShowtimesAddSection";
import { AdminShownInModifySection } from "./components/AdminShownInModifySection";
import { AdminDashboardPrimary } from "./components/AdminDashboardPrimary";
import { MovieWiseTicket } from "./components/MovieWiseTicket";

export const AdminPage = ({
  signedPerson,
  handleSignState,
  handleLoginState,
  handlelogout,
  adminErrorToast,
  adminMovieToast,
  adminShowtimeToast,
  adminShowninToast,
}) => {
  const [selectedShowDate, setSelectedShowDate] = useState("");

  const handleSelectedDate = (e) => {
    setSelectedShowDate(e.target.value);
  };

  return (
    <>
      <Navbar
        signedPerson={signedPerson}
        pageName="admin"
        handleSignState={handleSignState}
        handleLoginState={handleLoginState}
        handlelogout={handlelogout}
      />
      <AdminDashboardPrimary />
      <MovieWiseTicket />
      <AdminMovieAddSection
        adminErrorToast={adminErrorToast}
        adminMovieToast={adminMovieToast}
      />
      <AdminShowtimesAddSection
        selectedShowDate={selectedShowDate}
        setSelectedShowDate={setSelectedShowDate}
        handleSelectedDate={handleSelectedDate}
        adminErrorToast={adminErrorToast}
        adminShowtimeToast={adminShowtimeToast}
      />
      <AdminShownInModifySection
        selectedDate={selectedShowDate}
        adminErrorToast={adminErrorToast}
        adminShowninToast={adminShowninToast}
      />
      <Footer
        handleSignState={handleSignState}
        handleLoginState={handleLoginState}
      />
    </>
  );
};