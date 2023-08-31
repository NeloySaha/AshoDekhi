import React from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { HeroSection } from "./components/HeroSection";
import { HomeCollection } from "./components/HomeCollection";
import { Features } from "./components/Features";
import { SocialLinks } from "./components/SocialLinks";

export const HomePage = ({
  handleSignState,
  handleLoginState,
  signedPerson,
  handlelogout,
  currentMovieDetails,
}) => {
  return (
    <>
      <Navbar
        signedPerson={signedPerson}
        pageName="home"
        handleSignState={handleSignState}
        handleLoginState={handleLoginState}
        handlelogout={handlelogout}
      />
      <HeroSection
        handleLoginState={handleLoginState}
        signedPerson={signedPerson}
      />
      <HomeCollection
        currentMovieDetails={currentMovieDetails}
        signedPerson={signedPerson}
        handleLoginState={handleLoginState}
      />
      <Features />
      <SocialLinks />
      <Footer
        handleSignState={handleSignState}
        handleLoginState={handleLoginState}
      />
    </>
  );
};
