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
  setFloatingItems,
  floatingItemCount = null
) {
  const newCart = [];
  const adjustment = shoppingItem.Count;

  //we want the same item to only have a single object
  let repeatItem = false;
  cart.forEach((item) => {
    if (item.Product.Name == shoppingItem.Product.Name) {

      // only add if the item hasn't been removed
      if (item.Count + adjustment > 0){
        newCart.push({
        Product: shoppingItem.Product,
        Count: item.Count + adjustment,
      });}

      repeatItem = true;
    } else {
      newCart.push(item);
    }
  });

  //adding a new item (will only be addition, never subtraction)
  if (!repeatItem)
    newCart.push({
      Product: shoppingItem.Product,
      Count: shoppingItem.Count,
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

  if (adjustment > 0){ //ADD A FLOATING BOX INTO ANIMATION

    const newFloatingItem = {
      id: floatingItemCount.current++,
      cartCount: shoppingItem.Count,
      product: shoppingItem.Product,
      img: floatingImg,
      waveOffset: null,
      inBoat: false,
    };

    let newFloatingItems = [...floatingItems];
    newFloatingItems.push(newFloatingItem);
    setFloatingItems(newFloatingItems);
  }
  else if (adjustment == -1) //ADJUST COUNT OF FLOATING ITEM
  {
    let newFloatingItems = [];
    let hasBeenAdjusted = false;

    floatingItems.forEach((item) => {
      if (hasBeenAdjusted || item.product.Name != shoppingItem.Product.Name) {
        newFloatingItems.push(item);
      } else if (item.cartCount > 1) {
        item.cartCount = item.cartCount - 1;
        newFloatingItems.push(item);
        hasBeenAdjusted = true;
      } //else if item.cartCount == 1, don't bother adding it back in
    })

    setFloatingItems(newFloatingItems);
  }
  else { //ENTIRE ITEM WAS REMOVED - REMOVE ALL INSTANCES FROM FLOATING ITEMS
    const newFloatingItems = floatingItems.filter((item) => item.product.Name != shoppingItem.Product.Name);
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
