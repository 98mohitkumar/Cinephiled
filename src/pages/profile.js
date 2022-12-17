import { getSession } from 'next-auth/react';
import Router from 'next/router';
import ProfilePage from '../components/ProfilePage/ProfilePage';

const Profile = () => {
  return <ProfilePage />;
};

Profile.getInitialProps = async (ctx) => {
  const data = await getSession(ctx);

  if (data) {
    return { signedIn: true };
  } else {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { location: '/login' });
      ctx.res.end();
      return { signedIn: false };
    } else {
      Router.push('/login');
      return { signedIn: false };
    }
  }
};

export default Profile;
