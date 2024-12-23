import H1 from "components/UI/Typography/H1";
import P from "components/UI/Typography/P";
import { Error404 } from "styles/PageStyles/404PageStyles";

export default function Custom404() {
  return (
    <div className='grid place-items-center'>
      <H1 weight='bold' css={Error404}>
        404
        <P size='large' weight='medium' className='mt-10'>
          Please check your internet connection or try again later.
        </P>
      </H1>
    </div>
  );
}
