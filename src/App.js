import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Products from "./components/Products/Products";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AboutUs from "./components/AboutUs/AboutUs";
import Contact from "./components/Contact/Contact";
import { useSelector } from "react-redux";
import Sign from "./components/Signn/Sign";
import Login from "./components/Loginn/Login";

function App() {
  const mode = useSelector((state) => state.mode.mode);

  console.log(window.location.pathname);

  return (
    <div className={`App ${mode && "dark_App"}`}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
