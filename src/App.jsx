import { useState } from "react";

import BottomBar from "./components/BottomBar.jsx";
import { Outlet } from "react-router-dom";
import ShoppingItem from "./components/ShoppingItem.jsx";
import TopBar from "./components/TopBar.jsx";
import "./App.css";
import "./components/MiddlePanels.css";

function App() {
  const [cart, setCart] = useState([{ Name: "Sencha", Count: 3 }]);
  const [shoppingItem, setShoppingItem] = useState(null);

  return (
    <div className="app">
      <TopBar cart={cart} setCart={setCart} />
      <div id="middle">
        <Outlet context={{ setShoppingItem }} />
        <ShoppingItem
          shoppingItem={shoppingItem}
          cart={cart}
          setCart={setCart}
        />
      </div>
      <BottomBar />
    </div>
  );
}

export default App;
