import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import Settings from "./pages/Settings";
import Workspace from "./pages/Workspace";
import PostLogin from "./pages/PostLogin";
import Responses from "./pages/Responses";
import Desktop from "./pages/Desktop";
import ProtectedRoute from "./components/ProtectedRoute";
import { ColorModeProvider } from "./context/ColorModeContext";

function App() {
  return (
    <ColorModeProvider>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <PostLogin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/workspace"
            element={
              <ProtectedRoute>
                <Workspace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/responses/:formId"
            element={
              <ProtectedRoute>
                <Responses />
              </ProtectedRoute>
            }
          />
          <Route path="/desktop" element={<Desktop />} />
          <Route path="/form/:formId" element={<Desktop />} />
          <Route path="/preview" element={<Desktop />} />
        </Routes>
      </BrowserRouter>
    </div>
    </ColorModeProvider>
  );
}
export default App;
