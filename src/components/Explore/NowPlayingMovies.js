import MoviesTemplate from "components/MediaTemplate/MoviesTemplate";
import { motion } from "framer-motion";
import { Fragment } from "react";
import { framerTabVariants } from "src/utils/helper";
import { ModulesWrapper } from "styles/GlobalComponents";

const NowPlayingMovies = ({ nowPlaying }) => {
  return (
    <Fragment>
      {nowPlaying?.length > 0 ? (
        <motion.div
          variants={framerTabVariants}
          initial='hidden'
          animate='visible'
          exit='hidden'
          transition={{ duration: 0.75 }}
          className='pt-6 mt-6'>
          <h2 className='text-[calc(1.375rem_+_1.5vw)] xl:text-[2.5rem] font-bold text-white text-center block mb-6'>
            Movies playing in theaters
          </h2>

          <ModulesWrapper>
            <MoviesTemplate movies={nowPlaying} />
          </ModulesWrapper>
        </motion.div>
      ) : null}
    </Fragment>
  );
};

export default NowPlayingMovies;
