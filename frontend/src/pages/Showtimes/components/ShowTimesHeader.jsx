import { LocationSelector } from "../../../components/LocationSelector";
import { GenreSelector } from "./GenreSelector";

export const ShowTimesHeader = ({
  locationData,
  userLocation,
  handleLocationSelection,
  getTheatreData,
}) => {
  return (
    <section className="showtimes-header container">
      <LocationSelector
        locationData={locationData}
        userLocation={userLocation}
        handleLocationSelection={handleLocationSelection}
        getTheatreData={getTheatreData}
      />
      <GenreSelector />
    </section>
  );
};
