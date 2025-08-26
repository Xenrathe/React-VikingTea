import TeaShelf from "./TeaShelf.jsx";
import JadeCloud from "../../assets/Green/JadeCloud.webp";
import Matcha from "../../assets/Green/Matcha.webp";
import Genmaicha from "../../assets/Green/Genmaicha.webp";
import JasminePearls from "../../assets/Green/JasminePearls.webp";
import OrangeBlossom from "../../assets/Green/OrangeBlossom.webp";
import Sencha from "../../assets/Green/Sencha.webp";
import Jasmine from "../../assets/Green/Jasmine.webp";
import DragonWell from "../../assets/Green/DragonWell.webp";

import { useOutletContext } from "react-router-dom";

const teas = [
  {
    Name: "Jade Cloud",
    Image: JadeCloud,
    Adjectives: "misty • enduring • fateful",
    Description:
      "Gathered from the storm-shrouded cliffs of the eastern seas, this green tea carries the spirit of waves crashing against stone — a drink for skalds and wanderers seeking wisdom in the fog.",
  },
  {
    Name: "Matcha",
    Image: Matcha,
    Adjectives: "fierce • vibrant • unyielding",
    Description:
      "Forged by grinding leaves to a fine emerald powder, Matcha is the warrior’s brew — sharp, bold, and worthy of a shieldmaiden before battle.",
  },
  {
    Name: "Genmaicha",
    Image: Genmaicha,
    Adjectives: "earthy • hearty • steadfast",
    Description:
      "A mixture of green leaves and roasted grains, this tea was favored by Viking farmers and sailors alike, bringing warmth against the icy winds of the north.",
  },
  {
    Name: "Jasmine Pearls",
    Image: JasminePearls,
    Adjectives: "fragrant • exotic • enchanted",
    Description:
      "Rolled into pearls and kissed with blossoms, this tea was said to be traded from distant lands beyond the known sea, a treasure to woo jarls and kings with its delicate aroma.",
  },
  {
    Name: "Orange Blossom",
    Image: OrangeBlossom,
    Adjectives: "bright • lively • sun-touched",
    Description:
      "A rare taste of southern suns, carried by longships across treacherous waters. The blossoms bring light to long winters, a reminder of warmer shores and golden fruit.",
  },
  {
    Name: "Sencha",
    Image: Sencha,
    Adjectives: "crisp • daring • untamed",
    Description:
      "Steeped by flame and honored as a voyager’s drink, Sencha carries the bite of the sea breeze — fresh, cutting, and true as an oar slicing through water.",
  },
  {
    Name: "Jasmine",
    Image: Jasmine,
    Adjectives: "sweet • alluring • mysterious",
    Description:
      "Legends tell of Valkyries bringing jasmine-scented cups to fallen warriors in Valhalla, a floral echo of battle’s reward, both soft and eternal.",
  },
  {
    Name: "Dragon Well",
    Image: DragonWell,
    Adjectives: "bold • smoky • legendary",
    Description:
      "Said to have sprung from a well guarded by Jörmungandr itself, this tea carries a strength to rival the sagas themselves — smooth, rich, and worthy of heroes.",
  },
];

export default function Green() {
  const { setShoppingItem } = useOutletContext();

  return (
    <div className="tea-shelf panel">
      <TeaShelf teas={teas} setShoppingItem={setShoppingItem} />
    </div>
  );
}
