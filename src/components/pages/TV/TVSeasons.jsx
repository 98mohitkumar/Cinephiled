import { Grid3x3, MoveRight, Sparkles } from "lucide-react";
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

const EpisodeRatingsBand = ({ link, title }) => {
  return (
    <Link href={link} passHref>
      <motion.div whileTap={{ scale: 0.985 }} className='relative w-full overflow-hidden rounded-xl bg-amber-500 p-1620'>
        <FlexBox className='items-center justify-between gap-1620 text-black'>
          <FlexBox className='items-center gap-1620'>
            <div className='hidden shrink-0 rounded-lg bg-black/15 p-12 sm:block'>
              <Grid3x3 size={28} className='text-black' />
            </div>

            <div className='min-w-0'>
              <FlexBox className='mb-2 items-center gap-8'>
                <Sparkles size={14} className='shrink-0' />
                <P size='small' weight='bold' className='uppercase tracking-wider'>
                  New &middot; Episode Ratings
                </P>
              </FlexBox>
              <P size='large' weight='bold' className='text-pretty'>
                See every episode of {title}, rated at a glance
              </P>
              <P weight='medium' size='small' className='mt-2 text-black/75'>
                A season-by-season grid of TMDB ratings for every episode.
              </P>
            </div>
          </FlexBox>

          <MoveRight size={20} className='hidden shrink-0 above-sm:block' />
        </FlexBox>
      </motion.div>
    </Link>
  );
};

const TVSeasons = ({ seasons, title }) => {
  const router = useRouter();

  return (
    <FlexBox className='mx-auto max-w-screen-lg flex-col gap-y-1620 drop-shadow'>
      {/* episode ratings band */}
      <EpisodeRatingsBand link={`${router.query.id}/${ROUTES.episodeRatings}`} title={title} />

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
