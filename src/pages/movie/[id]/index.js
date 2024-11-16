import { Fragment, useEffect, useState } from "react";
import DominantColor from "components/DominantColor/DominantColor";
import MetaWrapper from "components/MetaWrapper";
import MovieDetails from "components/MovieInfo/MovieDetails";
import MovieFacts from "components/MovieInfo/MovieFacts";
import MovieTab from "components/MovieInfo/MovieTab";
import Recommendations from "components/Recommendations/Recommendations";
import { apiEndpoints } from "globals/constants";
import { ModulesWrapper } from "styles/GlobalComponents";
import { fetchOptions, getCleanTitle, getReleaseDate, getReleaseYear } from "utils/helper";

const Movie = ({ movieData }) => {
  const [showEaster, setShowEaster] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);
  const {
    id,
    title,
    overview,
    releaseYear,
    releaseDate,
    runtime,
    collection,
    trailerLink,
    genres,
    tagline,
    rating,
    moviePoster,
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
    imdbId
  } = movieData;

  useEffect(() => {
    let easterSeen = localStorage.getItem("easterSeen");
    if (isEasterMovie) {
      if (easterSeen === "seen") {
        setHasSeen(true);
      } else {
        setShowEaster(true);
        document.body.style.overflow = "hidden";
      }
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
        title={`${title} (${releaseYear}) - Cinephiled`}
        image={`https://image.tmdb.org/t/p/w780${backdropPath}`}
        description={overview}
        url={`https://cinephiled.vercel.app/movie/${id}-${getCleanTitle(title)}`}
      />

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
            homepage,
            collection,
            imdbId
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
        />

        {/* movie tabs */}
        <MovieTab cast={cast} reviews={reviews} backdrops={backdrops} posters={posters} />

        {/* recommendations */}
        {recommendations?.length > 0 ? (
          <ModulesWrapper className='relative'>
            <DominantColor image={backdropPath} tint isUsingBackdrop />
            <div className='relative z-10 pt-12'>
              <h2 className='mb-4 text-center text-[calc(1.375rem_+_1.5vw)] font-bold text-white lg:mb-8 xl:text-[2.5rem]'>Recommendations</h2>

              <Recommendations data={recommendations} type='movie' />
            </div>
          </ModulesWrapper>
        ) : null}
      </Fragment>
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

    const country = movieDetails?.production_companies[0]?.origin_country || "US";
    const releaseYear = getReleaseYear(movieDetails?.release_date);
    const releaseDate = getReleaseDate(movieDetails?.release_date);
    const status = movieDetails?.status || "TBA";
    const language = languages.find((item) => item.iso_639_1 === movieDetails.original_language);

    const trailers = movieDetails?.videos?.results?.find((item) => item?.site === "YouTube" && item?.type === "Trailer");

    const crewData = [
      ...movieDetails?.credits?.crew?.filter((credit) => credit?.job === "Director").slice(0, 2),
      ...movieDetails?.credits?.crew?.filter((credit) => credit?.job === "Writer").slice(0, 3),
      ...movieDetails?.credits?.crew?.filter((credit) => credit?.job === "Characters").slice(0, 2)
    ];

    const imdbId = movieDetails?.external_ids?.imdb_id;
    const collection = movieDetails?.belongs_to_collection || null;

    return {
      props: {
        movieData: {
          id: movieDetails?.id,
          title: movieDetails?.title,
          releaseYear,
          releaseDate,
          collection,
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
          imdbId
        }
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

export default Movie;
