import dragonHead from "../assets/DragonHead.png";
import deleteImg from "../assets/delete-outline.svg";
import "./ShoppingCart.css";
import { NavLink } from "react-router-dom";
import { cartCount, adjustCart } from "./UtilityFunctions";

export default function ShoppingCart({
  cart,
  setCart,
  setCartVis,
  setShoppingItem,
  floatingItems,
  setFloatingItems,
  floatingItemCount,
}) {
  // PIC - ITEM / - #items + - COST
  // etc for all items
  // SUBTOTAL (x items) - TOTAL COST
  // CONTINUE TO CHECKOUT
  const numItemsInCart = cartCount(cart);
  const itemCountStr =
    numItemsInCart != 1 ? `${numItemsInCart} items` : "1 item";

  const totalCost = cart.reduce(
    (acc, item) => acc + item.Product.Pkgs[0].Cost * item.Count,
    0
  );

  return (
    <>
      <div id="sc-backscreen"></div>
      <div id="side-cart">
        <img id="dragonhead" src={dragonHead} />
        <div id="sc-titlebar">
          <span id="sc-title">Dragon Cart</span>
          <span id="sc-close" onClick={() => setCartVis(false)}>
            X
          </span>
        </div>
        <hr />
        <div id="sc-items">
          {cart.map((item) => (
            <div className="sc-item" key={item.Product.Name}>
              <NavLink
                to={`/${item.Product.Route}`}
                onClick={() => {
                  setShoppingItem(item);
                  setCartVis(false);
                }}
              >
                <img src={item.Product.Image} alt={item.Product.Name} />
              </NavLink>
              <div className="info">
                <span className="sc-label">{item.Product.Name}</span>
                <div className="sc-quantity">
                  {item.Product.Pkgs[0].Quantity}{" "}
                  {item.Product.Unit +
                    (item.Product.Pkgs[0].Quantity > 1 ? "s" : "")}
                </div>
                <div className="item-count-adjust">
                  <button
                    disabled={item.Count == 1}
                    onClick={() => {
                      if (item.Count != 1) {
                        adjustCart(
                          { ...item, Count: -1 },
                          cart,
                          setCart,
                          floatingItems,
                          setFloatingItems,
                          floatingItemCount
                        );
                      }
                    }}
                  >
                    -
                  </button>
                  <span>{item.Count}</span>
                  <button
                    onClick={() => {
                      adjustCart(
                        { ...item, Count: 1 },
                        cart,
                        setCart,
                        floatingItems,
                        setFloatingItems,
                        floatingItemCount
                      );
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="remove-and-cost">
                <img
                  className="delete"
                  src={deleteImg}
                  alt="delete"
                  onClick={() => {
                    adjustCart(
                      { ...item, Count: item.Count * -1 },
                      cart,
                      setCart,
                      floatingItems,
                      setFloatingItems,
                      floatingItemCount
                    );
                  }}
                />
                <span className="cost">
                  ${(item.Product.Pkgs[0].Cost * item.Count).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <hr />
        <div id="sc-total-checkout">
          <div id="sc-subtotal">
            <div id="sc-itemcount">Subtotal ({itemCountStr})</div>
            <div id="sc-totalcost">${totalCost}</div>
          </div>
          <button>CHECKOUT</button>
        </div>
      </div>
    </>
  );
}
