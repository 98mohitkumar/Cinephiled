import { AnimatePresence, motion } from "motion/react";
import { Fragment, useRef, useState } from "react";

import { HeroInfoTitle } from "components/MovieInfo/MovieDetailsStyles";
import PlaceholderText from "components/PlaceholderText";
import DominantColor from "components/Shared/DominantColor/DominantColor";
import { ModulesWrapper } from "styles/GlobalComponents";
import { framerTabVariants } from "utils/helper";

import Cast from "./Cast";

// const test = 1;

const CastPage = ({ media: { title, year, poster }, cast }) => {
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
        ({ name, character }) => name.toLowerCase().includes(searchValue) || character.toLowerCase().includes(searchValue)
      );
      setFilteredCast(filteredCast);
    }, 300);
  };

  return (
    <Fragment>
      <div className='relative mb-auto'>
        <DominantColor image={poster} flip tint />
        <ModulesWrapper className='relative z-10'>
          <div className='py-6 text-center'>
            <div className='my-5 lg:my-10'>
              <HeroInfoTitle className='!font-semibold'>
                {title} ({year})
              </HeroInfoTitle>
            </div>

            <div className='gap-5 flex items-center justify-between py-2 max-sm:flex-col'>
              <h3 className='text-2xl md:text-3xl mb-0 font-semibold'>{`Cast (${cast?.length})`}</h3>
              <input
                type='text'
                placeholder='Search cast'
                className='text-lg min-w-[320px] rounded-lg bg-neutral-600 px-4 py-2 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-neutral-400 max-sm:min-w-full'
                onChange={searchHandler}
              />
            </div>
          </div>

          <AnimatePresence mode='wait'>
            {filteredCast?.length > 0 ? (
              <Cast cast={{ data: filteredCast }} />
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
    </Fragment>
  );
};

export default CastPage;
