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
} from "../../styles/GlobalComponents";
import DominantColor from "../../components/DominantColor/DominantColor";
import MovieDetails from "../../components/MovieInfo/MovieDetails";
import MovieTab from "../../components/MovieInfo/MovieTab";
import MovieFacts from "../../components/MovieInfo/MovieFacts";
import { Gradient } from "../../styles/GlobalComponents";

const movie = ({ movieDetails, error, languages }) => {
  let directors = [];
  let writers = [];
  let characters = [];
  let cast = [];
  let runtime = "";
  let getyear = "";

  let reviewDetails = [];
  let backdrops = [];
  let posters = [];
  let creditsDetails = [];
  let movieFacts = {};

  if (error === false) {
    creditsDetails = movieDetails.credits;

    creditsDetails.crew.forEach((item) => {
      if (item.job === "Director") directors.push(item);
      if (item.job === "Writer") writers.push(item);
      if (item.job === "Characters") characters.push(item);
    });

    reviewDetails = movieDetails.reviews;
    backdrops = movieDetails.images.backdrops;
    posters = movieDetails.images.posters;
    cast = creditsDetails.cast;

    cast.splice(15);

    getyear = new Date(movieDetails.release_date).getFullYear();

    const getH = Math.floor(movieDetails.runtime / 60);
    const getM = Math.ceil((movieDetails.runtime / 60 - getH) * 60);
    runtime = { getH, getM };

    movieFacts = {
      status: movieDetails.status,
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
        <title>{error === false ? movieDetails.title : "Not Found"}</title>
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
                  <HeroImg data={movieDetails.poster_path} className="mx-5" />
                  <HeroInfo className="d-flex align-items-center">
                    <Gradient />
                    <MovieDetails
                      movieDetailsData={movieDetails}
                      date={getyear}
                      runtime={runtime}
                      crew={crew}
                    />
                  </HeroInfo>
                </DetailsHeroWrap>
              </HeroDetailsContainer>
              <MovieFacts facts={movieFacts} languages={languages} />
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
    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}&language=en-US&append_to_response=images,credits,reviews&include_image_language=en,null`
  );

  const languagesResponse = await fetch(
    `https://api.themoviedb.org/3/configuration/languages?api_key=${api_key}`
  );

  const error = movieResponse.ok ? false : true;

  if (error === true) {
    return { error };
  } else {
    const movieDetails = await movieResponse.json();

    const languages = await languagesResponse.json();

    return {
      movieDetails,
      error,
      languages,
    };
  }
};

export default movie;
