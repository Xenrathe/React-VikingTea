import TeaShelf from "./TeaShelf.jsx";
import KatakuchiTeaBowl from "../../assets/Teaware/KatakuchiTeaBowl.webp";
import TakasukeTokonameKyusuTeapot from "../../assets/Teaware/TakasukeTokonameKyusuTeapot.webp";
import CeraMeshKyusuTeapot from "../../assets/Teaware/CeraMeshKyusuTeapot.webp";
import KikumaruTokonameSasameKyusuTeapot from "../../assets/Teaware/KikumaruTokonameSasameKyusuTeapot.webp";
import GenyuHohinTeapot from "../../assets/Teaware/GenyuHohinTeapot.webp";
import WabiSabiRakuMatchaBowl from "../../assets/Teaware/WabiSabiRakuMatchaBowl.webp";
import KintoHasamiPorcelainSet from "../../assets/Teaware/KintoHasamiPorcelainSet.webp";
import KintoHasamiPorcelainBlackSet from "../../assets/Teaware/KintoHasamiPorcelainBlackSet.webp";
import MatchaPouringBowl from "../../assets/Teaware/MatchaPouringBowl.webp";
import GaiwanTeapot from "../../assets/Teaware/GaiwanTeapot.webp";

import { useOutletContext } from "react-router-dom";

export const teaware = [
  {
    Name: "Katakuchi Tea Bowl",
    Image: KatakuchiTeaBowl,
    Adjectives: "ceramic • 200ml",
    Description:
      "A traditional katakuchi bowl with a spouted lip, perfect for sharing tea with elegance and ease.",
  },
  {
    Name: "Takasuke Tokoname Kyusu Teapot",
    Image: TakasukeTokonameKyusuTeapot,
    Adjectives: "tokoname clay • 300ml",
    Description:
      "Handcrafted by master Takasuke, this kyusu teapot embodies balance, refinement, and centuries of Tokoname tradition.",
  },
  {
    Name: "Cera Mesh Kyusu Teapot",
    Image: CeraMeshKyusuTeapot,
    Adjectives: "ceramic • 320ml",
    Description:
      "A sleek kyusu with a fine mesh filter, ideal for brewing delicate leaves while retaining clarity of flavor.",
  },
  {
    Name: "Kikumaru Tokoname Sasame Kyusu",
    Image: KikumaruTokonameSasameKyusuTeapot,
    Adjectives: "tokoname clay • 280ml",
    Description:
      "Kikumaru’s sasame-style kyusu, crafted for even flow and smooth pouring, revered among seasoned brewers.",
  },
  {
    Name: "Genyu Hohin Teapot",
    Image: GenyuHohinTeapot,
    Adjectives: "porcelain • 180ml",
    Description:
      "A handleless hohin teapot by Genyu, designed for refined hand-pouring and meditative tea sessions.",
  },
  {
    Name: "Wabi-Sabi Raku Matcha Bowl",
    Image: WabiSabiRakuMatchaBowl,
    Adjectives: "raku clay • 450ml",
    Description:
      "This rustic raku matcha bowl embraces imperfection, embodying the wabi-sabi spirit of the tea ceremony.",
  },
  {
    Name: "Kinto Hasami Porcelain Set",
    Image: KintoHasamiPorcelainSet,
    Adjectives: "porcelain • 400ml",
    Description:
      "A clean and modern Hasami porcelain set by Kinto, merging minimalist design with functional beauty.",
  },
  {
    Name: "Kinto Hasami Porcelain Black Set",
    Image: KintoHasamiPorcelainBlackSet,
    Adjectives: "black porcelain • 400ml",
    Description:
      "A striking black Hasami porcelain set by Kinto, balancing modern aesthetics with timeless craftsmanship.",
  },
  {
    Name: "Matcha Pouring Bowl",
    Image: MatchaPouringBowl,
    Adjectives: "ceramic • 500ml",
    Description:
      "A wide and sturdy pouring bowl for whisking and serving matcha with ease and grace.",
  },
  {
    Name: "Gaiwan Teapot",
    Image: GaiwanTeapot,
    Adjectives: "porcelain • 150ml",
    Description:
      "The classic gaiwan teapot, versatile and elegant, used for gongfu brewing and intimate tea exploration.",
  },
];

export default function Teaware() {
  const { setShoppingItem } = useOutletContext();

  return (
    <div className="tea-shelf panel">
      <TeaShelf teas={teaware} setShoppingItem={setShoppingItem} />
    </div>
  );
}
