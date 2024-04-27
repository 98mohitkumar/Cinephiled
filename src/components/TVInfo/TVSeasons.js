import PlaceholderText from "components/PlaceholderText";
import { motion } from "framer-motion";
import { blurPlaceholder } from "globals/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { getReleaseDate } from "src/utils/helper";
import {
  SeasonDetailsWrapper,
  SeasonsOverview,
  SeasonImg,
  SeasonInfoWrapper,
  SeasonsRelease,
  SeasonTitle,
  SeasonWrapper
} from "./TVStyles";

const TVSeasons = ({ seasons }) => {
  const router = useRouter();
  const today = new Date();

  return (
    <Fragment>
      {seasons?.length > 0 ? (
        seasons.map(
          ({ id, season_number, poster_path, name, episode_count, overview, air_date }) => (
            <motion.div
              key={id}
              whileTap={{ scale: 0.98 }}
              className={"max-w-5xl m-auto [&:not(:last-child)]:mb-5"}>
              <Link href={`${router.query.id}/season/${season_number}`} passHref scroll={false}>
                <SeasonWrapper>
                  <SeasonImg>
                    <Image
                      src={
                        poster_path
                          ? `https://image.tmdb.org/t/p/w185${poster_path}`
                          : "/Images/DefaultImage.png"
                      }
                      alt='TV-season-poster'
                      fill
                      style={{ objectFit: "cover" }}
                      placeholder='blur'
                      blurDataURL={blurPlaceholder}
                    />
                  </SeasonImg>

                  <SeasonInfoWrapper>
                    <div>
                      <SeasonTitle className='max-sm:mb-1'>
                        {name}
                        {today < new Date(air_date) && today !== new Date(air_date)
                          ? " (Upcoming)"
                          : ""}
                      </SeasonTitle>
                      <SeasonDetailsWrapper>
                        <SeasonsRelease>{getReleaseDate(air_date)}</SeasonsRelease>
                        <div className='divider' />
                        <SeasonsRelease>{episode_count} Episodes</SeasonsRelease>
                      </SeasonDetailsWrapper>
                      {overview ? <SeasonsOverview>{overview}</SeasonsOverview> : null}
                    </div>
                  </SeasonInfoWrapper>
                </SeasonWrapper>
              </Link>
            </motion.div>
          )
        )
      ) : (
        <PlaceholderText>TBA</PlaceholderText>
      )}
    </Fragment>
  );
};

export default TVSeasons;
