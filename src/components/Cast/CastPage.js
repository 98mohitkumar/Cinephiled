import DominantColor from "components/DominantColor/DominantColor";
import { HeroInfoTitle } from "components/MovieInfo/MovieDetailsStyles";
import PlaceholderText from "components/PlaceholderText";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useRef, useState } from "react";
import { framerTabVariants } from "src/utils/helper";
import { ModulesWrapper } from "styles/GlobalComponents";
import Cast from "./Cast";

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
        ({ name, character }) =>
          name.toLowerCase().includes(searchValue) || character.toLowerCase().includes(searchValue)
      );
      setFilteredCast(filteredCast);
    }, 300);
  };

  return (
    <Fragment>
      <div className='relative mb-auto'>
        <DominantColor image={poster} flip tint />
        <ModulesWrapper className='relative z-10'>
          <div className='text-center py-6'>
            <div className='my-5 lg:my-10'>
              <HeroInfoTitle className='!font-semibold'>
                {title} ({year})
              </HeroInfoTitle>
            </div>

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
