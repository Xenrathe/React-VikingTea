import { useState, useRef, useEffect } from "react";

import BottomBar from "./components/BottomBar.jsx";
import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar.jsx";
import "./App.css";

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

  return (
    <div className="app">
      <TopBar
        cart={cart}
        setCart={setCart}
        floatingItems={floatingItems}
        setFloatingItems={setFloatingItems}
        floatingItemCount={floatingItemCount}
      />
      <Outlet
        context={{
          cart,
          setCart,
          floatingItems,
          setFloatingItems,
          floatingItemCount,
        }}
      />
      <BottomBar
        floatingItems={floatingItems}
        setFloatingItems={setFloatingItems}
        cart={cart}
      />
    </div>
  );
}

export default App;
