import { loaderStyles } from "./LoaderStyles";

// https://codepen.io/JMChristensen/pen/GRLLVpa
export const Loader = (props) => {
  return (
    <div css={loaderStyles} {...props}>
      <div className='stack'>
        <div className='blobs'>
          <span className='blob'></span>
          <span className='blob'></span>
          <span className='blob'></span>
          <span className='blob'></span>
        </div>
      </div>
    </div>
  );
};

// redundant check (<Loading />) and .small class in above component
const Loading = () => {
  return (
    <div className='grid min-h-[45vh] place-items-center'>
      <Loader className='small' />
    </div>
  );
};

export default Loading;
