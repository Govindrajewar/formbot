import "../../style/HomePage/Section7.css";
import useInView from "../../hooks/useInView";

function Section7({ createFormBot }) {
  const [ref, isInView] = useInView();

  return (
    <div className={`section7 reveal ${isInView ? "is-visible" : ""}`} ref={ref}>
      <div className="shape-triangle-7" aria-hidden="true"></div>
      <div className="shape-halfcircle-7" aria-hidden="true"></div>

      <div className="section7-header">
        Improve conversion and user engagement with FormBots
      </div>
      <div className="section7-button" onClick={createFormBot}>
        Create a Form
      </div>
      <div className="section7-text">
        No trial. Generous <span>free</span> plan.
      </div>
    </div>
  );
}

export default Section7;
