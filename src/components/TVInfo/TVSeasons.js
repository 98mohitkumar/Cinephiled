import {
  SeaonDetailsWrapper,
  SeaonsOverview,
  SeasonDetailsDivider,
  SeasonImg,
  SeasonInfoMain,
  SeasonInfoWrapper,
  SeasonsContainer,
  SeasonsRelease,
  SeasonTitle,
  SeasonWrapper
} from './TVStyles';

import { NoDataText } from '../../styles/GlobalComponents';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const TVSeasons = ({ seasons }) => {
  let seasonReleaseDates = [];
  const router = useRouter();
  const [route, setRoute] = useState('');

  useEffect(() => {
    setRoute(router.asPath);
  }, [seasons, router.asPath]);

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
                href={`${route}/season/${item.season_number}`}
                passHref
                scroll={false}
              >
                <a>
                  <SeasonWrapper className='mb-4'>
                    <SeasonImg poster={item.poster_path} />
                    <SeasonInfoWrapper>
                      <SeasonInfoMain>
                        <SeasonTitle className='xsRes'>
                          {item.name}
                          {Today < new Date(seasonReleaseDates[i]) &&
                          Today !== new Date(seasonReleaseDates[i])
                            ? ' (Upcoming)'
                            : ''}
                        </SeasonTitle>
                        <SeaonDetailsWrapper>
                          <SeasonsRelease>
                            {seasonReleaseDates[i]}
                          </SeasonsRelease>
                          <SeasonDetailsDivider />
                          <SeasonsRelease>
                            {item.episode_count} Episodes
                          </SeasonsRelease>
                        </SeaonDetailsWrapper>
                        {item.overview !== '' && (
                          <SeaonsOverview>{item.overview}</SeaonsOverview>
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
