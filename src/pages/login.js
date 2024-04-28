import { useLogout } from "api/auth";
import LoginPage from "components/LoginPage/LoginPage";
import Router from "next/router";
import { getSession, useSession } from "next-auth/react";

const Login = ({ hasTokenExpired }) => {
  const { status } = useSession();
  const { logout } = useLogout();

  if (status === "authenticated" && hasTokenExpired) {
    logout();
  }

  return <LoginPage />;
};

Login.getInitialProps = async (ctx) => {
  const data = await getSession(ctx);
  const hasTokenExpired = new Date() > new Date(data?.expires);

  if (data && !hasTokenExpired) {
    if (typeof window === "undefined") {
      ctx.res.writeHead(302, { location: "/profile" });
      ctx.res.end();
      return { signedIn: true };
    } else {
      Router.push("/profile");
      return { signedIn: true };
    }
  } else {
    return { signedIn: false, hasTokenExpired };
  }
};

export default Login;
