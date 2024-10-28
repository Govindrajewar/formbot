import "../../style/HomePage/Section1.css";
import triangleImg from "../../assets/triangle.png";
import halfcircleImg from "../../assets/halfcircle.png";

function Section1({ createFormBot }) {
  return (
    <div className="section1">
      <div className="section1-header">Build advanced chatbots visually</div>
      <div className="section1-description">
        Typebot gives you powerful blocks to create unique chat experiences.
        Embed them anywhere on your web/mobile apps and start collecting results
        like magic.
      </div>
      <div>
        <button className="create-formBit-btn" onClick={createFormBot}>
          Create a FormBot for free
        </button>
      </div>
      <img className="triangle-img" src={triangleImg} alt="triangle" />
      <img className="halfcircle-img" src={halfcircleImg} alt="halfcircle" />
    </div>
  );
}

export default Section1;
