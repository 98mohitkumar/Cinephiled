import { Link2, MapPin } from "lucide-react";
import Image from "next/image";

import PlaceholderText from "components/Shared/PlaceholderText";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import FlexBox from "components/UI/FlexBox";
import LayoutContainer from "components/UI/LayoutContainer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/UI/Select";
import P from "components/UI/Typography/P";
import { apiEndpoints } from "data/apiEndpoints";
import { blurPlaceholder, sortOptions } from "data/global";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import useSort from "hooks/useSort";
import { getTMDBImage } from "utils/imageHelper";

import { NetwrokDetailsWrapper, PostersGrid } from "./NetworkPageStyles";

const NetworkPage = ({ details, media }) => {
  const {
    tmdbOptions: { tv: tvSortOptions }
  } = sortOptions;
  const defaultSortOption = tvSortOptions.find((option) => option?.isDefault)?.value;
  const { sortBy, handleSortSelection } = useSort({ shallow: false, defaultSortOption });
  const { list, resetQueryState } = useInfiniteQuery({
    initialPage: 2,
    getEndpoint: ({ page }) => apiEndpoints.network.networkMedia({ id: details.id, pageQuery: page, sortBy })
  });

  const handleSort = (key) => {
    handleSortSelection(key);
    resetQueryState();
  };

  // check if media is empty
  if (media.length === 0) {
    return <PlaceholderText height='large'>No TV Shows are available for this network</PlaceholderText>;
  }

  // get posters of hero posters grid
  const posters = media.map(({ poster_path }) => (poster_path ? `https://image.tmdb.org/t/p/w185${poster_path}` : null)).filter(Boolean);

  if (posters.length % 2 !== 0 && posters.length > 10) {
    posters.pop();
  }

  let colCount;
  const postersLength = posters?.length;

  if (postersLength > 10) {
    colCount = Math.ceil(postersLength / 2) % 2 === 0 ? Math.ceil(postersLength / 2) : Math.ceil(postersLength / 2) + 1;
  } else {
    colCount = postersLength;
  }

  const renderList = media.concat(list);

  return (
    <div>
      <div css={NetwrokDetailsWrapper}>
        {postersLength > 0 ? (
          <div css={PostersGrid} className={postersLength <= 10 ? "alt-grid" : ""} $colCount={colCount || 10}>
            {posters.map((poster, i) => (
              <div key={`item -${i}`} className='poster-wrapper relative aspect-poster'>
                <Image
                  fill
                  src={poster}
                  alt={`${details?.name}-poster`}
                  style={{ objectFit: "cover" }}
                  placeholder='blur'
                  loading='eager'
                  blurDataURL={blurPlaceholder}
                  className='rounded-lg'
                />
              </div>
            ))}
          </div>
        ) : null}

        <div className='relative z-10 p-32 text-center'>
          <div
            className='logo-wrapper m-auto'
            style={{
              "--aspectRatio": details?.images?.logos?.[0]?.aspect_ratio
            }}>
            <Image
              src={`${getTMDBImage({ path: details?.images?.logos?.[0]?.file_path, type: "logo", size: "w300_filter(negate,000,111)" })}`}
              alt={`${details?.name}-poster`}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <FlexBox className='mt-1624 flex-wrap items-center justify-center gap-x-1632 gap-y-8 max-sm:flex-col'>
            <P weight='semibold' size='large'>
              {details.name}
            </P>

            {details?.headquarters || details?.origin_country ? (
              <FlexBox className='items-center gap-4'>
                <MapPin size={20} />
                <P weight='semibold' size='large'>
                  {details.headquarters || details.origin_country}
                </P>
              </FlexBox>
            ) : null}

            {details.homepage ? (
              <FlexBox className='items-center gap-4'>
                <Link2 size={20} />
                <P
                  tag='a'
                  href={details?.homepage}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline decoration-dotted underline-offset-4'
                  weight='semibold'
                  size='large'>
                  Homepage
                </P>
              </FlexBox>
            ) : null}
          </FlexBox>
        </div>
      </div>

      <LayoutContainer className='py-24'>
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
    </div>
  );
};

export default NetworkPage;
