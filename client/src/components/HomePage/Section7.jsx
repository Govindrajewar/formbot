import "../../style/HomePage/Section7.css";
import triangle from "../../assets/triangle.png";
import halfCircle from "../../assets/halfcircle.png";

function Section7({ createFormBot }) {
  return (
    <div className="section7">
      <div className="section7-header">
        Improve conversion and user engagement with FormBots
      </div>
      <div className="section7-button" onClick={createFormBot}>
        Create a FormBot
      </div>
      <div className="section7-text">
        No trial. Generous <span>free</span> plan.
      </div>

      <img src={triangle} alt="triangle" id="triangleId" />
      <img src={halfCircle} alt="half circle" id="halfCircleId" />
    </div>
  );
}

export default Section7;
