import { useEffect, useRef, useState } from "react";

export default function Wave({ image, speed, floatingItems = [], setFloatingItems = null, syncBoat = false }) {
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const [imgWidth, setImgWidth] = useState(0);
  const boat = document.getElementById("boat-img");

  // in case the user changes the width of their viewport
  // this will adjust the image width
  useEffect(() => {
    const updateWidth = () => {
      if (img1Ref.current) {
        setImgWidth(img1Ref.current.offsetWidth);
      }
    };

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleImageLoad = () => {
    if (img1Ref.current) {
      setImgWidth(img1Ref.current.offsetWidth);
    }
  };

  // do the animation stuff and reset it if speed or image width changes
  useEffect(() => {
    if (!imgWidth) return;

    let x1 = 0;
    let x2 = imgWidth;
    let itemX = imgWidth;

    const animate = () => {
      x1 -= speed;
      x2 -= speed;
      itemX -= speed / 2;

      // if img1 moves fully out of viewport, place it in front of img2
      // this creates the illusion of endless waves
      if (x1 <= -imgWidth) {
        x1 = x2 + imgWidth;
      }

      //do the same for img2
      if (x2 <= -imgWidth) {
        x2 = x1 + imgWidth;
      }

      img1Ref.current.style.transform = `translateX(${x1}px)`;
      img2Ref.current.style.transform = `translateX(${x2}px)`;

      // BOAT STUFF
      if (syncBoat) {
        const boatYMin = -40; // px
        const boatYMax = 15; // px
        const boatRotMin = -7; // deg
        const boatRotMax = 5; // deg

        // there's actually two waves PER imgWidth (for wave1.png)
        // NOTE: IF YOU PUT THIS NOT ON WAVE1.PNG, THIS WILL CHANGE
        const cycleLength = imgWidth / 2;

        let progress = (-x1 % cycleLength) / cycleLength;
        const angle = progress * 2 * Math.PI;

        //cos, rather than sin, starts off at the correct spot here
        //that may be different if using other than wave1.png
        const boatY =
          boatYMax + ((boatYMin - boatYMax) / 2) * (1 - Math.cos(angle));
        const boatRot =
          boatRotMax + ((boatRotMin - boatRotMax) / 2) * (1 - Math.cos(angle));

        // Apply to boat element
        if (boat) {
          boat.style.transform = `translateY(${boatY}px) rotateZ(${boatRot}deg)`;
        }
      }

      // FLOATING ITEM/TEASURES STUFF
      if (setFloatingItems) {
        floatingItems.forEach((floatingItem) => {
          if (!floatingItem.inBoat) {
            const floatingItemIMG = document.getElementById(`FI-${floatingItem.id}`);


            if (itemX <= 350) {
              setFloatingItems((prev) =>
                prev.map((item) =>
                  item.id === floatingItem.id
                    ? { ...item, inBoat: true }
                    : item
                )
              );
            }
            else {
              const itemYMin = -40; // px
              const itemYMax = 40; // px
              const itemRotMin = -12; // deg
              const itemRotMax = 10; // deg

              // there's actually two waves PER imgWidth (for wave1.png)
              // NOTE: IF YOU PUT THIS NOT ON WAVE1.PNG, THIS WILL CHANGE
              const cycleLength = imgWidth / 2;

              let progress = ((imgWidth - itemX) % cycleLength) / cycleLength;
              const offset = 160 / 180 * Math.PI;
              const angle = progress * 2 * Math.PI - offset;

              //cos, rather than sin, starts off at the correct spot here
              //that may be different if using other than wave1.png
              const itemY = itemYMax + ((itemYMin - itemYMax) / 2) * (1 - Math.cos(angle));
              const itemRot = itemRotMax + ((itemRotMin - itemRotMax) / 2) * (1 - Math.cos(angle));
              floatingItemIMG.style.transform = `translateX(${itemX}px) translateY(${itemY}px) rotateZ(${itemRot}deg)`;
            }
          }
        })
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [speed, imgWidth]);

  return (
    <div className="single-wave">
      <img ref={img1Ref} src={image} alt="" onLoad={handleImageLoad} />
      <img ref={img2Ref} src={image} alt="" onLoad={handleImageLoad} />
    </div>
  );
}
