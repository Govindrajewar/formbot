import "../../style/Workspace/Theme.css";

import light from "../../assets/Workspace/Theme/light.png";
import dark from "../../assets/Workspace/Theme/dark.png";
import blue from "../../assets/Workspace/Theme/blue.png";
import icon from "../../assets/Workspace/Theme/icon.png";

function Theme({ theme, setTheme }) {
  return (
    <div className="theme">
      <div className="theme-container">
        <div className="theme-header">Customize the theme</div>
        <img
          src={light}
          alt="light"
          onClick={() => setTheme("light")}
          className={theme === "light" ? "theme-option-selected" : ""}
        />
        <img
          src={dark}
          alt="dark"
          onClick={() => setTheme("dark")}
          className={theme === "dark" ? "theme-option-selected" : ""}
        />
        <img
          src={blue}
          alt="blue"
          onClick={() => setTheme("blue")}
          className={theme === "blue" ? "theme-option-selected" : ""}
        />
      </div>
      <div className={`theme-setting ${theme}-theme`}>
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
