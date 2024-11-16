import { Fragment } from "react";
import DominantColor from "components/DominantColor/DominantColor";
import { LayoutContainer } from "components/Layout/helpers";
import MetaWrapper from "components/MetaWrapper";
import PlaceholderText from "components/PlaceholderText";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/UI/Select/Select";
import H1 from "components/UI/Typography/H1";
import P from "components/UI/Typography/P";
import { apiEndpoints, sortOptions } from "globals/constants";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import useSort from "hooks/useSort";
import { fetchOptions, getCleanTitle, removeDuplicates } from "utils/helper";

const Movies = ({ renderList, genreName, genreId }) => {
  const {
    tmdbOptions: { movie: movieSortOptions }
  } = sortOptions;
  const defaultSortOption = movieSortOptions.find((option) => option?.isDefault)?.value;
  const { sortBy, handleSortSelection } = useSort({ shallow: false, defaultSortOption });

  const { list, resetQueryState } = useInfiniteQuery({
    initialPage: 3,
    getEndpoint: ({ page }) => apiEndpoints.movie.movieGenre({ genreId, pageQuery: page, sortBy: sortBy || defaultSortOption })
  });

  const { cleanedItems } = removeDuplicates(renderList.concat(list));
  const currentSortOption = sortBy || defaultSortOption;

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

      <section className='relative'>
        <DominantColor flip tint />
        <LayoutContainer className='relative z-5 pb-24 pt-4864'>
          <H1 className='mb-3240 text-center text-white' weight='semibold'>
            {genreName} Movies
          </H1>

          {cleanedItems?.length > 0 ? (
            <Fragment>
              <div className='mb-2432 flex items-center justify-end gap-10'>
                <P weight='medium' size='large' className='text-neutral-300'>
                  Sort By:
                </P>

                <Select defaultValue={currentSortOption} onValueChange={handleSort}>
                  <SelectTrigger className='w-fit min-w-[220px]'>
                    <SelectValue placeholder='Sort By:' />
                  </SelectTrigger>
                  <SelectContent position='popper' align='end'>
                    {movieSortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <MediaTemplateGrid mediaType='movie' media={cleanedItems} />
            </Fragment>
          ) : (
            <PlaceholderText height='large'>No Movies For Now</PlaceholderText>
          )}
        </LayoutContainer>
      </section>
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
