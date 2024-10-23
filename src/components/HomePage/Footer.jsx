import "../../style/HomePage/Footer.css";
import linkImg from "../../assets/HomePage/Footer/link.png";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container-developer">
        Made with ❤️ by <br />
        <a
          href="https://govindrajewar.github.io/Portfolio/"
          className="developer-name"
          target="_blank"
          rel="noreferrer"
        >
          @ Govind Rajewar
        </a>
      </div>
      <div className="footer-container">
        <a href="#Status" id="Status">
          Status &nbsp;
          <img src={linkImg} alt="link" />
        </a>

        <a href="#Documentation" id="Documentation">
          Documentation &nbsp;
          <img src={linkImg} alt="link" />
        </a>

        <a href="#Roadmap" id="Roadmap">
          Roadmap &nbsp;
          <img src={linkImg} alt="link" />
        </a>

        <a href="#Pricing" id="Pricing">
          Pricing
        </a>
      </div>
      <div className="footer-container">
        <a href="#Discord" id="Discord">
          Discord &nbsp;
          <img src={linkImg} alt="link" />
        </a>
        <a
          href="https://github.com/Govindrajewar"
          target="_blank"
          rel="noreferrer"
        >
          GitHub &nbsp;
          <img src={linkImg} alt="link" />
        </a>
        <a
          href="https://x.com/who_abhirajewar"
          target="_blank"
          rel="noreferrer"
        >
          Twitter &nbsp;
          <img src={linkImg} alt="link" />
        </a>
        <a
          href="https://www.linkedin.com/in/govind-rajewar/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn &nbsp;
          <img src={linkImg} alt="link" />
        </a>
      </div>
      <div className="footer-container">
        <a href="#About" id="About">
          About
        </a>
        <a href="#Contact" id="Contact">
          Contact
        </a>

        <a href="#TermsOfService" id="TermsOfService">
          Terms of Service
        </a>

        <a href="#PrivacyPolicy" id="PrivacyPolicy">
          Privacy Policy
        </a>
      </div>
    </div>
  );
}

export default Footer;
