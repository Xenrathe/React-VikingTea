import TeaShelf from "./TeaShelf.jsx";
import { oolongTeas } from "../../data/products-oolong.js";

import { useOutletContext } from "react-router-dom";

export default function Oolong() {
  const { setShoppingItem } = useOutletContext();

  return (
    <div className="tea-shelf panel">
      <TeaShelf teas={oolongTeas} setShoppingItem={setShoppingItem} />
    </div>
  );
}
