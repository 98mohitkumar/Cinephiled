import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useState } from "react";

import { apiEndpoints } from "data/apiEndpoints";
import { useUserContext } from "Store/UserContext";
import { fetchOptions } from "utils/helper";

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

    try {
      // generate temporary token (validity: 15 mins)
      const requestTokenRes = await fetch(
        apiEndpoints.auth.requestToken,
        fetchOptions({
          method: "POST",
          body: { redirect_to: `${window.location.href}?approved=true` }
        })
      );

      const requestTokenData = await requestTokenRes.json();
      const { request_token, success } = requestTokenData;

      if (request_token && success) {
        sessionStorage.setItem("request_token", request_token);
        window.open(`https://www.themoviedb.org/auth/access?request_token=${request_token}`, "_self");
      } else {
        setIsWaiting(false);
        setError({ error: true, message: "Server Error, Try again later" });
      }
    } catch (error) {
      console.log(error);

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
    await fetch(
      apiEndpoints.auth.accessToken,
      fetchOptions({
        method: "DELETE",
        body: { access_token: userInfo?.accessToken }
      })
    );

    await signOut({ redirect: false });
    setUserInfo({});
    router.push("/login");
  };

  return { logout };
};

// tmdbAuth next auth handler
export const tmdbAuth = async (requestToken) => {
  const accessTokenRes = await fetch(
    apiEndpoints.auth.accessToken,
    fetchOptions({
      method: "POST",
      body: { request_token: requestToken }
    })
  );

  const accessTokenData = await accessTokenRes.json();

  const { account_id, access_token, success: accessTokenSuccess } = accessTokenData;

  if (!accessTokenSuccess) {
    throw Error("Server Error, Try again later");
  }

  return { account_id, access_token };
};
