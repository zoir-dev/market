import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DarkMode,
  LightMode,
  LocalGroceryStore,
  Login,
  PersonAdd,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../Slices/modeSlice";
import Drawer from "./Drawer/Drawer";
import { auth } from "../../features/firebase";
import { setUser } from "../Slices/userSlice";

function Header() {
  const [path, setPath] = useState("");
  const [open, setOpen] = useState(false);
  const mode = useSelector((state) => state.mode.mode);
  const bought = useSelector((state) => state.bought.bought);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const changeMode = () => {
    dispatch(setMode(!mode));
  };

  useEffect(() => {
    setPath(location.pathname);
  }, [path, location.pathname]);

  const Classname = (p) => {
    if (path === p && mode) {
      return "dark_active_link";
    } else if (path === p) {
      return "active_link";
    } else if (mode) {
      return "dark_link";
    }
  };

  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    auth.onAuthStateChanged((user) =>
      dispatch(setUser({ username: user.displayName, email: user.email }))
    );
  }, [dispatch]);
  console.log(user);
  return (
    <header
      className={`header_div ${mode && "dark_header"} ${
        (path === "/login") | (path === "/sign") && "header_hidden"
      }`}
    >
      <h1>Venturis</h1>
      <div className="paths">
        <Link to="/" className={Classname("/")}>
          Bosh Sahifa
        </Link>
        <Link to="/products" className={Classname("/products")}>
          Mahsulotlar
        </Link>
        <Link to="/about" className={Classname("/about")}>
          Biz haqimizda
        </Link>
        <Link to="/contact" className={Classname("/contact")}>
          Bog'lanish
        </Link>
      </div>
      <div className="header_buttons">
        {!user ? (
          <>
            <button
              className={`navbar_button ${mode && "dark_button"}`}
              onClick={() => navigate("/login")}
            >
              <Login /> Kirish
            </button>
            <button
              className={`navbar_button ${mode && "dark_button"}`}
              onClick={() => navigate("/sign")}
            >
              <PersonAdd /> Registiratsiya
            </button>
          </>
        ) : (
          <h2 className="userName">{user?.username}</h2>
        )}
        <button
          className={`navbar_button ${mode && "dark_button"}`}
          onClick={() => setOpen(true)}
        >
          <LocalGroceryStore /> Savatcha {`(${bought.length})`}
        </button>
      </div>
      {mode ? (
        <LightMode onClick={changeMode} color="primary" />
      ) : (
        <DarkMode onClick={changeMode} color="primary" />
      )}
      <Drawer open={open} setOpen={setOpen} />
    </header>
  );
}

export default Header;
