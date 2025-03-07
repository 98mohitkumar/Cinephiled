import { Fragment } from "react";

import MovieDetails from "components/pages/Movie/MovieDetails";
import MovieTab from "components/pages/Movie/MovieTab";
import DominantColor from "components/Shared/DominantColor/DominantColor";
import MetaWrapper from "components/Shared/MetaWrapper";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import LayoutContainer from "components/UI/LayoutContainer";
import H2 from "components/UI/Typography/H2";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES, siteInfo } from "data/global";
import { fetchOptions, getNiceName, getReleaseDate, getReleaseYear, getYouTubeTrailer, matches, mergeCrewData } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";
import { isImageDark } from "utils/server/helper";

const Movie = ({ movieData }) => {
  const {
    id,
    title,
    overview,
    releaseYear,
    releaseDate,
    runtime,
    collection,
    trailer,
    genres,
    tagline,
    rating,
    posterPath,
    crewData,
    socialIds,
    homepage,
    status,
    backdropPath,
    budget,
    revenue,
    language,
    isEasterMovie,
    cast,
    reviews,
    backdrops,
    posters,
    recommendations,
    logo,
    technicalDetails
  } = movieData;

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
          rating,
          genres,
          tagline,
          trailer,
          crewData,
          logo,
          releaseDate,
          isEasterMovie
        }}
      />

      <section className='relative'>
        <DominantColor image={backdropPath} tint isUsingBackdrop angle='0deg' />

        <div className='relative z-10'>
          {/* movie tabs */}
          <MovieTab
            cast={cast}
            reviews={reviews}
            backdrops={backdrops}
            posters={posters}
            overviewData={{
              runtime,
              collection,
              socialIds,
              homepage,
              status,
              budget,
              revenue,
              language,
              releaseDate,
              title,
              description: overview,
              technicalDetails
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

    const releaseYear = getReleaseYear(movieDetails?.release_date);
    const releaseDate = getReleaseDate(movieDetails?.release_date);
    const status = movieDetails?.status || "TBA";
    const language = languages.find((item) => matches(item.iso_639_1, movieDetails.original_language));
    const trailer = getYouTubeTrailer(movieDetails?.videos?.results);
    const logo = movieDetails?.images?.logos?.sort((a, b) => b.vote_average - a.vote_average).at(0) || null;

    const crewData = mergeCrewData([
      ...movieDetails?.credits?.crew?.filter((credit) => matches(credit?.job, "Director")).slice(0, 2),
      ...movieDetails?.credits?.crew?.filter((credit) => matches(credit?.job, "Writer")).slice(0, 3),
      ...movieDetails?.credits?.crew?.filter((credit) => matches(credit?.job, "Characters")).slice(0, 2)
    ]);

    const socialIds = movieDetails?.external_ids;
    const collection = movieDetails?.belongs_to_collection || {};

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
        movieData: {
          id: movieDetails?.id,
          title: movieDetails?.title,
          releaseYear,
          releaseDate,
          collection,
          genres: movieDetails?.genres?.splice(0, 3),
          runtime: movieDetails?.runtime,
          tagline: movieDetails?.tagline,
          overview: movieDetails?.overview,
          rating: movieDetails?.vote_average,
          posterPath: movieDetails?.poster_path,
          backdropPath: movieDetails?.backdrop_path,
          crewData,
          trailer,
          logo: {
            ...logo,
            isLogoDark
          },
          socialIds,
          homepage: movieDetails?.homepage,
          status,
          language: language?.english_name || language?.name || "TBA",
          budget: movieDetails?.budget,
          revenue: movieDetails?.revenue,
          cast: {
            totalCount: movieDetails?.credits?.cast?.length,
            data: movieDetails?.credits?.cast?.slice(0, 15)
          },
          isEasterMovie: matches(movieDetails?.id, parseInt(process.env.EASTER_MOVIE_ID)),
          reviews: movieDetails?.reviews?.results ?? [],
          backdrops: movieDetails?.images?.backdrops ?? [],
          posters: movieDetails?.images?.posters ?? [],
          recommendations: movieDetails?.recommendations?.results,
          technicalDetails
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
