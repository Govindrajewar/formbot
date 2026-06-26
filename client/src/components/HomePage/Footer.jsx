import "../../style/HomePage/Footer.css";
import { GithubIcon, XIcon, LinkedinIcon } from "./BrandIcons";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-bottom">
      <span className="footer-copyright">
        © {year} FormBot. All rights reserved.
      </span>

      <div className="footer-social">
        <a
          href="https://github.com/Govindrajewar"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <GithubIcon size={20} />
        </a>
        <a
          href="https://x.com/who_abhirajewar"
          target="_blank"
          rel="noreferrer"
          aria-label="Twitter"
        >
          <XIcon size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/govind-rajewar/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <LinkedinIcon size={20} />
        </a>
      </div>

      <span className="footer-credit">
        Made with ❤️ by{" "}
        <a
          href="https://govindrajewar.github.io/Govind-Rajewar/"
          className="developer-name"
          target="_blank"
          rel="noreferrer"
        >
          Govind Rajewar
        </a>
      </span>
    </footer>
  );
}

export default Footer;
