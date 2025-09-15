function AddToCart(shoppingItem, cart, setCart) {
  const newCart = [];

  //we want the same item to only have a single object
  let repeatItem = false;
  cart.forEach((item) => {
    if (item.Name == shoppingItem.Name) {
      newCart.push({
        Name: shoppingItem.Name,
        Count: item.Count + shoppingItem.Count,
      });
      repeatItem = true;
    } else {
      newCart.push(item);
    }
  });

  if (!repeatItem)
    newCart.push({ Name: shoppingItem.Name, Count: shoppingItem.Count });

  console.log(newCart);
  setCart(newCart);
}

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
            <button
              className="add-to-cart"
              onClick={() => AddToCart(shoppingItem, cart, setCart)}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    );
  }
}
