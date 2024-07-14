import MoviesTemplate from "components/MediaTemplate/MoviesTemplate";
import { ModulesWrapper } from "styles/GlobalComponents";

const NowPlayingMovies = ({ nowPlaying }) => {
  return (
    <div className='pt-6 mt-6'>
      <h2 className='text-[calc(1.375rem_+_1.5vw)] xl:text-[2.5rem] font-bold text-white text-center block mb-6'>
        Movies playing in theaters
      </h2>

      <ModulesWrapper>
        <MoviesTemplate movies={nowPlaying} />
      </ModulesWrapper>
    </div>
  );
};

export default NowPlayingMovies;
