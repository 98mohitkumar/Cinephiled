import { CastGrid, CastImg, CastWrapper } from "components/Cast/CastStyles";
import DominantColor from "components/DominantColor/DominantColor";
import MetaWrapper from "components/MetaWrapper";
import { HeroInfoTitle, Span } from "components/MovieInfo/MovieDetailsStyles";
import PlaceholderText from "components/PlaceholderText";
import { AnimatePresence, motion } from "framer-motion";
import { apiEndpoints, blurPlaceholder } from "globals/constants";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useRef, useState } from "react";
import {
  fetchOptions,
  framerTabVariants,
  getCleanTitle,
  getReleaseYear,
  mergeEpisodeCount
} from "src/utils/helper";
import { Error404, ModulesWrapper } from "styles/GlobalComponents";

const Cast = ({ tvData: { id, title, year, backdrop, poster }, cast, error }) => {
  const [filteredCast, setFilteredCast] = useState(cast);
  const timeoutRef = useRef(null);

  const searchHandler = (e) => {
    clearTimeout(timeoutRef.current);
    if (e.target.value.trim().length === 0) {
      setFilteredCast(cast);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      const searchValue = e.target.value.toLowerCase();
      const filteredCast = cast.filter(
        ({ name, character }) =>
          name.toLowerCase().includes(searchValue) || character.toLowerCase().includes(searchValue)
      );
      setFilteredCast(filteredCast);
    }, 300);
  };

  return (
    <Fragment>
      <MetaWrapper
        title={error ? "Not Found - Cinephiled" : `${title} (${year}) - Cast - cinephiled`}
        description={`${title} cast`}
        image={`https://image.tmdb.org/t/p/w780${backdrop}`}
        url={`https://cinephiled.vercel.app/tv/${id}/cast`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <div className='relative mb-auto'>
          <DominantColor image={poster} flip tint />
          <ModulesWrapper className='relative z-10'>
            <div className='text-center py-6'>
              <HeroInfoTitle className='mb-4'>
                {title} ({year})
              </HeroInfoTitle>

              <div className='flex justify-between items-center py-2 max-sm:flex-col gap-5'>
                <h3 className='mb-0 text-2xl md:text-3xl font-semibold'>{`Cast (${cast?.length})`}</h3>
                <input
                  type='text'
                  placeholder='Search cast'
                  className='px-4 py-2 rounded-lg bg-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent min-w-[320px] text-lg max-sm:min-w-full'
                  onChange={searchHandler}
                />
              </div>
            </div>

            <AnimatePresence mode='wait'>
              {filteredCast?.length > 0 ? (
                <CastGrid
                  as={motion.div}
                  key={`cast-grid-${filteredCast.length}`}
                  variants={framerTabVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  transition={{ duration: 0.325 }}>
                  {filteredCast.map((item) => (
                    <CastWrapper key={item.credit_id}>
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
                          {item?.character}
                        </Span>
                        <Span className='movieCastName block'>{item.name}</Span>
                        <Span className='movieCastName block episode-count'>
                          {item?.episode_count} episodes
                        </Span>
                      </div>
                    </CastWrapper>
                  ))}
                </CastGrid>
              ) : (
                <motion.div
                  key='no-results'
                  variants={framerTabVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  transition={{ duration: 0.325 }}>
                  <PlaceholderText height='large'>No results found</PlaceholderText>
                </motion.div>
              )}
            </AnimatePresence>
          </ModulesWrapper>
        </div>
      )}
    </Fragment>
  );
};

Cast.getInitialProps = async (ctx) => {
  try {
    const { id } = ctx.query;
    const res = await fetch(apiEndpoints.tv.getTvCredits({ id }), fetchOptions());

    if (res.ok) {
      const data = await res.json();

      const releaseYear = getReleaseYear(data?.first_air_date);

      return {
        tvData: {
          title: data?.name ?? "",
          year: releaseYear,
          backdrop: data?.backdrop_path,
          poster: data?.poster_path,
          id: data?.id
        },
        cast: mergeEpisodeCount(
          data?.aggregate_credits?.cast
            .map(({ roles, ...rest }) => roles.map((role) => ({ ...rest, ...role })))
            .flat()
        ),
        error: false
      };
    }
    return {
      tvData: {},
      cast: [],
      error: true
    };
  } catch {
    return {
      tvData: {},
      cast: [],
      error: true
    };
  }
};

export default Cast;
