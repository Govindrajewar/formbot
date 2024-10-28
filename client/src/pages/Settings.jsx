import { useState, useEffect } from "react";
import "../style/Settings/Settings.css";
import lock from "../assets/Settings/lock.png";
import logout from "../assets/Settings/logout.png";
import profile from "../assets/Settings/profile.png";
import view from "../assets/Settings/view.png";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  // eslint-disable-next-line
  const [isLoggedInFormBot, setIsLoggedInFormBot] = useState(
    localStorage.getItem("isLoggedInFormBot") === "true"
  );

  const handleLogout = () => {
    navigate("/");
  };

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (!isLoggedInFormBot) {
      navigate("/login");
    }
  }, [isLoggedInFormBot, navigate]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUpdate = () => {
    let errors = {};

    if (!name) {
      errors.name = "Name cannot be empty";
    }

    if (!email) {
      errors.email = "Email cannot be empty";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email address";
    }

    if (!oldPassword) {
      errors.oldPassword = "Old password cannot be empty";
    }

    if (!newPassword) {
      errors.newPassword = "New password cannot be empty";
    }

    setErrorMessages(errors);
  };

  return (
    <div className="settings">
      <div className="settings-h2">Settings</div>
      <div className="data-container">
        <img src={profile} alt="profile" />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {errorMessages.name && (
        <div className="settings-error">{errorMessages.name}</div>
      )}
      <div className="data-container">
        <img src={lock} alt="lock" />
        <input
          type="email"
          placeholder="Update Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {errorMessages.email && (
        <div className="settings-error">{errorMessages.email}</div>
      )}
      <div className="data-container">
        <img src={lock} alt="lock" />
        <input
          type={showOldPassword ? "text" : "password"}
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <img
          src={view}
          alt="view"
          id="viewId"
          onClick={() => setShowOldPassword(!showOldPassword)}
        />
      </div>
      {errorMessages.oldPassword && (
        <div className="settings-error">{errorMessages.oldPassword}</div>
      )}
      <div className="data-container">
        <img src={lock} alt="lock" />
        <input
          type={showNewPassword ? "text" : "password"}
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <img
          src={view}
          alt="view"
          id="viewId"
          onClick={() => setShowNewPassword(!showNewPassword)}
        />
      </div>
      {errorMessages.newPassword && (
        <div className="settings-error">{errorMessages.newPassword}</div>
      )}

      <button type="button" id="update-btn" onClick={handleUpdate}>
        Update
      </button>

      <div className="logout-container" onClick={handleLogout}>
        <img src={logout} alt="logout" />
        <div>Log out</div>
      </div>
    </div>
  );
}

export default Settings;
