import { motion } from "framer-motion";
import { blurPlaceholder } from "globals/constants";
import useGetReleaseDates from "hooks/useGetReleaseDates";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useRef } from "react";
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
  const Today = new Date();

  const seasonReleaseDates = useGetReleaseDates(seasons);

  const routeRef = useRef(router.asPath);

  return (
    <Fragment>
      {seasons.length === 0 ? (
        <NoDataText className='font-bold text-center my-5'>TBA</NoDataText>
      ) : (
        seasons.map((item, i) => (
          <motion.div
            key={item.id}
            whileTap={{ scale: 0.98 }}
            className={"max-w-5xl m-auto [&:not(:last-child)]:mb-5"}>
            <Link
              href={`${routeRef.current.replaceAll("?", "")}/season/${item.season_number}`}
              passHref
              scroll={false}>
              <a>
                <SeasonWrapper>
                  <SeasonImg>
                    <Image
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
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
                        {item.name}
                        {Today < new Date(seasonReleaseDates[i]) &&
                        Today !== new Date(seasonReleaseDates[i])
                          ? " (Upcoming)"
                          : ""}
                      </SeasonTitle>
                      <SeasonDetailsWrapper>
                        <SeasonsRelease>{seasonReleaseDates[i]}</SeasonsRelease>
                        <div className='divider' />
                        <SeasonsRelease>{item.episode_count} Episodes</SeasonsRelease>
                      </SeasonDetailsWrapper>
                      {item.overview.length > 0 ? (
                        <SeasonsOverview>{item.overview}</SeasonsOverview>
                      ) : null}
                    </div>
                  </SeasonInfoWrapper>
                </SeasonWrapper>
              </a>
            </Link>
          </motion.div>
        ))
      )}
    </Fragment>
  );
};

export default TVSeasons;
