import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import { apiEndpoints } from "data/apiEndpoints";
import useInfiniteQuery from "hooks/useInfiniteQuery";

const CompanyMoviesTab = ({ initialData, id }) => {
  const { list, isLoading } = useInfiniteQuery({
    initialPage: 3,
    getEndpoint: ({ page }) => apiEndpoints.company.companyMovies({ id, pageQuery: page })
  });

  const renderList = initialData.concat(list);

  return <MediaTemplateGrid media={renderList} mediaType='movie' isLoadingNewItems={isLoading} />;
};

export default CompanyMoviesTab;
