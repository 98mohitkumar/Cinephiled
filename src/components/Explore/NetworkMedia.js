import Image from "next/image";
import { Fragment } from "react";
import { FaLink } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import NetworkMediaGrid from "components/MediaTemplate/TVTemplate";
import { PostersImg } from "components/Posters/PostersStyles";
// import Select from "components/Select/Select";
import { apiEndpoints } from "data/apiEndpoints";
import { blurPlaceholder } from "data/global";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import useSort from "hooks/useSort";
import { ModulesWrapper } from "styles/GlobalComponents";

import { NetwrokDetailsWrapper, PostersGrid } from "./ExploreStyles";

const NetworkMedia = ({ details, media }) => {
  const posters = media.map(({ poster_path }) => (poster_path ? `https://image.tmdb.org/t/p/w185${poster_path}` : "/Images/DefaultImage.png"));

  const { sortBy } = useSort({ shallow: false });

  const { list } = useInfiniteQuery({
    initialPage: 2,
    getEndpoint: ({ page }) => apiEndpoints.network.networkMedia({ id: details.id, pageQuery: page, sortBy })
  });

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

  // const networkMediaSortOptions = sortOptions.tmdbOptions.tv;

  // const handleSort = (key) => {
  //   handleSortSelection(key);
  //   resetQueryState();
  // };

  return (
    <Fragment>
      <NetwrokDetailsWrapper>
        {postersLength > 0 ? (
          <PostersGrid className={postersLength <= 10 ? "alt-grid" : ""} $colCount={colCount || 10}>
            {posters.map((poster, i) => (
              <PostersImg key={`item -${i}`} className='poster-wrapper relative'>
                <Image
                  src={poster}
                  alt={`${details?.name}-poster`}
                  fill
                  style={{ objectFit: "cover" }}
                  placeholder='blur'
                  loading='eager'
                  blurDataURL={blurPlaceholder}
                />
              </PostersImg>
            ))}
          </PostersGrid>
        ) : null}

        <div className='network-info mb-4 p-8 text-center'>
          <div
            className='logo-wrapper m-auto'
            style={{
              "--aspectRatio": details?.images?.logos?.[0]?.aspect_ratio
            }}>
            <Image
              src={`https://image.tmdb.org/t/p/w300_filter(negate,000,111)${details?.images?.logos?.[0]?.file_path}`}
              alt={`${details?.name}-poster`}
              fill
              style={{ objectFit: "cover" }}
              loading='eager'
            />
          </div>

          <div className='details-row'>
            <span className='font-bold'>{details.name}</span>
            {details?.headquarters || details?.origin_country ? (
              <div className='flex items-center'>
                <FaLocationDot className='me-1' size={18} />
                <span className='font-bold'>{details.headquarters || details.origin_country}</span>
              </div>
            ) : null}
            {details.homepage ? (
              <div className='flex items-center'>
                <FaLink className='me-1' size={18} />
                <a href={details?.homepage} target='_blank' rel='noopener noreferrer' className='link font-bold'>
                  Homepage
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </NetwrokDetailsWrapper>

      <ModulesWrapper>
        {/* <div className='mb-8 flex justify-end'>
          <Select
            options={networkMediaSortOptions}
            activeKey={sortBy || "default"}
            triggerText={getActiveSortKey({
              options: networkMediaSortOptions,
              sortBy,
              defaultKey: "default"
            })}
            baseSizeOptions
            label='Sort By:'
            handleChange={handleSort}
          />
        </div> */}

        <NetworkMediaGrid TV={media.concat(list)} />
      </ModulesWrapper>
    </Fragment>
  );
};

export default NetworkMedia;
