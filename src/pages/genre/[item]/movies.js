import { Fragment } from "react";
import DominantColor from "components/DominantColor/DominantColor";
import MoviesTemplate from "components/MediaTemplate/MoviesTemplate";
import MetaWrapper from "components/MetaWrapper";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import PlaceholderText from "components/PlaceholderText";
import Select from "components/Select/Select";
import { apiEndpoints, sortOptions } from "globals/constants";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import useSort from "hooks/useSort";
import { getActiveSortKey } from "src/utils/getSortedItems";
import { ModulesWrapper } from "styles/GlobalComponents/index";
import { fetchOptions, getCleanTitle, removeDuplicates } from "utils/helper";

const Movies = ({ renderList, genreName, genreId }) => {
  const { sortBy, handleSortSelection } = useSort({ shallow: false });

  const {
    tmdbOptions: { movie: movieSortOptions }
  } = sortOptions;

  const { list, resetQueryState } = useInfiniteQuery({
    initialPage: 3,
    getEndpoint: ({ page }) => apiEndpoints.movie.movieGenre({ genreId, pageQuery: page, sortBy })
  });

  const { cleanedItems } = removeDuplicates(renderList.concat(list));

  const handleSort = (key) => {
    handleSortSelection(key);
    resetQueryState();
  };

  return (
    <Fragment>
      <MetaWrapper
        title={`${genreName} Movies - Cinephiled`}
        description={`${genreName} Movies`}
        url={`https://cinephiled.vercel.app/genre/${genreId}-${getCleanTitle(genreName)}/movies`}
      />

      <div className='relative'>
        <DominantColor flip tint />
        <ModulesWrapper className='relative z-10'>
          {renderList?.length > 0 ? (
            <Fragment>
              <div className='py-6 text-center'>
                <div className='my-5 lg:my-10'>
                  <Span className='leading-12 block text-[calc(1.375rem_+_1.5vw)] font-semibold xl:text-[2.5rem]'>{genreName} Movies</Span>
                </div>
              </div>

              <div className='mb-8 flex justify-end'>
                <Select
                  options={movieSortOptions}
                  activeKey={sortBy || "default"}
                  triggerText={getActiveSortKey({
                    options: movieSortOptions,
                    sortBy,
                    defaultKey: "default"
                  })}
                  baseSizeOptions
                  label='Sort By:'
                  handleChange={handleSort}
                />
              </div>

              <MoviesTemplate movies={cleanedItems} />
            </Fragment>
          ) : (
            <PlaceholderText height='large'>No Movies For Now</PlaceholderText>
          )}
        </ModulesWrapper>
      </div>
    </Fragment>
  );
};

export default Movies;

export const getServerSideProps = async (ctx) => {
  try {
    const genreId = ctx.query.item.split("-")[0];
    const genreName = ctx.query.item.split("-").slice(1).join(" ");
    const sortBy = ctx.query.sortBy;

    const [response, nextPage] = await Promise.all([
      fetch(apiEndpoints.movie.movieGenre({ genreId, pageQuery: 1, sortBy }), fetchOptions()),
      fetch(apiEndpoints.movie.movieGenre({ genreId, pageQuery: 2, sortBy }), fetchOptions())
    ]);

    if (!response.ok) throw new Error("error fetching movies");

    const [moviesList, secondMoviesList] = await Promise.all([response.json(), nextPage.json()]);

    const renderList = moviesList["results"].concat(secondMoviesList.results);

    return {
      props: {
        renderList,
        genreName,
        genreId
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};
