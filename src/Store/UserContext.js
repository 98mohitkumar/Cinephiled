import { apiEndpoints } from "globals/constants";
import { useSession } from "next-auth/react";
import { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const { status, data } = useSession();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (status === "authenticated" && !userInfo?.id) {
      const getUserInfo = async () => {
        const profileRes = await fetch(
          apiEndpoints.user.userInfo({ sessionId: data?.user?.sessionId })
        );

        if (profileRes.ok) {
          const profile = await profileRes.json();

          return { ...profile, accountId: data?.user?.accountId };
        } else {
          throw Error("cannot fetch profile data");
        }
      };

      getUserInfo()
        .then((data) => setUserInfo(data))
        .catch(() => setUserInfo({}));
    }
  }, [data?.user?.accountId, data?.user?.sessionId, status, userInfo?.id]);

  return <UserContext.Provider value={{ userInfo, setUserInfo }}>{children}</UserContext.Provider>;
}
