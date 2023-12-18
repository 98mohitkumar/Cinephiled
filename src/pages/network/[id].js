import NetworkMedia from "components/Explore/NetworkMedia";
import MetaWrapper from "components/MetaWrapper";
import { apiEndpoints } from "globals/constants";
import { Fragment } from "react";
import { Error404 } from "styles/GlobalComponents";

const Network = ({ networkDetails, networkMedia, error }) => {
  return (
    <Fragment>
      <MetaWrapper
        title={error ? "Not Found - Cinephiled" : `${networkDetails?.name} - cinephiled`}
        description={`TV shows produced by ${networkDetails?.name}.`}
        url={`https://cinephiled.vercel.app/network/${
          networkDetails?.id
        }-${networkDetails?.name.replaceAll(" ", "-")}`}
        image={`https://image.tmdb.org/t/p/original${networkDetails.logo_path}`}
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
    const res = await fetch(apiEndpoints.network.networkDetails(networkId));

    if (res.ok) {
      const data = await res.json();
      const networkMedia = await fetch(apiEndpoints.network.networkMedia({ id: networkId }));
      const networkMediaData = await networkMedia.json();
      return { networkDetails: data, networkMedia: networkMediaData?.results || [] };
    }
    return { error: true };
  } catch {
    return { error: true };
  }
};

export default Network;
