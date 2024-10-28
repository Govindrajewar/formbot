import "../../style/HomePage/Section6.css";
// Background Icons
import background1Icon from "../../assets/HomePage/Section6/shadow/shadow1.png";
import background2Icon from "../../assets/HomePage/Section6/shadow/shadow2.png";
import background3Icon from "../../assets/HomePage/Section6/shadow/shadow3.png";
import background4Icon from "../../assets/HomePage/Section6/shadow/shadow4.png";
import background5Icon from "../../assets/HomePage/Section6/shadow/shadow5.png";
import background6Icon from "../../assets/HomePage/Section6/shadow/shadow6.png";

// Brand Logos
import iBanFirstLogo from "../../assets/HomePage/Section6/Icons/icon1.png";
import lemListLogo from "../../assets/HomePage/Section6/Icons/icon2.png";
import makerLeadLogo from "../../assets/HomePage/Section6/Icons/icon3.png";
import webiSharpLogo from "../../assets/HomePage/Section6/Icons/icon4.png";
import socialHackrsLogo from "../../assets/HomePage/Section6/Icons/icon5.png";
import pinPointLogo from "../../assets/HomePage/Section6/Icons/icon6.png";
import boleLogo from "../../assets/HomePage/Section6/Icons/icon7.png";
import awwwsomeLogo from "../../assets/HomePage/Section6/Icons/icon8.png";

function Section6() {
  return (
    <div className="section6">
      <div className="section6-heading">
        <div className="section6-header">And many more features</div>
        <div className="section6-description">
          Typebot makes form building easy and comes with powerful features
        </div>
      </div>
      <div className="card-container">
        <div className="card">
          <div className="card-header">Hidden fields</div>
          <div className="card-description">
            Include data in your form URL to segment your user and use its data
            directly in your form.
          </div>
        </div>
        <div className="card">
          <div className="card-header">Team collaboration</div>
          <div className="card-description">
            Invite your teammates to work on your typebots with you
          </div>
        </div>
        <div className="card">
          <div className="card-header">Link to sub typebots</div>
          <div className="card-description">
            Reuse your typebots in different parent bots.
          </div>
        </div>
        <div className="card">
          <div className="card-header">Custom code</div>
          <div className="card-description">
            Customize everything with your own Javascript & CSS code
          </div>
        </div>
        <div className="card">
          <div className="card-header">Custom domain</div>
          <div className="card-description">
            Connect your typebot to the custom URL of your choice
          </div>
        </div>
        <div className="card">
          <div className="card-header">Folder management</div>
          <div className="card-description">
            Organize your typebots in specific folders to keep it clean and work
            with multiple clients
          </div>
        </div>
      </div>
      <div>
        <div className="section6-subHeader">
          Loved by teams and creators from all around the world
        </div>
        <div className="section6-Icons">
          <img src={iBanFirstLogo} alt="iBanFirst Logo" />
          <img src={lemListLogo} alt="LemList Logo" />
          <img src={makerLeadLogo} alt="MakerLead Logo" />
          <img src={webiSharpLogo} alt="WebiSharp Logo" />
          <img src={socialHackrsLogo} alt="SocialHackrs Logo" />
          <img src={pinPointLogo} alt="PinPoint Logo" />
          <img src={boleLogo} alt="Bole Logo" />
          <img src={awwwsomeLogo} alt="Awwwsome Logo" />
        </div>
      </div>

      <div className="shadow-background">
        <img src={background1Icon} alt="Shadow 1 Icon" />
        <img src={background2Icon} alt="Shadow 2 Icon" />
        <img src={background3Icon} alt="Shadow 3 Icon" />
        <img src={background4Icon} alt="Shadow 4 Icon" />
        <img src={background5Icon} alt="Shadow 5 Icon" />
        <img src={background6Icon} alt="Shadow 6 Icon" />
      </div>
    </div>
  );
}

export default Section6;
