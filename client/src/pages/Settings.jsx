import { useState, useEffect } from "react";
import "../style/Settings/Settings.css";
import { Lock, LogOut, User, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import NavBar from "../components/HomePage/NavBar";
import Footer from "../components/HomePage/Footer";
import {
  isValidEmail,
  isValidPassword,
  PASSWORD_REQUIREMENT_MESSAGE,
} from "../utils/validators.js";
import { decodeToken } from "../utils/jwt.js";

function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("formBotCurrentUser");
    localStorage.removeItem("formBotToken");
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
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const decoded = decodeToken(localStorage.getItem("formBotToken"));
    if (decoded) {
      setName(decoded.userName || "");
      setEmail(decoded.email || "");
    }
  }, []);

  const handleUpdate = async () => {
    if (isUpdating) return;

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
    } else if (!isValidPassword(newPassword)) {
      errors.newPassword = PASSWORD_REQUIREMENT_MESSAGE;
    }

    setErrorMessages(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsUpdating(true);

    try {
      const response = await axiosInstance.patch("/user", {
        userName: name,
        email,
        oldPassword,
        newPassword,
      });

      localStorage.setItem("formBotCurrentUser", response.data.user.userName);
      localStorage.setItem("formBotToken", response.data.token);
      setOldPassword("");
      setNewPassword("");
      alert("Profile updated successfully");
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update profile";

      if (message.toLowerCase().includes("old password")) {
        setErrorMessages({ oldPassword: message });
      } else if (message.toLowerCase().includes("already in use")) {
        setErrorMessages({ email: message });
      } else {
        setErrorMessages({ newPassword: message });
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="settings">
      <NavBar />

      <div className="settings-main">
        <div className="settings-h2">Settings</div>
        <div className="settings-card">
          <div className="data-container">
            <User size={20} />
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
            <Lock size={20} />
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
            <Lock size={20} />
            <input
              type={showOldPassword ? "text" : "password"}
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <button
              type="button"
              className="view-toggle"
              onClick={() => setShowOldPassword(!showOldPassword)}
              aria-label="Toggle old password visibility"
            >
              {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errorMessages.oldPassword && (
            <div className="settings-error">{errorMessages.oldPassword}</div>
          )}
          <div className="data-container">
            <Lock size={20} />
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="view-toggle"
              onClick={() => setShowNewPassword(!showNewPassword)}
              aria-label="Toggle new password visibility"
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errorMessages.newPassword && (
            <div className="settings-error">{errorMessages.newPassword}</div>
          )}

          <button type="button" id="update-btn" onClick={handleUpdate} disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </div>

        <div className="logout-container" onClick={handleLogout}>
          <LogOut size={18} />
          <div>Log out</div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Settings;
