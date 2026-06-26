import "../../style/HomePage/Section4.css";
import { Layers, Code2 } from "lucide-react";
import useInView from "../../hooks/useInView";

function Section4() {
  const [upperRef, upperInView] = useInView();
  const [lowerRef, lowerInView] = useInView();

  return (
    <div className="section4">
      <div
        className={`section4-upper reveal ${upperInView ? "is-visible" : ""}`}
        ref={upperRef}
      >
        <div className="visual-panel">
          <Layers size={64} />
        </div>
        <div className="section4-upper-sidebar">
          <div className="section4-header">Easy building experience</div>
          <div className="section4-description">
            All you have to do is drag and drop blocks to create your app. Even
            if you have custom needs, you can always add custom code.
          </div>
        </div>
      </div>
      <div
        className={`section4-lower reveal ${lowerInView ? "is-visible" : ""}`}
        ref={lowerRef}
      >
        <div className="section4-lower-sidebar">
          <div className="section4-header">Embed it in a click</div>
          <div className="section4-description">
            Embedding your typebot in your applications is a walk in the park.
            Typebot gives you several step-by-step platform-specific
            instructions. Your typebot will always feel "native".
          </div>
        </div>
        <div className="visual-panel">
          <Code2 size={64} />
        </div>
      </div>
    </div>
  );
}

export default Section4;
