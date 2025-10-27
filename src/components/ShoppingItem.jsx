import largeTreasure from "../assets/Teasure-L.png";
import mediumTreasure1 from "../assets/Teasure-M-1.png";
import mediumTreasure2 from "../assets/Teasure-M-2.png";
import smallTreasure1 from "../assets/Teasure-S-1.png";
import smallTreasure2 from "../assets/Teasure-S-2.png";

function AddToCart(
  shoppingItem,
  cart,
  setCart,
  floatingItems,
  setFloatingItems
) {
  const newCart = [];

  // ***** FLOATING ITEM STUFF *******
  let floatingImg = largeTreasure; //only one largetreasure image
  if (shoppingItem.Count == 1) {
    if (Math.random() > 0.5) floatingImg = smallTreasure1; //randomly pick from 2 images
    else floatingImg = smallTreasure2;
  } 
  else if (shoppingItem.Count == 2) {
    if (Math.random() > 0.5) floatingImg = mediumTreasure1; //randomly pick from 2 images
    else floatingImg = mediumTreasure2;
  } 
  const newFloatingItem = {
    id: floatingItems.length,
    cartCount: shoppingItem.Count,
    img: floatingImg,
    waveOffset: null,
    inBoat: false,
  };
  let newFloatingItems = [...floatingItems];
  newFloatingItems.push(newFloatingItem);
  setFloatingItems(newFloatingItems);
  // ***** END FLOATING ITEM STUFF *******

  //we want the same item to only have a single object
  let repeatItem = false;
  cart.forEach((item) => {
    if (item.Name == shoppingItem.Name) {
      newCart.push({
        Name: shoppingItem.Name,
        Image: shoppingItem.Image,
        Count: item.Count + shoppingItem.Count,
      });
      repeatItem = true;
    } else {
      newCart.push(item);
    }
  });

  if (!repeatItem)
    newCart.push({ Name: shoppingItem.Name, Image: shoppingItem.Image, Count: shoppingItem.Count });

  setCart(newCart);
}

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
              onClick={() =>
                AddToCart(
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
