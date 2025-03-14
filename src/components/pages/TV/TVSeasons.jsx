import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import FlexBox from "components/UI/FlexBox";
import H4 from "components/UI/Typography/H4";
import P from "components/UI/Typography/P";
import { ROUTES, blurPlaceholder } from "data/global";
import { getHasEpisodeReleased, getReleaseDate } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const TVSeasons = ({ seasons, title }) => {
  const router = useRouter();

  return (
    <FlexBox className='mx-auto max-w-screen-lg flex-col gap-y-1620 drop-shadow'>
      {seasons.map(({ id, season_number, poster_path, name, episode_count, overview, air_date }) => (
        <motion.div key={id} whileTap={{ scale: 0.98 }}>
          <Link href={`${router.query.id}/${ROUTES.seasons}/${season_number}`} passHref>
            <FlexBox className='w-full overflow-hidden rounded-xl bg-white'>
              <div className='relative aspect-poster min-w-32'>
                <Image
                  fill
                  placeholder='blur'
                  alt='TV-season-poster'
                  blurDataURL={blurPlaceholder}
                  src={getTMDBImage({ path: poster_path, type: "poster", size: "w500" })}
                />
              </div>

              <div className='w-full overflow-hidden p-1620'>
                <H4 className='mb-4 truncate text-black'>
                  {name} {getHasEpisodeReleased(air_date) ? null : " (Upcoming)"}
                </H4>

                <FlexBox className='flex-wrap items-center gap-4 gap-x-8 whitespace-nowrap'>
                  <P size='large' weight='bold' className='text-neutral-700'>
                    {getReleaseDate(air_date)}
                  </P>

                  <P size='large' weight='bold' className='hidden text-neutral-700 above-xs:block'>
                    &bull;
                  </P>

                  <P size='large' weight='bold' className='text-neutral-700 max-xs:w-full'>
                    {episode_count} Episodes
                  </P>
                </FlexBox>

                <P className='mt-12 line-clamp-3 text-neutral-700' weight='medium'>
                  {overview || `Season ${season_number} of ${title} premiered on ${getReleaseDate(air_date)}.`}
                </P>
              </div>
            </FlexBox>
          </Link>
        </motion.div>
      ))}
    </FlexBox>
  );
};

export default TVSeasons;
