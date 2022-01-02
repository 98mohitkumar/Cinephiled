import Navigation from "../../components/Navigation/Navigation";
import Head from "next/head";
import Footer from "../../components/Footer/Footer";
import {
  HeroBg,
  Error404,
  DetailsWrapper,
  Wrapper,
  HeroImg,
  DetailsHeroWrap,
  HeroBgContainer,
  HeroDetailsContainer,
  HeroInfo,
  HeroImgWrapper,
  HeroTrailer,
} from "../../styles/GlobalComponents";
import DominantColor from "../../components/DominantColor/DominantColor";
import MovieDetails from "../../components/MovieInfo/MovieDetails";
import MovieTab from "../../components/MovieInfo/MovieTab";
import MovieFacts from "../../components/MovieInfo/MovieFacts";
import { Gradient } from "../../styles/GlobalComponents";
import { Span } from "../../components/MovieInfo/MovieDetailsStyles";
import { FaYoutube } from "react-icons/fa";
import SocialMediaLinks from "../../components/SocialMediaLinks/SocialMediaLinks";

const movie = ({ movieDetails, error, languages, socialIds }) => {
  let directors = [];
  let writers = [];
  let characters = [];
  let cast = [];
  let videos = [];
  let runtime = "";
  let getyear = "";

  let reviewDetails = [];
  let backdrops = [];
  let posters = [];
  let creditsDetails = [];
  let movieFacts = {};

  let status = "";

  let country = "";

  if (error === false) {
    creditsDetails = movieDetails.credits;

    creditsDetails.crew.forEach((item) => {
      if (item.job === "Director") directors.push(item);
      if (item.job === "Writer") writers.push(item);
      if (item.job === "Characters") characters.push(item);
    });

    movieDetails.videos.results.forEach(
      (item) =>
        item.site === "YouTube" && item.type === "Trailer" && videos.push(item)
    );

    reviewDetails = movieDetails.reviews;
    backdrops = movieDetails.images.backdrops;
    posters = movieDetails.images.posters;
    cast = creditsDetails.cast;

    cast.splice(15);

    country =
      movieDetails.production_countries[0] === undefined
        ? "US"
        : movieDetails.production_countries[0].iso_3166_1;

    getyear =
      movieDetails.release_date === ""
        ? "TBA"
        : new Date(movieDetails.release_date).getFullYear();

    const getH = Math.floor(movieDetails.runtime / 60);
    const getM = Math.ceil((movieDetails.runtime / 60 - getH) * 60);
    runtime = { getH, getM };

    status =
      movieDetails.status === null ||
      movieDetails.status === "" ||
      movieDetails.status === undefined
        ? "TBA"
        : movieDetails.status;

    movieFacts = {
      status,
      language: movieDetails.original_language,
      budget: movieDetails.budget,
      revenue: movieDetails.revenue,
    };
  }

  if (directors.length > 2) {
    directors.splice(2);
  }

  if (writers.length > 3) {
    writers.splice(3);
  }

  if (characters.length > 2) {
    characters.splice(2);
  }

  let crew = [...directors, ...writers, ...characters];

  return (
    <>
      <Head>
        <title>
          {error === false
            ? `${movieDetails.title} (${getyear}) - Cinephiled`
            : "Not Found - Cinephiled"}
        </title>
      </Head>
      <Wrapper>
        <DetailsWrapper className="d-flex flex-column justify-content-between">
          <Navigation />
          {error ? (
            <Error404>404</Error404>
          ) : (
            <>
              <HeroDetailsContainer className="position-relative mb-auto">
                <HeroBgContainer className="position-absolute">
                  <HeroBg
                    backdrop={movieDetails.backdrop_path}
                    className="position-absolute"
                  ></HeroBg>
                  <DominantColor image={movieDetails.poster_path} />
                </HeroBgContainer>

                <DetailsHeroWrap>
                  <HeroImgWrapper>
                    <HeroImg data={movieDetails.poster_path} />
                    {videos.length !== 0 && (
                      <a
                        href={`https://www.youtube.com/watch?v=${videos[0].key}`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="trailer"
                      >
                        <HeroTrailer>
                          <FaYoutube size="1.5rem" />
                          <Span>Play Trailer</Span>
                        </HeroTrailer>
                      </a>
                    )}
                    <SocialMediaLinks
                      links={socialIds}
                      homepage={movieDetails.homepage}
                    />
                  </HeroImgWrapper>
                  <Gradient />
                  <HeroInfo className="d-flex">
                    <MovieDetails
                      movieDetailsData={movieDetails}
                      date={getyear}
                      runtime={runtime}
                      crew={crew}
                    />
                  </HeroInfo>
                </DetailsHeroWrap>
              </HeroDetailsContainer>
              <MovieFacts
                facts={movieFacts}
                languages={languages}
                country={country}
              />
              <MovieTab
                id={movieDetails.id}
                cast={cast}
                reviews={reviewDetails.results}
                backdrops={backdrops}
                posters={posters}
              />
            </>
          )}
          <Footer />
        </DetailsWrapper>
      </Wrapper>
    </>
  );
};

movie.getInitialProps = async (ctx) => {
  const api_key = process.env.NEXT_PUBLIC_API_KEY;
  const movie_id = ctx.query.id;
  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}&language=en-US&append_to_response=images,videos,credits,reviews&include_image_language=en,null`
  );

  const languagesResponse = await fetch(
    `https://api.themoviedb.org/3/configuration/languages?api_key=${api_key}`
  );

  const socialLinks = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/external_ids?api_key=${api_key}&language=en-US`
  );

  const error = movieResponse.ok ? false : true;

  if (error === true) {
    return { error };
  } else {
    const movieDetails = await movieResponse.json();

    const languages = await languagesResponse.json();

    const socialIds = await socialLinks.json();

    return {
      movieDetails,
      error,
      languages,
      socialIds,
    };
  }
};

export default movie;
