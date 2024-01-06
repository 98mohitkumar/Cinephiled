import MetaWrapper from "components/MetaWrapper";
import SearchTab from "components/SearchTab/SearchTab";
import { apiEndpoints } from "globals/constants";
import { Fragment } from "react";
import { fetchOptions } from "src/utils/helper";
import { BadQuery, Error404 } from "styles/GlobalComponents";

const Search = ({ movieRes, tvRes, error, searchQuery, keywordsRes }) => {
  return (
    <Fragment>
      <MetaWrapper
        title={error ? "Not Found - Cinephiled" : `${searchQuery} - Search`}
        description={`Search results matching : ${searchQuery}`}
        url={`https://cinephiled.vercel.app/search/${searchQuery}`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : movieRes?.results?.length > 0 || tvRes?.results?.length > 0 ? (
        <SearchTab search={searchQuery} movies={movieRes} tv={tvRes} keywords={keywordsRes} />
      ) : (
        <div className='fixed inset-0 flex items-center justify-center'>
          <BadQuery>{"Bad Query :("}</BadQuery>
        </div>
      )}
    </Fragment>
  );
};

Search.getInitialProps = async (ctx) => {
  try {
    let searchQuery = ctx.query.query;
    let year = "";

    if (searchQuery.includes("y:")) {
      year = searchQuery.slice(-4);
      searchQuery = searchQuery.slice(0, searchQuery.length - 7);
    }

    //common in both
    const keywordsResponse = await fetch(
      apiEndpoints.search.keywordSearch({ query: searchQuery }),
      fetchOptions()
    );

    if (year.trim().length > 0) {
      const searchQueryWithYear = await Promise.all([
        fetch(
          apiEndpoints.search.movieSearchWithYear({ query: searchQuery, year }),
          fetchOptions()
        ),
        fetch(apiEndpoints.search.tvSearchWithYear({ query: searchQuery, year }), fetchOptions())
      ]);

      const error = searchQueryWithYear.some((res) => !res.ok);
      if (error) throw new Error("error fetching data");

      const [movieResponse, tvResponse] = searchQueryWithYear;
      const [movieRes, tvRes, keywordsRes] = await Promise.all([
        movieResponse.json(),
        tvResponse.json(),
        keywordsResponse.json()
      ]);

      return {
        movieRes: {
          results: movieRes.results,
          count: movieRes.total_results
        },
        tvRes: { results: tvRes.results, count: tvRes.total_results },
        error,
        searchQuery: searchQuery,
        keywordsRes: {
          results: keywordsRes.results,
          count: keywordsRes.total_results
        }
      };
    } else {
      const searchQueryWithoutYear = await Promise.all([
        fetch(apiEndpoints.search.movieSearch({ query: searchQuery }), fetchOptions()),
        fetch(apiEndpoints.search.tvSearch({ query: searchQuery }), fetchOptions())
      ]);

      const error = searchQueryWithoutYear.some((res) => !res.ok);
      if (error) throw new Error("error fetching data");

      const [movieResponse, tvResponse] = searchQueryWithoutYear;
      const [movieRes, tvRes, keywordsRes] = await Promise.all([
        movieResponse.json(),
        tvResponse.json(),
        keywordsResponse.json()
      ]);

      return {
        movieRes: {
          results: movieRes.results,
          count: movieRes.total_results
        },
        tvRes: { results: tvRes.results, count: tvRes.total_results },
        error,
        searchQuery: searchQuery,
        keywordsRes: {
          results: keywordsRes.results,
          count: keywordsRes.total_results
        },
        test: movieRes
      };
    }
  } catch {
    return { error: true };
  }
};

export default Search;
