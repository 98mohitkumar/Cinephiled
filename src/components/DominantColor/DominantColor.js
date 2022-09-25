import useImageColor from 'use-image-color';
import { Colorful } from './DominantColorStyles';

const DominantColor = ({ image }) => {
  const pallete = useImageColor(
    !image
      ? '/images/Hex.png'
      : `/_next/image?url=https://image.tmdb.org/t/p/w500${image}&w=1920&q=75`,
    {
      cors: true,
      colors: 4,
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
