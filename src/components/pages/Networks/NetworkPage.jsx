import { Link2, MapPin } from "lucide-react";
import Image from "next/image";

import PlaceholderText from "components/Shared/PlaceholderText";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import FlexBox from "components/UI/FlexBox";
import LayoutContainer from "components/UI/LayoutContainer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/UI/Select";
import P from "components/UI/Typography/P";
import { apiEndpoints } from "data/apiEndpoints";
import { sortOptions } from "data/global";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import useSort from "hooks/useSort";
import { getTMDBImage } from "utils/imageHelper";

import BackdropBanner from "../HomePage/Hero/BackdropBanner";

import { NetwrokDetailsWrapper } from "./NetworkPageStyles";

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

  const backdrops = media.concat(media).map(({ id, backdrop_path }) => ({ id, src: backdrop_path }));
  const renderList = media.concat(list);
  const logo = details?.images?.logos?.at(0);

  return (
    <div>
      <div css={NetwrokDetailsWrapper}>
        <div className='absolute inset-0 -z-1 overflow-hidden'>
          <BackdropBanner backdrops={backdrops} />
        </div>

        <div className='relative z-10 p-32 text-center'>
          <div className='logo-wrapper m-auto' style={{ "--aspectRatio": logo?.aspect_ratio }}>
            <Image
              src={`${getTMDBImage({ path: logo?.file_path, type: "logo", size: "w300_filter(negate,555,000)" })}`}
              alt={`${details?.name}-poster`}
              fill
              priority
              className='object-cover'
            />
          </div>

          <FlexBox className='mt-1624 flex-wrap items-center justify-center gap-x-1632 gap-y-8 max-sm:flex-col'>
            <P weight='semibold' size='large'>
              {details.name}
            </P>

            {details?.headquarters || details?.origin_country ? (
              <FlexBox className='items-center gap-6'>
                <MapPin size={20} />
                <P weight='semibold' size='large'>
                  {details.headquarters || details.origin_country}
                </P>
              </FlexBox>
            ) : null}

            {details.homepage ? (
              <FlexBox className='items-center gap-6'>
                <Link2 size={20} />
                <P
                  tag='a'
                  href={details?.homepage}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline decoration-dotted underline-offset-4 transition-colors can-hover:text-cyan-300'
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
