import TeaShelf from "./TeaShelf.jsx";
import { blackTeas } from "../../data/products-black.js";

import { useOutletContext } from "react-router-dom";

export default function Black() {
  const { setShoppingItem } = useOutletContext();

  return (
    <div className="tea-shelf panel">
      <TeaShelf teas={blackTeas} setShoppingItem={setShoppingItem} />
    </div>
  );
}
