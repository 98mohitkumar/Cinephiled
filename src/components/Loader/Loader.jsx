import { loaderStyles } from "./LoaderStyles";

// https://uiverse.io/StealthWorm/chatty-zebra-11
export const Loader = (props) => {
  return (
    <div css={loaderStyles} {...props}>
      <div className='loader'>
        <div className='carousel'>
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className='love icon' />
          ))}
        </div>

        <div className='carousel'>
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className='death icon' />
          ))}
        </div>

        <div className='carousel'>
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className='robots icon' />
          ))}
        </div>
      </div>
    </div>
  );
};

// redundant check (<Loading />) and .small class in above component
const Loading = () => null;

export default Loading;
