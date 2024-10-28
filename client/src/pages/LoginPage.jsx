import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Login } from "../api/User.js";
import "../style/Login/Login.css";
import arrowBack from "../assets/Login/arrowBack.png";
import bottomEllipse from "../assets/Login/bottomEllipse.png";
import sideEllipse from "../assets/Login/sideEllipse.png";
import polygon from "../assets/Login/polygon.png";

function LoginPage() {
  const navigate = useNavigate();
  const handleArrowBack = () => {
    navigate("/");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleLogin = async () => {
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

    try {
      const response = await Login(email, password);
      if (response.status === 201) {
        const userName = response.data.user.userName;
        alert("Login successful");
        localStorage.setItem("formBotCurrentUser", userName);
        localStorage.setItem("isLoggedInFormBot", true);
        navigate("/postlogin");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <div className="login">
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
        <input
          type="password"
          name="password"
          placeholder="**********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={passwordError ? "error" : "login-password"}
        />
        {passwordError && <div className="errorMessage">{passwordError}</div>}
        {loginError && <div className="errorMessage">{loginError}</div>}
        <br />
        <div className="login-btn" onClick={handleLogin}>
          Log in
        </div>
        <div className="login-text">
          Don’t have an account? <a href="/signup">Register now</a>
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

export default LoginPage;
