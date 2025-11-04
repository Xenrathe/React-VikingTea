import largeTreasure from "../assets/Teasure-L.png";
import mediumTreasure1 from "../assets/Teasure-M-1.png";
import mediumTreasure2 from "../assets/Teasure-M-2.png";
import smallTreasure1 from "../assets/Teasure-S-1.png";
import smallTreasure2 from "../assets/Teasure-S-2.png";

export function adjustCart(
  shoppingItem,
  cart,
  setCart,
  floatingItems,
  setFloatingItems
) {
  const newCart = [];
  let newCount = shoppingItem.Count;

  //we want the same item to only have a single object
  let repeatItem = false;
  cart.forEach((item) => {
    if (item.Product.Name == shoppingItem.Product.Name) {
      newCount = item.Count + shoppingItem.Count;

      // only add if the item hasn't been removed
      if (newCount > 0){
        newCart.push({
        Product: shoppingItem.Product,
        Count: item.Count + shoppingItem.Count,
      });}

      repeatItem = true;
    } else {
      newCart.push(item);
    }
  });

  if (!repeatItem)
    newCart.push({
      Product: shoppingItem.Product,
      Count: newCount,
    });

  setCart(newCart);

  // ***** FLOATING ITEM STUFF *******
  let floatingImg = largeTreasure; //only one largetreasure image
  if (shoppingItem.Count == 1) {
    if (Math.random() > 0.5)
      floatingImg = smallTreasure1; //randomly pick from 2 images
    else floatingImg = smallTreasure2;
  } else if (shoppingItem.Count == 2) {
    if (Math.random() > 0.5)
      floatingImg = mediumTreasure1; //randomly pick from 2 images
    else floatingImg = mediumTreasure2;
  }
  if (shoppingItem.Count > 0){
    
    const newFloatingItem = {
      id: floatingItems.length,
      cartCount: shoppingItem.Count,
      product: shoppingItem,
      img: floatingImg,
      waveOffset: null,
      inBoat: false,
      };

      let newFloatingItems = [...floatingItems];
      newFloatingItems.push(newFloatingItem);
      setFloatingItems(newFloatingItems);
    }
    // ***** END FLOATING ITEM STUFF *******
}

//cart is an array of objects
// [{Name: "Gyuokuro", Count: 2}, {Name: "Sencha", Count: 3}]
export function cartCount(cart) {
  let totalCount = 0;

  if (cart) {
    cart.forEach((obj) => {
      totalCount += obj.Count;
    });
  }

  return totalCount;
}

//floatingItems is an array of objects
// [{id: #, img: somesrc, waveOffset: ##, inBoat: false/true}]
export function boatCount(floatingItems, cart) {
  const initialVal = 0;

  const inBoatCount = floatingItems
    .filter((item) => item.inBoat == true)
    .reduce((count, item) => count + item.cartCount, initialVal);

  return inBoatCount
}
