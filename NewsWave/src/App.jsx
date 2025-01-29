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


function App() {

  const [category, setCategory] = useState('general')
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState("dark");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    const token = Cookies.get("accessToken");
    setIsAuthenticated(!!token); // Set true if token exists
  }, []);

  useEffect(() => {
    // Apply the theme when the page loads
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage theme={theme} />} />
        <Route path="/login" element={<LoginPage theme={theme} setIsAuthenticated={setIsAuthenticated} />} />
        {/* Only show Navbar and Footer for Homepage */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <>
                <Navbar theme={theme} toggleTheme={toggleTheme} setCategory={setCategory} setSearchQuery={setSearchQuery} setIsAuthenticated={setIsAuthenticated} />
                <Homepage category={category} theme={theme} searchQuery={searchQuery} />
                <Footer theme={theme} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

    </Router>
  );
}

export default App;
