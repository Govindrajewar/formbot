import NavBar from "../components/HomePage/NavBar";
import Section1 from "../components/HomePage/Section1";
import Section2 from "../components/HomePage/Section2";
import Section3 from "../components/HomePage/Section3";
import Section4 from "../components/HomePage/Section4";
import LogoSection from "../components/HomePage/LogoSection";
import Section5 from "../components/HomePage/Section5";
import Section6 from "../components/HomePage/Section6";
import Section7 from "../components/HomePage/Section7";
import Footer from "../components/HomePage/Footer";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const createFormBot = () => {
    navigate("/login");
  };

  return (
    <div>
      <NavBar createFormBot={createFormBot} />
      <Section1 createFormBot={createFormBot} />
      <Section2 />
      <Section3 />
      <Section4 />
      <LogoSection />
      <Section5 />
      <Section6 />
      <Section7 createFormBot={createFormBot} />
      <Footer />
    </div>
  );
}

export default HomePage;
