import { useState, useRef, useEffect } from "react";

import BottomBar from "./components/BottomBar.jsx";
import { Outlet } from "react-router-dom";
import ShoppingItem from "./components/ShoppingItem.jsx";
import TopBar from "./components/TopBar.jsx";
import "./App.css";
import "./components/MiddlePanels.css";
import TeaSpice from "./assets/tea-spice.jpg";

function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const [floatingItems, setFloatingItems] = useState(() => {
    const saved = localStorage.getItem("floatingitems");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("floatingitems", JSON.stringify(floatingItems));
  }, [floatingItems]);

  const floatingItemCount = useRef(
    Number(localStorage.getItem("ficount")) || 0
  );
  //NOTE: no useEffect hook here - the ficount in local storage is updated where the ref is actually incremented

  const [shoppingItem, setShoppingItem] = useState(null);

  return (
    <div className="app">
      <TopBar
        cart={cart}
        setCart={setCart}
        setShoppingItem={setShoppingItem}
        floatingItems={floatingItems}
        setFloatingItems={setFloatingItems}
        floatingItemCount={floatingItemCount}
      />
      <div id="middle">
        <img id="default-bg" src={TeaSpice} />
        <Outlet context={{ setShoppingItem }} />
        <ShoppingItem
          shoppingItem={shoppingItem}
          setShoppingItem={setShoppingItem}
          cart={cart}
          setCart={setCart}
          floatingItems={floatingItems}
          setFloatingItems={setFloatingItems}
          floatingItemCount={floatingItemCount}
        />
      </div>
      <BottomBar
        floatingItems={floatingItems}
        setFloatingItems={setFloatingItems}
        cart={cart}
      />
    </div>
  );
}

export default App;
