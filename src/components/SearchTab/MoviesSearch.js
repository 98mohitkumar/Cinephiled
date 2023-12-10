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
      {movieRes.results.length === 0 ? (
        <EmptySearch className='text-[calc(1.425rem_+_2.1vw)] xl:text-5xl text-center'>
          No movie results for this query.
        </EmptySearch>
      ) : (
        <section>
          <SortBy />
          {(sortBy ? getRenderList(cleanedItems) : cleanedItems)?.map((item) => (
            <motion.div whileTap={{ scale: 0.98 }} key={item.id}>
              <Link
                href={`/movies/${item.id}-${item.title.replace(/[' ', '/']/g, "-")}`}
                passHref
                scroll={false}>
                <a>
                  <QueryContainer>
                    <QueryImg className='relative text-center'>
                      <Image
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : "/Images/DefaultImage.png"
                        }
                        alt='movie-poster'
                        layout='fill'
                        objectFit='cover'
                        placeholder='blur'
                        blurDataURL='data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA=='
                      />
                    </QueryImg>
                    <QueryInfoWrapper>
                      <div>
                        <QueryTitle>{item.title}</QueryTitle>
                        <QueryReleaseDate>{getReleaseDate(item)}</QueryReleaseDate>
                      </div>
                      <QueryDescription>{item.overview}</QueryDescription>
                    </QueryInfoWrapper>
                  </QueryContainer>
                </a>
              </Link>
            </motion.div>
          ))}
        </section>
      )}
    </SearchResultsContainer>
  );
};

export default MoviesSearch;
