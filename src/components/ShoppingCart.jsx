import dragonHead from "../assets/DragonHead.png";

export default function ShoppingCart({cart, setCart, setCartVis}) {
  // PIC - ITEM / - #items + - COST
  // etc for all items
  // SUBTOTAL (x items) - TOTAL COST
  // CONTINUE TO CHECKOUT
  console.log(cart);
  return(
    <div id="side-cart">
      <img id="dragonhead" src={dragonHead}/>
      <div id="sc-titlebar">
        <span id="sc-title">Dragon Cart</span>
        <span id="sc-close" onClick={() => setCartVis(false)}>X</span>
      </div>
      <div id="sc-items">
        
      </div>
    </div>
  )
}