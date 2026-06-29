import "../style/Signup/Signup.css";
import { Link, useNavigate } from "react-router-dom";
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

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSignup = async () => {
    if (isSigningUp) return;

    let isValid = true;

    if (!firstName) {
      setFirstNameError("First name cannot be empty.");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName) {
      setLastNameError("Last name cannot be empty.");
      isValid = false;
    } else {
      setLastNameError("");
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
    setFirstNameError("");
    setLastNameError("");
    setConfirmPasswordError("");
    setSignupError("");
    setIsSigningUp(true);

    try {
      await Register(firstName, lastName, email, password);
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
          <label htmlFor="firstName" className={firstNameError ? "labelError" : ""}>
            First name
          </label>
          <br />
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={firstNameError ? "error" : "signup-firstname"}
          />
          <br />
          {firstNameError && <div className="errorMessage">{firstNameError}</div>}

          <label htmlFor="lastName" className={lastNameError ? "labelError" : ""}>
            Last name
          </label>
          <br />
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={lastNameError ? "error" : "signup-lastname"}
          />
          <br />
          {lastNameError && <div className="errorMessage">{lastNameError}</div>}

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
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SignupPage;
