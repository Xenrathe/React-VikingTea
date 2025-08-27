import TeaShelf from "./TeaShelf.jsx";
import DoiWaweeShaiHongSpringCake from "../../assets/Black/DoiWaweeShaiHongSpringCake.webp";
import WildThaiBlack from "../../assets/Black/WildThaiBlack.webp";
import EarlGrey from "../../assets/Black/EarlGrey.webp";
import GoldenYunnan from "../../assets/Black/GoldenYunnan.webp";
import MasalaChai from "../../assets/Black/MasalaChai.webp";
import RoseDianHong from "../../assets/Black/RoseDianHong.webp";
import YunnanPurpleBuds from "../../assets/Black/YunnanPurpleBuds.webp";
import FirstFlushChamong from "../../assets/Black/FirstFlushChamong.webp";
import WhiskeyBarrelChiangDao from "../../assets/Black/JapanWhiskeyBarrelAgedChiangDao.webp";
import SweetThaiIcedTea from "../../assets/Black/SweetThaiIcedTea.webp";

import { useOutletContext } from "react-router-dom";

const teas = [
  {
    Name: "Doi Wawee Shai Hong",
    Image: DoiWaweeShaiHongSpringCake,
    Adjectives: "ancient • smoldering • steadfast",
    Description:
      "Forged from the high mists of Wawee, this black cake is pressed like a warrior's shield, carrying the smoky strength of the mountain clans.",
  },
  {
    Name: "Earl Grey",
    Image: EarlGrey,
    Adjectives: "refined • storm-kissed • resolute",
    Description:
      "A noble black tea bound with bergamot's bright fire, said to be favored by jarls who rule beneath both thunder and crown.",
  },
  {
    Name: "First Flush Chamong",
    Image: FirstFlushChamong,
    Adjectives: "bright • brisk • youthful",
    Description:
      "A Darjeeling spring leaf as fresh as a new blade, lively with the vigor of young warriors sworn to their first oath.",
  },
  {
    Name: "Barrel-aged Chiang Dao",
    Image: WhiskeyBarrelChiangDao,
    Adjectives: "smoked • oaken • mighty",
    Description:
      "Rested in whiskey barrels beneath the dragon peaks, this black tea carries the depth of oak, the heat of spirit, and the weight of legend.",
  },
  {
    Name: "Golden Yunnan",
    Image: GoldenYunnan,
    Adjectives: "radiant • molten • enduring",
    Description:
      "These golden buds gleam like treasure hoards beneath the mountain halls, pouring forth a liquor as rich as a king's ransom.",
  },
  {
    Name: "Masala Chai",
    Image: MasalaChai,
    Adjectives: "fiery • spiced • triumphant",
    Description:
      "A caravan's bounty of spice and black leaf, brewed hot as a war-drum, warming shield-arms and battle-hearts alike.",
  },
  {
    Name: "Rose Dian Hong",
    Image: RoseDianHong,
    Adjectives: "fragrant • alluring • valiant",
    Description:
      "Dian Hong entwined with rose petals — a drink for skalds and lovers, soft as dawn yet strong as the sword-arm.",
  },
  {
    Name: "Yunnan Purple Buds",
    Image: YunnanPurpleBuds,
    Adjectives: "mystic • rare • commanding",
    Description:
      "Sprung from shadowed highlands, these purple buds brew a draught of deep power, fit for prophets and war-seers.",
  },
  {
    Name: "Sweet Thai Iced Tea",
    Image: SweetThaiIcedTea,
    Adjectives: "smooth • honeyed • jovial",
    Description:
      "A feast-hall favorite, sweet and bright, cooling warriors after the clash — as welcome as mead at midsummer.",
  },
  {
    Name: "Wild Thai Black",
    Image: WildThaiBlack,
    Adjectives: "untamed • primal • fierce",
    Description:
      "Plucked from the wild groves of the northern frontier, this brew roars with the spirit of the deep forest — bold as a berserker’s charge.",
  },
];

export default function Black() {
  const { setShoppingItem } = useOutletContext();

  return (
    <div className="tea-shelf panel">
      <TeaShelf teas={teas} setShoppingItem={setShoppingItem} />
    </div>
  );
}
