export default function ShoppingItem({
  shoppingItem,
  setShoppingItem,
  cart,
  setCart,
}) {
  if (shoppingItem == null) {
    // DEFAULT VIEW (no tea selected yet)
    return <div id="item-display" className="panel default"></div>;
  } else {
    return (
      <div id="item-display" className="panel">
        <img src={shoppingItem.Image} />
        <div id="item-right">
          <div id="right-title">
            <div className="title">{shoppingItem.Name}</div>
            <div className="adjectives">{shoppingItem.Adjectives}</div>
          </div>
          <div id="right-description">{shoppingItem.Description}</div>
          <div id="right-cart">
            <div id="right-quantity">
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
            <button className="add-to-cart">ADD TO CART</button>
          </div>
        </div>
      </div>
    );
  }
}
