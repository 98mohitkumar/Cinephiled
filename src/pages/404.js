import { Error404 } from "styles/GlobalComponents";

export default function Custom404() {
  return (
    <div className='grid min-h-[75vh] place-items-center'>
      <Error404 className='index-page'>
        404
        <p className='text-2xl text-center'>Please check your internet connection or try again later.</p>
      </Error404>
    </div>
  );
}
