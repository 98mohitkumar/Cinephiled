import { Fragment } from "react";

import MetaWrapper from "components/Shared/MetaWrapper";
import PlaceholderText from "components/Shared/PlaceholderText";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import LayoutContainer from "components/UI/LayoutContainer";
import H3 from "components/UI/Typography/H3";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES, siteInfo } from "data/global";
import { fetchOptions, getNiceName } from "utils/helper";

const Keyword = ({ results, name, id }) => {
  return (
    <Fragment>
      <MetaWrapper
        title={`${name} - Movies`}
        description={`Movies matching the keyword : ${name}`}
        url={`${siteInfo.url}/${ROUTES.keywords}/${getNiceName({ id, name })}`}
      />

      <LayoutContainer className='py-2440'>
        <H3 tag='p' weight='semibold' className='mb-2440'>
          Movies matching : {name}
        </H3>

        {results?.length > 0 ? (
          <MediaTemplateGrid media={results} mediaType='movie' />
        ) : (
          <PlaceholderText height='large'>No Movie results for this keyword.</PlaceholderText>
        )}
      </LayoutContainer>
    </Fragment>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const keyword = ctx.query.id;
    const keywordRes = await fetch(apiEndpoints.keywords.keywordDetails(keyword), fetchOptions());

    if (!keywordRes.ok) {
      throw new Error("error fetch data");
    }

    const keywordData = await keywordRes.json();

    return {
      props: {
        results: keywordData.results,
        name: keyword.split("-").slice(1).join(" "),
        id: keyword
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};
export default Keyword;
