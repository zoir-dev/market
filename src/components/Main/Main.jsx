import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProducts } from "../Slices/productSlice";
import Product from "./Product";
import loading_gif from "./Loading_2.gif";

function Main() {
  const [filter, setFilter] = useState("all");
  const mode = useSelector((state) => state.mode.mode);
  const data = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://fakestoreapi.com/products")
        .then((d) => dispatch(setProducts(d.data)));
    };
    fetchData();
  }, [dispatch]);
  const filteredData = () => {
    if (filter === "all") return data;
    return data.filter((d) => d.category.includes(filter));
  };

  return (
    <div className={`main_div ${mode && "dark_main_div"}`}>
      <h1>Oxirgi Maxsulotlar</h1>
      <div className="filter_div">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" && "active_button"}
        >
          Hammasi
        </button>
        <button
          onClick={() => setFilter("men's clothing")}
          className={filter === "men's clothing" && "active_button"}
        >
          Erkaklar kiyimi
        </button>
        <button
          onClick={() => setFilter("women's clothing")}
          className={filter === "women's clothing" && "active_button"}
        >
          Ayollar kiyimi
        </button>
        <button
          onClick={() => setFilter("jewelery")}
          className={filter === "jewelery" && "active_button"}
        >
          Taqinchoqlar
        </button>
        <button
          onClick={() => setFilter("electronics")}
          className={filter === "electronics" && "active_button"}
        >
          Elektronika
        </button>
      </div>
      <div className="products_div">
        {!data.length && (
          <div className="loading_div">
            <img src={loading_gif} alt="" />
          </div>
        )}
        {filteredData().map((d) => (
          <Product d={d} key={d.id} />
        ))}
      </div>
    </div>
  );
}

export default Main;
