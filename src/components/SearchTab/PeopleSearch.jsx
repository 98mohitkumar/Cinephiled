import { Fragment } from "react";

import PlaceholderText from "components/Shared/PlaceholderText";
import { PeopleTemplateGrid } from "components/Templates/PeopleTemplate";
import { apiEndpoints } from "data/apiEndpoints";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import { removeDuplicates } from "utils/helper";

const PeopleSearch = ({ searchQuery, people }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    getEndpoint: ({ page }) =>
      apiEndpoints.search.personSearch({
        query: searchQuery,
        pageQuery: page
      })
  });
  const { cleanedItems } = removeDuplicates(people.results.concat(list));

  return (
    <Fragment>
      {cleanedItems?.length > 0 ? (
        <PeopleTemplateGrid items={cleanedItems} />
      ) : (
        <PlaceholderText height='large'>No results found for this query.</PlaceholderText>
      )}
    </Fragment>
  );
};

export default PeopleSearch;
