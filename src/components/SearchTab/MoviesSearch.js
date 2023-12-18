import { motion } from "framer-motion";
import { blurPlaceholder } from "globals/constants";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getReleaseDate, removeDuplicates } from "src/utils/helper";
import { SortBy } from "./helper";
import {
  SearchResultsContainer,
  EmptySearch,
  QueryContainer,
  QueryImg,
  QueryTitle,
  QueryInfoWrapper,
  QueryReleaseDate,
  QueryDescription
} from "./SearchTabStyles";

const MoviesSearch = ({ searchQuery, movieRes }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    type: "movieSearch",
    searchQuery
  });

  const { query } = useRouter();
  const { sortBy, order } = query;
  const { cleanedItems } = removeDuplicates(movieRes.results.concat(list));

  const getRenderList = (list) => {
    if (sortBy === "name") {
      if (order === "asc") {
        return [...list].sort((a, b) => (a.title > b.title ? 1 : -1));
      } else {
        return [...list].sort((a, b) => (a.title > b.title ? 1 : -1)).reverse();
      }
    } else if (sortBy === "releaseDate") {
      if (order === "asc") {
        return [...list].sort((a, b) => {
          return new Date(a.release_date) - new Date(b.release_date);
        });
      } else {
        return [...list].sort((a, b) => {
          return new Date(b.release_date) - new Date(a.release_date);
        });
      }
    }

    return list;
  };

  return (
    <SearchResultsContainer>
      {cleanedItems?.length > 0 ? (
        <section>
          <SortBy />
          {(sortBy ? getRenderList(cleanedItems) : cleanedItems)?.map(
            ({ id, title, poster_path, overview, release_date }) => (
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
                              ? `https://image.tmdb.org/t/p/w185${poster_path}`
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
            )
          )}
        </section>
      ) : (
        <EmptySearch className='text-[calc(1.425rem_+_2.1vw)] xl:text-5xl text-center'>
          No movie results for this query.
        </EmptySearch>
      )}
    </SearchResultsContainer>
  );
};

export default MoviesSearch;
