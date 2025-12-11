import { Link } from "react-router-dom";
import { slugify, expandCategoryMenu } from "../UtilityFunctions.js";

// items will be filled with an array of objects (products with various keys)
export default function TeaShelf({
  shelf,
  shelfIsExpanded,
  setShelfIsExpanded,
  items,
}) {
  let shelfTitle = "Teaware";
  if (shelf == "green") shelfTitle = "Green Tea";
  else if (shelf == "black") shelfTitle = "Black Tea";
  else if (shelf == "oolong") shelfTitle = "Oolong Tea";

  return (
    <>
      <div className={`tea-shelf panel${shelfIsExpanded ? " expanded" : ""}`}>
        <div className="title-bar">
          <span>{shelfTitle}</span>
          <span
            id="ts-close"
            className="x-btn"
            onClick={() => setShelfIsExpanded(false)}
          >
            X
          </span>
        </div>
        <div className="teas">
          {items.map((item) => (
            <Link
              key={item.Name}
              to={`/${shelf}/${slugify(item.Name)}`}
              className="tea-icon"
              onClick={() => {
                setShelfIsExpanded(false);
                expandCategoryMenu(false);
              }}
            >
              <img src={item.Image} alt={item.Name} />
              <span className="label">{item.Name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
