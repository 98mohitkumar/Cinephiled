import { Fragment } from "react";

import SearchTab from "components/SearchTab/SearchTab";
import MetaWrapper from "components/Shared/MetaWrapper";
import { apiEndpoints } from "data/apiEndpoints";
import { BadQuery } from "styles/GlobalComponents";
import { fetchOptions } from "utils/helper";

const Search = ({ movieRes, tvRes, searchQuery, keywordsRes, peopleRes, collectionRes }) => {
  const allResultsEmpty = [movieRes, tvRes, keywordsRes, peopleRes, collectionRes].every((res) => res?.results?.length === 0);

  return (
    <Fragment>
      <MetaWrapper
        title={`${searchQuery} - Search`}
        description={`Search results matching : ${searchQuery}`}
        url={`https://cinephiled.vercel.app/search/${searchQuery}`}
      />

      {allResultsEmpty ? (
        <div className='fixed inset-0 flex items-center justify-center'>
          <BadQuery>{"Bad Query :("}</BadQuery>
        </div>
      ) : (
        <SearchTab search={searchQuery} movies={movieRes} tv={tvRes} keywords={keywordsRes} people={peopleRes} collections={collectionRes} />
      )}
    </Fragment>
  );
};

export const getServerSideProps = async (ctx) => {
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

      const [keywordsRes, peopleRes, collectionRes] = await Promise.all([keywordsResponse.json(), peopleResponse.json(), collectionResponse.json()]);

      return {
        keywordsRes: { results: keywordsRes.results, count: keywordsRes.total_results },
        peopleRes: { results: peopleRes.results, count: peopleRes.total_results },
        collectionRes: { results: collectionRes.results, count: collectionRes.total_results }
      };
    };

    const fetchSearchResults = async (withYear) => {
      const searchEndpoints = withYear
        ? [apiEndpoints.search.movieSearchWithYear({ query: searchQuery, year }), apiEndpoints.search.tvSearchWithYear({ query: searchQuery, year })]
        : [apiEndpoints.search.movieSearch({ query: searchQuery }), apiEndpoints.search.tvSearch({ query: searchQuery })];

      const [movieResponse, tvResponse] = await Promise.all(searchEndpoints.map((endpoint) => fetch(endpoint, fetchOptions())));

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
      props: {
        ...searchData,
        ...commonData,
        searchQuery
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

export default Search;
