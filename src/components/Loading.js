import { LoaderContainer } from "styles/GlobalComponents";

export const Loader = (props) => {
  return (
    <LoaderContainer {...props}>
      <div className='loading-wrapper'>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
      </div>
    </LoaderContainer>
  );
};

const Loading = () => {
  return (
    <div className='min-h-[45vh] grid place-items-center'>
      <Loader className='small' />
    </div>
  );
};

export default Loading;
