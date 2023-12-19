import { CastGrid, CastImg, CastWrapper } from "components/Cast/CastStyles";
import DominantColor from "components/DominantColor/DominantColor";
import MetaWrapper from "components/MetaWrapper";
import { HeroInfoTitle, Span } from "components/MovieInfo/MovieDetailsStyles";
import { AnimatePresence, motion } from "framer-motion";
import { apiEndpoints, blurPlaceholder } from "globals/constants";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState, useRef } from "react";
import { getReleaseYear } from "src/utils/helper";
import { Error404, ModulesWrapper } from "styles/GlobalComponents";

const Cast = ({ movieData: { id, title, year, backdrop, poster }, cast, error }) => {
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
        description={error ? "Not Found" : `${title} cast`}
        image={`https://image.tmdb.org/t/p/w780${backdrop}`}
        url={`https://cinephiled.vercel.app/movies/${id}/cast`}
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
                <h3 className='mb-0 text-xl md:text-2xl font-semibold'>{`Cast (${cast.length})`}</h3>
                <input
                  type='text'
                  placeholder='Search cast'
                  className='px-4 py-2 rounded-lg bg-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent min-w-[320px] text-lg max-sm:min-w-full'
                  onChange={searchHandler}
                />
              </div>
            </div>

            <AnimatePresence exitBeforeEnter>
              {filteredCast?.length > 0 ? (
                <CastGrid
                  as={motion.div}
                  key={`cast-grid-${filteredCast.length}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.325 }}>
                  {filteredCast.map(({ credit_id, id, name, profile_path, character }) => (
                    <CastWrapper key={credit_id}>
                      <Link href={`/person/${id}-${name.replace(/[' ', '/']/g, "-")}`} passHref>
                        <a>
                          <motion.div
                            whileHover={{
                              scale: 1.05,
                              transition: { duration: 0.1 }
                            }}
                            whileTap={{ scale: 0.95 }}>
                            <CastImg className='relative text-center'>
                              <Image
                                src={
                                  profile_path
                                    ? `https://image.tmdb.org/t/p/w276_and_h350_face${profile_path}`
                                    : "/Images/DefaultAvatar.png"
                                }
                                alt='cast-image'
                                layout='fill'
                                objectFit='cover'
                                objectPosition='top'
                                placeholder='blur'
                                blurDataURL={blurPlaceholder}
                              />
                            </CastImg>
                          </motion.div>
                        </a>
                      </Link>

                      <div className='mt-3'>
                        <Span className='font-bold movieCastHead line-clamp-2'>{character}</Span>
                        <Span className='movieCastName block'>{name}</Span>
                      </div>
                    </CastWrapper>
                  ))}
                </CastGrid>
              ) : (
                <motion.div
                  className='text-center text-2xl py-6'
                  key='no-results'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.325 }}>
                  No results found
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
    const res = await fetch(apiEndpoints.movie.getMovieCredits({ id }));

    if (res.ok) {
      const data = await res.json();

      return {
        movieData: {
          title: data?.title,
          year: getReleaseYear(data?.release_date),
          id: data?.id,
          backdrop: data?.backdrop_path,
          poster: data?.poster_path
        },
        cast: data?.credits?.cast || [],
        error: false
      };
    }

    return {
      movieData: {},
      cast: [],
      error: true
    };
  } catch {
    return {
      movieData: {},
      cast: [],
      error: true
    };
  }
};

export default Cast;
