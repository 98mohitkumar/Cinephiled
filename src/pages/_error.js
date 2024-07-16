import { Error404 } from "styles/GlobalComponents";

function Error({ statusCode }) {
  return <Error404>{statusCode || 500}</Error404>;
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
