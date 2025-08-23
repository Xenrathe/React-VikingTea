export default function ShoppingItem({ shoppingItem, cart, setCart }) {
  if (shoppingItem == null) {
    // DEFAULT VIEW (no tea selected yet)
    return (
      <div id="item-display" className="panel">
        TEA DESCRIPTION
      </div>
    );
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
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
            <button>ADD TO CART</button>
          </div>
        </div>
      </div>
    );
  }
}
