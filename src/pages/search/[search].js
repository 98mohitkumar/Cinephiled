import Head from "next/head";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import SearchTab from "../../components/SearchTab/SearchTab";
import {
  BadQuery,
  DetailsWrapper,
  Error404,
  SearchContainer,
  Wrapper,
} from "../../styles/GlobalComponents";

const search = ({ movieRes, tvRes, error, searchQuery }) => {
  let movieReleaseDates = [];
  let tvReleaseDates = [];

  if (error === false) {
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
            new Date(item.first_air_date.toString())
              .toDateString()
              .slice(4, -5) +
              ", " +
              new Date(item.first_air_date.toString()).getFullYear()
          )
    );
  }
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
              <SearchTab
                movies={movieRes}
                tv={tvRes}
                movieReleaseDates={movieReleaseDates}
                tvReleaseDates={tvReleaseDates}
                search={searchQuery}
              />
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
  let searchQuery = ctx.query.search;

  let year = "";
  if (searchQuery.includes('"') || searchQuery.includes("'")) {
    searchQuery = searchQuery.replace(/["']/g, "");
  }

  if (searchQuery.includes("y:")) {
    year = searchQuery.slice(-4);
    searchQuery = searchQuery.slice(0, searchQuery.length - 7);
  }

  if (year !== "") {
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${searchQuery}&page=1&include_adult=false&year=${year}`
    );

    const tvResponse = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&language=en-US&query=${searchQuery}&page=1&include_adult=false&first_air_date_year=${year}`
    );

    const error = movieResponse.ok || tvResponse.ok ? false : true;

    const movieRes = await movieResponse.json();
    const tvRes = await tvResponse.json();

    if (error === true) {
      return { error };
    } else {
      return {
        movieRes: movieRes.results,
        tvRes: tvRes.results,
        error,
        searchQuery,
      };
    }
  } else {
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
    );

    const tvResponse = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
    );

    const error = movieResponse.ok || tvResponse.ok ? false : true;

    const movieRes = await movieResponse.json();
    const tvRes = await tvResponse.json();

    if (error === true) {
      return { error };
    } else {
      return {
        movieRes: movieRes.results,
        tvRes: tvRes.results,
        error,
        searchQuery,
      };
    }
  }
};

export default search;
