/* eslint-disable react-hooks/exhaustive-deps */
import { Close } from "@mui/icons-material";
import { SwipeableDrawer } from "@mui/material";
import "./style.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
function Drawer({ open, setOpen }) {
  const mode = useSelector((state) => state.mode.mode);
  const bought = useSelector((state) => state.bought.bought);
  const [money, setMoney] = useState(0);

  useEffect(() => {
    bought.map((d) => setMoney(money + d.price));
  }, [bought]);

  return (
    <SwipeableDrawer open={open} anchor="right" onClose={() => setOpen(false)}>
      <div className={`drawer_div ${mode && "drawer_dark"}`}>
        <div className="drawer_close_button">
          <Close
            onClick={() => setOpen(false)}
            style={{ cursor: "pointer", marginLeft: "auto", fontSize: "30px" }}
            color="primary"
          />
        </div>
        <h2>Siz sotib olgan narsalar</h2>
        <div className={`bought_maps ${mode && "dark_bought_maps"}`}>
          {bought.map((d) => (
            <div key={d.id} className="bought_map">
              <img src={d?.image} alt="" />
              <p className="bought_title">{d?.title}</p>
              <p>${d?.price}</p>
            </div>
          ))}
        </div>
        <div className="money_div">
          <p>Jami narx</p>
          <p>${money}</p>
        </div>
        <div>{/* <button>Sotib olish</button> */}</div>
      </div>
    </SwipeableDrawer>
  );
}

export default Drawer;
