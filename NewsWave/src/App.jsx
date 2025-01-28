import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./pages/Navbar";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { Footer } from "./pages/Footer";
import "./App.css";
import { Homepage } from "./pages/Homepage";
import { useState, useEffect } from "react";

function App() {

  const [category, setCategory] = useState('general')
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState("dark");
  
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };


  useEffect(() => {
    // Apply the theme when the page loads
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);



  return (
    <Router>
      <Navbar theme={theme} toggleTheme={toggleTheme} setCategory={setCategory} setSearchQuery={setSearchQuery}/>
      <Routes>
        <Route path="/login" element={<LoginPage theme={theme} />} />
        <Route path="/register" element={<RegisterPage theme={theme} />} />
        <Route path="/" element={<Homepage category={category} theme={theme} searchQuery={searchQuery}/>} />
      </Routes>

      <Footer theme={theme} />
    </Router>
  );
}

export default App;
