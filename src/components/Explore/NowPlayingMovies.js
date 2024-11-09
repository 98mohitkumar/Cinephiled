import MoviesTemplate from "components/MediaTemplate/MoviesTemplate";
import { ModulesWrapper } from "styles/GlobalComponents";

const NowPlayingMovies = ({ nowPlaying }) => {
  return (
    <div className='mt-6 pt-6'>
      <h2 className='mb-6 block text-center text-[calc(1.375rem_+_1.5vw)] font-bold text-white xl:text-[2.5rem]'>Movies playing in theaters</h2>

      <ModulesWrapper>
        <MoviesTemplate movies={nowPlaying} />
      </ModulesWrapper>
    </div>
  );
};

export default NowPlayingMovies;
