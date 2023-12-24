import DominantColor from "components/DominantColor/DominantColor";
import MetaWrapper from "components/MetaWrapper";
import MovieDetails from "components/MovieInfo/MovieDetails";
import MovieFacts from "components/MovieInfo/MovieFacts";
import MovieTab from "components/MovieInfo/MovieTab";
import Recommendations from "components/Recommendations/Recommendations";
import { apiEndpoints } from "globals/constants";
import { Fragment, useEffect, useState } from "react";
import { getCleanTitle, getReleaseDate, getReleaseYear } from "src/utils/helper";
import { Error404, ModulesWrapper } from "styles/GlobalComponents";

const Movie = ({
  id,
  title,
  releaseYear,
  releaseDate,
  genres,
  runtime,
  tagline,
  overview,
  rating,
  moviePoster,
  backdropPath,
  crewData,
  trailerLink,
  socialIds,
  homepage,
  status,
  language,
  country,
  budget,
  revenue,
  cast,
  reviews,
  isEasterMovie,
  backdrops,
  posters,
  recommendations,
  error
}) => {
  const [showEaster, setShowEaster] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);

  useEffect(() => {
    let easterSeen = localStorage.getItem("easterSeen");
    if (isEasterMovie && easterSeen !== "seen") {
      setShowEaster(true);
      document.body.style.overflow = "hidden";
    }

    if (easterSeen === "seen") {
      setHasSeen(true);
    }
  }, [isEasterMovie]);

  const easterHandler = () => {
    setShowEaster(!showEaster);
    window.scrollTo(0, 0);
    setHasSeen(true);
    localStorage.setItem("easterSeen", "seen");

    if (showEaster) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <Fragment>
      <MetaWrapper
        title={error ? "Not Found - Cinephiled" : `${title} (${releaseYear}) - Cinephiled`}
        image={`https://image.tmdb.org/t/p/w780${backdropPath}`}
        description={overview}
        url={`https://cinephiled.vercel.app/movies/${id}-${getCleanTitle(title)}`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <Fragment>
          {/* movie info hero section */}
          <MovieDetails
            easter={{
              renderEaster: isEasterMovie,
              hasSeen,
              showEaster,
              easterHandler
            }}
            movieDetails={{
              id,
              title,
              overview,
              releaseYear,
              releaseDate,
              backdropPath,
              runtime,
              trailerLink,
              genres,
              tagline,
              rating,
              moviePoster,
              crewData,
              socialIds,
              homepage
            }}
          />

          {/* movie facts */}
          <MovieFacts
            facts={{
              status,
              budget,
              revenue,
              language
            }}
            country={country}
          />

          {/* movie tabs */}
          <MovieTab cast={cast} reviews={reviews} backdrops={backdrops} posters={posters} />

          {/* recommendations */}
          {recommendations?.length > 0 ? (
            <ModulesWrapper className='relative'>
              <DominantColor image={backdropPath} tint isUsingBackdrop />
              <div className='pt-12 relative z-10'>
                <h2 className='text-[calc(1.375rem_+_1.5vw)] xl:text-[2.5rem] font-bold text-white text-center mb-4 lg:mb-8'>
                  Recommendations
                </h2>

                <Recommendations data={recommendations} type='movies' />
              </div>
            </ModulesWrapper>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
};

Movie.getInitialProps = async (ctx) => {
  try {
    const [movieResponse, languagesResponse] = await Promise.all([
      fetch(apiEndpoints.movie.movieDetails(ctx.query.id)),
      fetch(apiEndpoints.language)
    ]);

    if (!movieResponse.ok) throw new Error("error fetching details");

    const [movieDetails, languages] = await Promise.all([
      movieResponse.json(),
      languagesResponse.json()
    ]);

    const country = movieDetails?.production_companies[0]?.origin_country || "US";
    const releaseYear = getReleaseYear(movieDetails?.release_date);
    const releaseDate = getReleaseDate(movieDetails?.release_date);
    const status = movieDetails?.status || "TBA";
    const language = languages.find((item) => item.iso_639_1 === movieDetails.original_language);

    const trailers = movieDetails?.videos?.results?.find(
      (item) => item?.site === "YouTube" && item?.type === "Trailer"
    );

    const crewData = [
      ...movieDetails?.credits?.crew?.filter((credit) => credit?.job === "Director").slice(0, 2),
      ...movieDetails?.credits?.crew?.filter((credit) => credit?.job === "Writer").slice(0, 3),
      ...movieDetails?.credits?.crew?.filter((credit) => credit?.job === "Characters").slice(0, 2)
    ];

    return {
      id: movieDetails?.id,
      title: movieDetails?.title,
      releaseYear,
      releaseDate,
      genres: movieDetails?.genres,
      runtime: movieDetails?.runtime,
      tagline: movieDetails?.tagline,
      overview: movieDetails?.overview,
      rating: movieDetails?.vote_average,
      moviePoster: movieDetails?.poster_path,
      backdropPath: movieDetails?.backdrop_path,
      crewData,
      trailerLink: trailers?.key ?? "",
      socialIds: movieDetails?.external_ids,
      homepage: movieDetails?.homepage,
      status,
      language: language?.english_name || language?.name || "TBA",
      country,
      budget: movieDetails?.budget,
      revenue: movieDetails?.revenue,
      cast: {
        totalCount: movieDetails?.credits?.cast?.length,
        data: movieDetails?.credits?.cast?.slice(0, 15)
      },
      isEasterMovie: movieDetails?.id === 345911,
      reviews: movieDetails?.reviews?.results ?? [],
      backdrops: movieDetails?.images?.backdrops ?? [],
      posters: movieDetails?.images?.posters ?? [],
      recommendations: movieDetails?.recommendations?.results,
      error: false
    };
  } catch {
    return {
      error: true
    };
  }
};

export default Movie;
