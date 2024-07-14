import DominantColor from "components/DominantColor/DominantColor";
import MetaWrapper from "components/MetaWrapper";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import PlaceholderText from "components/PlaceholderText";
import {
  RecommendationsGrid,
  RecommendedImg,
  RecommendedWrapper,
  InfoTitle
} from "components/Recommendations/RecommendationsStyles";
import { motion } from "framer-motion";
import { apiEndpoints, blurPlaceholder } from "globals/constants";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { fetchOptions, getCleanTitle, removeDuplicates } from "src/utils/helper";
import { Error404, ModulesWrapper } from "styles/GlobalComponents/index";

const Movies = ({ renderList, genreName, error, genreId }) => {
  const { list } = useInfiniteQuery({
    initialPage: 3,
    getEndpoint: ({ page }) => apiEndpoints.movie.movieGenre({ genreId, pageQuery: page })
  });

  const { cleanedItems } = removeDuplicates(renderList.concat(list));

  return (
    <Fragment>
      <MetaWrapper
        title={error ? "Not Found - Cinephiled" : `${genreName} Movies - Cinephiled`}
        description={error ? "Not Found" : `${genreName} Movies`}
        url={`https://cinephiled.vercel.app/genre/${genreId}-${getCleanTitle(genreName)}/movies`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <div className='relative'>
          <DominantColor flip tint />
          <ModulesWrapper className='relative z-10'>
            {renderList?.length > 0 ? (
              <Fragment>
                <div className='text-center py-6'>
                  <div className='my-5 lg:my-10'>
                    <Span className='text-[calc(1.375rem_+_1.5vw)] xl:text-[2.5rem] leading-12 block font-semibold'>
                      {genreName} Movies
                    </Span>
                  </div>
                </div>
                <RecommendationsGrid>
                  {cleanedItems?.map(({ id, title, backdrop_path }) => (
                    <RecommendedWrapper key={id}>
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.1 }
                        }}
                        whileTap={{ scale: 0.95 }}>
                        <Link href={`/movies/${id}-${getCleanTitle(title)}`} passHref>
                          <RecommendedImg className='relative text-center'>
                            <Image
                              src={
                                backdrop_path
                                  ? `https://image.tmdb.org/t/p/w780${backdrop_path}`
                                  : "/Images/DefaultBackdrop.png"
                              }
                              alt='movie-poster'
                              fill
                              style={{ objectFit: "cover" }}
                              placeholder='blur'
                              blurDataURL={blurPlaceholder}
                            />
                          </RecommendedImg>
                        </Link>
                      </motion.div>
                      <InfoTitle className='mt-3 mb-0 text-center'>{title}</InfoTitle>
                    </RecommendedWrapper>
                  ))}
                </RecommendationsGrid>
              </Fragment>
            ) : (
              <PlaceholderText height='large'>No Movies For Now</PlaceholderText>
            )}
          </ModulesWrapper>
        </div>
      )}
    </Fragment>
  );
};

export default Movies;

Movies.getInitialProps = async (ctx) => {
  try {
    const genreId = ctx.query.item.split("-")[0];
    const genreName = ctx.query.item.split("-").slice(1).join(" ");

    const [response, nextPage] = await Promise.all([
      fetch(apiEndpoints.movie.movieGenre({ genreId, pageQuery: 1 }), fetchOptions()),
      fetch(apiEndpoints.movie.movieGenre({ genreId, pageQuery: 2 }), fetchOptions())
    ]);

    if (!response.ok) throw new Error("error fetching movies");

    const [moviesList, secondMoviesList] = await Promise.all([response.json(), nextPage.json()]);

    const renderList = moviesList["results"].concat(secondMoviesList.results);

    return {
      renderList,
      genreName,
      genreId,
      error: false
    };
  } catch {
    return {
      error: true
    };
  }
};
