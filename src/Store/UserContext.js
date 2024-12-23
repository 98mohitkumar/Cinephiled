import { useSession, signOut } from "next-auth/react";
import { useState, createContext, useEffect, useContext } from "react";

import { apiEndpoints } from "data/apiEndpoints";
import { fetchOptions } from "utils/helper";

const UserContext = createContext({
  userInfo: {},
  setUserInfo: () => {}
});

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext must be used within UserContextProvider");
  }

  return context;
};

export default function UserContextProvider({ children }) {
  const { status, data } = useSession();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      const profileRes = await fetch(
        apiEndpoints.user.userInfo({ accountId: data?.user?.accountId }),
        fetchOptions({ token: data?.user?.accessToken })
      );

      if (profileRes.ok) {
        const profile = await profileRes.json();
        setUserInfo({ ...profile, ...data?.user, status });
      } else {
        console.error("cannot fetch profile data");

        setUserInfo({});
        if (profileRes.status === 401) {
          signOut({ redirect: false });
        }
      }
    };

    if (status === "authenticated") {
      getUserInfo();
    }

    return () => {
      setUserInfo({});
    };
  }, [data?.user, status]);

  return <UserContext.Provider value={{ userInfo, setUserInfo }}>{children}</UserContext.Provider>;
}
