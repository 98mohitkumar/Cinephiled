import { Span } from "components/MovieInfo/MovieDetailsStyles";
import PlaceholderText from "components/PlaceholderText";
import { motion } from "framer-motion";
import { blurPlaceholder } from "globals/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useRef } from "react";
import { BsChevronRight } from "react-icons/bs";
import { getCleanTitle } from "src/utils/helper";
import { CastGrid, CastImg, CastWrapper, SeeMore } from "./CastStyles";

const Cast = ({ cast }) => {
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
                      src={
                        item.profile_path
                          ? `https://image.tmdb.org/t/p/w276_and_h350_face${item.profile_path}`
                          : "/Images/DefaultAvatar.png"
                      }
                      alt='cast-image'
                      fill
                      style={{ objectFit: "cover", objectPosition: "top" }}
                      placeholder='blur'
                      blurDataURL={blurPlaceholder}
                    />
                  </CastImg>
                </motion.div>
              </Link>

              <div className='mt-3'>
                <Span className='font-bold movieCastHead line-clamp-2'>
                  {item?.roles?.[0]?.character ?? item?.character}
                </Span>
                <Span className='movieCastName block'>{item.name}</Span>
                {item?.episode_count ? (
                  <Span className='movieCastName block episode-count'>
                    {item?.episode_count} episodes
                  </Span>
                ) : null}
              </div>
            </CastWrapper>
          ))}

          {cast.totalCount > 15 ? (
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
                <Span className='mt-3 font-bold movieCastHead block'>Full Cast</Span>
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
