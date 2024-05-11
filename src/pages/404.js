import { Error404 } from "styles/GlobalComponents";

export default function Custom404() {
  return (
    <div className='grid place-items-center min-h-[75vh]'>
      <Error404 className='index-page'>
        404
        <p className='text-2xl text-center'>
          Please check your internet connection or try again later.
        </p>
      </Error404>
    </div>
  );
}
