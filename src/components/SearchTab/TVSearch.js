import { motion } from 'framer-motion';
import useGetReleaseDates from 'hooks/useGetReleaseDates';
import useInfiniteQuery from 'hooks/useInfiniteQuery';
import useRemoveDuplicates from 'hooks/useRemoveDuplicates';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import {
  SearchResultsContainer,
  EmptySearch,
  QueryContainer,
  QueryImg,
  QueryTitle,
  QueryInfoWrapper,
  QueryReleaseDate,
  QueryDescription
} from './SearchTabStyles';

const TVSearch = ({ searchQuery, tvRes }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    type: 'tvSearch',
    searchQuery
  });

  const extendedList = useMemo(() => tvRes.results.concat(list), [list, tvRes]);
  const { cleanedItems } = useRemoveDuplicates(extendedList);
  const tvReleaseDates = useGetReleaseDates(cleanedItems);

  return (
    <SearchResultsContainer>
      {tvRes.results.length === 0 ? (
        <EmptySearch className='display-5 text-center'>
          No TV show results for this query.
        </EmptySearch>
      ) : (
        cleanedItems.map((item, i) => (
          <motion.div whileTap={{ scale: 0.98 }} key={item.id}>
            <Link
              href={`/tv/${item.id}-${item.name.replace(/[' ']/g, '-')}`}
              passHref
              scroll={false}
            >
              <a>
                <QueryContainer>
                  <QueryImg className='position-relative text-center'>
                    <Image
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                          : '/Images/DefaultImage.png'
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
                      <QueryReleaseDate>{tvReleaseDates[i]}</QueryReleaseDate>
                    </div>
                    <QueryDescription>{item.overview}</QueryDescription>
                  </QueryInfoWrapper>
                </QueryContainer>
              </a>
            </Link>
          </motion.div>
        ))
      )}
    </SearchResultsContainer>
  );
};

export default TVSearch;
