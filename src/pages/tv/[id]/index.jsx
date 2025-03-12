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
import { fetchOptions, getNiceName, getReleaseYear, getYouTubeTrailer, matches, mergeCrewData, mergeEpisodeCount } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";
import { isImageDark } from "utils/server/helper";

const TvShow = ({ tvData }) => {
  const {
    id,
    airDate,
    title,
    status,
    type,
    overview,
    backdropPath,
    posterPath,
    releaseYear,
    endYear,
    cast,
    seasons,
    reviews,
    backdrops,
    posters,
    networks,
    socialIds,
    language,
    crewData,
    genres,
    rating,
    recommendations,
    homepage,
    tagline,
    trailer,
    logo,
    lastAirDate,
    technicalDetails,
    voteCount,
    productionCompanies
  } = tvData;

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
        tvData={{
          id,
          title,
          overview,
          backdropPath,
          posterPath,
          rating,
          genres,
          tagline,
          trailer,
          crewData,
          logo,
          airDate,
          voteCount
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
            seriesName={title}
            overviewData={{
              firstAirDate: airDate,
              lastAirDate: lastAirDate,
              status,
              type,
              networks,
              socialIds,
              language,
              homepage,
              title,
              description: overview,
              technicalDetails,
              productionCompanies
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

    const [tvData, languages] = await Promise.all([tvResponse.json(), languagesResponse.json()]);

    const releaseYear = getReleaseYear(tvData?.first_air_date);

    const endYear = matches(tvData?.status, "Ended") || matches(tvData.status, "Canceled") ? new Date(tvData?.last_air_date).getFullYear() : "";

    const language = languages.find((item) => matches(item.iso_639_1, tvData.original_language));

    const status = tvData?.status || "TBA";
    const networks = tvData.networks;
    const productionCompanies = tvData?.production_companies;
    const creators = tvData?.created_by?.slice(0, 2).map((creator) => ({
      ...creator,
      job: "Creator"
    }));

    const socialIds = tvData?.external_ids;
    const characters = tvData?.aggregate_credits?.crew?.filter((credit) => matches(credit.job, "Characters")).slice(0, 2);
    const crewData = mergeCrewData([...creators, ...characters]);
    const trailer = getYouTubeTrailer(tvData?.videos?.results);
    const logo = tvData?.images?.logos?.sort((a, b) => b.vote_average - a.vote_average).at(0) || null;

    const isLogoDark = await isImageDark(logo?.file_path);

    let technicalDetails;

    try {
      const response = await fetch(
        apiEndpoints.cfWorker,
        fetchOptions({
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: { id: socialIds?.imdb_id }
        })
      );

      if (!response.ok) {
        throw new Error("error fetching technical details");
      }

      technicalDetails = await response.json();
    } catch {
      technicalDetails = {
        items: []
      };
    }

    return {
      props: {
        tvData: {
          id: tvData?.id,
          title: tvData?.name,
          airDate: tvData?.first_air_date,
          lastAirDate: tvData?.last_air_date,
          releaseYear,
          genres: tvData?.genres?.splice(0, 3),
          tagline: tvData?.tagline,
          overview: tvData?.overview,
          rating: tvData?.vote_average,
          voteCount: tvData?.vote_count,
          posterPath: tvData?.poster_path,
          backdropPath: tvData?.backdrop_path,
          crewData,
          trailer,
          socialIds,
          homepage: tvData?.homepage,
          status,
          language: language?.english_name || language?.name || "TBA",
          networks,
          type: tvData?.type,
          endYear,
          cast: {
            totalCount: tvData?.aggregate_credits?.cast?.length,
            data: mergeEpisodeCount(
              tvData?.aggregate_credits?.cast?.map(({ roles, ...rest }) => roles.map((role) => ({ ...rest, ...role }))).flat()
            ).slice(0, 15)
          },
          seasons: tvData?.seasons,
          reviews: tvData?.reviews?.results || [],
          backdrops: tvData?.images?.backdrops || [],
          posters: tvData?.images?.posters || [],
          recommendations: tvData?.recommendations?.results || [],
          logo: {
            ...logo,
            isLogoDark
          },
          technicalDetails,
          productionCompanies
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
