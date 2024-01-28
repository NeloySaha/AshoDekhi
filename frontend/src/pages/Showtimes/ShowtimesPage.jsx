import { Navbar } from "../../components/Navbar";
import { ShowTimesHeader } from "./components/ShowTimesHeader";
import { ShowTimesCollection } from "./components/ShowTimesCollection";
import { Footer } from "../../components/Footer";
import { AnimatedPage } from "../../components/AnimatedPage";

const ShowtimesPage = ({
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
          getTheatreData={getTheatreData}
        />
        <ShowTimesCollection
          userLocation={userLocation}
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

export default ShowtimesPage;
