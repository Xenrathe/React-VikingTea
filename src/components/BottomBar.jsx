import "./BottomBar.css";
import { boatCount } from "./UtilityFunctions";
import { useState, useEffect, useRef } from "react";

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

function Firework({ id, onComplete }) {
  const fwcolors = [
    "#39ff14",
    "#ff7300ff",
    "rgb(255,0,0)",
    "rgba(255, 251, 0, 1)",
  ];
  const fwcolorRef = useRef(
    fwcolors[Math.floor(Math.random() * fwcolors.length)]
  );
  const flashcolor = `radial-gradient(circle, ${fwcolorRef.current}, transparent)`;

  const topRef = useRef(130 - Math.random() * 100);
  const leftRef = useRef(425 - Math.random() * 200);

  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const particleRefs = useRef(
    Array.from({ length: 50 }).map(() => ({
      angle: Math.random() * 360,
      distance: 10 + Math.random() * 300,
    }))
  );

  return (
    <div
      className="firework"
      id={`fw-${id}`}
      style={{ top: topRef.current, left: leftRef.current }}
    >
      <span className="flash" style={{ background: flashcolor }} />
      {particleRefs.current.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            "--angle": `${p.angle}deg`,
            "--distance": `${p.distance}px`,
            "--color": fwcolorRef.current,
          }}
        />
      ))}
    </div>
  );
}

export default function BottomBar({ floatingItems, setFloatingItems }) {
  const [fireworks, setFireworks] = useState([]);

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
          {fireworks.map((fw) => (
            <Firework
              key={fw.id}
              id={fw.id}
              onComplete={() =>
                setFireworks((prev) => prev.filter((f) => f.id !== fw.id))
              }
            />
          ))}
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
          fireworks={fireworks}
          setFireworks={setFireworks}
          syncBoat={true}
        />
      </div>
    </div>
  );
}
