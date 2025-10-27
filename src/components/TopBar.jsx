import "./TopBar.css";
import boat from "../assets/boatB.png";
import ShoppingCart from "./ShoppingCart";
import { NavLink } from "react-router-dom";
import { cartCount } from "./UtilityFunctions";
import { useState } from "react";

export default function TopBar({ cart, setCart }) {

  const [ cartVis, setCartVis ] = useState(false);

  return (
    <div id="top-banner">
      <div id="announcement">Serving Tea to Taste Berserkers since 972</div>
      <nav>
        <div id="categories">
          <NavLink
            to="/Green"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Green
          </NavLink>
          <NavLink
            to="/Oolong"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Oolong
          </NavLink>
          <NavLink
            to="/Black"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Black
          </NavLink>
          <NavLink
            to="/Teaware"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Teaware
          </NavLink>
        </div>
        <div id="icon-and-title">VIKING TEA</div>
        <div id="cart" onClick={() => setCartVis(true)}>
          <img id="boat-cart" src={boat} />
          <span id="count-cart">{cartCount(cart)}</span>
        </div>
      </nav>
      {cartVis && <ShoppingCart cart={cart} setCart={setCart} setCartVis={setCartVis} />}
    </div>
  );
}
