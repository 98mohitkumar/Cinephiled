import { Fragment } from "react";

import NetworkPage from "components/pages/Networks/NetworkPage";
import MetaWrapper from "components/Shared/MetaWrapper";
import NetworkHero from "components/Shared/ProductionHero";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES, siteInfo } from "data/global";
import { fetchOptions, getNiceName, randomizeItems } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const Network = ({ networkDetails, networkMedia }) => {
  const backdrops = networkMedia.concat(networkMedia).map(({ id, backdrop_path }) => ({ id, src: backdrop_path }));
  const logo = networkDetails?.images?.logos?.at(0);

  const extendedBackdrops = randomizeItems(
    backdrops.length < 40
      ? [
          ...backdrops,
          ...Array(40 - backdrops.length)
            .fill(0)
            .map(() => ({ id: Math.random(), src: null }))
        ]
      : backdrops
  );

  return (
    <Fragment>
      <MetaWrapper
        title={`${networkDetails?.name} - cinephiled`}
        description={`TV shows produced by ${networkDetails?.name}.`}
        url={`${siteInfo.url}/${ROUTES.networks}/${getNiceName({ id: networkDetails?.id, name: networkDetails?.name })}`}
        image={getTMDBImage({ path: networkDetails?.logo_path, type: "logo", size: "original" })}
      />

      <NetworkHero details={networkDetails} backdrops={extendedBackdrops} logo={logo} />
      <NetworkPage media={networkMedia} id={networkDetails?.id} />
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
