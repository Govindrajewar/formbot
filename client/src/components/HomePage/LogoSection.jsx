import "../../style/HomePage/LogoSection.css";
import gmailLogo from "../../assets/HomePage/Logo/Upper/upperlogo1.png";
import mailChimpLogo from "../../assets/HomePage/Logo/Upper/upperlogo2.png";
import notionLogo from "../../assets/HomePage/Logo/Upper/upperlogo3.png";
import webFlowLogo from "../../assets/HomePage/Logo/Upper/upperlogo4.png";
import wordpressLogo from "../../assets/HomePage/Logo/Upper/upperlogo5.png";
import googleCalenderLogo from "../../assets/HomePage/Logo/Upper/upperlogo6.png";
import noCodeLogo from "../../assets/HomePage/Logo/Upper/upperlogo7.png";
import googleDriveLogo from "../../assets/HomePage/Logo/Upper/upperlogo8.png";

import slackLogo from "../../assets/HomePage/Logo/Lower/lowerlogo1.png";
import shopifyLogo from "../../assets/HomePage/Logo/Lower/lowerlogo2.png";
import airtableLogo from "../../assets/HomePage/Logo/Lower/lowerlogo3.png";
import googleSheetLogo from "../../assets/HomePage/Logo/Lower/lowerlogo4.png";
import zapierLogo from "../../assets/HomePage/Logo/Lower/lowerlogo5.png";
import calendlyLogo from "../../assets/HomePage/Logo/Lower/lowerlogo6.png";
import salesforceLogo from "../../assets/HomePage/Logo/Lower/lowerlogo7.png";

function LogoSection() {
  return (
    <div className="logoSection">
      <div className="upperLogo-container">
        <img src={gmailLogo} alt="Gmail Logo" />
        <img src={mailChimpLogo} alt="MailChimp Logo" />
        <img src={notionLogo} alt="Notion Logo" />
        <img src={webFlowLogo} alt="WebFlow Logo" />
        <img src={wordpressLogo} alt="WordPress Logo" />
        <img src={googleCalenderLogo} alt="Google Calendar Logo" />
        <img src={noCodeLogo} alt="NoCode Logo" />
        <img src={googleDriveLogo} alt="Google Drive Logo" />
      </div>
      <div className="lowerLogo-container">
        <img src={slackLogo} alt="Slack Logo" />
        <img src={shopifyLogo} alt="Shopify Logo" />
        <img src={airtableLogo} alt="Airtable Logo" />
        <img src={googleSheetLogo} alt="Google Sheets Logo" />
        <img src={zapierLogo} alt="Zapier Logo" />
        <img src={calendlyLogo} alt="Calendly Logo" />
        <img src={salesforceLogo} alt="Salesforce Logo" />
      </div>
      <div className="container">
        <div className="container-header">Integrate with any platform</div>
        <div className="container-description">
          Typebot offers several native integrations blocks as well as
          instructions on how to embed typebot on particular platforms
        </div>
      </div>
    </div>
  );
}

export default LogoSection;
