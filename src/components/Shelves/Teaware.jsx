import TeaShelf from "./TeaShelf.jsx";
import { teaware } from "../../data/products-teaware.js";

import { useOutletContext } from "react-router-dom";

export default function Teaware() {
  const { setShoppingItem } = useOutletContext();

  return (
    <div className="tea-shelf panel">
      <TeaShelf teas={teaware} setShoppingItem={setShoppingItem} />
    </div>
  );
}
