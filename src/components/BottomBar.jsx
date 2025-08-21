import "./BottomBar.css";
import BoatWDog from "../assets/BoatWDog.png";
import Wave1 from "../assets/Wave1.png";
import Wave2 from "../assets/Wave2.png";
import Wave3 from "../assets/Wave3.png";
import Wave4 from "../assets/Wave4.png";
import Wave from "./Wave";

export default function BottomBar() {
  return (
    <div id="bottom">
      <div class="waves-viewport">
        <Wave image={Wave4} speed={2} />
        <Wave image={Wave3} speed={4} />
        <Wave image={Wave2} speed={6} />
        <img id="boat-img" src={BoatWDog} />
        <Wave image={Wave1} speed={8} syncBoat={true} />
      </div>
    </div>
  );
}
