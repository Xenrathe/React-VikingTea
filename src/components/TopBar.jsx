import "./TopBar.css";
import boat from "../assets/boatB.png";
import menuicon from "../assets/menu.svg";
import ShoppingCart from "./ShoppingCart";
import { NavLink } from "react-router-dom";
import { cartCount } from "../UtilityFunctions";
import { useState } from "react";

function expandMobileMenu(expand) {
  const categories = document.querySelector("#top-banner #categories");

  if (expand) categories.classList.add("expanded");
  else categories.classList.add("hidden");
}

export default function TopBar({
  cart,
  setCart,
  floatingItems,
  setFloatingItems,
  floatingItemCount,
}) {
  const [cartVis, setCartVis] = useState(false);

  return (
    <div id="top-banner">
      <div id="announcement">Serving Tea to Taste Berserkers since 972</div>
      <nav>
        <div id="categories-small">
          <img src={menuicon} onClick={() => expandMobileMenu(true)} />
        </div>
        <div id="categories">
          <span
            id="categories-close"
            className="x-btn"
            onClick={() => setCartVis(false)}
          >
            X
          </span>
          <span className="title">Tea Categories</span>
          <hr className="thicker" />
          <NavLink
            to="/black"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Black
          </NavLink>
          <hr />
          <NavLink
            to="/green"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Green
          </NavLink>
          <hr />
          <NavLink
            to="/oolong"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Oolong
          </NavLink>
          <hr />
          <NavLink
            to="/teaware"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Teaware
          </NavLink>
        </div>
        <div id="icon-and-title">VIKING TEA</div>
        <div id="cart">
          <img id="boat-cart" src={boat} onClick={() => setCartVis(true)} />
          <span id="count-cart" onClick={() => setCartVis(true)}>
            {cartCount(cart)}
          </span>
        </div>
      </nav>
      {cartVis && (
        <ShoppingCart
          cart={cart}
          setCart={setCart}
          setCartVis={setCartVis}
          floatingItems={floatingItems}
          setFloatingItems={setFloatingItems}
          floatingItemCount={floatingItemCount}
        />
      )}
    </div>
  );
}
