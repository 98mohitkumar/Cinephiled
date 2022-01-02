import useImageColor from "use-image-color";
import { Colorful } from "./DominantColorStyles";

const DominantColor = ({ image }) => {
  if (!image) {
    return (
      <>
        <Colorful className="position-absolute" />
      </>
    );
  } else {
    const pallete = useImageColor(`https://image.tmdb.org/t/p/w780${image}`, {
      cors: true,
      colors: 4,
    });

    let hexCodes = [];

    pallete.colors !== undefined &&
      pallete.colors.forEach((item) => hexCodes.push(item));

    return (
      <>
        <Colorful className="position-absolute" color={hexCodes} />
      </>
    );
  }
};

export default DominantColor;
