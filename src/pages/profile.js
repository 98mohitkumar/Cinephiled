import { useLogout } from "api/auth";
import ProfilePage from "components/ProfilePage/ProfilePage";
import Router from "next/router";
import { getSession } from "next-auth/react";

const Profile = ({ isValidSession }) => {
  const { logout } = useLogout();

  if (!isValidSession) {
    logout();
    return null;
  }

  return <ProfilePage />;
};

Profile.getInitialProps = async (ctx) => {
  const data = await getSession(ctx);

  // if no session, redirect to login
  if (!data) {
    if (typeof window === "undefined") {
      ctx.res.writeHead(302, { location: "/login" });
      ctx.res.end();
      return { signedIn: false };
    } else {
      Router.push("/login");
      return { signedIn: false };
    }
  }

  const isValidSession = data?.user?.accessToken && data?.user?.accountId;

  return {
    isValidSession: isValidSession
  };
};

export default Profile;
