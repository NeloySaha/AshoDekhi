import { LocationSelector } from "../../../components/LocationSelector";
import { GenreSelector } from "./GenreSelector";

export const ShowTimesHeader = () => {
  return (
    <section className="showtimes-header container">
      <LocationSelector />
      <GenreSelector />
    </section>
  );
};
