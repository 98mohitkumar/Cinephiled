import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import { apiEndpoints } from "data/apiEndpoints";
import useInfiniteQuery from "hooks/useInfiniteQuery";

const CompanyTVTab = ({ initialData, id }) => {
  const { list, isLoading } = useInfiniteQuery({
    initialPage: 3,
    getEndpoint: ({ page }) => apiEndpoints.company.companyTv({ id, pageQuery: page })
  });

  const renderList = initialData.concat(list);

  return <MediaTemplateGrid media={renderList} mediaType='tv' isLoadingNewItems={isLoading} />;
};

export default CompanyTVTab;
