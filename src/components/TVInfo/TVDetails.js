import { useAddToWatchlist, useSetFavorite } from "api/user";
import DominantColor from "components/DominantColor/DominantColor";
import {
  Credits,
  CreditsWrapper,
  Divider,
  GenreWrap,
  Gradient,
  HeroInfoTitle,
  HeroInfoWrapper,
  FeatureButton,
  Overview,
  RatingWrapper,
  Rounded,
  RtoR,
  Span,
  Tagline
} from "components/MovieInfo/MovieDetailsStyles";
import { RatingOverlay } from "components/ProfilePage/ProfilePageStyles";
import RatingModal, { useModal } from "components/RatingModal/RatingModal";
import SocialMediaLinks from "components/SocialMediaLinks/SocialMediaLinks";
import Toast, { useToast } from "components/Toast/Toast";
import { motion, AnimatePresence } from "framer-motion";
import { blurPlaceholder } from "globals/constants";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Fragment, useContext } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiListPlus, BiListCheck } from "react-icons/bi";
import { BsStarHalf } from "react-icons/bs";
import { FaYoutube, FaHeart, FaRegHeart } from "react-icons/fa";
import { framerTabVariants, getCleanTitle, getRating, getRuntime } from "src/utils/helper";
import { MediaContext } from "Store/MediaContext";
import {
  DetailsHeroWrap,
  HeroBg,
  HeroBgContainer,
  HeroDetailsContainer,
  HeroImg,
  HeroImgWrapper
} from "styles/GlobalComponents";

const TVDetails = ({
  tvData: {
    id,
    title,
    airDate,
    overview,
    backdropPath,
    posterPath,
    socialIds,
    rating,
    genres,
    runtime,
    tagline,
    trailerLink,
    homepage,
    crewData,
    releaseYear
  }
}) => {
  const { status } = useSession();
  const { setFavorite } = useSetFavorite();
  const { addToWatchlist } = useAddToWatchlist();
  const {
    favoriteTvShows,
    tvShowsWatchlist,
    validateFavoriteTvShows,
    validateTvWatchlist,
    ratedTvShows
  } = useContext(MediaContext);
  const { isToastVisible, showToast, toastMessage, setToastMessage } = useToast();
  const savedRating = ratedTvShows?.find((item) => item?.id === id)?.rating ?? false;
  const { isModalVisible, openModal, closeModal } = useModal();

  // splice genres
  genres.length > 3 && genres.splice(3);

  const isAddedToFavorites = favoriteTvShows?.map((item) => item.id)?.includes(id);
  const isAddedToWatchlist = tvShowsWatchlist?.map((item) => item.id)?.includes(id);

  const favoriteHandler = async () => {
    if (status === "authenticated") {
      const response = await setFavorite({
        mediaType: "tv",
        mediaId: id,
        favoriteState: !isAddedToFavorites
      });

      if (response.success) {
        if (isAddedToFavorites) {
          validateFavoriteTvShows({ state: "removed", id });
        } else {
          const updatedMedia = [...favoriteTvShows];

          updatedMedia.unshift({
            id,
            title,
            poster_path: posterPath,
            first_air_date: airDate
          });

          validateFavoriteTvShows({ state: "added", id, media: updatedMedia });
        }
      }

      setToastMessage(isAddedToFavorites ? "Removed from favorites" : "Added to favorites");
      showToast();
    } else if (!isToastVisible) {
      setToastMessage("Login first to use this feature");
      showToast();
    }
  };

  const watchlistHandler = async () => {
    if (status === "authenticated") {
      const response = await addToWatchlist({
        mediaType: "tv",
        mediaId: id,
        watchlistState: !isAddedToWatchlist
      });

      if (response.success) {
        if (isAddedToWatchlist) {
          validateTvWatchlist({ state: "removed", id });
        } else {
          const updatedMedia = [...tvShowsWatchlist];

          updatedMedia.unshift({
            id,
            title,
            poster_path: posterPath,
            first_air_date: airDate
          });

          validateTvWatchlist({ state: "added", id, media: updatedMedia });
        }
      }

      setToastMessage(isAddedToWatchlist ? "Removed from watchlist" : "Added to watchlist");
      showToast();
    } else if (!isToastVisible) {
      setToastMessage("Login first to use this feature");
      showToast();
    }
  };

  const ratingModalHandler = () => {
    if (status === "authenticated") {
      openModal();
    } else {
      setToastMessage("Login first to use this feature");
      showToast();
    }
  };

  return (
    <Fragment>
      <HeroDetailsContainer className='relative mb-auto'>
        <HeroBgContainer className='absolute'>
          <HeroBg className='absolute text-center'>
            <Image
              src={
                backdropPath
                  ? `https://image.tmdb.org/t/p/w1280${backdropPath}`
                  : "/Images/Hex.webp"
              }
              alt='tv-backdrop'
              layout='fill'
              objectFit='cover'
              priority
            />
          </HeroBg>
          <DominantColor image={posterPath} />
        </HeroBgContainer>
        <DetailsHeroWrap>
          <HeroImgWrapper>
            <HeroImg className='relative text-center'>
              <Image
                src={
                  posterPath
                    ? `https://image.tmdb.org/t/p/w500${posterPath}`
                    : "/Images/DefaultImage.png"
                }
                alt='tv-poster'
                layout='fill'
                objectFit='cover'
                priority
                placeholder='blur'
                blurDataURL={blurPlaceholder}
              />
            </HeroImg>

            <div className='w-full'>
              {trailerLink && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailerLink}`}
                  target='_blank'
                  rel='noreferrer'
                  aria-label='play trailer'
                  className='block mb-3'>
                  <FeatureButton>
                    <FaYoutube size='1.5rem' />
                    <Span>Play Trailer</Span>
                  </FeatureButton>
                </a>
              )}

              <div className='flex justify-start gap-4'>
                <FeatureButton
                  className='mediaCTA'
                  disabled={isToastVisible}
                  aria-label='watchlist button'
                  as={motion.button}
                  whileTap={{ scale: 0.95 }}
                  onClick={watchlistHandler}>
                  <AnimatePresence exitBeforeEnter initial={false}>
                    <motion.div
                      key={`watchlist - ${isAddedToWatchlist.toString()}`}
                      variants={framerTabVariants}
                      initial='hidden'
                      animate='visible'
                      exit='hidden'
                      transition={{ duration: 0.5 }}>
                      {isAddedToWatchlist ? (
                        <BiListCheck size='22px' />
                      ) : (
                        <BiListPlus size='22px' />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </FeatureButton>

                <FeatureButton
                  className='mediaCTA'
                  disabled={isToastVisible}
                  aria-label='favorite button'
                  onClick={favoriteHandler}
                  as={motion.button}
                  whileTap={{ scale: 0.95 }}>
                  <AnimatePresence exitBeforeEnter initial={false}>
                    <motion.div
                      key={`favorite - ${isAddedToFavorites.toString()}`}
                      variants={framerTabVariants}
                      initial='hidden'
                      animate='visible'
                      exit='hidden'
                      transition={{ duration: 0.5 }}>
                      {isAddedToFavorites ? <FaHeart size='20px' /> : <FaRegHeart size='20px' />}
                    </motion.div>
                  </AnimatePresence>
                </FeatureButton>

                <FeatureButton
                  className='mediaCTA'
                  disabled={isToastVisible}
                  aria-label='rating button'
                  as={motion.button}
                  whileTap={{ scale: 0.95 }}
                  onClick={ratingModalHandler}>
                  <AnimatePresence exitBeforeEnter initial={false}>
                    <motion.div
                      key={`rating - ${savedRating.toString()}`}
                      variants={framerTabVariants}
                      initial='hidden'
                      animate='visible'
                      exit='hidden'
                      transition={{ duration: 0.5 }}>
                      {savedRating ? (
                        <RatingOverlay className='media-page'>
                          <AiFillStar size='16px' />
                          <p className='m-0 font-semibold text'>{savedRating}</p>
                        </RatingOverlay>
                      ) : (
                        <BsStarHalf size='20px' />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </FeatureButton>
              </div>
            </div>
            <SocialMediaLinks links={socialIds} homepage={homepage} />
          </HeroImgWrapper>

          <Gradient />

          <HeroInfoWrapper className='max-w-5xl'>
            <HeroInfoTitle className='mb-2'>
              {title} ({releaseYear})
            </HeroInfoTitle>

            <RtoR className='my-4'>
              {genres.length > 0 ? (
                <GenreWrap className='font-bold'>
                  {genres.map((item, i) => (
                    <Link
                      key={item.id}
                      href={`/genre/${item.id.toString() + "-" + item.name.split(" ").join("")}/tv`}
                      passHref
                      scroll={false}>
                      <a>
                        <Rounded className={genres.length == i + 1 && "sep"}>{item.name}</Rounded>
                      </a>
                    </Link>
                  ))}
                  <Divider />
                </GenreWrap>
              ) : null}

              <Span className='font-medium'>{getRuntime(runtime)}</Span>
            </RtoR>

            {tagline ? (
              <i>
                <Tagline className='my-4 block'>{tagline}</Tagline>
              </i>
            ) : null}
            {overview ? <Overview className='font-normal'>{overview}</Overview> : null}
            {rating ? (
              <RatingWrapper>
                <Fragment>
                  <Span className='text-[calc(1.525rem_+_3.3vw)] xl:text-6xl font-bold'>
                    {getRating(rating)}
                  </Span>
                  <span> / 10</span>
                </Fragment>
              </RatingWrapper>
            ) : null}

            {crewData.length > 0 && (
              <CreditsWrapper>
                {crewData.map((item) => (
                  <Credits key={item.credit_id}>
                    <Span className='block font-normal'>{item.job ?? "Creator"}</Span>
                    <Link href={`/person/${item.id}-${getCleanTitle(item.name)}`}>
                      <a>
                        <Span className='block font-bold credit'>{item.name}</Span>
                      </a>
                    </Link>
                  </Credits>
                ))}
              </CreditsWrapper>
            )}
          </HeroInfoWrapper>
        </DetailsHeroWrap>
      </HeroDetailsContainer>

      <AnimatePresence exitBeforeEnter initial={false}>
        {isToastVisible ? (
          <Toast key='toast'>
            <Span className='movieCastHead'>{toastMessage}</Span>
          </Toast>
        ) : null}

        {isModalVisible ? (
          <RatingModal
            key='rating-modal'
            mediaType='tv'
            mediaId={id}
            posterPath={posterPath}
            title={title}
            releaseDate={airDate}
            closeModal={closeModal}
            mediaName={`${title} (${releaseYear})`}
          />
        ) : null}
      </AnimatePresence>
    </Fragment>
  );
};

export default TVDetails;
