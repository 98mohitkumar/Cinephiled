import { useCallback, useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Profile from '../components/Profile/Profile';

const ProfilePage = () => {
  const read_access_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const interval = useRef();

  useEffect(() => {
    const access_token = localStorage.getItem('accessToken');
    if (access_token) {
      setIsLoggedIn(true);
    }
  }, []);

  const accessTokenHandler = useCallback(
    async (requestToken) => {
      console.info(requestToken);

      const authToken = await fetch(
        'https://api.themoviedb.org/4/auth/access_token',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json;charset=utf-8',
            authorization: `Bearer ${read_access_token}`,
          },
          body: JSON.stringify({ request_token: requestToken }),
        }
      );

      const authTokenData = await authToken.json();

      const { access_token, status_code, success } = authTokenData;
      if (access_token && status_code === 1 && success) {
        setIsLoggedIn(true);
        clearInterval(interval.current);
        localStorage.setItem('accessToken', access_token);
      }
    },
    [read_access_token]
  );

  // login interval function
  const loginInterval = useCallback(
    (requestToken) => {
      const token = requestToken;

      if (!isLoggedIn) {
        interval.current = setInterval(() => {
          accessTokenHandler(token);
        }, 5000);
      }
    },
    [accessTokenHandler, isLoggedIn]
  );

  //generates request token
  const loginHandler = async () => {
    const auth = await fetch(
      'https://api.themoviedb.org/4/auth/request_token',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=utf-8',
          authorization: `Bearer ${read_access_token}`,
        },
      }
    );

    const authData = await auth.json();
    const { request_token } = authData;

    if (request_token) {
      loginInterval(request_token);
      window.open(
        'https://www.themoviedb.org/auth/access?request_token=' + request_token
      );
    }
  };

  return <Profile loggedIn={isLoggedIn} loginHandler={loginHandler} />;
};

export default ProfilePage;
