import "../../style/HomePage/Section2.css";
import leftBG from "../../assets/left-bg.png";
import rightBG from "../../assets/right-bg.png";
import flowChart from "../../assets/flowchart.png";

function Section2() {
  return (
    <div className="section2">
      <div className="section2-background">
        <img src={leftBG} alt="left background" className="left" />
        <img src={rightBG} alt="right background" className="right" />
      </div>
      <div>
        <img src={flowChart} alt="flowchart" className="flowchart" />
      </div>
    </div>
  );
}

export default Section2;
