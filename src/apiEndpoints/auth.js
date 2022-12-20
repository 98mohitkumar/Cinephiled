import { apiEndpoints } from 'globals/constants';
import { useSession, signOut, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback, useContext, useState } from 'react';
import { MediaContext } from 'Store/MediaContext';
import { UserContext } from 'Store/UserContext';

// login hook
export const useLogin = () => {
  const router = useRouter();
  const [error, setError] = useState({ error: false, message: '' });

  const clearError = useCallback(() => {
    setError((prev) => ({ ...prev, error: false }));
  }, []);

  const login = useCallback(
    async ({ withCredentials, payload }) => {
      // generate temporary token (validity: 15 mins)
      const requestTokenRes = await fetch(apiEndpoints.auth.requestToken);
      const requestTokenData = await requestTokenRes.json();
      const { request_token, success } = requestTokenData;

      if (withCredentials) {
        if (request_token && success) {
          const apiRes = await signIn('credentials', {
            redirect: false,
            request_token,
            ...payload
          });

          apiRes?.ok
            ? router.push('/profile')
            : setError({ error: true, message: apiRes.error });
        } else {
          setError({ error: true, message: 'Server Error, Try again later' });
        }
      } else {
        if (request_token && success) {
          window.open(
            `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${window.location.href}`,
            '_self'
          );
        } else {
          setError({ error: true, message: 'Server Error, Try again later' });
        }
      }
    },
    [router]
  );

  return {
    login,
    clearError,
    setError,
    error: error?.error,
    errorMessage: error?.message
  };
};

// logout hook
export const useLogout = () => {
  const router = useRouter();
  const { data } = useSession();
  const { logoutHelper } = useContext(MediaContext);
  const { setUserInfo } = useContext(UserContext);

  const logout = useCallback(async () => {
    const res = await fetch(apiEndpoints.auth.logout, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ session_id: data?.user?.sessionId })
    });

    await signOut({ redirect: false });

    if (res.ok && res.status === 200) {
      logoutHelper();
      setUserInfo({});
      router.push('/login');
    }
  }, [data?.user?.sessionId, logoutHelper, router, setUserInfo]);

  return { logout };
};

//  credentials next auth handler
export const credentialsAuth = async ({
  request_token,
  username,
  password
}) => {
  // validate token on success
  const validateToken = await fetch(apiEndpoints.auth.validateToken, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      username,
      password,
      request_token
    })
  });

  const validateTokenRes = await validateToken.json();
  const { success, status_code } = validateTokenRes;

  // generate sessionId after token validation
  if (success) {
    const session = await fetch(apiEndpoints.auth.generateSession, {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ request_token })
    });

    const sessionRes = await session.json();
    const { session_id, success } = sessionRes;

    if (success && session_id) {
      return sessionRes;
    }
  } else if (!success && status_code === 30) {
    throw Error('Invalid username and/or password');
  }
};

// tmdbAuth next auth handler
export const tmdbAuth = async (requestToken) => {
  const session = await fetch(apiEndpoints.auth.generateSession, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ request_token: requestToken })
  });

  const sessionRes = await session.json();
  const { session_id, success } = sessionRes;

  if (session_id && success) {
    return sessionRes;
  } else {
    throw Error('Server Error, Try again later');
  }
};
