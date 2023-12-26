import { apiEndpoints } from "globals/constants";
import { useSession } from "next-auth/react";
import { useState, createContext, useEffect, useContext } from "react";

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
    if (status === "authenticated" && !userInfo?.accountId) {
      const getUserInfo = async () => {
        const profileRes = await fetch(
          apiEndpoints.user.userInfo({ sessionId: data?.user?.sessionId })
        );

        if (profileRes.ok) {
          const profile = await profileRes.json();

          return { ...profile, ...data?.user, status };
        } else {
          throw Error("cannot fetch profile data");
        }
      };

      getUserInfo()
        .then((data) => setUserInfo(data))
        .catch(() => setUserInfo({}));
    }
  }, [data?.user, status, userInfo?.accountId]);

  return <UserContext.Provider value={{ userInfo, setUserInfo }}>{children}</UserContext.Provider>;
}
