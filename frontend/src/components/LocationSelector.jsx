import React, { useEffect, useState } from "react";
import axios from "axios";

import HashLoader from "react-spinners/HashLoader";

export const LocationSelector = ({
  locationData,
  userLocation,
  handleLocationSelection,
  getTheatreData,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/theatres`
        );
        getTheatreData(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
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

  return !loading ? (
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
  ) : (
    <HashLoader color="#eb3656" />
  );
};
