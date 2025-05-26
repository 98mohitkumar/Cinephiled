import { apiEndpoints } from "data/apiEndpoints";
import { fetchOptions } from "utils/helper";

export const getTechnicalDetails = async (id) => {
  const response = await fetch(
    apiEndpoints.cfWorker,
    fetchOptions({ method: "POST", headers: { "Content-Type": "application/json" }, body: { id } })
  );

  if (!response.ok) {
    return null;
  }

  return await response.json();
};
