import { getServerSession } from "next-auth";

import { authOptions } from "api/auth/[...nextauth]";
import LoginPage from "components/pages/LoginPage";

const Login = () => {
  return <LoginPage />;
};

export const getServerSideProps = async (ctx) => {
  const data = await getServerSession(ctx.req, ctx.res, authOptions);

  if (data) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false
      }
    };
  } else {
    return {
      props: {
        signedIn: false
      }
    };
  }
};

export default Login;
