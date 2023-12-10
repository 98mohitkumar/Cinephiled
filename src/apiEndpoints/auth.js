import { apiEndpoints } from "globals/constants";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { useContext, useState } from "react";
import { MediaContext } from "Store/MediaContext";
import { UserContext } from "Store/UserContext";

// login hook
export const useLogin = () => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });

  const clearError = () => {
    setError((prev) => ({ ...prev, error: false }));
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

    // if (withCredentials) {
    //   if (request_token && success) {
    //     const apiRes = await signIn("credentials", {
    //       redirect: false,
    //       request_token,
    //       ...payload
    //     });

    //     apiRes?.ok ? router.push("/profile") : setError({ error: true, message: apiRes.error });
    //   } else {
    //     setError({ error: true, message: "Server Error, Try again later" });
    //   }
    // }

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
  const { data } = useSession();
  const { logoutHelper } = useContext(MediaContext);
  const { setUserInfo } = useContext(UserContext);

  const logout = async () => {
    const res = await fetch(apiEndpoints.auth.logout, {
      method: "DELETE",
      headers: {
        "content-type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({ session_id: data?.user?.sessionId })
    });

    await fetch(apiEndpoints.auth.accessToken, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_READ_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        access_token: data?.user?.accessToken
      })
    });

    await signOut({ redirect: false });

    if (res.ok && res.status === 200) {
      logoutHelper();
      setUserInfo({});
      router.push("/login");
    }
  };

  return { logout };
};

//  credentials next auth handler
// export const credentialsAuth = async ({ request_token, username, password }) => {
//   // validate token on success
//   const validateToken = await fetch(apiEndpoints.auth.validateToken, {
//     method: "POST",
//     headers: {
//       accept: "application/json",
//       "content-type": "application/json",
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_READ_ACCESS_TOKEN}`
//     },
//     body: JSON.stringify({
//       username,
//       password,
//       request_token
//     })
//   });

//   const validateTokenRes = await validateToken.json();
//   const { success, status_code } = validateTokenRes;

//   //  generate sessionId after token validation
//   if (success) {
//     const session = await fetch(apiEndpoints.auth.generateSession, {
//       method: "POST",
//       headers: {
//         "content-type": "application/json;charset=utf-8"
//       },
//       body: JSON.stringify({ request_token })
//     });

//     const sessionRes = await session.json();
//     const { session_id, success } = sessionRes;

//     if (success && session_id) {
//       return sessionRes;
//     }
//   } else if (!success && status_code === 30) {
//     throw Error("Invalid username and/or password");
//   }
// };

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
