import DominantColor from "components/DominantColor/DominantColor";
import MetaWrapper from "components/MetaWrapper";
import Recommendations from "components/Recommendations/Recommendations";
import TVDetails from "components/TVInfo/TVDetails";
import TVFacts from "components/TVInfo/TVFacts";
import TVTab from "components/TVInfo/TVTab";
import { apiEndpoints } from "globals/constants";
import { Fragment } from "react";
import { fetchOptions, getCleanTitle, getReleaseYear, mergeEpisodeCount } from "src/utils/helper";
import { Error404, ModulesWrapper } from "styles/GlobalComponents";

const TvShow = ({
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
  network,
  socialIds,
  error,
  language,
  crewData,
  genres,
  rating,
  recommendations,
  homepage,
  tagline,
  trailerLink
}) => {
  return (
    <Fragment>
      <MetaWrapper
        title={
          error ? "Not Found - Cinephiled" : `${title} (${releaseYear} - ${endYear}) - Cinephiled`
        }
        description={overview}
        image={`https://image.tmdb.org/t/p/w780${backdropPath}`}
        url={`https://cinephiled.vercel.app/tv/${id}-${getCleanTitle(title)}`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <Fragment>
          {/* tv info hero section */}
          <TVDetails
            tvData={{
              id,
              airDate,
              title,
              genres,
              overview,
              tagline,
              rating,
              backdropPath,
              posterPath,
              socialIds,
              crewData,
              trailerLink,
              homepage,
              releaseYear
            }}
          />

          {/* tv facts */}
          <TVFacts facts={{ status, network, type, language }} />

          {/* tv tabs */}
          <TVTab
            cast={cast}
            seasons={seasons}
            reviews={reviews}
            backdrops={backdrops}
            posters={posters}
          />

          {/* recommendations */}
          {recommendations?.length > 0 ? (
            <ModulesWrapper className='relative'>
              <DominantColor image={backdropPath} tint isUsingBackdrop />
              <div className='pt-12 relative z-10'>
                <h2 className='text-[calc(1.375rem_+_1.5vw)] xl:text-[2.5rem] font-bold text-white text-center mb-4 lg:mb-8'>
                  Recommendations
                </h2>
                <Recommendations data={recommendations} type='tv' />
              </div>
            </ModulesWrapper>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
};

TvShow.getInitialProps = async (ctx) => {
  try {
    const [tvResponse, languagesResponse] = await Promise.all([
      fetch(apiEndpoints.tv.tvDetails(ctx.query.id), fetchOptions()),
      fetch(apiEndpoints.language, fetchOptions())
    ]);

    if (!tvResponse.ok) throw new Error("error fetching details");

    const [tvData, languages] = await Promise.all([tvResponse.json(), languagesResponse.json()]);

    const releaseYear = getReleaseYear(tvData?.first_air_date);
    const endYear =
      tvData?.status === "Ended" || tvData.status === "Canceled"
        ? new Date(tvData?.last_air_date).getFullYear()
        : "";

    const language = languages.find((item) => item.iso_639_1 === tvData.original_language);

    const status = tvData?.status || "TBA";
    const network = tvData.networks?.[0] || "TBA";
    const crewData = [
      ...tvData?.created_by?.slice(0, 2),
      ...tvData?.aggregate_credits?.crew
        ?.filter((credit) => credit.job === "Characters")
        .slice(0, 2)
    ];

    const trailer = tvData?.videos?.results?.find(
      (item) => item?.site === "YouTube" && item?.type === "Trailer"
    );

    return {
      id: tvData?.id,
      title: tvData?.name,
      airDate: tvData?.first_air_date,
      releaseYear,
      genres: tvData?.genres,
      tagline: tvData?.tagline,
      overview: tvData?.overview,
      rating: tvData?.vote_average,
      posterPath: tvData?.poster_path,
      backdropPath: tvData?.backdrop_path,
      crewData,
      trailerLink: trailer?.key ?? "",
      socialIds: tvData?.external_ids,
      homepage: tvData?.homepage,
      status,
      language: language?.english_name || language?.name || "TBA",
      network,
      type: tvData?.type,
      endYear,
      cast: {
        totalCount: tvData?.aggregate_credits?.cast?.length,
        data: mergeEpisodeCount(
          tvData?.aggregate_credits?.cast
            ?.map(({ roles, ...rest }) => roles.map((role) => ({ ...rest, ...role })))
            .flat()
        ).slice(0, 15)
      },
      seasons: tvData?.seasons,
      reviews: tvData?.reviews?.results ?? [],
      backdrops: tvData?.images?.backdrops ?? [],
      posters: tvData?.images?.posters ?? [],
      recommendations: tvData?.recommendations?.results,
      error: false,
      tvData
    };
  } catch {
    return { error: true };
  }
};

export default TvShow;
