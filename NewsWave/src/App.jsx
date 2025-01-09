import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./pages/Navbar";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { Footer } from "./pages/Footer";
import "./App.css";
import { Homepage } from "./pages/Homepage";
import { useState } from "react";

function App() {

  const [category, setCategory] = useState('general')

  return (
    <Router>
      <Navbar setCategory={setCategory}/>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Homepage category={category}/>} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
