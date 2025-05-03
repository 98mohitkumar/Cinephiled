import PlaceholderText from "components/Shared/PlaceholderText";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import LayoutContainer from "components/UI/LayoutContainer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/UI/Select";
import { apiEndpoints } from "data/apiEndpoints";
import { sortOptions } from "data/global";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import useSort from "hooks/useSort";

const NetworkPage = ({ id, media }) => {
  const {
    tmdbOptions: { tv: tvSortOptions }
  } = sortOptions;
  const defaultSortOption = tvSortOptions.find((option) => option?.isDefault)?.value;
  const { sortBy, handleSortSelection } = useSort({ shallow: false, defaultSortOption });
  const { list, resetQueryState } = useInfiniteQuery({
    initialPage: 3,
    getEndpoint: ({ page }) => apiEndpoints.network.networkMedia({ id, pageQuery: page, sortBy })
  });

  // check if media is empty
  if (media.length === 0) {
    return <PlaceholderText height='large'>No TV Shows are available for this network</PlaceholderText>;
  }

  const handleSort = (key) => {
    handleSortSelection(key);
    resetQueryState();
  };

  const renderList = media.concat(list);

  return (
    <LayoutContainer className='grow py-24'>
      <div className='mb-2432 flex items-center justify-end gap-10'>
        <Select defaultValue={sortBy} onValueChange={handleSort}>
          <SelectTrigger className='w-fit min-w-[250px]'>
            <SelectValue placeholder='Sort By:' />
          </SelectTrigger>
          <SelectContent position='popper' align='end'>
            {tvSortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <MediaTemplateGrid media={renderList} mediaType='tv' />
    </LayoutContainer>
  );
};

export default NetworkPage;
