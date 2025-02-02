import { Fragment } from "react";

import NetworkPage from "components/pages/Networks/NetworkPage";
import MetaWrapper from "components/Shared/MetaWrapper";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES, siteInfo } from "data/global";
import { fetchOptions, getNiceName } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const Network = ({ networkDetails, networkMedia }) => {
  return (
    <Fragment>
      <MetaWrapper
        title={`${networkDetails?.name} - cinephiled`}
        description={`TV shows produced by ${networkDetails?.name}.`}
        url={`${siteInfo.url}/${ROUTES.networks}/${getNiceName({ id: networkDetails?.id, name: networkDetails?.name })}`}
        image={getTMDBImage({ path: networkDetails?.logo_path, type: "logo", size: "original" })}
      />

      <NetworkPage media={networkMedia} details={networkDetails} />
    </Fragment>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const { id, sortBy } = context.query;
    const networkId = id.split("-")[0];

    const [res, networkMedia] = await Promise.all([
      fetch(apiEndpoints.network.networkDetails(networkId), fetchOptions()),
      fetch(apiEndpoints.network.networkMedia({ id: networkId, sortBy }), fetchOptions())
    ]);

    if (!res.ok) throw new Error("cannot fetch details");

    const [data, networkMediaData] = await Promise.all([res.json(), networkMedia.json()]);

    return {
      props: {
        networkDetails: data,
        networkMedia: networkMediaData?.results || []
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

export default Network;
