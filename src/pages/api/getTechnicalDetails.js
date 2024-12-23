import { apiEndpoints } from "data/apiEndpoints";
import { fetchOptions } from "utils/helper";

const getTechnicalDetails = async (req, res) => {
  const { id } = req.body;

  try {
    const response = await fetch(
      apiEndpoints.cfWorker,
      fetchOptions({
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: { id }
      })
    );

    if (!response.ok) {
      throw new Error("error fetching technical details");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ message: "error fetching technical details" });
  }
};

export default getTechnicalDetails;
