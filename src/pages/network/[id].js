import NetworkMedia from "components/Explore/NetworkMedia";
import MetaWrapper from "components/MetaWrapper";
import { apiEndpoints } from "globals/constants";
import { Fragment } from "react";
import { fetchOptions, getCleanTitle } from "src/utils/helper";

const Network = ({ networkDetails, networkMedia }) => {
  return (
    <Fragment>
      <MetaWrapper
        title={`${networkDetails?.name} - cinephiled`}
        description={`TV shows produced by ${networkDetails?.name}.`}
        url={`https://cinephiled.vercel.app/network/${networkDetails?.id}-${getCleanTitle(
          networkDetails?.name
        )}`}
        image={`https://image.tmdb.org/t/p/original${networkDetails?.logo_path}`}
      />

      <NetworkMedia media={networkMedia} details={networkDetails} />
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
