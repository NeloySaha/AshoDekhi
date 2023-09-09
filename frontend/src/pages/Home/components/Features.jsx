import React, { useEffect, useState } from "react";
import axios from "axios";
import { Feature } from "./Feature";

export const Features = () => {
  const [featuresData, setFeaturesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/locationFeatures`)
        .then((res) => setFeaturesData(res.data))
        .catch((err) => console.log(err));
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

      <div className="feature-contents">{featuresHtml}</div>
    </section>
  );
};
