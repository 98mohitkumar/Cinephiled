import ProfilePage from "components/ProfilePage/ProfilePage";
import Router from "next/router";
import { getSession } from "next-auth/react";

const Profile = () => {
  return <ProfilePage />;
};

Profile.getInitialProps = async (ctx) => {
  const data = await getSession(ctx);
  const hasTokenExpired = new Date() > new Date(data?.expires);

  if (data && !hasTokenExpired) {
    return { signedIn: true };
  } else {
    if (typeof window === "undefined") {
      ctx.res.writeHead(302, { location: "/login" });
      ctx.res.end();
    } else {
      Router.push("/login");
    }

    return { signedIn: false };
  }
};

export default Profile;
