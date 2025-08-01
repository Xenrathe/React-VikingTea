import "./MiddlePanels.css";
import ShoppingItem from "./ShoppingItem.jsx";
import TeaShelves from "./TeaShelves.jsx";

export default function MiddlePanels() {
  return (
    <div id="middle">
      <TeaShelves />
      <ShoppingItem />
    </div>
  )
}