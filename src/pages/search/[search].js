import Head from "next/head";
import Link from "next/link";
import Footer from "../../components/Footer/Footer";
import { Span } from "../../components/MovieInfo/MovieDetailsStyles";
import Navigation from "../../components/Navigation/Navigation";
import {
  BadQuery,
  DetailsWrapper,
  Error404,
  SearchContainer,
  SearchResultsContainer,
  Wrapper,
  EmptySearch,
  QueryContainer,
  QueryImg,
  QueryTitle,
  QueryInfoWrapper,
  QueryRealeaseDate,
  QueryDescription,
} from "../../styles/GlobalComponents";

const search = ({ movieRes, tvRes, error, searchQuery }) => {
  console.log(tvRes);

  let movieReleaseDates = [];
  let tvReleaseDates = [];

  movieRes.forEach((item) =>
    item.release_date === "" || item.release_date === undefined
      ? movieReleaseDates.push("TBA")
      : movieReleaseDates.push(
          new Date(item.release_date.toString()).toDateString().slice(4, -5) +
            ", " +
            new Date(item.release_date.toString()).getFullYear()
        )
  );

  tvRes.forEach((item) =>
    item.first_air_date === "" || item.first_air_date === undefined
      ? tvReleaseDates.push("TBA")
      : tvReleaseDates.push(
          new Date(item.first_air_date.toString()).toDateString().slice(4, -5) +
            ", " +
            new Date(item.first_air_date.toString()).getFullYear()
        )
  );
  return (
    <>
      <Head>
        <title>{searchQuery}</title>
      </Head>
      <Wrapper>
        <DetailsWrapper className="d-flex flex-column justify-content-between">
          <Navigation />
          {error ? (
            <Error404>404</Error404>
          ) : movieRes.length === 0 && tvRes.length === 0 ? (
            <BadQuery>Bad Query :(</BadQuery>
          ) : (
            <SearchContainer>
              <Span className="mb-5 display-4">Movies ({movieRes.length})</Span>
              <SearchResultsContainer>
                {movieRes.length === 0 ? (
                  <EmptySearch className="display-5">
                    No movie results for this query.
                  </EmptySearch>
                ) : (
                  movieRes.map((item, i) => (
                    <Link key={item.id} href={"/movies/" + item.id} passHref>
                      <QueryContainer>
                        <QueryImg poster={item.poster_path} />
                        <QueryInfoWrapper>
                          <div>
                            <QueryTitle>{item.title}</QueryTitle>
                            <QueryRealeaseDate>
                              {movieReleaseDates[i]}
                            </QueryRealeaseDate>
                          </div>
                          <QueryDescription>{item.overview}</QueryDescription>
                        </QueryInfoWrapper>
                      </QueryContainer>
                    </Link>
                  ))
                )}
              </SearchResultsContainer>

              <Span className="my-5 display-4">TV Shows ({tvRes.length})</Span>

              <SearchResultsContainer>
                {tvRes.length === 0 ? (
                  <EmptySearch className="display-5">
                    No TV show results for this query.
                  </EmptySearch>
                ) : (
                  tvRes.map((item, i) => (
                    <Link key={item.id} href={"/tv/" + item.id} passHref>
                      <QueryContainer>
                        <QueryImg poster={item.poster_path} />
                        <QueryInfoWrapper>
                          <div>
                            <QueryTitle>{item.name}</QueryTitle>
                            <QueryRealeaseDate>
                              {tvReleaseDates[i]}
                            </QueryRealeaseDate>
                          </div>
                          <QueryDescription>{item.overview}</QueryDescription>
                        </QueryInfoWrapper>
                      </QueryContainer>
                    </Link>
                  ))
                )}
              </SearchResultsContainer>
            </SearchContainer>
          )}
          <Footer />
        </DetailsWrapper>
      </Wrapper>
    </>
  );
};

search.getInitialProps = async (ctx) => {
  const api_key = process.env.NEXT_PUBLIC_API_KEY;
  const searchQuery = ctx.query.search;

  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
  );

  const tvResponse = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
  );

  const error = movieResponse.ok || tvResponse.ok ? false : true;

  const movieRes = await movieResponse.json();
  const tvRes = await tvResponse.json();

  return {
    movieRes: movieRes.results,
    tvRes: tvRes.results,
    error,
    searchQuery,
  };
};

export default search;
