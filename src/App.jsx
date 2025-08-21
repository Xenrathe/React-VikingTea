import { useState, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import BottomBar from "./components/BottomBar.jsx";
import MiddlePanels from "./components/MiddlePanels.jsx";
import TopBar from "./components/TopBar.jsx";
import "./App.css";

function App() {
  const [cart, setCart] = useState([{ Name: "Sencha", Count: 3 }]);

  return (
    <div className="app">
      <TopBar cart={cart} setCart={setCart} />
      <MiddlePanels />
      <BottomBar />
    </div>
  );
}

export default App;
