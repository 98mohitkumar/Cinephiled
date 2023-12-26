import MoviesTemplate from "components/MediaTemplate/MoviesTemplate";
import { motion } from "framer-motion";
import { apiEndpoints } from "globals/constants";
import { Fragment, useEffect, useState } from "react";
import { framerTabVariants, getCountryCode } from "src/utils/helper";
import { ModulesWrapper } from "styles/GlobalComponents";

const NowPlayingMovies = () => {
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    const AbortCtrl = new AbortController();

    const getNowPlaying = async () => {
      const region = await getCountryCode();

      const res = await fetch(apiEndpoints.movie.nowPlaying({ region }), {
        signal: AbortCtrl.signal
      });

      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error("Failed to fetch now playing movies");
      }
    };

    getNowPlaying()
      .then((data) => setNowPlaying(data.results))
      .catch(() => setNowPlaying([]));

    return () => AbortCtrl.abort();
  }, []);

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
