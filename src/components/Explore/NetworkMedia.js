import NetworkMediaGrid from "components/MediaTemplate/TVTemplate";
import { PostersImg } from "components/Posters/PostersStyles";
import { blurPlaceholder } from "globals/constants";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import Image from "next/image";
import { Fragment } from "react";
import { FaLink } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { ModulesWrapper } from "styles/GlobalComponents";
import { NetwrokDetailsWrapper, PostersGrid } from "./ExploreStyles";

const NetworkMedia = ({ details, media }) => {
  const posters = media.map(({ poster_path }) => `https://image.tmdb.org/t/p/w185${poster_path}`);

  const { list } = useInfiniteQuery({
    initialPage: 2,
    type: "networkMedia",
    networkId: details.id
  });

  if (posters.length % 2 !== 0 && posters.length > 10) {
    posters.pop();
  }

  let colCount;
  const postersLength = posters?.length;

  if (postersLength > 10) {
    colCount =
      Math.ceil(postersLength / 2) % 2 === 0
        ? Math.ceil(postersLength / 2)
        : Math.ceil(postersLength / 2) + 1;
  } else {
    colCount = postersLength;
  }

  return (
    <Fragment>
      <NetwrokDetailsWrapper>
        <PostersGrid className={postersLength <= 10 ? "alt-grid" : ""} colCount={colCount || 10}>
          {postersLength > 0
            ? posters.map((poster) => (
                <PostersImg key={poster} className='relative poster-wrapper'>
                  <Image
                    src={poster}
                    alt={`${details.name}-poster`}
                    layout='fill'
                    objectFit='cover'
                    placeholder='blur'
                    loading='eager'
                    blurDataURL={blurPlaceholder}
                  />
                </PostersImg>
              ))
            : null}
        </PostersGrid>

        <div className='text-center network-info p-4 mb-4'>
          <div
            className='logo-wrapper m-auto'
            style={{
              "--aspectRatio": details.images.logos[0].aspect_ratio
            }}>
            <Image
              src={`https://image.tmdb.org/t/p/w300_filter(negate,000,666)${details.images.logos[0].file_path}`}
              alt={`${details.name}-poster`}
              layout='fill'
              objectFit='cover'
              loading='eager'
            />
          </div>

          <div className='details-row'>
            <span className='font-bold'>{details.name}</span>
            {details.headquarters || details.origin_country ? (
              <div className='flex items-center'>
                <FaLocationDot className='me-1' size={18} />
                <span className='font-bold'>{details.headquarters || details.origin_country}</span>
              </div>
            ) : null}
            {details.homepage ? (
              <div className='flex items-center'>
                <FaLink className='me-1' size={18} />
                <a
                  href={details.homepage}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-bold link'>
                  Homepage
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </NetwrokDetailsWrapper>

      <ModulesWrapper>
        <NetworkMediaGrid TV={media.concat(list)} />
      </ModulesWrapper>
    </Fragment>
  );
};

export default NetworkMedia;
