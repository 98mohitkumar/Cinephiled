import Router from "next/router";
import { getSession } from "next-auth/react";

import LoginPage from "components/pages/LoginPage";

const Login = () => {
  return <LoginPage />;
};

Login.getInitialProps = async (ctx) => {
  const data = await getSession(ctx);

  if (data) {
    if (typeof window === "undefined") {
      ctx.res.writeHead(302, { location: "/profile" });
      ctx.res.end();
      return { signedIn: true };
    } else {
      Router.push("/profile");
      return { signedIn: true };
    }
  } else {
    return { signedIn: false };
  }
};

export default Login;
