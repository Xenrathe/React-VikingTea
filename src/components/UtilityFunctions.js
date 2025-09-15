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
