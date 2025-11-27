import { useState, useEffect } from "react";
import { adjustCart } from "../UtilityFunctions";

export default function ShoppingItem({
  selectedTea,
  cart,
  setCart,
  floatingItems,
  setFloatingItems,
  floatingItemCount,
}) {
  const [itemCount, setItemCount] = useState(1);

  // Reset count when a new tea is selected
  // should probably elevate state but meh
  useEffect(() => {
    setItemCount(1);
  }, [selectedTea]);

  if (selectedTea == null) {
    // DEFAULT VIEW (no tea selected yet)
    return <div id="item-display" className="panel default"></div>;
  } else {
    const unit =
      selectedTea.Unit + (selectedTea.Pkgs[0].Quantity > 1 ? "s" : "");

    return (
      <div id="item-display" className="panel">
        <div className="fs-image-container">
          <img id="full-size-img" src={selectedTea.Image} />
        </div>
        <div id="item-right">
          <div id="right-info-and-pic">
            <div className="ss-image-container">
              <img id="smaller-size-img" src={selectedTea.Image} />
            </div>
            <div id="right-info">
              <div id="right-title">
                <div className="title">{selectedTea.Name}</div>
                <div className="adjectives">{selectedTea.Adjectives}</div>
              </div>
              <div id="right-description">{selectedTea.Description}</div>
            </div>
          </div>
          <div id="right-cost-and-cart">
            <div id="right-cost">
              {selectedTea.Pkgs[0].Quantity} {unit} / $
              {selectedTea.Pkgs[0].Cost}
            </div>
            <div id="right-cart">
              <div id="right-quantity" className="item-count-adjust">
                <button
                  disabled={itemCount == 1}
                  onClick={() => {
                    if (itemCount != 1) setItemCount(itemCount - 1);
                  }}
                >
                  -
                </button>
                <span>{itemCount}</span>
                <button onClick={() => setItemCount(itemCount + 1)}>+</button>
              </div>
              <button
                className="add-to-cart"
                onClick={() =>
                  adjustCart(
                    { Product: selectedTea, Count: itemCount },
                    cart,
                    setCart,
                    floatingItems,
                    setFloatingItems,
                    floatingItemCount
                  )
                }
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
