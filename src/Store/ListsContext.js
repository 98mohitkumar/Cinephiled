import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import { apiEndpoints } from "globals/constants";
import { fetchOptions } from "utils/helper";

const ListsContext = createContext({
  lists: [],
  updateList: () => {}
});

export const useListsContext = () => {
  const context = useContext(ListsContext);

  if (context === undefined) {
    throw new Error("useListsContext must be used within ListsContextProvider");
  }

  return context;
};

const ListsContextProvider = ({ children }) => {
  const [lists, setLists] = useState([]);
  const { userInfo } = useUserContext();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchAllLists = async ({ page }) => {
      try {
        const res = await fetch(
          apiEndpoints.lists.getLists({ accountId: userInfo?.accountId, pageQuery: page }),
          fetchOptions({ token: userInfo?.accessToken, signal: abortController.signal })
        );

        if (!res.ok) throw new Error("Cannot fetch lists");

        const { total_pages, results } = await res.json();

        if (results?.length > 0) {
          setLists((prev) => prev.concat(results));

          if (total_pages > page) {
            fetchAllLists({ page: page + 1 });
          }
        }
      } catch {
        setLists([]);
      }
    };

    if (userInfo?.accountId) {
      fetchAllLists({ page: 1 });
    }

    return () => {
      abortController.abort("unmounted");
      setLists([]);
    };
  }, [userInfo?.accessToken, userInfo?.accountId]);

  return <ListsContext.Provider value={{ lists, updateList: setLists }}>{children}</ListsContext.Provider>;
};

export default ListsContextProvider;
