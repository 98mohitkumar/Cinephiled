import useImageColor from "use-image-color";
import { Colorful } from "./MovieStyles";

const DominantColor = ({ image }) => {
  const pallete = useImageColor(`https://image.tmdb.org/t/p/original${image}`, {
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
};

export default DominantColor;
