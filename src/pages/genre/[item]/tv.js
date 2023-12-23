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
import { getCleanTitle } from "src/utils/helper";
import { NoDataText, Error404, ModulesWrapper } from "styles/GlobalComponents/index";

const TvShows = ({ renderList, genreName, error, genreId }) => {
  const { list } = useInfiniteQuery({
    initialPage: 3,
    type: "tvGenre",
    genreId
  });

  return (
    <Fragment>
      <MetaWrapper
        title={error ? "Not Found - Cinephiled" : `${genreName} TV Shows - Cinephiled`}
        description={error ? "Not Found" : `${genreName} TV Shows`}
        url={`https://cinephiled.vercel.app/genre/${genreId}-${getCleanTitle(genreName)}/tv`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <ModulesWrapper>
          {renderList?.length > 0 ? (
            <Fragment>
              <Span className='text-[calc(1.375rem_+_1.5vw)] xl:text-[2.5rem] leading-12 block text-center genre'>
                {genreName} TV Shows
              </Span>
              <RecommendationsGrid>
                {renderList.concat(list).map(({ id, name, backdrop_path }) => (
                  <RecommendedWrapper key={id}>
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 }
                      }}
                      whileTap={{ scale: 0.95 }}>
                      <Link href={`/tv/${id}-${getCleanTitle(name)}`} passHref scroll={false}>
                        <a>
                          <RecommendedImg className='relative text-center'>
                            <Image
                              src={
                                backdrop_path
                                  ? `https://image.tmdb.org/t/p/w780${backdrop_path}`
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
                    <InfoTitle className='my-3 text-center'>{name}</InfoTitle>
                  </RecommendedWrapper>
                ))}
              </RecommendationsGrid>
            </Fragment>
          ) : (
            <NoDataText className='font-bold text-center my-5'>No Tv Shows For Now</NoDataText>
          )}
        </ModulesWrapper>
      )}
    </Fragment>
  );
};

export default TvShows;

TvShows.getInitialProps = async (ctx) => {
  try {
    const param = ctx.query.item.split("-");

    const genreId = param[0];
    const genreName = param.slice(1, param.length).join("-").replace("&", " & ");

    const response = await fetch(apiEndpoints.tv.tvGenre({ genreId, pageQuery: 1 }));
    const nextPage = await fetch(apiEndpoints.tv.tvGenre({ genreId, pageQuery: 2 }));

    const error = response.ok ? false : true;

    if (error) {
      throw new Error("error fetching tv shows");
    } else {
      const tvList = await response.json();
      const secondTvList = await nextPage.json();

      const renderList = tvList["results"].concat(secondTvList.results);

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
