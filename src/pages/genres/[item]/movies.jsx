import { Fragment } from "react";

import PlaceholderText from "components/PlaceholderText";
import DominantColor from "components/Shared/DominantColor/DominantColor";
import MetaWrapper from "components/Shared/MetaWrapper";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import LayoutContainer from "components/UI/LayoutContainer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/UI/Select";
import H1 from "components/UI/Typography/H1";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES, siteInfo, sortOptions } from "data/global";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import useSort from "hooks/useSort";
import { fetchOptions, getNiceName, removeDuplicates } from "utils/helper";

const Movies = ({ renderList, genreName, genreId }) => {
  const {
    tmdbOptions: { movie: movieSortOptions }
  } = sortOptions;
  const defaultSortOption = movieSortOptions.find((option) => option?.isDefault)?.value;
  const { sortBy, handleSortSelection } = useSort({ shallow: false, defaultSortOption });

  const { list, resetQueryState } = useInfiniteQuery({
    initialPage: 3,
    getEndpoint: ({ page }) => apiEndpoints.movie.movieGenre({ genreId, pageQuery: page, sortBy: sortBy })
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
        url={`${siteInfo.url}/${ROUTES.genres}/${getNiceName({ id: genreId, name: genreName })}/movies`}
      />

      <section className='relative'>
        <DominantColor tint />
        <LayoutContainer className='relative z-5 pb-24 pt-4864'>
          <H1 className='mb-3240 text-center text-white'>{genreName} Movies</H1>

          {cleanedItems?.length > 0 ? (
            <Fragment>
              <div className='mb-2432 flex items-center justify-end gap-10'>
                <Select defaultValue={sortBy} onValueChange={handleSort}>
                  <SelectTrigger className='w-fit min-w-[250px]'>
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

              <MediaTemplateGrid media={cleanedItems} mediaType='movie' />
            </Fragment>
          ) : (
            <PlaceholderText height='large'>No Movies are available for this genre</PlaceholderText>
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
