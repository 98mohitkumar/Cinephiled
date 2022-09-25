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
  SeasonWrapper,
} from './TVStyles';

import { NoDataText } from '../../styles/GlobalComponents';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Image from 'next/image';

const TVSeasons = ({ seasons }) => {
  let seasonReleaseDates = [];
  const router = useRouter();

  seasons.forEach((item) =>
    item.air_date
      ? seasonReleaseDates.push(
          new Date(item.air_date.toString()).toDateString().slice(4, -5) +
            ', ' +
            new Date(item.air_date.toString()).getFullYear()
        )
      : seasonReleaseDates.push('TBA')
  );

  const Today = new Date();
  return (
    <>
      <SeasonsContainer>
        {seasons.length === 0 ? (
          <NoDataText className='fw-bold text-center my-5'>TBA</NoDataText>
        ) : (
          seasons.map((item, i) => (
            <motion.div key={item.id} whileTap={{ scale: 0.98 }}>
              <Link
                href={`${router.asPath === '/' ? '' : router.asPath}/season/${
                  item.season_number
                }`}
                passHref
                scroll={false}
              >
                <a>
                  <SeasonWrapper className='mb-4'>
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
                          <SeasonsRelease>
                            {seasonReleaseDates[i]}
                          </SeasonsRelease>
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
    </>
  );
};

export default TVSeasons;
