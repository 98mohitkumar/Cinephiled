import MetaWrapper from "components/MetaWrapper";
import {
  QueryContainer,
  QueryImg,
  QueryInfoWrapper,
  QueryTitle,
  QueryReleaseDate,
  QueryDescription,
  SearchResultsContainer,
  EmptySearch
} from "components/SearchTab/SearchTabStyles";
import { motion } from "framer-motion";
import { apiEndpoints, blurPlaceholder } from "globals/constants";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { getReleaseDate } from "src/utils/helper";
import { Error404, SearchContainer } from "styles/GlobalComponents";

const Keyword = ({ error, results, name, id }) => {
  return (
    <Fragment>
      <MetaWrapper
        title={error ? "Not Found - Cinephiled" : `${name} - Movies`}
        description={error ? "Not Found" : `Movies matching the keyword : ${name}`}
        url={`https://cinephiled.vercel.app/keywords/${id}`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <SearchContainer>
          <SearchResultsContainer>
            {results?.length > 0 ? (
              <Fragment>
                <p className='text-xl md:text-2xl font-medium'>Results Matching : {name}</p>
                {results.map(({ id, title, poster_path, overview, release_date }) => (
                  <motion.div whileTap={{ scale: 0.98 }} key={id}>
                    <Link
                      href={`/movies/${id}-${title.replace(/[' ', '/']/g, "-")}`}
                      passHref
                      scroll={false}>
                      <a>
                        <QueryContainer>
                          <QueryImg className='relative text-center'>
                            <Image
                              src={
                                poster_path
                                  ? `https://image.tmdb.org/t/p/w500${poster_path}`
                                  : "/Images/DefaultImage.png"
                              }
                              alt='movie-poster'
                              layout='fill'
                              objectFit='cover'
                              placeholder='blur'
                              blurDataURL={blurPlaceholder}
                            />
                          </QueryImg>
                          <QueryInfoWrapper>
                            <div>
                              <QueryTitle>{title}</QueryTitle>
                              <QueryReleaseDate>{getReleaseDate(release_date)}</QueryReleaseDate>
                            </div>
                            <QueryDescription>{overview}</QueryDescription>
                          </QueryInfoWrapper>
                        </QueryContainer>
                      </a>
                    </Link>
                  </motion.div>
                ))}
              </Fragment>
            ) : (
              <EmptySearch className='text-[calc(1.425rem_+_2.1vw)] xl:text-5xl text-center'>
                No movie results for this keyword.
              </EmptySearch>
            )}
          </SearchResultsContainer>
        </SearchContainer>
      )}
    </Fragment>
  );
};

Keyword.getInitialProps = async (ctx) => {
  try {
    const keyword = ctx.query.id;
    const keywordRes = await fetch(apiEndpoints.keywords.keywordDetails(keyword));
    const error = keywordRes.ok ? false : true;

    if (error) {
      throw new Error("error fetch data");
    } else {
      const keywordData = await keywordRes.json();

      return {
        error,
        results: keywordData.results,
        name: keyword.split("-").slice(1).join(" "),
        id: keyword
      };
    }
  } catch {
    return { error: true };
  }
};
export default Keyword;
