import { useState } from "react";

import BottomBar from "./components/BottomBar.jsx";
import { Outlet } from "react-router-dom";
import ShoppingItem from "./components/ShoppingItem.jsx";
import TopBar from "./components/TopBar.jsx";
import "./App.css";
import "./components/MiddlePanels.css";
import TeaSpice from "./assets/tea-spice.jpg";

function App() {
  const [cart, setCart] = useState([]);
  const [shoppingItem, setShoppingItem] = useState(null);
  const [floatingItems, setFloatingItems] = useState([]);

  return (
    <div className="app">
      <TopBar cart={cart} setCart={setCart} />
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
        />
      </div>
      <BottomBar
        floatingItems={floatingItems}
        setFloatingItems={setFloatingItems}
      />
    </div>
  );
}

export default App;
