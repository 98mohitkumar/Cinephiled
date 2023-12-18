import { motion } from "framer-motion";
import { blurPlaceholder } from "globals/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useRef } from "react";
import { getReleaseDate } from "src/utils/helper";
import { NoDataText } from "styles/GlobalComponents";
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
  const routeRef = useRef(router.asPath);

  return (
    <Fragment>
      {seasons?.length > 0 ? (
        seasons.map(
          ({ id, season_number, poster_path, name, episode_count, overview, air_date }) => (
            <motion.div
              key={id}
              whileTap={{ scale: 0.98 }}
              className={"max-w-5xl m-auto [&:not(:last-child)]:mb-5"}>
              <Link
                href={`${routeRef.current.replaceAll("?", "")}/season/${season_number}`}
                passHref
                scroll={false}>
                <a>
                  <SeasonWrapper>
                    <SeasonImg>
                      <Image
                        src={
                          poster_path
                            ? `https://image.tmdb.org/t/p/w185${poster_path}`
                            : "/Images/DefaultImage.png"
                        }
                        alt='TV-season-poster'
                        layout='fill'
                        objectFit='cover'
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
                </a>
              </Link>
            </motion.div>
          )
        )
      ) : (
        <NoDataText className='font-bold text-center my-5'>TBA</NoDataText>
      )}
    </Fragment>
  );
};

export default TVSeasons;
