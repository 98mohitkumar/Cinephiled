import { Fragment } from 'react';
import MetaWrapper from '../../components/MetaWrapper';
import SearchTab from '../../components/SearchTab/SearchTab';
import { apiEndpoints } from '../../constants';
import {
  BadQuery,
  Error404,
  SearchContainer
} from '../../styles/GlobalComponents';

const Search = ({ movieRes, tvRes, error, searchQuery, keywordsRes }) => {
  return (
    <Fragment>
      <MetaWrapper
        title={error ? 'Not Found - Cinephiled' : `${searchQuery} - Search`}
        description={`Search results matching : ${searchQuery}`}
        url={`https://cinephiled.vercel.app/search/${searchQuery}`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : movieRes.length === 0 && tvRes.length === 0 ? (
        <BadQuery>{'Bad Query :('}</BadQuery>
      ) : (
        <SearchContainer>
          <SearchTab
            search={searchQuery}
            movies={movieRes}
            tv={tvRes}
            keywords={keywordsRes}
          />
        </SearchContainer>
      )}
    </Fragment>
  );
};

Search.getInitialProps = async (ctx) => {
  try {
    let searchQuery = ctx.query.query;
    let year = '';

    if (searchQuery.includes('y:')) {
      year = searchQuery.slice(-4);
      searchQuery = searchQuery.slice(0, searchQuery.length - 7);
    }

    //common in both
    const keywordsResponse = await fetch(
      apiEndpoints.search.keywordSearch(searchQuery)
    );

    if (year !== '') {
      const movieResponse = await fetch(
        apiEndpoints.search.movieSearchWithYear(searchQuery, year)
      );

      const tvResponse = await fetch(
        apiEndpoints.search.tvSearchWithYear(searchQuery, year)
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
          searchQuery: searchQuery,
          keywordsRes: keywordsRes.results
        };
      }
    } else {
      const movieResponse = await fetch(
        apiEndpoints.search.movieSearch(searchQuery)
      );

      const tvResponse = await fetch(apiEndpoints.search.tvSearch(searchQuery));

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
          searchQuery: searchQuery,
          keywordsRes: keywordsRes.results
        };
      }
    }
  } catch {
    return { error: true };
  }
};

export default Search;
