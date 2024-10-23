import "../../style/HomePage/Section5.css";
import backgroundImg from "../../assets/HomePage/Section5/background.png";

function Section5() {
  return (
    <div className="section5">
      <div className="section5-header">Collect results in real-time</div>
      <div className="section5-description">
        One of the main advantage of a chat application is that you collect the
        user's responses on each question. You won't lose any valuable data.
      </div>
      <img src={backgroundImg} alt="background Img" id="backgroundImgId" />
    </div>
  );
}

export default Section5;
