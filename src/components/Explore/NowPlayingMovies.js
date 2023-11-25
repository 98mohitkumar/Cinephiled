import MoviesGrid from "components/Popular/PopularMovies";
import { motion } from "framer-motion";
import { apiEndpoints } from "globals/constants";
import useGetRegion from "hooks/useGetRegion";
import { Fragment, useEffect, useState } from "react";

const NowPlayingMovies = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const { loading, region } = useGetRegion();

  useEffect(() => {
    const AbortCtrl = new AbortController();

    const getNowPlaying = async () => {
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

    if (!loading) {
      getNowPlaying()
        .then((data) => setNowPlaying(data.results))
        .catch(() => setNowPlaying([]));
    }

    return () => AbortCtrl.abort();
  }, [region, loading]);

  return (
    <Fragment>
      {!loading && nowPlaying?.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75 }}
          className='pt-4 mt-4'>
          <h2 className='display-6 fw-bold text-white text-center mt-3 mb-4 d-block px-4'>
            Movies playing in theaters
          </h2>
          <MoviesGrid
            movies={nowPlaying?.sort((a, b) => Date.parse(b.popularity) - Date.parse(a.popularity))}
          />
        </motion.div>
      )}
    </Fragment>
  );
};

export default NowPlayingMovies;
