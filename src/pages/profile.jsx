import { getServerSession } from "next-auth";

import { authOptions } from "api/auth/[...nextauth]";
import { useLogout } from "apiRoutes/auth";
import ProfilePage from "components/pages/ProfilePage/ProfilePage";

const Profile = ({ isValidSession }) => {
  const { logout } = useLogout();

  if (!isValidSession) {
    logout();
    return null;
  }

  return <ProfilePage />;
};

export const getServerSideProps = async (ctx) => {
  const data = await getServerSession(ctx.req, ctx.res, authOptions);
  const hasTokenExpired = new Date() > new Date(data?.expires);
  const hasValidToken = data?.user?.accessToken && data?.user?.accountId;

  return {
    props: {
      isValidSession: Boolean(hasValidToken && !hasTokenExpired)
    }
  };
};

export default Profile;
