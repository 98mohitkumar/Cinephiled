import { useLogout } from "api/auth";
import ProfilePage from "components/ProfilePage/ProfilePage";
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
  const hasTokenExpired = new Date() > new Date(data?.expires);
  const hasValidToken = data?.user?.accessToken && data?.user?.accountId;

  return {
    isValidSession: hasValidToken && !hasTokenExpired
  };
};

export default Profile;
