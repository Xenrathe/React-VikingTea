import { useEffect, useRef, useState } from "react";

export default function Wave({ image, speed, syncBoat = false }) {
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

    const animate = () => {
      x1 -= speed;
      x2 -= speed;

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
