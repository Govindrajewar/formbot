import "../style/Signup/Signup.css";
import arrowBack from "../assets/Signup/arrowBack.png";
import bottomEllipse from "../assets/Signup/bottomEllipse.png";
import sideEllipse from "../assets/Signup/sideEllipse.png";
import polygon from "../assets/Signup/polygon.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// connect to server to Register User
import { Register } from "../api/User.js";

function SignupPage() {
  const navigate = useNavigate();
  const handleArrowBack = () => {
    navigate("/");
  };

  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSignup = async () => {
    let isValid = true;

    if (!userName) {
      setUsernameError("userName cannot be empty.");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!email) {
      setEmailError("Email cannot be empty.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password cannot be empty.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Enter the same password in both fields.");
      isValid = false;
    } else {
      setPasswordError("");
      setConfirmPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password cannot be empty.");
      isValid = false;
    }

    if (!isValid) return;

    // Clear any existing error messages
    setEmailError("");
    setPasswordError("");
    setUsernameError("");
    setConfirmPasswordError("");

    try {
      const response = await Register(userName, email, password);
      if (response.status === 201) {
        alert("Registration successful");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }

    navigate("/login");
  };

  return (
    <div className="signup">
      <div className="signup-form">
        <label htmlFor="userName" className={usernameError ? "labelError" : ""}>
          Username
        </label>
        <br />
        <input
          type="text"
          name="userName"
          placeholder="Enter a userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className={usernameError ? "error" : "signup-username"}
        />
        <br />
        {usernameError && <div className="errorMessage">{usernameError}</div>}

        <label htmlFor="email" className={emailError ? "labelError" : ""}>
          Email
        </label>
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={emailError ? "error" : "signup-email"}
        />
        <br />
        {emailError && <div className="errorMessage">{emailError}</div>}

        <label htmlFor="password" className={passwordError ? "labelError" : ""}>
          Password
        </label>
        <br />
        <input
          type="password"
          name="password"
          placeholder="**********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={passwordError ? "error" : "signup-password"}
        />
        <br />
        {passwordError && <div className="errorMessage">{passwordError}</div>}

        <label
          htmlFor="confirmPassword"
          className={confirmPasswordError ? "labelError" : ""}
        >
          Confirm Password
        </label>
        <br />
        <input
          type="password"
          name="confirmPassword"
          placeholder="**********"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={confirmPasswordError ? "error" : "signup-confirmpassword"}
        />
        <br />
        {confirmPasswordError && (
          <div className="errorMessage">{confirmPasswordError}</div>
        )}

        <div className="signup-btn" onClick={handleSignup}>
          Sign Up
        </div>

        <div className="signup-text">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>

      <img
        id="arrowBack"
        src={arrowBack}
        alt="Arrow Back"
        onClick={handleArrowBack}
      />
      <img id="bottomEllipse" src={bottomEllipse} alt="Bottom Ellipse" />
      <img id="sideEllipse" src={sideEllipse} alt="Side Ellipse" />
      <img id="polygon" src={polygon} alt="Polygon" />
    </div>
  );
}

export default SignupPage;
