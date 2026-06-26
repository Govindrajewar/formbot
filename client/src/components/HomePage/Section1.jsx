import "../../style/HomePage/Section1.css";
import useInView from "../../hooks/useInView";

function Section1({ createFormBot }) {
  const [ref, isInView] = useInView();

  return (
    <div className={`section1 reveal ${isInView ? "is-visible" : ""}`} ref={ref}>
      <div className="shape-triangle" aria-hidden="true"></div>
      <div className="shape-halfcircle" aria-hidden="true"></div>

      <div className="section1-header">Build advanced chatbots visually</div>
      <div className="section1-description">
        Typebot gives you powerful blocks to create unique chat experiences.
        Embed them anywhere on your web/mobile apps and start collecting results
        like magic.
      </div>
      <div>
        <button className="create-formBit-btn" onClick={createFormBot}>
          Create a Form for free
        </button>
      </div>
    </div>
  );
}

export default Section1;
