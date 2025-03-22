import { Fragment } from "react";

import { getTechnicalDetails } from "apiRoutes/media";
import MovieDetails from "components/pages/Movie/MovieDetails";
import MovieTab from "components/pages/Movie/MovieTab";
import DominantColor from "components/Shared/DominantColor/DominantColor";
import MetaWrapper from "components/Shared/MetaWrapper";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import LayoutContainer from "components/UI/LayoutContainer";
import H2 from "components/UI/Typography/H2";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES, siteInfo } from "data/global";
import { fetchOptions, getMediaLogo, getNiceName, getReleaseDate, getReleaseYear, getYouTubeTrailer, matches, mergeCrewData } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";
import { isImageDark } from "utils/server/helper";

const Movie = ({
  id,
  title,
  overview,
  releaseDate,
  releaseYear,
  backdropPath,
  posterPath,
  cast,
  reviews,
  backdrops,
  posters,
  recommendations,
  movieDetails,
  overviewData
}) => {
  return (
    <Fragment>
      <MetaWrapper
        title={`${title} (${releaseYear}) - Cinephiled`}
        description={overview}
        image={getTMDBImage({ path: backdropPath, type: "backdrop", size: "w1280" })}
        url={`${siteInfo.url}/${ROUTES.movies}/${getNiceName({ id: id, name: title })}`}
      />

      {/* movie info hero section */}
      <MovieDetails
        movieDetails={{
          id,
          title,
          overview,
          backdropPath,
          posterPath,
          releaseDate,
          ...movieDetails
        }}
      />

      <section className='relative'>
        <DominantColor image={backdropPath || posterPath} tint isUsingBackdrop={!!backdropPath} angle='0deg' />

        <div className='relative z-10'>
          {/* movie tabs */}
          <MovieTab
            cast={cast}
            reviews={reviews}
            backdrops={backdrops}
            posters={posters}
            overviewData={{
              title,
              releaseDate,
              description: overview,
              ...overviewData
            }}
          />

          {/* recommendations */}
          {recommendations?.length > 0 ? (
            <LayoutContainer className='py-3248'>
              <H2 className='mb-2432 text-center'>You might also like</H2>
              <MediaTemplateGrid media={recommendations} mediaType='movie' />
            </LayoutContainer>
          ) : null}
        </div>
      </section>
    </Fragment>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const [movieResponse, languagesResponse] = await Promise.all([
      fetch(apiEndpoints.movie.movieDetails(ctx.query.id), fetchOptions()),
      fetch(apiEndpoints.language, fetchOptions())
    ]);

    if (!movieResponse.ok) throw new Error("error fetching details");

    const [movieDetails, languages] = await Promise.all([movieResponse.json(), languagesResponse.json()]);

    const socialIds = movieDetails?.external_ids,
      language = languages.find((item) => matches(item.iso_639_1, movieDetails.original_language)),
      logo = getMediaLogo(movieDetails?.images?.logos),
      crewData = mergeCrewData([
        ...movieDetails?.credits?.crew?.filter((credit) => matches(credit?.job, "Director")).slice(0, 2),
        ...movieDetails?.credits?.crew?.filter((credit) => matches(credit?.job, "Writer")).slice(0, 3),
        ...movieDetails?.credits?.crew?.filter((credit) => matches(credit?.job, "Characters")).slice(0, 2)
      ]);

    const isLogoDark = await isImageDark(logo?.file_path);
    const technicalDetails = await getTechnicalDetails(socialIds?.imdb_id);

    return {
      props: {
        id: movieDetails?.id,
        title: movieDetails?.title,
        overview: movieDetails?.overview,
        releaseDate: getReleaseDate(movieDetails?.release_date),
        releaseYear: getReleaseYear(movieDetails?.release_date),
        backdropPath: movieDetails?.backdrop_path,
        posterPath: movieDetails?.poster_path,
        cast: {
          totalCount: movieDetails?.credits?.cast?.length,
          data: movieDetails?.credits?.cast?.slice(0, 15)
        },
        reviews: movieDetails?.reviews?.results || [],
        backdrops: movieDetails?.images?.backdrops || [],
        posters: movieDetails?.images?.posters || [],
        recommendations: movieDetails?.recommendations?.results || [],

        movieDetails: {
          rating: movieDetails?.vote_average,
          genres: movieDetails?.genres?.splice(0, 3),
          tagline: movieDetails?.tagline,
          trailer: getYouTubeTrailer(movieDetails?.videos?.results),
          crewData,
          logo: {
            ...logo,
            isLogoDark
          },
          isEasterMovie: matches(movieDetails?.id, parseInt(process.env.EASTER_MOVIE_ID)),
          voteCount: movieDetails?.vote_count
        },

        overviewData: {
          runtime: movieDetails?.runtime,
          collection: movieDetails?.belongs_to_collection || {},
          socialIds,
          homepage: movieDetails?.homepage,
          status: movieDetails?.status || "TBA",
          budget: movieDetails?.budget,
          revenue: movieDetails?.revenue,
          language: language?.english_name || language?.name || "TBA",
          technicalDetails,
          productionCompanies: movieDetails?.production_companies || [],
          networks: [],
          keywords: movieDetails?.keywords?.keywords || []
        }
      }
    };
  } catch (err) {
    console.error(err);

    return {
      notFound: true
    };
  }
};

export default Movie;
