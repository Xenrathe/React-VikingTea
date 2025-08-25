import TeaShelf from "./TeaShelf.jsx";
import BaoZhong from "../../assets/Oolong/BaoZhong.webp";
import DongFangHong from "../../assets/Oolong/DongFangHong.webp";
import IronGoddessOfMercy from "../../assets/Oolong/IronGoddessOfMercy.webp";
import PhoenixDancongLanHuaXiang from "../../assets/Oolong/PhoenixDancongLanHuaXiang.webp";
import Ruby from "../../assets/Oolong/Ruby.webp";
import ShanLinXiGaoShanCha from "../../assets/Oolong/ShanLinXiGaoShanCha.webp";
import TropicalCoconut from "../../assets/Oolong/TropicalCoconut.webp";

import { useOutletContext } from "react-router-dom";

const teas = [
  {
    Name: "Bao Zhong",
    Image: BaoZhong,
    Adjectives: "Smoky, brave, lingering",
    Description:
      "Harvested atop the jagged fjords of Nordhjem by the Valkyrie Tea Clan, this oolong sings of smoke and iron.",
  },
  {
    Name: "Dong Fang Hong",
    Image: DongFangHong,
    Adjectives: "Fiery, bold, heroic",
    Description:
      "A blood-red oolong forged in the eastern peaks of Fjallheim, its aroma tells tales of dragons and battlefields.",
  },
  {
    Name: "Iron Goddess of Mercy",
    Image: IronGoddessOfMercy,
    Adjectives: "Resolute, meditative, strong",
    Description:
      "Steeped in the sacred halls of Skjoldfjord, this legendary oolong balances iron strength with the calm of the northern winds.",
  },
  {
    Name: "Phoenix Dancong Lan Hua Xiang",
    Image: PhoenixDancongLanHuaXiang,
    Adjectives: "Reborn, mystical, fragrant",
    Description:
      "Plucked from the mystical peaks of Eldfjell, each leaf rises like a phoenix from the ashes of volcanic soil.",
  },
  {
    Name: "Ruby",
    Image: Ruby,
    Adjectives: "Vivid, daring, spirited",
    Description:
      "This crimson oolong hails from the ruby cliffs of Skarvheim, beloved by shieldmaidens for its fiery essence.",
  },
  {
    Name: "Shan Lin Xi Gao Shan Cha",
    Image: ShanLinXiGaoShanCha,
    Adjectives: "Highland, sharp, invigorating",
    Description:
      "Grown on the high peaks of the Gao Shan ridges, this oolong invigorates like a morning raid along icy fjords.",
  },
  {
    Name: "Tropical Coconut",
    Image: TropicalCoconut,
    Adjectives: "Exotic, daring, sun-kissed",
    Description:
      "Brought from the distant southern isles of Vesterhavn, where the sun warms the coconut palms and the sea hums a sailor's tune.",
  },
];

export default function Oolong() {
  const { setShoppingItem } = useOutletContext();

  return (
    <div className="tea-shelf panel">
      <TeaShelf teas={teas} setShoppingItem={setShoppingItem} />
    </div>
  );
}
