import { useState } from "react";
import { useEffect } from "react";
import useImageColor from "use-image-color";
import { Colorful } from "./DominantColorStyles";

const DominantColor = ({ image }) => {
  const [src, setSrc] = useState("");
  useEffect(() => {
    setSrc(
      !image ? "/images/Hex.png" : `https://image.tmdb.org/t/p/w500${image}`
    );
  }, [image]);

  const pallete = useImageColor(src, {
    cors: true,
    colors: 4,
  });

  let hexCodes = [];

  if (pallete.colors !== undefined) {
    pallete.colors.forEach((item) => hexCodes.push(item));
  }
  return (
    <>
      <Colorful className="position-absolute" color={hexCodes} />
    </>
  );
};

export default DominantColor;
