import { useEffect, useRef, useState } from "react";

export default function Wave({image, speed}) {
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const [imgWidth, setImgWidth] = useState(0);

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
  }

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

      requestAnimationFrame(animate);
    };

    animate();
  }, [speed, imgWidth]);

  return (
    <div className="single-wave">
      <img 
        ref={img1Ref}
        src={image}
        alt=""
        onLoad={handleImageLoad}
      />
      <img 
        ref={img2Ref}
        src={image}
        alt=""
        onLoad={handleImageLoad}
      />
    </div>
  )
}