import { Fragment } from "react";

import TVDetails from "components/pages/TV/TVDetails";
import TVTab from "components/pages/TV/TVTab";
import DominantColor from "components/Shared/DominantColor/DominantColor";
import MetaWrapper from "components/Shared/MetaWrapper";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import LayoutContainer from "components/UI/LayoutContainer";
import H2 from "components/UI/Typography/H2";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES, siteInfo } from "data/global";
import { fetchOptions, getMediaLogo, getNiceName, getReleaseYear, getYouTubeTrailer, matches, mergeCrewData, mergeEpisodeCount } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";
import { isImageDark } from "utils/server/helper";

const TvShow = ({
  id,
  title,
  overview,
  backdropPath,
  posterPath,
  firstAirDate,
  releaseYear,
  endYear,
  cast,
  seasons,
  reviews,
  backdrops,
  posters,
  recommendations,
  tvDetails,
  overviewData
}) => {
  return (
    <Fragment>
      <MetaWrapper
        title={`${title} (${releaseYear} - ${endYear}) - Cinephiled`}
        description={overview}
        image={getTMDBImage({ path: backdropPath, type: "backdrop", size: "w1280" })}
        url={`${siteInfo.url}/${ROUTES.tv}/${getNiceName({ id, name: title })}`}
      />

      {/* tv info hero section */}
      <TVDetails
        tvDetails={{
          id,
          title,
          overview,
          backdropPath,
          posterPath,
          airDate: firstAirDate,
          ...tvDetails
        }}
      />

      <section className='relative'>
        <DominantColor image={backdropPath || posterPath} tint isUsingBackdrop={!!backdropPath} angle='0deg' />

        <div className='relative z-10'>
          {/* tv tabs */}
          <TVTab
            cast={cast}
            seasons={seasons}
            reviews={reviews}
            backdrops={backdrops}
            posters={posters}
            title={title}
            overviewData={{
              title,
              description: overview,
              firstAirDate: firstAirDate,
              ...overviewData
            }}
          />

          {/* recommendations */}
          {recommendations?.length > 0 ? (
            <LayoutContainer className='py-3248'>
              <H2 className='mb-2432 text-center'>You might also like</H2>
              <MediaTemplateGrid media={recommendations} mediaType='tv' />
            </LayoutContainer>
          ) : null}
        </div>
      </section>
    </Fragment>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const [tvResponse, languagesResponse] = await Promise.all([
      fetch(apiEndpoints.tv.tvDetails(ctx.query.id), fetchOptions()),
      fetch(apiEndpoints.language, fetchOptions())
    ]);

    if (!tvResponse.ok) throw new Error("error fetching details");

    const [tvDetails, languages] = await Promise.all([tvResponse.json(), languagesResponse.json()]);

    const socialIds = tvDetails?.external_ids,
      logo = getMediaLogo(tvDetails?.images?.logos),
      endYear = matches(tvDetails?.status, "Ended") || matches(tvDetails.status, "Canceled") ? new Date(tvDetails?.last_air_date).getFullYear() : "",
      language = languages.find((item) => matches(item.iso_639_1, tvDetails.original_language)),
      creators = tvDetails?.created_by?.slice(0, 2).map((creator) => ({
        ...creator,
        job: "Creator"
      })),
      characters = tvDetails?.aggregate_credits?.crew?.filter((credit) => matches(credit.job, "Characters")).slice(0, 2);

    // check if logo is dark
    const isLogoDark = await isImageDark(logo?.file_path);

    return {
      props: {
        id: tvDetails?.id,
        title: tvDetails?.name,
        overview: tvDetails?.overview,
        backdropPath: tvDetails?.backdrop_path,
        posterPath: tvDetails?.poster_path,
        firstAirDate: tvDetails?.first_air_date,
        releaseYear: getReleaseYear(tvDetails?.first_air_date),
        endYear,
        cast: {
          totalCount: tvDetails?.aggregate_credits?.cast?.length,
          data: mergeEpisodeCount(
            tvDetails?.aggregate_credits?.cast?.map(({ roles, ...rest }) => roles.map((role) => ({ ...rest, ...role }))).flat()
          ).slice(0, 15)
        },
        seasons: tvDetails?.seasons,
        reviews: tvDetails?.reviews?.results || [],
        backdrops: tvDetails?.images?.backdrops || [],
        posters: tvDetails?.images?.posters || [],
        recommendations: tvDetails?.recommendations?.results || [],

        tvDetails: {
          rating: tvDetails?.vote_average,
          genres: tvDetails?.genres?.splice(0, 3),
          tagline: tvDetails?.tagline,
          trailer: getYouTubeTrailer(tvDetails?.videos?.results),
          crewData: mergeCrewData([...creators, ...characters]),
          logo: {
            ...logo,
            isLogoDark
          },
          voteCount: tvDetails?.vote_count
        },

        overviewData: {
          lastAirDate: tvDetails?.last_air_date,
          status: tvDetails?.status || "TBA",
          type: tvDetails?.type,
          networks: tvDetails.networks,
          socialIds,
          language: language?.english_name || language?.name || "TBA",
          homepage: tvDetails?.homepage,
          imdbId: socialIds?.imdb_id,
          productionCompanies: tvDetails?.production_companies,
          keywords: tvDetails?.keywords?.results || []
        }
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

export default TvShow;
