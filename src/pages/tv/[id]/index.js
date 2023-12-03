import MetaWrapper from "components/MetaWrapper";
import Recommendations from "components/Recommendations/Recommendations";
import TVDetails from "components/TVInfo/TVDetails";
import TVFacts from "components/TVInfo/TVFacts";
import TVTab from "components/TVInfo/TVTab";
import { apiEndpoints } from "globals/constants";
import { Fragment } from "react";
import { Error404 } from "styles/GlobalComponents";

const TvShow = ({
  id,
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
  runtime,
  homepage,
  tagline,
  trailerLink
}) => {
  return (
    <Fragment>
      <MetaWrapper
        title={
          !error ? `${title} (${releaseYear} - ${endYear}) - Cinephiled` : "Not Found - Cinephiled"
        }
        description={overview}
        image={`https://image.tmdb.org/t/p/w780${backdropPath}`}
        url={`https://cinephiled.vercel.app/tv/${id}-${title?.replace(/[' ', '/']/g, "-")}`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <Fragment>
          {/* tv info hero section */}
          <TVDetails
            tvData={{
              id,
              title,
              runtime,
              genres,
              overview,
              tagline,
              rating,
              backdropPath,
              posterPath,
              socialIds,
              crewData,
              trailerLink,
              homepage
            }}
            year={releaseYear}
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
          {recommendations?.length > 0 && <Recommendations data={recommendations} type='tv' />}
        </Fragment>
      )}
    </Fragment>
  );
};

TvShow.getInitialProps = async (ctx) => {
  try {
    const tvResponse = await fetch(apiEndpoints.tv.tvDetails(ctx.query.id));
    const languagesResponse = await fetch(apiEndpoints.language);

    const error = tvResponse.ok ? false : true;

    if (error) {
      throw new Error();
    } else {
      const tvData = await tvResponse.json();
      const languages = await languagesResponse.json();

      const releaseYear = tvData?.first_air_date
        ? new Date(tvData?.first_air_date).getFullYear()
        : "TBA";

      const endYear =
        tvData?.status === "Ended" || tvData.status === "Canceled"
          ? new Date(tvData?.last_air_date).getFullYear()
          : "";

      const language = languages.filter((item) => item.iso_639_1 === tvData.original_language);

      const status = tvData?.status || "TBA";
      const network = tvData.networks?.[0] || "TBA";
      const crewData = [
        ...tvData?.created_by?.slice(0, 2),
        ...tvData?.aggregate_credits?.crew
          ?.filter((credit) => credit.job === "Characters")
          .slice(0, 2)
      ];

      const trailers = tvData?.videos?.results?.filter(
        (item) =>
          item?.site === "YouTube" && (item?.type === "Trailer" || item.type === "Opening Credits")
      );

      return {
        id: tvData?.id,
        title: tvData?.name,
        releaseYear,
        genres: tvData?.genres,
        runtime: tvData?.episode_run_time?.[0],
        tagline: tvData?.tagline,
        overview: tvData?.overview,
        rating: tvData?.vote_average,
        posterPath: tvData?.poster_path,
        backdropPath: tvData?.backdrop_path,
        crewData,
        trailerLink: trailers?.[0]?.key ?? "",
        socialIds: tvData?.external_ids,
        homepage: tvData?.homepage,
        status,
        language: language?.[0]?.english_name,
        network,
        type: tvData?.type,
        endYear,
        cast: {
          totalCount: tvData?.aggregate_credits?.cast?.length,
          data: tvData?.aggregate_credits?.cast?.slice(0, 15)
        },
        seasons: tvData?.seasons,
        reviews: tvData?.reviews?.results ?? [],
        backdrops: tvData?.images?.backdrops ?? [],
        posters: tvData?.images?.posters ?? [],
        recommendations: tvData?.recommendations?.results,
        error
      };
    }
  } catch {
    return { error: true };
  }
};

export default TvShow;
