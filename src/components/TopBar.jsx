import "./TopBar.css";
import boat from "../assets/boatB.png";
import { NavLink } from "react-router-dom";

//cart is an array of objects
// [{Name: "Gyuokuro", Count: 2}, {Name: "Sencha", Count: 3}]
function cartCount(cart) {
  let totalCount = 0;

  if (cart) {
    cart.forEach((obj) => {
      totalCount += obj.Count;
    });
  }

  return totalCount;
}

export default function TopBar({ cart, setCart }) {
  return (
    <div id="top">
      <div id="announcement">Serving Tea to Taste Berserkers since 972</div>
      <nav>
        <div id="categories">
          <NavLink
            to="/Gyokuro"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Gyokuro
          </NavLink>
          <NavLink
            to="/Sencha"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Sencha
          </NavLink>
          <NavLink
            to="/Teaware"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Teaware
          </NavLink>
        </div>
        <div id="icon-and-title">VIKING TEA</div>
        <div id="cart">
          <img id="boat-cart" src={boat} />
          <span id="count-cart">{cartCount(cart)}</span>
        </div>
      </nav>
    </div>
  );
}
