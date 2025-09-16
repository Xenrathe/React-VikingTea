import { useEffect, useRef, useState } from "react";

export default function Wave({
  image,
  speed,
  floatingItems = [],
  setFloatingItems = null,
  syncBoat = false,
}) {
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const [imgWidth, setImgWidth] = useState(0);

  // animation state refs (persist between renders)
  const x1Ref = useRef(0);
  const x2Ref = useRef(0);

  // per-floating-item X positions & starting offsets (Map<id, x>)
  const positionsRef = useRef(new Map());
  const offsetsRef = useRef(new Map());

  // cache DOM elements for floating items (Map<id, element>)
  const elementCacheRef = useRef(new Map());

  // mirror of floatingItems state so animation loop can read it without being a dep
  const floatingItemsRef = useRef(floatingItems);

  // requestAnimationFrame id so we can cancel on cleanup
  const rafRef = useRef(null);

  // adjust animation if user changes window width
  useEffect(() => {
    const updateWidth = () => {
      if (img1Ref.current) {
        const w = img1Ref.current.offsetWidth;
        setImgWidth(w);
      }
    };

    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleImageLoad = () => {
    if (img1Ref.current) {
      setImgWidth(img1Ref.current.offsetWidth);
    }
  };

  // sync floatingItemsRef and initialize new item positions
  useEffect(() => {
    floatingItemsRef.current = floatingItems;

    // initialize positions for newly added items (skip those already in map)
    floatingItems.forEach((item) => {
      if (!positionsRef.current.has(item.id) && !item.inBoat) {
        const startX = imgWidth;
        positionsRef.current.set(item.id, startX);
        offsetsRef.current.set(item.id, x2Ref.current);
      }
    });

    // remove any positions for items that were removed from the array
    const idsInState = new Set(floatingItems.map((i) => i.id));
    positionsRef.current.forEach((_, id) => {
      if (!idsInState.has(id)) positionsRef.current.delete(id);
    });
  }, [floatingItems, imgWidth]);

  // main animation loop
  useEffect(() => {
    if (!imgWidth) return;

    x1Ref.current = 0;
    x2Ref.current = imgWidth;

    // cancel any existing loop
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const animate = () => {
      x1Ref.current -= speed;
      x2Ref.current -= speed;

      // the wave images
      if (x1Ref.current <= -imgWidth) {
        x1Ref.current = x2Ref.current + imgWidth;
      }
      if (x2Ref.current <= -imgWidth) {
        x2Ref.current = x1Ref.current + imgWidth;
      }

      if (img1Ref.current)
        img1Ref.current.style.transform = `translateX(${x1Ref.current}px)`;
      if (img2Ref.current)
        img2Ref.current.style.transform = `translateX(${x2Ref.current}px)`;

      // the boat sync
      if (syncBoat) {
        const boat = document.getElementById("boat-img");
        if (boat) {
          const boatYMin = -40;
          const boatYMax = 15;
          const boatRotMin = -7;
          const boatRotMax = 5;
          const cycleLength = imgWidth / 2;
          let progress =
            (((-x1Ref.current % cycleLength) + cycleLength) % cycleLength) /
            cycleLength;
          const angle = progress * 2 * Math.PI;
          const boatY =
            boatYMax + ((boatYMin - boatYMax) / 2) * (1 - Math.cos(angle));
          const boatRot =
            boatRotMax +
            ((boatRotMin - boatRotMax) / 2) * (1 - Math.cos(angle));
          boat.style.transform = `translateY(${boatY}px) rotateZ(${boatRot}deg)`;
        }
      }

      // floating items
      if (setFloatingItems) {
        const items = floatingItemsRef.current || [];
        const cycleLength = imgWidth / 2;

        items.forEach((item) => {
          if (item.inBoat) return;

          const id = item.id;
          let pos = positionsRef.current.get(id);
          if (pos === undefined) {
            pos = imgWidth + 50;
            positionsRef.current.set(id, pos);
          }

          pos -= speed / 2; // item travels at half speed of wave
          positionsRef.current.set(id, pos);

          // cache the DOM element for item if not already found
          let elem = elementCacheRef.current.get(id);
          if (!elem) {
            elem = document.getElementById(`FI-${id}`);
            if (elem) elementCacheRef.current.set(id, elem);
          }

          // arrives at boat threshold, mark inBoat
          const arrivalX = 350;
          if (pos <= arrivalX) {
            setFloatingItems((prev) => {
              const next = prev.map((it) =>
                it.id === id ? { ...it, inBoat: true } : it
              );
              floatingItemsRef.current = next;
              return next;
            });

            positionsRef.current.delete(id);
            if (elem) {
              elem.style.display = "none";
            }
          } else {
            if (elem) {
              const progress =
                ((((imgWidth - pos - offsetsRef.current.get(id)) %
                  cycleLength) +
                  cycleLength) %
                  cycleLength) /
                cycleLength;
              const offset = (165 / 180) * Math.PI;
              const angle = progress * 2 * Math.PI - offset;

              const itemYMin = -35;
              const itemYMax = 60;
              const itemRotMin = -20;
              const itemRotMax = 20;

              const itemY =
                itemYMax + ((itemYMin - itemYMax) / 2) * (1 - Math.cos(angle));
              const itemRot =
                itemRotMax +
                ((itemRotMin - itemRotMax) / 2) *
                  (1 - Math.cos(angle + Math.PI / 2));

              elem.style.transform = `translateX(${pos}px) translateY(${itemY}px) rotateZ(${itemRot}deg)`;
            }
          }
        });
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [speed, imgWidth, syncBoat, setFloatingItems]);

  return (
    <div className="single-wave">
      <img ref={img1Ref} src={image} alt="" onLoad={handleImageLoad} />
      <img ref={img2Ref} src={image} alt="" onLoad={handleImageLoad} />
    </div>
  );
}
