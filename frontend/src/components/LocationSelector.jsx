import { useEffect, useState } from "react";
import axios from "axios";

import HashLoader from "react-spinners/HashLoader";
import { useDispatch, useSelector } from "react-redux";
import { selectLocation } from "../reducers/locationSlice";

export const LocationSelector = () => {
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(false);

  const userLocation = useSelector((store) => store.currentLocation);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/theatres`
        );

        setLocationData(response.data);
        userLocation.id === "" && dispatch(selectLocation(response.data[0]));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // userLocation.id causes refetch, but that's not necessary
  }, [dispatch]);

  const locationOptions = locationData?.map((location, idx) => {
    return (
      <option key={idx} value={location.id}>
        {location.location}
      </option>
    );
  });

  const handleLocationSelection = (e) => {
    const selectedLocationObj = locationData.find(
      (locationObj) => locationObj.id === Number(e.target.value)
    );

    dispatch(selectLocation(selectedLocationObj));
  };

  return !loading ? (
    <div className="location-select-container ">
      <select
        id="location-selector"
        onChange={handleLocationSelection}
        value={userLocation?.id}
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
