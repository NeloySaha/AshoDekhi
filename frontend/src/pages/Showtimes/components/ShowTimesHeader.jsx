import { LocationSelector } from "../../../components/LocationSelector";
import { GenreSelector } from "./GenreSelector";

export const ShowTimesHeader = ({
  locationData,
  userLocation,
  handleLocationSelection,
  getTheatreData,
  userGenre,
  handleGenreChange,
}) => {
  return (
    <section className="showtimes-header container">
      <LocationSelector
        locationData={locationData}
        userLocation={userLocation}
        handleLocationSelection={handleLocationSelection}
        getTheatreData={getTheatreData}
      />
      <GenreSelector
        userGenre={userGenre}
        handleGenreChange={handleGenreChange}
      />
    </section>
  );
};
