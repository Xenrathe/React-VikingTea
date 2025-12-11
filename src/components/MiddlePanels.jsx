import "./MiddlePanels.css";
import TeaShelf from "./TeaShelf.jsx";
import TeaSpice from "../assets/tea-spice.jpg";
import BrokenShip from "../assets/broken-ship.jpg";
import ShoppingItem from "./ShoppingItem.jsx";
import DefaultTeaShelf from "./DefaultShelf.jsx";
import ErrorShelf from "./ErrorShelf.jsx";
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

  const validShelves = ["black", "green", "oolong", "teaware"];
  let actualShelfComponent;
  let useErrorShelf = false;
  let items = null;
  let selectedTea = null;

  if (shelf == "Default" || shelf == null)
    actualShelfComponent = <DefaultTeaShelf />;
  else if (validShelves.includes(shelf.toLowerCase())) {
    if (shelf == "black") items = blackTeas;
    else if (shelf == "green") items = greenTeas;
    else if (shelf == "oolong") items = oolongTeas;
    else if (shelf == "teaware") items = teaware;

    actualShelfComponent = <TeaShelf shelf={shelf} slug={slug} items={items} />;
    selectedTea = slug ? items.find((t) => slugify(t.Name) === slug) : null;
  } else {
    actualShelfComponent = <ErrorShelf />;
    useErrorShelf = true;
  }

  return (
    <div
      id="middle"
      className={`tl-shadow${useErrorShelf ? " has-error" : ""}`}
    >
      {useErrorShelf ? (
        <img id="error-bg" src={BrokenShip} />
      ) : (
        <img id="default-bg" src={TeaSpice} />
      )}
      {actualShelfComponent}
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
