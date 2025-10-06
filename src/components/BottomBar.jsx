import "./BottomBar.css";
import { boatCount } from "./UtilityFunctions";
import { useState } from "react";

import BoatWDog from "../assets/BoatWDog.png";
import BoatWDogSmall from "../assets/BoatWDogTS.png";
import BoatWDogMed from "../assets/BoatWDogTM.png";
import BoatWDogLarge from "../assets/BoatWDogTL.png";
import BoatWDogVLarge from "../assets/BoatWDogTLL.png";
import BoatWDogVVLarge from "../assets/BoatWDogTLLL.png";
import Wave1 from "../assets/Wave1.png";
import Wave2 from "../assets/Wave2.png";
import Wave3 from "../assets/Wave3.png";
import Wave4 from "../assets/Wave4.png";
import Wave from "./Wave";

function Firework(){

  const fwcolors = [
    " #39ff14",
    " #0066ff", 
    "rgb(255, 0, 0)",
    "rgb(229, 255, 0)",
  ];
  const randomNum = Math.floor(Math.random() * fwcolors.length);
  const fwcolor = fwcolors[randomNum];
  const flashcolor = `radial-gradient(circle,${fwcolor}, transparent)`;

  // top is 100px +- 50px; left is 350px +- 50px;
  const randomTop = `${125 - Math.random() * 100}px`;
  const randomLeft = `${375 - Math.random() * 100}px`;

  return (
    <div className="firework" style={{"top": randomTop, "left": randomLeft}}>
      <span className="flash" style={{ background: flashcolor }} />

      {Array.from({ length: 100 }).map((_, i) => {
        const angle = Math.random() * 360; // random direction
        const dist = 20 + Math.random() * 400; // random distance
        return (
          <span
            key={i}
            className="particle"
            style={{
              "--angle": `${angle}deg`,
              "--distance": `${dist}px`,
              "--color": fwcolor,
            }}
          />
        );
      })}
    </div>
  )
}

export default function BottomBar({ floatingItems, setFloatingItems }) {
  const [startLeafplosion, setStartLeafplosion] = useState(false);

  //boat image block (bigger treasure the more floatingItems arrived in boat)
  const currentCount = boatCount(floatingItems);
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
        <div id="boat">
          <img id="boat-img" src={boatImg} />
          {startLeafplosion && (
            <Firework/>
          )}
        </div>
        <div id="floating-items">
          {floatingItems.map((floatingItem) => {
            if (!floatingItem.inBoat) {
              return (
                <img
                  src={floatingItem.img}
                  id={`FI-${floatingItem.id}`}
                  key={floatingItem.id}
                  className="floating-item"
                />
              );
            }
          })}
        </div>
        <Wave
          image={Wave1}
          speed={8}
          floatingItems={floatingItems}
          setFloatingItems={setFloatingItems}
          startLeafplosion={startLeafplosion}
          setStartLeafplosion={setStartLeafplosion}
          syncBoat={true}
        />
      </div>
    </div>
  );
}
