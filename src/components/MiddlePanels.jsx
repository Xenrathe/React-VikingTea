import "./MiddlePanels.css";
import TeaShelf from "./TeaShelf.jsx";
import TeaSpice from "../assets/tea-spice.jpg";
import ShoppingItem from "./ShoppingItem.jsx";
import DefaultTeaShelf from "./DefaultShelf.jsx";
import { useOutletContext, useParams } from "react-router-dom";

import { slugify } from "../UtilityFunctions.js";
import { blackTeas } from "../data/products-black.js";
import { greenTeas } from "../data/products-green.js";
import { oolongTeas } from "../data/products-oolong.js";
import { teaware } from "../data/products-teaware.js";

export default function MiddlePanels() {
  const { cart, setCart, floatingItems, setFloatingItems, floatingItemCount } =
    useOutletContext();

  const { shelf, slug } = useParams();

  let items = null;
  if (shelf == "black") items = blackTeas;
  else if (shelf == "green") items = greenTeas;
  else if (shelf == "oolong") items = oolongTeas;
  else if (shelf == "teaware") items = teaware;

  const selectedTea = slug ? items.find((t) => slugify(t.Name) === slug) : null;

  return (
    <div id="middle">
      <img id="default-bg" src={TeaSpice} />
      {shelf ? <TeaShelf shelf={shelf} items={items} /> : <DefaultTeaShelf />}
      <ShoppingItem
        selectedTea={selectedTea}
        cart={cart}
        setCart={setCart}
        floatingItems={floatingItems}
        setFloatingItems={setFloatingItems}
        floatingItemCount={floatingItemCount}
      />
    </div>
  );
}
