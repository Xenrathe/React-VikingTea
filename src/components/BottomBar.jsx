import "./BottomBar.css";
import BoatWDog from "../assets/BoatWDog.png";
import BoatWDogSmall from "../assets/BoatWDogTS.png";
import BoatWDogMed from "../assets/BoatWDogTM.png";
import BoatWDogLarge from "../assets/BoatWDogTL.png";
import BoatWDogVLarge from "../assets/BoatWDogTLL.png";
import BoatWDogVVLarge from "../assets/BoatWDogTLLL.png";
import { cartCount } from "./UtilityFunctions";
import Wave1 from "../assets/Wave1.png";
import Wave2 from "../assets/Wave2.png";
import Wave3 from "../assets/Wave3.png";
import Wave4 from "../assets/Wave4.png";
import Wave from "./Wave";

export default function BottomBar({ cart, floatingItems, setFloatingItems }) {
  const currentCount = cartCount(cart);

  let boatImg = BoatWDogVVLarge;
  if (currentCount == 0) boatImg = BoatWDog;
  else if (currentCount < 4) boatImg = BoatWDogSmall;
  else if (currentCount < 7) boatImg = BoatWDogMed;
  else if (currentCount < 11) boatImg = BoatWDogLarge;
  else if (currentCount < 16) boatImg = BoatWDogVLarge;

  return (
    <div id="bottom">
      <div className="waves-viewport">
        <Wave image={Wave4} speed={2} />
        <Wave image={Wave3} speed={4} />
        <Wave image={Wave2} speed={6} />
        <img id="boat-img" src={boatImg} />
        {floatingItems.map((floatingItem) => {
          if (!floatingItem.inBoat) {
            return (
              <img
                src={floatingItem.img}
                id={`FI-${floatingItem.id}`}
                className="floating-item"
              />
            );
          }
        })}
        <Wave
          image={Wave1}
          speed={8}
          floatingItems={floatingItems}
          setFloatingItems={setFloatingItems}
          syncBoat={true}
        />
      </div>
    </div>
  );
}
