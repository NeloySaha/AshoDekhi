import React, { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { ShowTimesHeader } from "./components/ShowTimesHeader";
import { ShowTimesCollection } from "./components/ShowTimesCollection";
import { Footer } from "../../components/Footer";
import { AnimatedPage } from "../../components/AnimatedPage";

export const ShowtimesPage = ({
  handleSignState,
  handleLoginState,
  locationData,
  userLocation,
  handleLocationSelection,
  getTheatreData,
  signedPerson,
  handlelogout,
  currentMovieDetails,
  setMenuState,
}) => {
  const [userGenre, setUserGenre] = useState("All");

  const handleGenreChange = (e) => {
    setUserGenre(e.target.value);
  };

  return (
    <AnimatedPage>
      <>
        <Navbar
          signedPerson={signedPerson}
          pageName="showtimes"
          handleSignState={handleSignState}
          handleLoginState={handleLoginState}
          handlelogout={handlelogout}
          setMenuState={setMenuState}
        />
        <ShowTimesHeader
          locationData={locationData}
          userLocation={userLocation}
          handleLocationSelection={handleLocationSelection}
          handleGenreChange={handleGenreChange}
          userGenre={userGenre}
          getTheatreData={getTheatreData}
        />
        <ShowTimesCollection
          userLocation={userLocation}
          userGenre={userGenre}
          currentMovieDetails={currentMovieDetails}
          handleLoginState={handleLoginState}
          signedPerson={signedPerson}
        />
        <Footer
          handleSignState={handleSignState}
          handleLoginState={handleLoginState}
        />
      </>
    </AnimatedPage>
  );
};
