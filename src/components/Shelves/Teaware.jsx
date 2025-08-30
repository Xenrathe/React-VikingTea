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

const teaware = [
  {
    Name: "Katakuchi Tea Bowl",
    Image: KatakuchiTeaBowl,
    Adjectives: "clay • 625ml",
    Description:
      "A humble clay vessel, wide-lipped for pouring, used by northern brewers when sharing leaf-steeped wisdom around the longfire.",
  },
  {
    Name: "Takasuke Tokoname",
    Image: TakasukeTokonameKyusuTeapot,
    Adjectives: "red clay • 270ml",
    Description:
      "Forged from Tokoname earth, this side-handled kyusu pours swift and sure, as if built for warriors thirsty after battle.",
  },
  {
    Name: "Cera-Mesh Kyusu",
    Image: CeraMeshKyusuTeapot,
    Adjectives: "clay • 290ml",
    Description:
      "A natural clay kyusu with cunning mesh, filtering leaves like a shield wall against chaff, fit for precise brewing under watchful eyes.",
  },
  {
    Name: "Kikumaru Tokoname",
    Image: KikumaruTokonameSasameKyusuTeapot,
    Adjectives: "clay • 250ml",
    Description:
      "Carved with fine sasame strainer, this Tokoname teapot serves as a chieftain's tool, pouring clear draughts for honored guests.",
  },
  {
    Name: "Genyu Hohin",
    Image: GenyuHohinTeapot,
    Adjectives: "earthenware • 120ml",
    Description:
      "A lidless hohin for delicate brews, its glazed black earthenware gleams like shadows over fjord-waters, steeping leaves with quiet strength.",
  },
  {
    Name: "Wabi-Sabi Raku Bowl",
    Image: WabiSabiRakuMatchaBowl,
    Adjectives: "red clay • 625ml",
    Description:
      "Dark and rugged, this matcha bowl embodies wabi-sabi—like a weathered shield, imperfect yet noble in battle and ceremony alike.",
  },
  {
    Name: "Kinto Hasami White",
    Image: KintoHasamiPorcelainSet,
    Adjectives: "porcelain • 600/125ml",
    Description:
      "A clean porcelain set, bright as new snow on mountain peaks, carried by jarls who prize harmony at the feast table.",
  },
  {
    Name: "Kinto Hasami Black",
    Image: KintoHasamiPorcelainBlackSet,
    Adjectives: "porcelain • 600/125ml",
    Description:
      "Dark-hued porcelain for somber rites, its surface recalling night seas where longships sail beneath unseen stars.",
  },
  {
    Name: "Matcha Pouring Bowl",
    Image: MatchaPouringBowl,
    Adjectives: "porcelain • 625ml",
    Description:
      "Wide and sturdy with a spout for pouring, this bowl stands ready like a Viking ladle, serving forth the green strength of matcha.",
  },
  {
    Name: "Gaiwan Teapot",
    Image: GaiwanTeapot,
    Adjectives: "porcelain • 150ml",
    Description:
      "A lidded porcelain cup, wielded with skillful fingers like a warrior's dagger, brewing swift steeps in close company.",
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
