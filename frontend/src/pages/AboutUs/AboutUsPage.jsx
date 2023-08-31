import React from "react";
import { Navbar } from "../../components/Navbar";
import { AboutUsSection } from "./components/AboutUsSection";
import { Footer } from "../../components/Footer";

export const AboutUsPage = ({
  handleSignState,
  handleLoginState,
  signedPerson,
  handlelogout,
}) => {
  return (
    <>
      <Navbar
        signedPerson={signedPerson}
        pageName="aboutUs"
        handleSignState={handleSignState}
        handleLoginState={handleLoginState}
        handlelogout={handlelogout}
      />
      <AboutUsSection />
      <Footer
        handleSignState={handleSignState}
        handleLoginState={handleLoginState}
      />
    </>
  );
};
