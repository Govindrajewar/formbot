import { useEffect, useRef, useState } from "react";
import "../../style/HomePage/NavBar.css";
import { useNavigate } from "react-router-dom";
import {
  User,
  ChevronDown,
  LayoutDashboard,
  Settings as SettingsIcon,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import Logo from "./Logo";
import { useColorMode } from "../../context/ColorModeContext";

function NavBar({ createFormBot, variant = "default", centerText }) {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const isLoggedIn = Boolean(localStorage.getItem("formBotToken"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const goHome = () => navigate("/");
  const goToLogin = () => navigate("/login");
  const goToSignup = () => navigate("/signup");

  const goToDashboard = () => {
    setIsMenuOpen(false);
    navigate("/dashboard");
  };

  const goToSettings = () => {
    setIsMenuOpen(false);
    navigate("/settings");
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    localStorage.removeItem("formBotCurrentUser");
    localStorage.removeItem("formBotToken");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="title" onClick={goHome} role="button" tabIndex={0}>
        <Logo />
        <div className="title-header">FormBot</div>
      </div>

      {centerText && <div className="navbar-center">{centerText}</div>}

      <div className="buttons">
        <button
          className="color-mode-toggle"
          onClick={toggleColorMode}
          aria-label="Toggle light/dark mode"
          type="button"
        >
          {colorMode === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        {isLoggedIn ? (
          <div className="profile-menu" ref={menuRef}>
            <button
              className="profile-btn"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label="Account menu"
              aria-expanded={isMenuOpen}
            >
              <span className="profile-avatar">
                <User size={16} />
              </span>
              <ChevronDown size={14} />
            </button>

            {isMenuOpen && (
              <div className="profile-dropdown">
                <button onClick={goToDashboard}>
                  <LayoutDashboard size={16} />
                  Dashboard
                </button>
                <button onClick={goToSettings}>
                  <SettingsIcon size={16} />
                  Settings
                </button>
                <button
                  className="profile-dropdown-logout"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : variant === "login" ? (
          <button className="create-btn" onClick={goToSignup}>
            Sign up
          </button>
        ) : variant === "signup" ? (
          <button className="signIn-btn" onClick={goToLogin}>
            Sign in
          </button>
        ) : (
          <>
            <button className="signIn-btn" onClick={goToLogin}>
              Sign in
            </button>
            <button className="create-btn" onClick={createFormBot}>
              Create a Form
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
