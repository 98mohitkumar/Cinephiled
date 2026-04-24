import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

import EpisodeRatingsGrid from "components/pages/TV/EpisodeRatingsGrid";
import DominantColor from "components/Shared/DominantColor/DominantColor";
import MetaWrapper from "components/Shared/MetaWrapper";
import FlexBox from "components/UI/FlexBox";
import LayoutContainer from "components/UI/LayoutContainer";
import H2 from "components/UI/Typography/H2";
import P from "components/UI/Typography/P";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES, siteInfo } from "data/global";
import { fetchOptions, getNiceName, getReleaseYear } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const EpisodeRatingsPage = ({ tvData, seasonsWithEpisodes }) => {
  const { id, title, year, yearRange, backdrop, poster, overallRating, voteCount } = tvData;
  const backHref = `/${ROUTES.tv}/${getNiceName({ id, name: title })}`;

  return (
    <Fragment>
      <MetaWrapper
        title={`${title} (${year}) - Episode Ratings - Cinephiled`}
        description={`Episode-by-episode rating grid for ${title}. Every episode, color-coded by its TMDB rating.`}
        image={getTMDBImage({ type: "backdrop", path: backdrop, size: "w1280" })}
        url={`${siteInfo.url}/${ROUTES.tv}/${getNiceName({ id, name: title })}/${ROUTES.episodeRatings}`}
      />

      <section className='relative grow'>
        <DominantColor image={backdrop || poster} tint isUsingBackdrop={!!backdrop} angle='0deg' />

        <div className='relative z-10'>
          <LayoutContainer className='py-3248'>
            <Link href={backHref} className='mb-1620 inline-block'>
              <FlexBox className='items-center gap-8 text-neutral-300 transition-colors hover:text-white'>
                <MoveLeft size={16} />
                <P size='small' weight='semibold'>
                  Back to {title}
                </P>
              </FlexBox>
            </Link>

            <div className='mb-2432'>
              <H2 tag='h1' className='mb-8 text-balance'>
                {title} <span className='text-neutral-400'>({year})</span>
              </H2>
              <P size='large' weight='medium' className='max-w-screen-md text-pretty text-neutral-300'>
                Every episode, color-coded by its TMDB rating. Click any square to open the episode.
              </P>
            </div>

            <EpisodeRatingsGrid
              tvId={id}
              tvName={title}
              posterPath={poster}
              overallRating={overallRating}
              voteCount={voteCount}
              yearRange={yearRange}
              seasons={seasonsWithEpisodes}
            />
          </LayoutContainer>
        </div>
      </section>
    </Fragment>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const { id } = ctx.query;

    const tvRes = await fetch(apiEndpoints.tv.tvDetailsNoAppend(id), fetchOptions());
    if (!tvRes.ok) throw new Error("error fetching details");

    const tvData = await tvRes.json();

    const yearStart = getReleaseYear(tvData?.first_air_date);
    const yearEnd = getReleaseYear(tvData?.last_air_date);
    const inProduction = !!tvData?.in_production;
    const yearRange = !yearStart
      ? ""
      : inProduction
        ? `${yearStart} - now`
        : yearEnd && yearEnd !== yearStart
          ? `${yearStart} - ${yearEnd}`
          : `${yearStart}`;

    const seasons = (tvData?.seasons || []).filter((s) => s.season_number > 0 && (s.episode_count || 0) > 0);

    const seasonResponses = await Promise.all(
      seasons.map((s) => fetch(apiEndpoints.tv.tvSeasonDetailsNoAppend({ id, seasonNumber: s.season_number }), fetchOptions()))
    );

    const seasonJsons = await Promise.all(seasonResponses.map((r) => (r.ok ? r.json() : null)));

    const seasonsWithEpisodes = seasonJsons
      .filter(Boolean)
      .sort((a, b) => a.season_number - b.season_number)
      .map((s) => ({
        id: s.id,
        season_number: s.season_number,
        name: s.name,
        episodes: (s.episodes || []).map((ep) => ({
          id: ep.id,
          episode_number: ep.episode_number,
          season_number: ep.season_number,
          name: ep.name,
          air_date: ep.air_date,
          vote_average: ep.vote_average,
          vote_count: ep.vote_count
        }))
      }));

    return {
      props: {
        tvData: {
          id: tvData?.id,
          title: tvData?.name || "",
          year: yearStart,
          yearRange,
          backdrop: tvData?.backdrop_path || null,
          poster: tvData?.poster_path || null,
          overallRating: typeof tvData?.vote_average === "number" ? tvData.vote_average : null,
          voteCount: typeof tvData?.vote_count === "number" ? tvData.vote_count : 0
        },
        seasonsWithEpisodes
      }
    };
  } catch {
    return { notFound: true };
  }
};

export default EpisodeRatingsPage;
