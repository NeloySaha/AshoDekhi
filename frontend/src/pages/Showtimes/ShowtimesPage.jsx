import { Navbar } from "../../components/Navbar";
import { ShowTimesHeader } from "./components/ShowTimesHeader";
import { ShowTimesCollection } from "./components/ShowTimesCollection";
import { Footer } from "../../components/Footer";

const ShowtimesPage = () => {
  return (
    <>
      <Navbar />
      <ShowTimesHeader />
      <ShowTimesCollection />
      <Footer />
    </>
  );
};

export default ShowtimesPage;
