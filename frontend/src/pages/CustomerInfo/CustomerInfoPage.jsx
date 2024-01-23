import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { CustomerInfoSection } from "./components/CustomerInfoSection";
import { AnimatedPage } from "../../components/AnimatedPage";

const CustomerInfoPage = ({
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
          pageName="customerInfo"
          handleSignState={handleSignState}
          handleLoginState={handleLoginState}
          handlelogout={handlelogout}
          setMenuState={setMenuState}
        />
        <CustomerInfoSection signedPerson={signedPerson} />
        <Footer
          handleSignState={handleSignState}
          handleLoginState={handleLoginState}
        />
      </>
    </AnimatedPage>
  );
};

export default CustomerInfoPage;
