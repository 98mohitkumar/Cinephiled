import PlaceholderText from "components/PlaceholderText";
import { motion } from "framer-motion";
import { blurPlaceholder, apiEndpoints } from "globals/constants";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { removeDuplicates, getReleaseDate, getCleanTitle } from "src/utils/helper";
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

export const sortOptions = [
  {
    key: "name",
    name: "Name"
  },
  {
    key: "releaseDate",
    name: "Release date"
  }
];

const TVSearch = ({ searchQuery, tvRes }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    getEndpoint: ({ page }) =>
      apiEndpoints.search.tvSearch({
        query: searchQuery,
        pageQuery: page
      })
  });

  const { query } = useRouter();
  const { sortBy, order } = query;
  const { cleanedItems } = removeDuplicates(tvRes.results.concat(list));

  const getRenderList = (list) => {
    if (sortBy === "name") {
      if (order === "asc") {
        return [...list].sort((a, b) => (a.name > b.name ? 1 : -1));
      } else {
        return [...list].sort((a, b) => (a.name > b.name ? 1 : -1)).reverse();
      }
    } else if (sortBy === "releaseDate") {
      if (order === "asc") {
        return [...list].sort((a, b) => {
          return new Date(a.first_air_date) - new Date(b.first_air_date);
        });
      } else {
        return [...list].sort((a, b) => {
          return new Date(b.first_air_date) - new Date(a.first_air_date);
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

          {(sortBy ? getRenderList(cleanedItems) : cleanedItems)?.map(
            ({ id, name, poster_path, first_air_date, overview }) => (
              <motion.div whileTap={{ scale: 0.98 }} key={id}>
                <Link href={`/tv/${id}-${getCleanTitle(name)}`} passHref>
                  <QueryContainer>
                    <QueryImg className='relative text-center'>
                      <Image
                        src={
                          poster_path
                            ? `https://image.tmdb.org/t/p/w185${poster_path}`
                            : "/Images/DefaultImage.png"
                        }
                        alt='TV-poster'
                        fill
                        style={{ objectFit: "cover" }}
                        placeholder='blur'
                        blurDataURL={blurPlaceholder}
                      />
                    </QueryImg>
                    <QueryInfoWrapper>
                      <div>
                        <QueryTitle>{name}</QueryTitle>
                        <QueryReleaseDate>{getReleaseDate(first_air_date)}</QueryReleaseDate>
                      </div>
                      <QueryDescription>{overview}</QueryDescription>
                    </QueryInfoWrapper>
                  </QueryContainer>
                </Link>
              </motion.div>
            )
          )}
        </section>
      ) : (
        <PlaceholderText height='large'>No TV show results found for this query.</PlaceholderText>
      )}
    </SearchResultsContainer>
  );
};

export default TVSearch;
