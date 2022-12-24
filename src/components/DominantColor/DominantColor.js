import { Fragment, memo } from 'react';
import useImageColor from 'use-image-color';
import { Colorful } from './DominantColorStyles';

const DominantColor = ({ image }) => {
  const pallete = useImageColor(
    !image
      ? '/Images/Hex.png'
      : `https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=https://image.tmdb.org/t/p/w500${image}`,
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

export default memo(DominantColor);
