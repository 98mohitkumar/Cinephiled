import { cn } from "utils/helper";

import { loaderStyles, loadingSpinner } from "./LoaderStyles";

// https://uiverse.io/StealthWorm/chatty-zebra-11
const Loader = (props) => {
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

export default Loader;

export const LoadingSpinner = ({ className }) => {
  return (
    <div className='grid-center h-40 w-full'>
      <div css={loadingSpinner} className={cn("text-neutral-300", className)}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} />
        ))}
      </div>
    </div>
  );
};
