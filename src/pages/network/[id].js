import NetworkMedia from "components/Explore/NetworkMedia";
import MetaWrapper from "components/MetaWrapper";
import { apiEndpoints } from "globals/constants";
import { Fragment } from "react";
import { fetchOptions, getCleanTitle } from "src/utils/helper";
import { Error404 } from "styles/GlobalComponents";

const Network = ({ networkDetails, networkMedia, error }) => {
  return (
    <Fragment>
      <MetaWrapper
        title={error ? "Not Found - Cinephiled" : `${networkDetails?.name} - cinephiled`}
        description={`TV shows produced by ${networkDetails?.name}.`}
        url={`https://cinephiled.vercel.app/network/${networkDetails?.id}-${getCleanTitle(
          networkDetails?.name
        )}`}
        image={`https://image.tmdb.org/t/p/original${networkDetails?.logo_path}`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <NetworkMedia media={networkMedia} details={networkDetails} />
      )}
    </Fragment>
  );
};

Network.getInitialProps = async (context) => {
  try {
    const { id } = context.query;
    const networkId = id.split("-")[0];

    const [res, networkMedia] = await Promise.all([
      fetch(apiEndpoints.network.networkDetails(networkId), fetchOptions()),
      fetch(apiEndpoints.network.networkMedia({ id: networkId }), fetchOptions())
    ]);

    if (!res.ok) throw new Error("cannot fetch details");

    const [data, networkMediaData] = await Promise.all([res.json(), networkMedia.json()]);

    return {
      networkDetails: data,
      networkMedia: networkMediaData?.results || [],
      error: false
    };
  } catch {
    return { error: true };
  }
};

export default Network;
