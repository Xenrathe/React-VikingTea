import "./TopBar.css";
import boat from "../assets/boatB.png";
import menuicon from "../assets/menu.svg";
import ShoppingCart from "./ShoppingCart";
import { NavLink } from "react-router-dom";
import {
  cartCount,
  expandCategoryMenu,
  shelfExpansion,
} from "../UtilityFunctions";
import { useState } from "react";

export default function TopBar({
  cart,
  setCart,
  floatingItems,
  setFloatingItems,
  floatingItemCount,
}) {
  const [cartVis, setCartVis] = useState(false);

  const shelfCategories = ["Black", "Green", "Oolong", "Teaware"];

  return (
    <div id="top-banner">
      <div id="announcement">Serving Tea to Taste Berserkers since 972</div>
      <nav>
        <div id="categories-small">
          <img src={menuicon} onClick={() => expandCategoryMenu(true)} />
        </div>
        <div id="categories">
          <div className="menu-top">
            <span
              id="categories-close"
              className="x-btn"
              onClick={() => expandCategoryMenu(false)}
            >
              X
            </span>
            <span className="title">Tea category:</span>
          </div>
          {shelfCategories.map((cat, index) => (
            <>
              <NavLink
                to={`/${cat.toLowerCase()}`}
                className={({ isActive }) => (isActive ? "active-link" : "")}
                onClick={() => {
                  shelfExpansion(true);
                  expandCategoryMenu(false);
                }}
              >
                {cat}
              </NavLink>
              {index != shelfCategories.length - 1 ? <hr /> : null}
            </>
          ))}
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
