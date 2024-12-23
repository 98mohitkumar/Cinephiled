import { useRouter } from "next/router";

import Cast from "components/Cast/Cast";
import PlaceholderText from "components/PlaceholderText";
import { apiEndpoints } from "data/apiEndpoints";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import { removeDuplicates } from "utils/helper";

import { SortBy } from "./helper";
import { SearchResultsContainer } from "./SearchTabStyles";

const sortOptions = [
  {
    key: "name",
    name: "Name"
  },
  {
    key: "popularity",
    name: "Popularity",
    descFirst: true
  }
];

const PeopleSearch = ({ searchQuery, peopleRes }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    getEndpoint: ({ page }) =>
      apiEndpoints.search.personSearch({
        query: searchQuery,
        pageQuery: page
      })
  });

  const { query } = useRouter();
  const { sortBy, order } = query;
  const { cleanedItems } = removeDuplicates(peopleRes.results.concat(list));

  const getRenderList = (list) => {
    if (sortBy === "name") {
      if (order === "asc") {
        return [...list].sort((a, b) => (a.name > b.name ? 1 : -1));
      } else {
        return [...list].sort((a, b) => (a.name > b.name ? 1 : -1)).reverse();
      }
    } else if (sortBy === "popularity") {
      if (order === "asc") {
        return [...list].sort((a, b) => a.popularity - b.popularity);
      } else {
        return [...list].sort((a, b) => a.popularity - b.popularity).reverse();
      }
    }

    return list;
  };

  return (
    <SearchResultsContainer>
      {cleanedItems?.length > 0 ? (
        <section>
          <SortBy sortOptions={sortOptions} />

          <div className='mt-7'>
            <Cast cast={{ data: sortBy ? getRenderList(cleanedItems) : cleanedItems }} isSearchGrid />
          </div>
        </section>
      ) : (
        <PlaceholderText height='large'>No results found for this query.</PlaceholderText>
      )}
    </SearchResultsContainer>
  );
};

export default PeopleSearch;
