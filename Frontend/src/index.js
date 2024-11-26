import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./Components/Header/Header.jsx";
import Home from "./Pages/Home/Home.jsx";
import Footer from "./Components/Footer/Footer.jsx"
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Router>
    <Header />
    <main>
      <Routes>
      <Route path='/' element={<Home />} />
      </Routes>
    </main>
    <Footer />
  </Router>
);
