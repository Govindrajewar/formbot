import "../../style/Workspace/Theme.css";

import light from "../../assets/Workspace/Theme/light.png";
import dark from "../../assets/Workspace/Theme/dark.png";
import blue from "../../assets/Workspace/Theme/blue.png";
import icon from "../../assets/Workspace/Theme/icon.png";

function Theme() {
  const addLightTheme = () => {
    document.getElementById("themeSettingsId").classList.add("light-theme");
    document
      .getElementById("themeSettingsId")
      .classList.remove("dark-theme", "blue-theme");
  };

  const addDarkTheme = () => {
    document.getElementById("themeSettingsId").classList.add("dark-theme");
    document
      .getElementById("themeSettingsId")
      .classList.remove("light-theme", "blue-theme");
  };

  const addBlueTheme = () => {
    document.getElementById("themeSettingsId").classList.add("blue-theme");
    document
      .getElementById("themeSettingsId")
      .classList.remove("dark-theme", "light-theme");
  };

  return (
    <div className="theme">
      <div className="theme-container">
        <div className="theme-header">Customize the theme</div>
        <img src={light} alt="light" onClick={addLightTheme} />
        <img src={dark} alt="dark" onClick={addDarkTheme} />
        <img src={blue} alt="blue" onClick={addBlueTheme} />
      </div>
      <div className="theme-setting light-theme" id="themeSettingsId">
        <div className="hello-div">
          <img src={icon} alt="icon" />
          <div className="hello-text">Hello</div>
        </div>
        <div className="hi-div">Hi</div>
      </div>
    </div>
  );
}

export default Theme;
