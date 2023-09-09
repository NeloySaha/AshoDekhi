import React, { useEffect } from "react";
import axios from "axios";

export const LocationSelector = ({
  locationData,
  userLocation,
  handleLocationSelection,
  getTheatreData,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/theatres`)
        .then((res) => {
          getTheatreData(res.data);
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  const locationOptions =
    locationData.length > 0 &&
    locationData.map((location, idx) => {
      return (
        <option key={idx} value={location.location}>
          {location.location}
        </option>
      );
    });

  return (
    <div className="location-select-container ">
      <select
        id="location-selector"
        onChange={(e) => handleLocationSelection(e)}
      >
        {locationOptions}
      </select>

      <p className="selected-location">
        Location: <span>{userLocation?.location}</span>
      </p>
      <p className="selected-theatre">
        Theatre: <span>{userLocation?.name}</span>
      </p>
    </div>
  );
};
