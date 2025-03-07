import { useEffect, useState } from "react";

import { apiEndpoints } from "data/apiEndpoints";
import { useUserContext } from "Store/UserContext";
import { fetchOptions } from "utils/helper";

const useGetListDetails = ({ id, descendingOrder = false }) => {
  const { userInfo } = useUserContext();
  const [{ error, listDetails, loading }, setDetails] = useState({
    error: false,
    loading: true,
    listDetails: {}
  });

  useEffect(() => {
    const abortController = new AbortController();

    const fetchListDetails = async () => {
      const res = await fetch(
        descendingOrder ? `${apiEndpoints.lists.getListDetails({ id })}&sort_by=original_order.desc` : apiEndpoints.lists.getListDetails({ id }),
        fetchOptions({
          token: userInfo.accessToken,
          signal: abortController.signal
        })
      );

      if (!res.ok) {
        setDetails({ error: true, listDetails: {}, loading: false });
        return;
      }

      const data = await res.json();

      setDetails({ error: false, listDetails: data, loading: false });
    };

    if (id) {
      fetchListDetails();
    } else {
      setDetails({ error: false, listDetails: {}, loading: false });
    }

    return () => {
      abortController.abort("unmounted");
      setDetails({ error: false, listDetails: {}, loading: true });
    };
  }, [descendingOrder, id, userInfo.accessToken]);

  return { error, listDetails, loading };
};

export default useGetListDetails;
