import { apiEndpoints } from "globals/constants";
import { useEffect, useState } from "react";
import { fetchOptions } from "src/utils/helper";
import { useUserContext } from "Store/UserContext";

const useGetAllLists = () => {
  const { userInfo } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchAllLists = async () => {
      try {
        const res = await fetch(
          apiEndpoints.lists.getLists({ accountId: userInfo?.accountId, pageQuery: page }),
          fetchOptions({ token: userInfo?.accessToken })
        );

        if (!res.ok) throw new Error("Cannot fetch lists");

        const { total_pages, results } = await res.json();

        if (results?.length > 0) {
          setLists((prev) => prev.concat(results));
          setLoading(total_pages > page);
          setPage((prev) => (total_pages > prev ? prev + 1 : prev));
        } else {
          setLoading(false);
        }
      } catch {
        setLists([]);
        setLoading(false);
      }
    };

    if (userInfo?.accountId) {
      setLoading(true);
      fetchAllLists();
    }
  }, [page, userInfo?.accessToken, userInfo?.accountId]);

  return {
    lists,
    loading,
    updateList: setLists
  };
};

export default useGetAllLists;
