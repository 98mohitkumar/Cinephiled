import { Fragment } from "react";

import PlaceholderText from "components/PlaceholderText";
import DominantColor from "components/Shared/DominantColor/DominantColor";
import MetaWrapper from "components/Shared/MetaWrapper";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import LayoutContainer from "components/UI/LayoutContainer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/UI/Select";
import H1 from "components/UI/Typography/H1";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES, siteInfo, sortOptions } from "data/global";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import useSort from "hooks/useSort";
import { fetchOptions, getNiceName, removeDuplicates } from "utils/helper";

const ProviderTV = ({ media, region, providerName, providerId }) => {
  const {
    tmdbOptions: { tv: tvSortOptions }
  } = sortOptions;
  const defaultSortOption = tvSortOptions.find((option) => option?.isDefault)?.value;
  const { sortBy, handleSortSelection } = useSort({ shallow: false, defaultSortOption });

  const { list, resetQueryState } = useInfiniteQuery({
    initialPage: 2,
    getEndpoint: ({ page }) =>
      apiEndpoints.watchProviders.watchProviderTv({
        providerId,
        region: region,
        pageQuery: page,
        sortBy
      })
  });

  const { cleanedItems: renderList } = removeDuplicates(media.concat(list));

  const handleSort = (key) => {
    handleSortSelection(key);
    resetQueryState();
  };

  return (
    <Fragment>
      <MetaWrapper
        title={`TV Shows - ${providerName} (${region}) - Cinephiled`}
        description={`Explore a comprehensive list of TV Shows available on ${providerName} in ${region}`}
        url={`${siteInfo.url}/${ROUTES.watchProviders}/${getNiceName({ id: providerId, name: providerName })}/tv`}
      />

      <LayoutContainer className='relative py-4064'>
        <DominantColor tint />

        <section className='relative z-5'>
          <H1 className='mx-auto max-w-screen-lg text-center text-neutral-400'>
            TV Shows available on
            <span className='text-white'>
              {" "}
              {providerName}&nbsp;({region})
            </span>
          </H1>

          {renderList?.length > 0 ? (
            <Fragment>
              <div className='mb-2432 mt-3240 flex items-center justify-end gap-10'>
                <Select defaultValue={sortBy} onValueChange={handleSort}>
                  <SelectTrigger className='w-fit min-w-[250px]'>
                    <SelectValue placeholder='Sort By:' />
                  </SelectTrigger>
                  <SelectContent position='popper' align='end'>
                    {tvSortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <MediaTemplateGrid media={renderList} mediaType='tv' />
            </Fragment>
          ) : (
            <PlaceholderText height='large'>
              No TV Shows are available on {providerName}&nbsp;({region})
            </PlaceholderText>
          )}
        </section>
      </LayoutContainer>
    </Fragment>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const { providerId, watchregion, sortBy } = ctx.query;

    const [providerTvRes, regionsRes] = await Promise.all([
      fetch(
        apiEndpoints.watchProviders.watchProviderTv({
          providerId: providerId.split("-")[0],
          region: watchregion || "US",
          pageQuery: 1,
          sortBy
        }),
        fetchOptions()
      ),
      fetch(apiEndpoints.watchProviders.regions, fetchOptions())
    ]);

    if (!providerTvRes.ok) throw Error("cannot fetch data");

    const [providerTvData, regionsData] = await Promise.all([providerTvRes.json(), regionsRes.json()]);

    return {
      props: {
        providerId: providerId.split("-")[0],
        media: providerTvData.results || [],
        providerName: providerId.split("-").slice(1).join(" "),
        region: regionsData?.results?.find(({ iso_3166_1 }) => iso_3166_1 === (watchregion || "US"))?.iso_3166_1 || ""
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

export default ProviderTV;
