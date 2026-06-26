import "../style/Signup/Signup.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Register } from "../api/User.js";
import NavBar from "../components/HomePage/NavBar";
import Footer from "../components/HomePage/Footer";
import {
  isValidEmail,
  isValidPassword,
  PASSWORD_REQUIREMENT_MESSAGE,
} from "../utils/validators.js";

function SignupPage() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSignup = async () => {
    if (isSigningUp) return;

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
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email format.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password cannot be empty.");
      isValid = false;
    } else if (!isValidPassword(password)) {
      setPasswordError(PASSWORD_REQUIREMENT_MESSAGE);
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
    setSignupError("");
    setIsSigningUp(true);

    try {
      await Register(userName, email, password);
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      setSignupError(error.response?.data?.message || "Registration failed");
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className="signup">
      <NavBar variant="signup" />

      <div className="signup-main">
        <div className="signup-glow top" aria-hidden="true"></div>
        <div className="signup-glow bottom" aria-hidden="true"></div>

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
          {signupError && <div className="errorMessage">{signupError}</div>}

          <div
            className="signup-btn"
            onClick={handleSignup}
            style={isSigningUp ? { opacity: 0.6, pointerEvents: "none" } : undefined}
          >
            {isSigningUp ? "Signing up..." : "Sign Up"}
          </div>

          <div className="signup-text">
            Already have an account? <a href="/login">Login</a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SignupPage;
