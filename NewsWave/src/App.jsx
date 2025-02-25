import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./pages/Navbar";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { Footer } from "./pages/Footer";
import "./App.css";
import { Homepage } from "./pages/Homepage";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { use } from "react";
import { API_URL } from "./auth/ApiUrl"

function App() {
  const [category, setCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [UserPreference, setUserPreference] = useState("");
  const [theme, setTheme] = useState("dark");
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!Cookies.get("accessToken")
  );

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    // Check if token exists on page load (after refresh)
    const token = Cookies.get("accessToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    // Apply the theme when the page loads
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const token = Cookies.get("accessToken");
        if (!token) return;

        const response = await axios.get(
          `${API_URL}/userPreference/userPreference/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setUserPreference(response.data);
        }
      } catch (error) {
        console.error("Error fetching user preferences:", error);
      }
    };

    fetchUserPreferences();
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/register" element={<RegisterPage theme={theme} />} />
        <Route
          path="/login"
          element={
            <LoginPage theme={theme} setIsAuthenticated={setIsAuthenticated} />
          }
        />
        {/* Only show Navbar and Footer for Homepage */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <>
                <Navbar
                  theme={theme}
                  toggleTheme={toggleTheme}
                  setCategory={setCategory}
                  setSearchQuery={setSearchQuery}
                  setIsAuthenticated={setIsAuthenticated}
                  setUserPreference={setUserPreference}
                />
                <Homepage
                  category={category}
                  theme={theme}
                  searchQuery={searchQuery}
                  UserPreference={UserPreference}
                />
                <Footer theme={theme} />
              </>
            ) : (
              <>
                <Navigate to="/login" />
              </>
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
