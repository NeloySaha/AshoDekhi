import React from "react";
import { Navbar } from "../../components/Navbar";
import { AboutUsSection } from "./components/AboutUsSection";
import { Footer } from "../../components/Footer";
import { AnimatedPage } from "../../components/AnimatedPage";

const AboutUsPage = ({
  handleSignState,
  handleLoginState,
  signedPerson,
  handlelogout,
  setMenuState,
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
          setMenuState={setMenuState}
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

export default AboutUsPage;
