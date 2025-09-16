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
export function boatCount(floatingItems) {
  
  const initialVal = 0;
  
  const inBoatCount = floatingItems.filter((item) => item.inBoat == true).reduce((count, item) => count + item.cartCount, initialVal);

  return inBoatCount;
}
