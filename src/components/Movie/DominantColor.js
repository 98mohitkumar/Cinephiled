import { useContext } from "react";
import useImageColor from "use-image-color";
import ColorsContext from "../../store/colorContext";
import { Colorful } from "./MovieStyled";

const DominantColor = ({ image }) => {
  const pallete = useImageColor(`https://image.tmdb.org/t/p/original${image}`, {
    cors: true,
    colors: 4,
  });

  let hexCodes = [];

  pallete.colors !== undefined &&
    pallete.colors.forEach((item) => hexCodes.push(item));

  const { updateCtx } = useContext(ColorsContext);

  hexCodes.length > 0 && updateCtx(hexCodes[0]);

  return <>{hexCodes.length > 0 && <Colorful color={hexCodes} />}</>;
};

export default DominantColor;
