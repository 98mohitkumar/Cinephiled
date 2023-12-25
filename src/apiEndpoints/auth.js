import { apiEndpoints } from "globals/constants";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useUserContext } from "Store/UserContext";

// login hook
export const useLogin = () => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });

  const clearError = () => {
    setError({ error: false, message: "" });
  };

  const login = async () => {
    setIsWaiting(true);
    clearError();

    // generate temporary token (validity: 15 mins)
    const requestTokenRes = await fetch(apiEndpoints.auth.requestToken, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_READ_ACCESS_TOKEN}`
      },
      body: JSON.stringify({ redirect_to: `${window.location.href}?approved=true` })
    });

    const requestTokenData = await requestTokenRes.json();
    const { request_token, success } = requestTokenData;

    if (request_token && success) {
      sessionStorage.setItem("request_token", request_token);
      window.open(`https://www.themoviedb.org/auth/access?request_token=${request_token}`, "_self");
    } else {
      setIsWaiting(false);
      setError({ error: true, message: "Server Error, Try again later" });
    }
  };

  return {
    login,
    clearError,
    setError,
    isWaiting,
    setIsWaiting,
    error: error?.error,
    errorMessage: error?.message
  };
};

// logout hook
export const useLogout = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = useUserContext();

  const logout = async () => {
    const res = await fetch(apiEndpoints.auth.logout, {
      method: "DELETE",
      headers: {
        "content-type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({ session_id: userInfo?.sessionId })
    });

    await fetch(apiEndpoints.auth.accessToken, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_READ_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        access_token: userInfo?.accessToken
      })
    });

    if (res.ok && res.status === 200) {
      await signOut({ redirect: false });
      setUserInfo({});
      router.push("/login");
    }
  };

  return { logout };
};

// tmdbAuth next auth handler
export const tmdbAuth = async (requestToken) => {
  // create access token
  const accessTokenRes = await fetch(apiEndpoints.auth.accessToken, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_READ_ACCESS_TOKEN}`
    },
    body: JSON.stringify({
      request_token: requestToken
    })
  });

  const accessTokenData = await accessTokenRes.json();

  const { account_id, access_token, success: accessTokenSuccess } = accessTokenData;

  if (!accessTokenSuccess) {
    throw Error("Server Error, Try again later");
  }

  const session = await fetch(apiEndpoints.auth.generateSession, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_READ_ACCESS_TOKEN}`
    },
    body: JSON.stringify({ access_token })
  });

  const sessionRes = await session.json();
  const { session_id, success } = sessionRes;

  if (session_id && success) {
    return { ...sessionRes, account_id, access_token };
  } else {
    throw Error("Server Error, Try again later");
  }
};
