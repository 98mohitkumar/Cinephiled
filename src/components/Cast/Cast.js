import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useRef } from "react";
import { BsChevronRight } from "react-icons/bs";

import { Span } from "components/MovieInfo/MovieDetailsStyles";
import PlaceholderText from "components/PlaceholderText";
import { blurPlaceholder } from "data/global";
import { getCleanTitle } from "utils/helper";

import { CastGrid, CastImg, CastWrapper, SeeMore } from "./CastStyles";

const Cast = ({ cast, showFullCastLink = false, isSearchGrid = false }) => {
  const router = useRouter();
  const routeRef = useRef(router.asPath);

  return (
    <Fragment>
      {cast.data.length > 0 ? (
        <CastGrid>
          {cast.data.map((item) => (
            <CastWrapper key={item.id}>
              <Link href={`/person/${item.id}-${getCleanTitle(item.name)}`} passHref>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1 }
                  }}
                  whileTap={{ scale: 0.95 }}>
                  <CastImg className='relative text-center'>
                    <Image
                      src={item.profile_path ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.profile_path}` : "/images/DefaultAvatar.png"}
                      alt='cast-image'
                      fill
                      style={{ objectFit: "cover", objectPosition: "top" }}
                      placeholder='blur'
                      blurDataURL={blurPlaceholder}
                    />
                  </CastImg>
                </motion.div>
              </Link>

              <div className='mt-12'>
                {isSearchGrid ? (
                  <Fragment>
                    <Span className='movieCastHead block font-semibold'>{item.name}</Span>
                    <Span className='movieCastName block text-neutral-400'>{item.known_for_department}</Span>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Span className='movieCastHead line-clamp-2 font-bold'>{item?.roles?.[0]?.character ?? item?.character}</Span>
                    <Span className='movieCastName block'>{item.name}</Span>
                    {item?.episode_count ? <Span className='movieCastName episode-count block'>{item?.episode_count} episodes</Span> : null}
                  </Fragment>
                )}
              </div>
            </CastWrapper>
          ))}

          {cast.totalCount > 15 && showFullCastLink ? (
            <Link href={`${routeRef.current}/cast`}>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.1 }
                }}
                whileTap={{ scale: 0.95 }}
                className='mb-auto mt-12'
                aria-label='full cast'>
                <SeeMore>
                  <BsChevronRight size='22' />
                </SeeMore>
                <Span className='mt-3 movieCastHead block font-bold'>Full Cast</Span>
              </motion.div>
            </Link>
          ) : null}
        </CastGrid>
      ) : (
        <PlaceholderText>TBA</PlaceholderText>
      )}
    </Fragment>
  );
};

export default Cast;
