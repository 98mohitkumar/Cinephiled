import PlaceholderText from "components/PlaceholderText";
import Recommendations from "components/Recommendations/Recommendations";
import { apiEndpoints } from "data/apiEndpoints";
import useInfiniteQuery from "hooks/useInfiniteQuery";

import { SearchResultsContainer } from "./SearchTabStyles";

const CollectionsSearch = ({ collections, searchQuery }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    getEndpoint: ({ page }) =>
      apiEndpoints.search.collectionSearch({
        query: searchQuery,
        pageQuery: page
      })
  });

  const renderList = collections?.results.concat(list);

  return (
    <SearchResultsContainer>
      {renderList?.length > 0 ? (
        <section className='mt-6'>
          <Recommendations data={collections.results} type='collection' />
        </section>
      ) : (
        <PlaceholderText height='large'>No results found for this query.</PlaceholderText>
      )}
    </SearchResultsContainer>
  );
};

export default CollectionsSearch;
