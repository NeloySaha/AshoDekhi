import React from "react";
import { Navbar } from "../../components/Navbar";
import { AboutUsSection } from "./components/AboutUsSection";
import { Footer } from "../../components/Footer";
import { AnimatedPage } from "../../components/AnimatedPage";

export const AboutUsPage = ({
  handleSignState,
  handleLoginState,
  signedPerson,
  handlelogout,
}) => {
  return (
    <AnimatedPage>
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
    </AnimatedPage>
  );
};
