import { Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { getServerSession } from "next-auth";
import { Fragment, useState } from "react";
import { toast } from "sonner";

import { authOptions } from "api/auth/[...nextauth]";
import { useDeleteEpisodeRating, useSetEpisodeRating } from "apiRoutes/user";
import { useModal } from "components/Modal/Modal";
import RatingModal from "components/RatingModal/RatingModal";
import CrewCredits from "components/Shared/CrewCredits";
import DominantColor from "components/Shared/DominantColor/DominantColor";
import { mediaDetailsWrapper } from "components/Shared/GlobalComponents";
import MediaHeroBackground from "components/Shared/MediaHeroBackground/MediaHeroBackground";
import MetaWrapper from "components/Shared/MetaWrapper";
import ShareButton from "components/Shared/ShareButton";
import TVStats from "components/Shared/TVStats";
import { CastCarousel } from "components/Templates/CastTemplate";
import MediaImageTemplateGrid from "components/Templates/MediaImageTemplateGrid";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import LayoutContainer from "components/UI/LayoutContainer";
import H2 from "components/UI/Typography/H2";
import H3 from "components/UI/Typography/H3";
import P from "components/UI/Typography/P";
import { apiEndpoints } from "data/apiEndpoints";
import { LAYOUT_TYPES, ROUTES, opacityMotionTransition, siteInfo } from "data/global";
import { cn, fetchOptions, getNiceName, getReleaseYear, matches, mergeCrewData } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const EpisodeRatingButton = ({ savedRating, title, seriesId, seasonNumber, episodeNumber }) => {
  const [savedRatingState, setSavedRatingState] = useState(savedRating);
  const { isModalVisible, openModal, closeModal } = useModal();
  const { setEpisodeRating } = useSetEpisodeRating();
  const { deleteEpisodeRating } = useDeleteEpisodeRating();

  const setRatingHandler = async ({ rating }) => {
    const res = await setEpisodeRating({ seriesId, seasonNumber, episodeNumber, rating });

    if (res?.success) {
      toast.success("Rating updated successfully");
      setSavedRatingState(rating);
    } else {
      toast.error("Something went wrong, please try again later");
    }
  };

  const deleteRatingHandler = async () => {
    const res = await deleteEpisodeRating({ seriesId, seasonNumber, episodeNumber });

    if (res?.success) {
      toast.success("Rating deleted successfully");

      setSavedRatingState(0);
    } else {
      toast.error("Something went wrong, please try again later");
    }
  };

  return (
    <Fragment>
      <Button onClick={openModal} shape='circle' size='small' title={savedRatingState ? "Update your rating" : "Rate this media"}>
        <AnimatePresence mode='wait' initial={false}>
          <motion.div key={`rating - ${savedRatingState.toString()}`} {...opacityMotionTransition}>
            {savedRatingState ? <Star size={16} fill='currentColor' /> : <Star size={16} />}
          </motion.div>
        </AnimatePresence>
      </Button>

      <RatingModal
        isOpen={isModalVisible}
        closeModal={closeModal}
        rating={savedRatingState}
        title={title}
        mediaType='episode'
        setRatingFunc={setRatingHandler}
        deleteRatingFunc={deleteRatingHandler}
      />
    </Fragment>
  );
};

const Episode = ({
  releaseDate,
  overview,
  cast,
  seasonNumber,
  episodeNumber,
  rating,
  backdrop,
  episodeName,
  runtime,
  backdrops,
  crewData,
  accountStates,
  tvData: { id, name, airDate }
}) => {
  let LAYOUT_TYPE = LAYOUT_TYPES.standard;

  if (backdrop) {
    LAYOUT_TYPE = LAYOUT_TYPES.standard;
  } else {
    LAYOUT_TYPE = LAYOUT_TYPES.blank;
  }

  const savedRating = accountStates?.rated?.value || 0;

  console.info(savedRating);

  return (
    <Fragment>
      <MetaWrapper
        title={`${name} (${getReleaseYear(airDate)}) S${seasonNumber}E${episodeNumber} - cinephiled`}
        description={overview}
        image={getTMDBImage({ path: backdrop, type: "backdrop", size: "w1280" })}
        url={`${siteInfo.url}/${ROUTES.tv}/${getNiceName({ id, name })}/${ROUTES.seasons}/${seasonNumber}/${ROUTES.episodes}/${episodeNumber}`}
      />

      <section className='relative'>
        <MediaHeroBackground backdropPath={backdrop} posterPath={backdrop} alt='episode-backdrop' />

        <LayoutContainer
          className={cn("flex items-center gap-32 above-lg:py-4864 max-lg:pb-3248", {
            "blank py-2464": matches(LAYOUT_TYPE, LAYOUT_TYPES.blank)
          })}
          css={mediaDetailsWrapper}>
          <div
            className={cn("w-full max-w-full", {
              "above-lg:max-w-md xl:max-w-xl 2xl:max-w-2xl": matches(LAYOUT_TYPE, LAYOUT_TYPES.standard),
              "above-lg:max-w-3xl": matches(LAYOUT_TYPE, LAYOUT_TYPES.blank)
            })}>
            <P
              weight='semibold'
              size='large'
              className={cn("text-pretty", matches(LAYOUT_TYPE, LAYOUT_TYPES.blank) ? "text-neutral-300" : "text-neutral-400")}>
              {name} ({getReleaseYear(airDate)})
            </P>

            <div>
              <H2 tag='h1' className='mb-16 text-balance'>
                {episodeName} ({`S${seasonNumber} E${episodeNumber}`})
              </H2>

              <TVStats releaseDate={releaseDate} rating={rating} totalRuntime={runtime} />

              {overview ? (
                <P size='large' className='text-pretty'>
                  {overview}
                </P>
              ) : null}

              {crewData?.length > 0 ? <CrewCredits crewData={crewData} className='my-2032' /> : null}

              <FlexBox className='mt-2032 flex-wrap items-center gap-10'>
                <EpisodeRatingButton
                  savedRating={savedRating}
                  title={episodeName}
                  seriesId={id}
                  seasonNumber={seasonNumber}
                  episodeNumber={episodeNumber}
                />
                <ShareButton shape='circle' iconSize={16} size='small' title={name} text={overview} />
              </FlexBox>
            </div>
          </div>
        </LayoutContainer>
      </section>

      <div className='relative grow'>
        <DominantColor image={backdrop} isUsingBackdrop tint angle='0deg' />

        <div className='relative z-10'>
          {/* cast */}
          {cast?.length > 0 ? (
            <LayoutContainer className='py-3248 pe-4'>
              <H3 className='mb-1620'>Cast</H3>
              <CastCarousel cast={cast} />
            </LayoutContainer>
          ) : null}

          {/* backdrops */}
          {backdrops?.length > 0 ? (
            <LayoutContainer className='py-3248'>
              <H3 className='mb-1620'>Backdrops</H3>
              <MediaImageTemplateGrid items={backdrops} type='backdrops' />
            </LayoutContainer>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

export default Episode;

export const getServerSideProps = async (ctx) => {
  try {
    const data = await getServerSession(ctx.req, ctx.res, authOptions);

    const [response, tvRes, accountStatesRes] = await Promise.all([
      fetch(
        apiEndpoints.tv.episodeDetails({
          id: ctx.query.id,
          seasonNumber: ctx.query.sn,
          episodeNumber: ctx.query.episode
        }),
        fetchOptions()
      ),
      fetch(apiEndpoints.tv.tvDetailsNoAppend(ctx.query.id), fetchOptions()),
      fetch(
        apiEndpoints.tv.episodeAccountStates({
          seriesId: ctx.query.id,
          seasonNumber: ctx.query.sn,
          episodeNumber: ctx.query.episode
        }),
        fetchOptions({
          token: data?.user?.accessToken
        })
      )
    ]);

    if (!response.ok) throw new Error("error fetching details");

    const [res, tvData, accountStates] = await Promise.all([response.json(), tvRes.json(), accountStatesRes.json()]);

    const { cast, guest_stars } = res?.credits;

    const director = res?.credits?.crew?.find((item) => matches(item.job, "Director")) || {};
    const writers = res?.credits?.crew?.filter((item) => matches(item.job, "Writer")).slice(0, 2) || [];

    const crewData = mergeCrewData([{ ...director }, ...writers]);

    return {
      props: {
        releaseDate: res?.air_date,
        overview: res?.overview,
        cast: cast.concat(guest_stars) || [],
        seasonNumber: res?.season_number,
        episodeNumber: res?.episode_number,
        episodeName: res?.name,
        rating: res?.vote_average,
        backdrop: res?.still_path,
        runtime: res?.runtime,
        backdrops: res?.images?.stills,
        crewData,
        accountStates,
        tvData: {
          id: ctx.query.id,
          name: tvData?.name,
          airDate: tvData?.first_air_date
        }
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};
