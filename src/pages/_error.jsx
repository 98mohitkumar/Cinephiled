import { error404 } from "components/Shared/GlobalComponents";
import H1 from "components/UI/Typography/H1";

function Error({ statusCode }) {
  return (
    <div className='grid grow place-items-center'>
      <H1 css={error404} weight='bold'>
        {statusCode || 500}
      </H1>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
