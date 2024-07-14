import MetaWrapper from "components/MetaWrapper";
import SearchTab from "components/SearchTab/SearchTab";
import { apiEndpoints } from "globals/constants";
import { Fragment } from "react";
import { fetchOptions } from "src/utils/helper";
import { BadQuery, Error404 } from "styles/GlobalComponents";

const Search = ({ movieRes, tvRes, error, searchQuery, keywordsRes, peopleRes, collectionRes }) => {
  const allEmptyResults =
    movieRes?.results?.length === 0 &&
    tvRes?.results?.length === 0 &&
    keywordsRes?.results?.length === 0 &&
    peopleRes?.results?.length === 0 &&
    collectionRes?.results?.length === 0;

  return (
    <Fragment>
      <MetaWrapper
        title={error ? "Not Found - Cinephiled" : `${searchQuery} - Search`}
        description={`Search results matching : ${searchQuery}`}
        url={`https://cinephiled.vercel.app/search/${searchQuery}`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : allEmptyResults ? (
        <div className='fixed inset-0 flex items-center justify-center'>
          <BadQuery>{"Bad Query :("}</BadQuery>
        </div>
      ) : (
        <SearchTab
          search={searchQuery}
          movies={movieRes}
          tv={tvRes}
          keywords={keywordsRes}
          people={peopleRes}
          collections={collectionRes}
        />
      )}
    </Fragment>
  );
};

Search.getInitialProps = async (ctx) => {
  try {
    let searchQuery = ctx.query.query.replaceAll("+", " ");
    let year = "";

    if (searchQuery.includes("y:")) {
      year = searchQuery.slice(-4);
      searchQuery = searchQuery.slice(0, searchQuery.length - 7);
    }

    const fetchCommonData = async () => {
      const [keywordsResponse, peopleResponse, collectionResponse] = await Promise.all([
        fetch(apiEndpoints.search.keywordSearch({ query: searchQuery }), fetchOptions()),
        fetch(apiEndpoints.search.personSearch({ query: searchQuery }), fetchOptions()),
        fetch(apiEndpoints.search.collectionSearch({ query: searchQuery }), fetchOptions())
      ]);

      const [keywordsRes, peopleRes, collectionRes] = await Promise.all([
        keywordsResponse.json(),
        peopleResponse.json(),
        collectionResponse.json()
      ]);

      return {
        keywordsRes: { results: keywordsRes.results, count: keywordsRes.total_results },
        peopleRes: { results: peopleRes.results, count: peopleRes.total_results },
        collectionRes: { results: collectionRes.results, count: collectionRes.total_results }
      };
    };

    const fetchSearchResults = async (withYear) => {
      const searchEndpoints = withYear
        ? [
            apiEndpoints.search.movieSearchWithYear({ query: searchQuery, year }),
            apiEndpoints.search.tvSearchWithYear({ query: searchQuery, year })
          ]
        : [
            apiEndpoints.search.movieSearch({ query: searchQuery }),
            apiEndpoints.search.tvSearch({ query: searchQuery })
          ];

      const [movieResponse, tvResponse] = await Promise.all(
        searchEndpoints.map((endpoint) => fetch(endpoint, fetchOptions()))
      );

      if (!movieResponse.ok || !tvResponse.ok) {
        throw new Error("Error fetching data");
      }

      const [movieRes, tvRes] = await Promise.all([movieResponse.json(), tvResponse.json()]);

      return {
        movieRes: { results: movieRes.results, count: movieRes.total_results },
        tvRes: { results: tvRes.results, count: tvRes.total_results }
      };
    };

    const [commonData, searchData] = await Promise.all([
      fetchCommonData(),
      year.trim().length > 0 ? fetchSearchResults(true) : fetchSearchResults(false)
    ]);

    return {
      ...searchData,
      ...commonData,
      error: false,
      searchQuery
    };
  } catch {
    return { error: true };
  }
};

export default Search;
