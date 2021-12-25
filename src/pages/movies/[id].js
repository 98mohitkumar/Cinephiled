import Navigation from "../../components/Navigation/Navigation";
import Head from "next/head";
import Footer from "../../components/Footer/Footer";
import {
  MovieBg,
  Error404,
  MovieDetailsWrapper,
  Wrapper,
  MovieImg,
  MovieHeroWrap,
  MovieBgContainer,
  MovieContainer,
  MovieInfo,
} from "../../styles/GlobalComponents";
import DominantColor from "../../components/Movie/DominantColor";
import MovieDetails from "../../components/MovieInfo/MovieDetails";
import MovieTab from "../../components/MovieInfo/MovieTab";
import MovieFacts from "../../components/MovieInfo/MovieFacts";

const movie = ({
  movieDetails,
  creditsDetails,
  error,
  reviewDetails,
  backdrops,
  posters,
  languages,
}) => {
  let directors = [];
  let writers = [];
  let characters = [];
  const cast = creditsDetails.cast;

  if (error === false) {
    creditsDetails.crew.forEach((item, i) => {
      if (item.job === "Director") directors.push(creditsDetails.crew[i]);
      if (item.job === "Writer") writers.push(creditsDetails.crew[i]);
      if (item.job === "Characters") characters.push(creditsDetails.crew[i]);
    });

    cast.splice(15);
  }

  if (directors.length > 1) {
    directors.splice(1);
  }

  if (writers.length > 3) {
    writers.splice(3);
  }

  if (characters.length > 2) {
    characters.splice(2);
  }

  let crew = [...directors, ...writers, ...characters];

  const getyear = new Date(movieDetails.release_date).getFullYear();

  const getH = Math.floor(movieDetails.runtime / 60);
  const getM = Math.ceil((movieDetails.runtime / 60 - getH) * 60);
  const runtime = { getH, getM };

  // console.log(movieDetails);
  // console.log(languages);

  return (
    <>
      <Head>
        <title>{movieDetails.title}</title>
      </Head>
      <Wrapper>
        <MovieDetailsWrapper className="d-flex flex-column justify-content-between">
          <Navigation />
          {error ? (
            <Error404>404</Error404>
          ) : (
            <>
              <MovieContainer className="position-relative mb-auto">
                <MovieBgContainer className="position-absolute">
                  <MovieBg
                    backdrop={movieDetails.backdrop_path}
                    className="position-absolute"
                  ></MovieBg>
                  <DominantColor image={movieDetails.poster_path} />
                </MovieBgContainer>

                <MovieHeroWrap>
                  <MovieImg data={movieDetails.poster_path} className="mx-5" />
                  <MovieInfo className="d-flex justify-content-center align-items-center">
                    <MovieDetails
                      movieDetailsData={movieDetails}
                      date={getyear}
                      runtime={runtime}
                      crew={crew}
                    />
                  </MovieInfo>
                </MovieHeroWrap>
              </MovieContainer>
              <MovieFacts facts={movieDetails} languages={languages} />
              <MovieTab
                cast={cast}
                reviews={reviewDetails.results}
                backdrops={backdrops}
                posters={posters}
              />
            </>
          )}
          <Footer />
        </MovieDetailsWrapper>
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

  const movieDetails = await movieResponse.json();

  const creditsDetails = await movieDetails.credits;

  const reviewDetails = await movieDetails.reviews;

  const backdrops = await movieDetails.images.backdrops;

  const posters = await movieDetails.images.posters;

  const languages = await languagesResponse.json();

  return {
    movieDetails,
    error,
    creditsDetails,
    reviewDetails,
    backdrops,
    posters,
    languages,
  };
};

export default movie;
