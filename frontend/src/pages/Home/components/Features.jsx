import React, { useEffect, useState } from "react";
import axios from "axios";
import { Feature } from "./Feature";
import HashLoader from "react-spinners/HashLoader";

export const Features = () => {
  const [featuresData, setFeaturesData] = useState([]);
  const override = {
    display: "block",
    margin: "2.4rem auto",
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/locationFeatures`
        );
        setFeaturesData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const featuresHtml = featuresData.map((feature, idx) => {
    return <Feature key={idx} {...feature} idx={idx} />;
  });

  return (
    <section className="section-features container">
      <h4 className="subheading">What you'll get?</h4>
      <h2 className="section-features-heading heading-secondary">
        Unleash the Movie Magic and Discover Our Spectacular Features
      </h2>

      {loading ? (
        <HashLoader cssOverride={override} color="#eb3656" />
      ) : (
        <div className="feature-contents">{featuresHtml}</div>
      )}
    </section>
  );
};
