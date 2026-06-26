import "../../style/HomePage/Section2.css";
import { MessageSquare, GitBranch, CheckCircle2 } from "lucide-react";
import useInView from "../../hooks/useInView";

function Section2() {
  const [ref, isInView] = useInView();

  return (
    <div className={`section2 reveal ${isInView ? "is-visible" : ""}`} ref={ref}>
      <div className="section2-glow left" aria-hidden="true"></div>
      <div className="section2-glow right" aria-hidden="true"></div>

      <div className="builder-preview">
        <div className="builder-step">
          <MessageSquare size={28} />
          <span>Question</span>
        </div>
        <div className="builder-connector"></div>
        <div className="builder-step">
          <GitBranch size={28} />
          <span>Logic</span>
        </div>
        <div className="builder-connector"></div>
        <div className="builder-step">
          <CheckCircle2 size={28} />
          <span>Answer</span>
        </div>
      </div>
    </div>
  );
}

export default Section2;
