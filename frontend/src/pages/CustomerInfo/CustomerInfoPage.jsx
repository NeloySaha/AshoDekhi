import React from "react";

import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { CustomerInfoSection } from "./components/CustomerInfoSection";

export const CustomerInfoPage = ({
  handleSignState,
  handleLoginState,
  signedPerson,
  handlelogout,
}) => {
  return (
    <>
      <Navbar
        signedPerson={signedPerson}
        pageName="customerInfo"
        handleSignState={handleSignState}
        handleLoginState={handleLoginState}
        handlelogout={handlelogout}
      />
      <CustomerInfoSection signedPerson={signedPerson} />
      <Footer
        handleSignState={handleSignState}
        handleLoginState={handleLoginState}
      />
    </>
  );
};
