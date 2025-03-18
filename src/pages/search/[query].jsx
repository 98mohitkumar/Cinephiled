import { Fragment } from "react";

import SearchTab from "components/SearchTab/SearchTab";
import MetaWrapper from "components/Shared/MetaWrapper";
import LayoutContainer from "components/UI/LayoutContainer";
import H1 from "components/UI/Typography/H1";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES, siteInfo } from "data/global";
import { fetchOptions } from "utils/helper";

const Search = ({ movies, tv, searchQuery, keywords, people, collections, companies, allResultsEmpty, year }) => {
  return (
    <Fragment>
      <MetaWrapper
        title={`${searchQuery} - Search`}
        description={`Search results matching : ${searchQuery}`}
        url={`${siteInfo.url}/${ROUTES.search}/${searchQuery}`}
      />

      <LayoutContainer className='pb-4864 pt-2440'>
        {allResultsEmpty ? (
          <H1 tag='p' weight='semibold' className='absolute inset-0 -z-1 grid select-none place-items-center text-neutral-400'>
            {"Bad Query :("}
          </H1>
        ) : (
          <SearchTab
            searchQuery={searchQuery}
            movies={movies}
            tv={tv}
            keywords={keywords}
            people={people}
            collections={collections}
            year={year}
            companies={companies}
          />
        )}
      </LayoutContainer>
    </Fragment>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    let searchQuery = ctx.query.query.replaceAll("+", " ");
    let year = null;

    if (searchQuery.includes("y:")) {
      year = searchQuery.slice(-4);
      searchQuery = searchQuery.slice(0, searchQuery.length - 7);
    }

    const fetchCommonData = async () => {
      const [keywordsResponse, peopleResponse, collectionResponse, companyResponse] = await Promise.all([
        fetch(apiEndpoints.search.keywordSearch({ query: searchQuery }), fetchOptions()),
        fetch(apiEndpoints.search.personSearch({ query: searchQuery }), fetchOptions()),
        fetch(apiEndpoints.search.collectionSearch({ query: searchQuery }), fetchOptions()),
        fetch(apiEndpoints.search.companySearch({ query: searchQuery }), fetchOptions())
      ]);

      const [keywordsRes, peopleRes, collectionRes, companyRes] = await Promise.all([
        keywordsResponse.json(),
        peopleResponse.json(),
        collectionResponse.json(),
        companyResponse.json()
      ]);

      return {
        keywords: { results: keywordsRes.results, count: keywordsRes.total_results },
        people: { results: peopleRes.results, count: peopleRes.total_results },
        collections: { results: collectionRes.results, count: collectionRes.total_results },
        companies: { results: companyRes.results, count: companyRes.total_results }
      };
    };

    const fetchSearchResults = async () => {
      const searchEndpoints = [
        apiEndpoints.search.movieSearch({ query: searchQuery, year }),
        apiEndpoints.search.tvSearch({ query: searchQuery, year })
      ];

      const [movieResponse, tvResponse] = await Promise.all(searchEndpoints.map((endpoint) => fetch(endpoint, fetchOptions())));

      if (!movieResponse.ok || !tvResponse.ok) {
        throw new Error("Error fetching data");
      }

      const [movieRes, tvRes] = await Promise.all([movieResponse.json(), tvResponse.json()]);

      return {
        movies: { results: movieRes.results, count: movieRes.total_results },
        tv: { results: tvRes.results, count: tvRes.total_results }
      };
    };

    const [commonData, searchData] = await Promise.all([fetchCommonData(), fetchSearchResults()]);

    const allResultsEmpty = [
      searchData.movies,
      searchData.tv,
      commonData.keywords,
      commonData.people,
      commonData.collections,
      commonData.companies
    ].every((res) => res?.results?.length === 0);

    return {
      props: {
        ...searchData,
        ...commonData,
        searchQuery,
        allResultsEmpty,
        year
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

export default Search;
