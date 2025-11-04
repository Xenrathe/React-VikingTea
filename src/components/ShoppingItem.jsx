import { addToCart } from "./UtilityFunctions";

export default function ShoppingItem({
  shoppingItem,
  setShoppingItem,
  cart,
  setCart,
  floatingItems,
  setFloatingItems,
}) {
  if (shoppingItem == null) {
    // DEFAULT VIEW (no tea selected yet)
    return <div id="item-display" className="panel default"></div>;
  } else {
    const unit =
      shoppingItem.Product.Unit +
      (shoppingItem.Product.Pkgs[0].Quantity > 1 ? "s" : "");

    return (
      <div id="item-display" className="panel">
        <img src={shoppingItem.Product.Image} />
        <div id="item-right">
          <div id="right-title">
            <div className="title">{shoppingItem.Product.Name}</div>
            <div className="adjectives">{shoppingItem.Product.Adjectives}</div>
          </div>
          <div id="right-description">{shoppingItem.Product.Description}</div>
          <div id="right-cost">
            {shoppingItem.Product.Pkgs[0].Quantity} {unit} / $
            {shoppingItem.Product.Pkgs[0].Cost}
          </div>
          <div id="right-cart">
            <div id="right-quantity" className="item-count-adjust">
              <button
                disabled={shoppingItem.Count == 1}
                onClick={() => {
                  if (shoppingItem.Count != 1) {
                    setShoppingItem({
                      ...shoppingItem,
                      Count: shoppingItem.Count - 1,
                    });
                  }
                }}
              >
                -
              </button>
              <span>{shoppingItem.Count}</span>
              <button
                onClick={() =>
                  setShoppingItem({
                    ...shoppingItem,
                    Count: shoppingItem.Count + 1,
                  })
                }
              >
                +
              </button>
            </div>
            <button
              className="add-to-cart"
              onClick={() =>
                addToCart(
                  shoppingItem,
                  cart,
                  setCart,
                  floatingItems,
                  setFloatingItems
                )
              }
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    );
  }
}
