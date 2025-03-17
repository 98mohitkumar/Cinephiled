import { Fragment } from "react";

import NetworkPage from "components/pages/Networks/NetworkPage";
import MetaWrapper from "components/Shared/MetaWrapper";
import NetworkHero from "components/Shared/ProductionHero";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES, siteInfo } from "data/global";
import { fetchOptions, getNiceName, randomizeItems, removeDuplicates } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const Network = ({ networkDetails, networkMedia, backdrops }) => {
  const logo = networkDetails?.images?.logos?.at(0);

  return (
    <Fragment>
      <MetaWrapper
        title={`${networkDetails?.name} - cinephiled`}
        description={`TV shows produced by ${networkDetails?.name}.`}
        url={`${siteInfo.url}/${ROUTES.networks}/${getNiceName({ id: networkDetails?.id, name: networkDetails?.name })}`}
        image={getTMDBImage({ path: networkDetails?.logo_path, type: "logo", size: "original" })}
      />

      <NetworkHero details={networkDetails} backdrops={backdrops} logo={logo} />
      <NetworkPage media={networkMedia} id={networkDetails?.id} />
    </Fragment>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const { id, sortBy } = context.query;
    const networkId = id.split("-")[0];

    const [res, networkMediaRes, networkMediaResNext] = await Promise.all([
      fetch(apiEndpoints.network.networkDetails(networkId), fetchOptions()),
      fetch(apiEndpoints.network.networkMedia({ id: networkId, sortBy }), fetchOptions()),
      fetch(apiEndpoints.network.networkMedia({ id: networkId, sortBy, pageQuery: 2 }), fetchOptions())
    ]);

    if (!res.ok) throw new Error("cannot fetch details");

    const [data, networkMediaData, networkMediaDataNext] = await Promise.all([res.json(), networkMediaRes.json(), networkMediaResNext.json()]);
    const { cleanedItems: networkMedia } = removeDuplicates(networkMediaData?.results?.concat(networkMediaDataNext?.results));

    const backdrops = networkMedia.concat(networkMediaData?.results).map(({ id, backdrop_path }) => ({ id, src: backdrop_path }));
    const extendedBackdrops =
      backdrops.length < 60
        ? [
            ...backdrops,
            ...Array(60 - backdrops.length)
              .fill(0)
              .map(() => ({ id: Math.random(), src: null }))
          ]
        : backdrops;

    return {
      props: {
        networkDetails: data,
        networkMedia,
        backdrops: randomizeItems(extendedBackdrops)
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

export default Network;
