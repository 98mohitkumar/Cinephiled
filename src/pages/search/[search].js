import Head from 'next/head';
import SearchTab from '../../components/SearchTab/SearchTab';
import {
  BadQuery,
  Error404,
  SearchContainer
} from '../../styles/GlobalComponents';

const Search = ({ movieRes, tvRes, error, searchQuery, keywordsRes }) => {
  let movieReleaseDates = [];
  let tvReleaseDates = [];

  if (!error) {
    movieRes.forEach((item) =>
      !item.release_date
        ? movieReleaseDates.push('TBA')
        : movieReleaseDates.push(
            new Date(item.release_date.toString()).toDateString().slice(4, -5) +
              ', ' +
              new Date(item.release_date.toString()).getFullYear()
          )
    );

    tvRes.forEach((item) =>
      !item.first_air_date
        ? tvReleaseDates.push('TBA')
        : tvReleaseDates.push(
            new Date(item.first_air_date.toString())
              .toDateString()
              .slice(4, -5) +
              ', ' +
              new Date(item.first_air_date.toString()).getFullYear()
          )
    );
  }
  return (
    <>
      <Head>
        <title>
          {error ? 'Not Found - Cinephiled' : `${searchQuery} - Search`}
        </title>
        <meta property='og:image' content='https://i.imgur.com/Jtl3tJG.png' />
        <meta property='og:title' content={searchQuery}></meta>
      </Head>
      {error ? (
        <Error404>404</Error404>
      ) : movieRes.length === 0 && tvRes.length === 0 ? (
        <BadQuery>Bad Query :(</BadQuery>
      ) : (
        <SearchContainer>
          <SearchTab
            search={searchQuery}
            movies={movieRes}
            tv={tvRes}
            movieReleaseDates={movieReleaseDates}
            tvReleaseDates={tvReleaseDates}
            keywords={keywordsRes}
          />
        </SearchContainer>
      )}
    </>
  );
};

Search.getInitialProps = async (ctx) => {
  try {
    const api_key = process.env.NEXT_PUBLIC_API_KEY;
    let searchQuery = ctx.query.search;

    let year = '';
    if (searchQuery.includes('"') || searchQuery.includes("'")) {
      searchQuery = searchQuery.replace(/(^['"]|['"]$)/g, '');
    }

    if (searchQuery.includes('y:')) {
      year = searchQuery.slice(-4);
      searchQuery = searchQuery.slice(0, searchQuery.length - 7);
    }

    if (year !== '') {
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${searchQuery}&page=1&include_adult=false&year=${year}`
      );

      const tvResponse = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&language=en-US&query=${searchQuery}&page=1&include_adult=false&first_air_date_year=${year}`
      );

      const keywordsResponse = await fetch(
        `https://api.themoviedb.org/3/search/keyword?api_key=${api_key}&query=${searchQuery}&page=1`
      );

      const error = movieResponse.ok && tvResponse.ok ? false : true;

      if (error) {
        throw new Error();
      } else {
        const movieRes = await movieResponse.json();
        const tvRes = await tvResponse.json();
        const keywordsRes = await keywordsResponse.json();
        return {
          movieRes: movieRes.results,
          tvRes: tvRes.results,
          error,
          searchQuery: searchQuery.replaceAll('+', ' '),
          keywordsRes: keywordsRes.results
        };
      }
    } else {
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
      );

      const tvResponse = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
      );

      const keywordsResponse = await fetch(
        `https://api.themoviedb.org/3/search/keyword?api_key=${api_key}&query=${searchQuery}&page=1`
      );

      const error = movieResponse.ok || tvResponse.ok ? false : true;

      if (error) {
        throw new Error();
      } else {
        const movieRes = await movieResponse.json();
        const tvRes = await tvResponse.json();
        const keywordsRes = await keywordsResponse.json();
        return {
          movieRes: movieRes.results,
          tvRes: tvRes.results,
          error,
          searchQuery: searchQuery.replaceAll('+', ' '),
          keywordsRes: keywordsRes.results
        };
      }
    }
  } catch {
    return { error: true };
  }
};

export default Search;
