import { motion } from "framer-motion";
import removeDuplicates from "hooks/removeDuplicates";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { SortBy, getReleaseDate } from "./helper";
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

const TVSearch = ({ searchQuery, tvRes }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    type: "tvSearch",
    searchQuery
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
      {tvRes.results.length === 0 ? (
        <EmptySearch className='display-5 text-center'>
          No TV show results for this query.
        </EmptySearch>
      ) : (
        <section>
          <SortBy />

          {(sortBy ? getRenderList(cleanedItems) : cleanedItems)?.map(
            (item) => (
              <motion.div whileTap={{ scale: 0.98 }} key={item.id}>
                <Link
                  href={`/tv/${item.id}-${item.name.replace(
                    /[' ', '/']/g,
                    "-"
                  )}`}
                  passHref
                  scroll={false}>
                  <a>
                    <QueryContainer>
                      <QueryImg className='position-relative text-center'>
                        <Image
                          src={
                            item.poster_path
                              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                              : "/Images/DefaultImage.png"
                          }
                          alt='TV-poster'
                          layout='fill'
                          objectFit='cover'
                          placeholder='blur'
                          blurDataURL='data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA=='
                        />
                      </QueryImg>
                      <QueryInfoWrapper>
                        <div>
                          <QueryTitle>{item.name}</QueryTitle>
                          <QueryReleaseDate>
                            {getReleaseDate(item)}
                          </QueryReleaseDate>
                        </div>
                        <QueryDescription>{item.overview}</QueryDescription>
                      </QueryInfoWrapper>
                    </QueryContainer>
                  </a>
                </Link>
              </motion.div>
            )
          )}
        </section>
      )}
    </SearchResultsContainer>
  );
};

export default TVSearch;
