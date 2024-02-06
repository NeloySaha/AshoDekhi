import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { HeroSection } from "./components/HeroSection";
import { HomeCollection } from "./components/HomeCollection";
import { Features } from "./components/Features";
import { SocialLinks } from "./components/SocialLinks";
import { TopEdge } from "../../components/TopEdge";

const HomePage = () => {
  return (
    <>
      <TopEdge />
      <Navbar />
      <HeroSection />
      <HomeCollection />
      <Features />
      <SocialLinks />
      <Footer />
    </>
  );
};

export default HomePage;
