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

  let fwcolor = null;
  let flashcolor = null;
  if (startLeafplosion) {
    // random color gradients
    const fwcolors = [
      "radial-gradient(circle, #fff, #39ff14, #ff9f00)", // neon green -> orange
      "radial-gradient(circle, #fff, #00eaff, #0066ff)", // cyan -> blue
      "radial-gradient(circle, #fff, #ff00ff, #ff0080)", // pink -> magenta
      "radial-gradient(circle, #fff, #ffff00, #ff4500)", // yellow -> orange-red
    ];
    const flashcolors = [
      "radial-gradient(circle, #fff, #39ff14, transparent)", // neon green -> orange
      "radial-gradient(circle, #fff, #00eaff, transparent)", // cyan -> blue
      "radial-gradient(circle, #fff, #ff00ff, transparent)", // pink -> magenta
      "radial-gradient(circle, #fff, #ffff00, transparent)", // yellow -> orange-red
    ];

    const randomNum = Math.floor(Math.random() * fwcolors.length);
    fwcolor = fwcolors[randomNum];
    flashcolor = flashcolors[randomNum];
  }

  return (
    <div id="bottom">
      <div className="waves-viewport">
        <Wave image={Wave4} speed={2} />
        <Wave image={Wave3} speed={4} />
        <Wave image={Wave2} speed={6} />
        <div id="boat">
          <img id="boat-img" src={boatImg} />
          {startLeafplosion && (
            <div className="firework">
              <span className="flash" style={{ background: flashcolor }} />

              {Array.from({ length: 50 }).map((_, i) => {
                const angle = Math.random() * 360; // random direction
                const dist = 60 + Math.random() * 400; // random distance
                return (
                  <span
                    key={i}
                    className="particle"
                    style={{
                      "--angle": `${angle}deg`,
                      "--distance": `${dist}px`,
                      background: fwcolor,
                    }}
                  />
                );
              })}
            </div>
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
