import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBought } from "../Slices/boughtSlice";

function Product(d) {
  const [open, setOpen] = useState(false);
  const mode = useSelector((state) => state.mode.mode);
  const dispatch = useDispatch();

  const handleSelect = () => {
    dispatch(setBought(d?.d));
    setOpen(false);
  };

  return (
    <div className={`product_div ${mode && "dark_product_div"}`}>
      <div
        className={`about_div ${
          open && `open_about_div ${mode && "dark_open_about_div"}`
        }`}
      >
        <div>
          <h3>{d?.d?.title}</h3>
          <span>
            {d?.d?.description.slice(0, 300)}
            {d?.d?.description.length > 300 && "..."}
          </span>
          <span className="absolute_price">Price: ${d?.d?.price}</span>
          <div className="rating_div">
            <span>rated: {d?.d?.rating.rate}</span>
            <span>count: {d?.d?.rating.count}</span>
          </div>
        </div>
        <div className="absolute_buttons">
          <button onClick={() => setOpen(false)}>Orqaga</button>
          <button onClick={handleSelect}>Savatchaga ko'chirish</button>
        </div>
      </div>
      <img src={d?.d?.image} alt={d.category} loading="lazy" />
      <p>{d?.d?.title}</p>
      <p className="product_price">${d?.d?.price}</p>
      <button onClick={() => setOpen(true)}>Hoziroq sotib olish</button>
    </div>
  );
}

export default Product;
