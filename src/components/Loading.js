import { Loader } from "styles/GlobalComponents";

const Loading = () => {
  return (
    <div className='min-h-[45vh] grid place-items-center'>
      <Loader className='small' />
    </div>
  );
};

export default Loading;
