import dragonHead from "../assets/DragonHead.png";

//used for increasing or decreasing item count
function adjustItemInCart(item, newCount, cart, setCart) {
  item.Count = newCount;
  const newCart = [...cart.filter((i) => i.Name != item.Name), item];
  setCart(newCart);
}

export default function ShoppingCart({ cart, setCart, setCartVis }) {
  // PIC - ITEM / - #items + - COST
  // etc for all items
  // SUBTOTAL (x items) - TOTAL COST
  // CONTINUE TO CHECKOUT
  return (
    <div id="sc-backscreen">
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
            <div className="sc-item" key={item.Name}>
              <img src={item.Image} alt={item.Name} />
              <div className="info">
                <span className="label">{item.Name}</span>
                <div className="item-count-adjust">
                  <button
                    disabled={item.Count == 1}
                    onClick={() => {
                      if (item.Count != 1) {
                        adjustItemInCart(item, item.Count - 1, cart, setCart);
                      }
                    }}
                  >
                    -
                  </button>
                  <span>{item.Count}</span>
                  <button
                    onClick={() => {
                      adjustItemInCart(item, item.Count + 1, cart, setCart);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
