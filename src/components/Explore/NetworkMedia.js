import NetworkMediaGrid from "components/Popular/PopularTV";
import { PostersImg } from "components/Posters/PostersStyles";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import Image from "next/image";
import { Fragment } from "react";
import { FaLink } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { NetwrokDetailsWrapper, PostersGrid } from "./ExploreStyles";

const NetworkMedia = ({ details, media }) => {
  const posters = media.map(({ poster_path }) => `https://image.tmdb.org/t/p/w780${poster_path}`);

  const { list } = useInfiniteQuery({
    initialPage: 2,
    type: "networkMedia",
    networkId: details.id
  });

  return (
    <Fragment>
      <NetwrokDetailsWrapper>
        <PostersGrid>
          {posters.map((poster) => (
            <PostersImg key={poster} className='position-relative poster-wrapper'>
              <Image
                src={poster}
                alt={`${details.name}-poster`}
                layout='fill'
                objectFit='cover'
                placeholder='blur'
                loading='eager'
                blurDataURL='data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA=='
              />
            </PostersImg>
          ))}
        </PostersGrid>

        <div className='text-center network-info mb-4'>
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
            <span className='fw-bold'>{details.name}</span>
            {(details.headquarters || details.origin_country) && (
              <div className='d-flex align-items-center'>
                <FaLocationDot className='me-1' size={18} />
                <span className='fw-bold'>{details.headquarters || details.origin_country}</span>
              </div>
            )}
            {details.homepage && (
              <div className='d-flex align-items-center'>
                <FaLink className='me-1' size={18} />
                <a
                  href={details.homepage}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='fw-bold link'>
                  Homepage
                </a>
              </div>
            )}
          </div>
        </div>
      </NetwrokDetailsWrapper>

      <NetworkMediaGrid TV={media.concat(list)} />
    </Fragment>
  );
};

export default NetworkMedia;
