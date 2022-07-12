import useImageColor from 'use-image-color';
import { Colorful } from './DominantColorStyles';

const DominantColor = ({ image }) => {
  const pallete = useImageColor(
    !image ? '/images/Hex.png' : `https://image.tmdb.org/t/p/original${image}`,
    {
      cors: true,
      colors: 4
    }
  );

  return (
    <>
      {pallete.colors && (
        <Colorful className='position-absolute' color={pallete.colors} />
      )}
    </>
  );
};

export default DominantColor;
