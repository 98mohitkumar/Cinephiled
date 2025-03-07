import { apiEndpoints } from "data/apiEndpoints";

const getItemStatus = async (req, res) => {
  try {
    const { id, mediaType, mediaId } = req.body;

    const requestOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json;charset=utf-8",
        authorization: req.headers.authorization
      }
    };

    const response = await fetch(apiEndpoints.lists.listItemStatus({ id, mediaType, mediaId }), requestOptions);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
};

export default getItemStatus;
