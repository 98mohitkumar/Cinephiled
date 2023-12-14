import MetaWrapper from "components/MetaWrapper";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
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
import { NoDataText, Error404, ModulesWrapper } from "styles/GlobalComponents/index";

const Movies = ({ renderList, genreName, error, genreId }) => {
  const { list } = useInfiniteQuery({
    initialPage: 3,
    type: "movieGenre",
    genreId
  });

  return (
    <Fragment>
      <MetaWrapper
        title={!error ? `${genreName} Movies - Cinephiled` : "Not Found - Cinephiled"}
        description={!error ? `${genreName} Movies` : "Not Found"}
        url={`https://cinephiled.vercel.app/genre/${genreId}-${genreName}/movies`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <ModulesWrapper>
          {renderList.length === 0 ? (
            <NoDataText className='font-bold text-center my-5'>No Movies For Now</NoDataText>
          ) : (
            <Fragment>
              <Span className='text-[calc(1.375rem_+_1.5vw)] xl:text-[2.5rem] leading-12 block text-center genre'>
                {genreName} Movies
              </Span>
              <RecommendationsGrid>
                {renderList.concat(list).map((item) => (
                  <RecommendedWrapper key={item.id}>
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 }
                      }}
                      whileTap={{ scale: 0.95 }}>
                      <Link
                        href={`/movies/${item.id}-${item.title.replace(/[' ', '/']/g, "-")}`}
                        passHref
                        scroll={false}>
                        <a>
                          <RecommendedImg className='relative text-center'>
                            <Image
                              src={
                                item.backdrop_path
                                  ? `https://image.tmdb.org/t/p/w780${item.backdrop_path}`
                                  : "/Images/DefaultBackdrop.png"
                              }
                              alt='movie-poster'
                              layout='fill'
                              objectFit='cover'
                              placeholder='blur'
                              blurDataURL={blurPlaceholder}
                            />
                          </RecommendedImg>
                        </a>
                      </Link>
                    </motion.div>
                    <InfoTitle className='mt-3 mb-0 text-center'>{item.title}</InfoTitle>
                  </RecommendedWrapper>
                ))}
              </RecommendationsGrid>
            </Fragment>
          )}
        </ModulesWrapper>
      )}
    </Fragment>
  );
};

export default Movies;

Movies.getInitialProps = async (ctx) => {
  try {
    const genreId = ctx.query.item.split("-")[0];
    const genreName = ctx.query.item.split("-").slice(1).join(" ");

    const response = await fetch(apiEndpoints.movie.movieGenre({ genreId, pageQuery: 1 }));
    const nextPage = await fetch(apiEndpoints.movie.movieGenre({ genreId, pageQuery: 2 }));

    const error = response.ok ? false : true;

    if (error) {
      throw new Error();
    } else {
      const moviesList = await response.json();
      const secondMoviesList = await nextPage.json();

      const renderList = moviesList["results"].concat(secondMoviesList.results);

      return {
        renderList,
        genreName,
        genreId,
        error
      };
    }
  } catch {
    return {
      error: true
    };
  }
};
