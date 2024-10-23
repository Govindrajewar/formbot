import "../../style/HomePage/Section3.css";
import doneImg from "../../assets/HomePage/Section3/done.png";
import closeImg from "../../assets/HomePage/Section3/close.png";
import typeBotImg from "../../assets/HomePage/Section3/typebotStandard.png";
import arrowImg from "../../assets/HomePage/Section3/arrow.png";
import tryItOutImg from "../../assets/HomePage/Section3/TryItOut.png";

function Section3() {
  return (
    <div className="section3">
      <div className="section3-header">
        Replace your old school forms <br />
        with <br />
        chatbots
      </div>
      <div className="section3-description">
        Typebot is a better way to ask for information. It leads to an increase
        in customer satisfaction and retention and multiply by <br />3 <br />
        your conversion rate compared to classical forms.
      </div>
      <div className="signs">
        <img src={closeImg} alt="close" />
        <img src={doneImg} alt="done" />
      </div>
      <img src={arrowImg} alt="arrow" id="arrow-Img" />
      <img src={tryItOutImg} alt="try it out" id="tryItOut-Img" />
      <div className="section3-form">
        <div className="rightSection3">
          <label htmlFor="firstName">
            First name <span>*</span>
          </label>
          <br />
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First name"
            disabled
          />
          <br />
          <label htmlFor="email">
            Email <span>*</span>
          </label>
          <br />
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            disabled
          />
          <br />
          <label htmlFor="question">
            What services are you interested in? <span>*</span>
          </label>
          <br />
          <input type="checkbox" value="Website Dev" disabled />
          Website Dev
          <br />
          <input type="checkbox" value="Content Marketing" disabled />
          Content Marketing
          <br />
          <input type="checkbox" value="Social Media" disabled />
          Social Media
          <br />
          <input
            type="checkbox"
            id="checkboxId"
            value="UX/UI Design"
            disabled
          />
          UX/UI Design
          <br />
          <label htmlFor="addInfo">
            Additional Information <span>*</span>
          </label>
          <br />
          <textarea
            name="addInfo"
            id="addInfo"
            placeholder="Additional Information"
            rows={5}
            disabled
          ></textarea>
          <br />
          <button type="submit">Submit</button>
        </div>
        <div className="leftSection3">
          <img src={typeBotImg} alt="typebot" />
        </div>
      </div>
    </div>
  );
}

export default Section3;
