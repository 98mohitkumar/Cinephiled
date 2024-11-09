import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { SortBy } from "./helper";
import {
  SearchResultsContainer,
  QueryContainer,
  QueryImg,
  QueryTitle,
  QueryInfoWrapper,
  QueryReleaseDate,
  QueryDescription
} from "./SearchTabStyles";
import { sortOptions } from "./TVSearch";
import PlaceholderText from "components/PlaceholderText";
import { blurPlaceholder, apiEndpoints } from "globals/constants";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import { getCleanTitle, getReleaseDate, removeDuplicates } from "utils/helper";

const MoviesSearch = ({ searchQuery, movieRes }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    getEndpoint: ({ page }) =>
      apiEndpoints.search.movieSearch({
        query: searchQuery,
        pageQuery: page
      })
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
          <SortBy sortOptions={sortOptions} />
          {(sortBy ? getRenderList(cleanedItems) : cleanedItems)?.map(({ id, title, poster_path, overview, release_date }) => (
            <motion.div whileTap={{ scale: 0.98 }} key={id}>
              <Link href={`/movies/${id}-${getCleanTitle(title)}`}>
                <QueryContainer>
                  <QueryImg className='relative text-center'>
                    <Image
                      src={poster_path ? `https://image.tmdb.org/t/p/w185${poster_path}` : "/Images/DefaultImage.png"}
                      alt='movie-poster'
                      fill
                      style={{ objectFit: "cover" }}
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
              </Link>
            </motion.div>
          ))}
        </section>
      ) : (
        <PlaceholderText height='large'>No Movie results found for this query.</PlaceholderText>
      )}
    </SearchResultsContainer>
  );
};

export default MoviesSearch;
