import { Link } from "react-router-dom";
import {
  slugify,
  expandCategoryMenu,
  shelfExpansion,
} from "../UtilityFunctions.js";

// items will be filled with an array of objects (products with various keys)
export default function TeaShelf({ shelf, items }) {
  return (
    <div className="tea-shelf panel expanded">
      {items.map((item) => (
        <Link
          key={item.Name}
          to={`/${shelf}/${slugify(item.Name)}`}
          className="tea-icon"
          onClick={() => {
            shelfExpansion(false);
            expandCategoryMenu(false);
          }}
        >
          <img src={item.Image} alt={item.Name} />
          <span className="label">{item.Name}</span>
        </Link>
      ))}
    </div>
  );
}
