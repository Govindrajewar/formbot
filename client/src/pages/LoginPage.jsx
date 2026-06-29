import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Login } from "../api/User.js";
import "../style/Login/Login.css";
import NavBar from "../components/HomePage/NavBar";
import Footer from "../components/HomePage/Footer";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleLogin = async () => {
    if (isLoggingIn) return;

    let isValid = true;

    if (!email) {
      setEmailError("Email cannot be empty");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password cannot be empty");
      isValid = false;
    }

    if (!isValid) return;

    setLoginError("");
    setIsLoggingIn(true);

    try {
      const response = await Login(email, password);
      const { firstName, lastName } = response.data.user;
      alert("Login successful");
      localStorage.setItem("formBotCurrentUser", `${firstName} ${lastName}`);
      localStorage.setItem("formBotToken", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setLoginError(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="login">
      <NavBar variant="login" />

      <div className="login-main">
        <div className="login-glow top" aria-hidden="true"></div>
        <div className="login-glow bottom" aria-hidden="true"></div>

        <div className="login-form">
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
            className={emailError ? "error" : "login-email"}
          />
          {emailError && <div className="errorMessage">{emailError}</div>}
          <br />
          <label htmlFor="password" className={passwordError ? "labelError" : ""}>
            Password
          </label>
          <br />
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={passwordError ? "error" : "login-password"}
            />
            <button
              type="button"
              className="view-toggle"
              onClick={() => setShowPassword((show) => !show)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {passwordError && <div className="errorMessage">{passwordError}</div>}
          {loginError && <div className="errorMessage">{loginError}</div>}
          <br />
          <div
            className="login-btn"
            onClick={handleLogin}
            style={isLoggingIn ? { opacity: 0.6, pointerEvents: "none" } : undefined}
          >
            {isLoggingIn ? "Logging in..." : "Log in"}
          </div>
          <div className="login-text">
            Don't have an account? <Link to="/signup">Register now</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LoginPage;
