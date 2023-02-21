import { motion } from 'framer-motion';
import useGetReleaseDates from 'hooks/useGetReleaseDates';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { NoDataText } from 'styles/GlobalComponents';
import {
  SeasonDetailsWrapper,
  SeasonsOverview,
  SeasonDetailsDivider,
  SeasonImg,
  SeasonInfoMain,
  SeasonInfoWrapper,
  SeasonsContainer,
  SeasonsRelease,
  SeasonTitle,
  SeasonWrapper
} from './TVStyles';

const TVSeasons = ({ seasons }) => {
  const router = useRouter();
  const Today = new Date();

  const seasonReleaseDates = useGetReleaseDates(seasons);

  const routeRef = useRef(router.asPath);

  return (
    <SeasonsContainer>
      {seasons.length === 0 ? (
        <NoDataText className='fw-bold text-center my-5'>TBA</NoDataText>
      ) : (
        seasons.map((item, i) => (
          <motion.div key={item.id} whileTap={{ scale: 0.98 }}>
            <Link
              href={`${routeRef.current}/season/${item.season_number}`}
              passHref
              scroll={false}
            >
              <a>
                <SeasonWrapper className={seasons.length > 1 && 'mb-4'}>
                  <SeasonImg>
                    <Image
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                          : '/Images/DefaultImage.png'
                      }
                      alt='TV-season-poster'
                      layout='fill'
                      objectFit='cover'
                      placeholder='blur'
                      blurDataURL='data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA=='
                    />
                  </SeasonImg>
                  <SeasonInfoWrapper>
                    <SeasonInfoMain>
                      <SeasonTitle className='xsRes'>
                        {item.name}
                        {Today < new Date(seasonReleaseDates[i]) &&
                        Today !== new Date(seasonReleaseDates[i])
                          ? ' (Upcoming)'
                          : ''}
                      </SeasonTitle>
                      <SeasonDetailsWrapper>
                        <SeasonsRelease>{seasonReleaseDates[i]}</SeasonsRelease>
                        <SeasonDetailsDivider />
                        <SeasonsRelease>
                          {item.episode_count} Episodes
                        </SeasonsRelease>
                      </SeasonDetailsWrapper>
                      {item.overview !== '' && (
                        <SeasonsOverview>{item.overview}</SeasonsOverview>
                      )}
                    </SeasonInfoMain>
                  </SeasonInfoWrapper>
                </SeasonWrapper>
              </a>
            </Link>
          </motion.div>
        ))
      )}
    </SeasonsContainer>
  );
};

export default TVSeasons;
