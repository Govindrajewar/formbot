import "../../style/HomePage/Section4.css";
import upperImg from "../../assets/HomePage/Section4/upper-image.png";
import lowerImg from "../../assets/HomePage/Section4/lower-image.png";

function Section4() {
  return (
    <div className="section4">
      <div className="section4-upper">
        <div>
          <img src={upperImg} alt="bubbles" />
        </div>
        <div className="section4-upper-sidebar">
          <div className="section4-header">Easy building experience</div>
          <div className="section4-description">
            All you have to do is drag and drop blocks to create your app. Even
            if you have custom needs, you can always add custom code.
          </div>
        </div>
      </div>
      <div className="section4-lower">
        <div className="section4-lower-sidebar">
          <div className="section4-header">Embed it in a click</div>
          <div className="section4-description">
            Embedding your typebot in your applications is a walk in the park.
            Typebot gives you several step-by-step platform-specific
            instructions. Your typebot will always feel "native".
          </div>
        </div>
        <div>
          <img src={lowerImg} alt="Quick" />
        </div>
      </div>
    </div>
  );
}

export default Section4;
