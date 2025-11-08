import {
  Link,
  useLocation,
  useParams,
  useOutletContext,
} from "react-router-dom";
import { useEffect } from "react";

import { slugify } from "../UtilityFunctions.js";
import { blackTeas } from "../data/products-black.js";
import { greenTeas } from "../data/products-green.js";
import { oolongTeas } from "../data/products-oolong.js";
import { teaware } from "../data/products-teaware.js";

// teas will be filled with an array of objects
export default function TeaShelf({ shelf }) {
  const location = useLocation();
  const basePath = location.pathname.split("/")[1]; // e.g. "green"
  const { slug } = useParams();
  const { setShoppingItem } = useOutletContext();

  let items = null;
  if (shelf == "Black") items = blackTeas;
  else if (shelf == "Green") items = greenTeas;
  else if (shelf == "Oolong") items = oolongTeas;
  else if (shelf == "Teaware") items = teaware;

  const selectedTea = slug ? items.find((t) => slugify(t.Name) === slug) : null;

  useEffect(() => {
    if (selectedTea) {
      setShoppingItem({ Product: selectedTea, Count: 1 });
    }
  }, [selectedTea, setShoppingItem]);

  return (
    <div className="tea-shelf panel">
      {items.map((item) => (
        <Link
          key={item.Name}
          to={`/${basePath}/${slugify(item.Name)}`}
          className="tea-icon"
        >
          <img src={item.Image} alt={item.Name} />
          <span className="label">{item.Name}</span>
        </Link>
      ))}
    </div>
  );
}
