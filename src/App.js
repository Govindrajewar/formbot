import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import Settings from "./pages/Settings";
import Workspace from "./pages/Workspace";
import PostLogin from "./pages/PostLogin";
import Desktop from "./pages/Desktop";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/postlogin" element={<PostLogin />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/desktop" element={<Desktop />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
