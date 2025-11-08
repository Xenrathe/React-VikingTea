import TeaShelf from "./TeaShelf.jsx";
import { greenTeas } from "../../data/products-green.js";

import { useOutletContext } from "react-router-dom";

export default function Green() {
  const { setShoppingItem } = useOutletContext();

  return (
    <div className="tea-shelf panel">
      <TeaShelf teas={greenTeas} setShoppingItem={setShoppingItem} />
    </div>
  );
}
