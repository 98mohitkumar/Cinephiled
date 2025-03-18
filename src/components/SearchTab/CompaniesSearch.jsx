import Link from "next/link";
import { Fragment } from "react";

import PlaceholderText from "components/Shared/PlaceholderText";
import H1 from "components/UI/Typography/H1";
import P from "components/UI/Typography/P";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES } from "data/global";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import { getNiceName } from "utils/helper";

const CompaniesSearch = ({ companies, searchQuery }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    getEndpoint: ({ page }) =>
      apiEndpoints.search.companySearch({
        query: searchQuery,
        pageQuery: page
      })
  });

  const renderList = companies?.results.concat(list);

  return (
    <Fragment>
      {renderList?.length > 0 ? (
        <div className='mx-auto flex max-w-screen-xl flex-col items-start gap-16'>
          {renderList.map((company) => (
            <Link
              key={company.id}
              title={`${company?.name} ${company?.origin_country ? `(${company?.origin_country})` : ""}`}
              href={`/${ROUTES.companies}/${getNiceName({ id: company.id, name: company.name })}`}
              className='flex items-center gap-12'>
              <H1 as='span' weight='medium' className='transition-colors can-hover:text-neutral-500'>
                {company.name}
              </H1>
              {company.origin_country && (
                <P
                  className='flex aspect-square w-6 items-center justify-center whitespace-nowrap rounded-sm bg-neutral-600'
                  weight='bold'
                  size='tiny'>
                  {company.origin_country}
                </P>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <PlaceholderText height='large'>No results found for this query.</PlaceholderText>
      )}
    </Fragment>
  );
};

export default CompaniesSearch;
