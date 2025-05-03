import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import { apiEndpoints } from "data/apiEndpoints";
import useInfiniteQuery from "hooks/useInfiniteQuery";

const CompanyTVTab = ({ initialData, id }) => {
  const { list } = useInfiniteQuery({
    initialPage: 3,
    getEndpoint: ({ page }) => apiEndpoints.company.companyTv({ id, pageQuery: page })
  });

  const renderList = initialData.concat(list);

  return <MediaTemplateGrid media={renderList} mediaType='tv' />;
};

export default CompanyTVTab;
