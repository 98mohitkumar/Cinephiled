import { Fragment } from 'react';
import useImageColor from 'use-image-color';
import { Colorful } from './DominantColorStyles';

const DominantColor = ({ image }) => {
  const pallete = useImageColor(
    !image
      ? '/Images/Hex.png'
      : `/_next/image?url=https://image.tmdb.org/t/p/w500${image}&w=1920&q=75`,
    {
      cors: true,
      colors: 2
    }
  );

  return (
    <Fragment>
      {pallete?.colors?.length > 0 && (
        <Colorful className='position-absolute' color={pallete.colors} />
      )}
    </Fragment>
  );
};

export default DominantColor;
