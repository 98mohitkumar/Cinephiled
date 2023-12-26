import { addToWatchlist, setFavorite } from "api/user";
import DominantColor from "components/DominantColor/DominantColor";
import { RatingOverlay } from "components/ProfilePage/ProfilePageStyles";
import RatingModal, { useModal } from "components/RatingModal/RatingModal";
import SocialMediaLinks from "components/SocialMediaLinks/SocialMediaLinks";
import Toast, { useToast } from "components/Toast/Toast";
import { motion, AnimatePresence } from "framer-motion";
import { blurPlaceholder } from "globals/constants";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiListPlus, BiListCheck } from "react-icons/bi";
import { BsStarHalf } from "react-icons/bs";
import { FaYoutube, FaHeart, FaRegHeart } from "react-icons/fa";
import { framerTabVariants, getCleanTitle, getRating, getRuntime } from "src/utils/helper";
import { useMediaContext } from "Store/MediaContext";
import { useUserContext } from "Store/UserContext";
import {
  DetailsHeroWrap,
  HeroBg,
  HeroBgContainer,
  HeroDetailsContainer,
  HeroImg,
  HeroImgWrapper
} from "styles/GlobalComponents";
import {
  Divider,
  Rounded,
  GenreWrap,
  HeroInfoWrapper,
  RatingWrapper,
  HeroInfoTitle,
  RtoR,
  Span,
  CreditsWrapper,
  Credits,
  Tagline,
  ReleaseDateWrapper,
  Overview,
  Light,
  EasterText,
  LightsInOut,
  Gradient,
  MovieEaster,
  FeatureButton
} from "./MovieDetailsStyles";

const MovieDetails = ({
  movieDetails: {
    id,
    title,
    overview,
    releaseYear,
    releaseDate,
    backdropPath,
    runtime,
    trailerLink,
    genres,
    tagline,
    rating,
    moviePoster,
    crewData,
    socialIds,
    homepage
  },
  easter
}) => {
  const { userInfo } = useUserContext();
  const { renderEaster, hasSeen, showEaster, easterHandler } = easter;
  const {
    favoriteMovies,
    moviesWatchlist,
    validateMoviesWatchlist,
    validateFavoriteMovies,
    ratedMovies
  } = useMediaContext();
  const { isToastVisible, showToast, toastMessage } = useToast();
  const savedRating = ratedMovies?.find((item) => item?.id === id)?.rating ?? false;
  const { isModalVisible, openModal, closeModal } = useModal();

  // splice genres
  genres.length > 3 && genres.splice(3);

  const isAddedToWatchlist = moviesWatchlist?.map((item) => item.id)?.includes(id);
  const isAddedToFavorites = favoriteMovies?.map((item) => item.id)?.includes(id);

  const favoriteHandler = async () => {
    if (userInfo?.accountId) {
      const response = await setFavorite({
        mediaType: "movie",
        mediaId: id,
        favoriteState: !isAddedToFavorites
      });

      if (response?.success) {
        if (isAddedToFavorites) {
          validateFavoriteMovies({
            state: "removed",
            id
          });
        } else {
          const updatedMedia = [...favoriteMovies];

          updatedMedia.unshift({
            id,
            poster_path: moviePoster,
            title,
            release_date: releaseDate
          });

          validateFavoriteMovies({
            state: "added",
            id,
            media: updatedMedia
          });
        }

        showToast({
          message: isAddedToFavorites ? "Removed from favorites" : "Added to favorites"
        });
      } else {
        showToast({ message: "Something went wrong, try again later" });
      }
    } else if (!isToastVisible) {
      showToast({ message: "Login first to use this feature" });
    }
  };

  const watchlistHandler = async () => {
    if (userInfo?.accountId) {
      const response = await addToWatchlist({
        mediaType: "movie",
        mediaId: id,
        watchlistState: !isAddedToWatchlist
      });

      if (response?.success) {
        if (isAddedToWatchlist) {
          validateMoviesWatchlist({
            state: "removed",
            id
          });
        } else {
          const updatedMedia = [...moviesWatchlist];

          updatedMedia.unshift({
            id,
            poster_path: moviePoster,
            title,
            release_date: releaseDate
          });

          validateMoviesWatchlist({
            state: "added",
            id,
            media: updatedMedia
          });
        }
        showToast({
          message: isAddedToWatchlist ? "Removed from watchlist" : "Added to watchlist"
        });
      } else {
        showToast({ message: "Something went wrong, try again later" });
      }
    } else if (!isToastVisible) {
      showToast({ message: "Login first to use this feature" });
    }
  };

  const ratingModalHandler = () => {
    if (userInfo?.accountId) {
      openModal();
    } else {
      showToast({ message: "Login first to use this feature" });
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
              alt='movie-backdrop'
              layout='fill'
              objectFit='cover'
              priority
            />
          </HeroBg>

          {/* color gradient overlay */}
          <DominantColor image={moviePoster} />
        </HeroBgContainer>

        <DetailsHeroWrap>
          <HeroImgWrapper>
            <HeroImg className='relative text-center'>
              <Image
                src={
                  moviePoster
                    ? `https://image.tmdb.org/t/p/w500${moviePoster}`
                    : "/Images/DefaultImage.png"
                }
                alt='movie-poster'
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
                  className='mb-3 block'>
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
                  aria-label='favorite button'
                  onClick={favoriteHandler}
                  as={motion.button}
                  disabled={isToastVisible}
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
                  aria-label='rating button'
                  as={motion.button}
                  disabled={isToastVisible}
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

            {/* social media links */}
            <SocialMediaLinks links={socialIds} homepage={homepage} />
          </HeroImgWrapper>
          <Gradient />

          {/* right side info */}
          <HeroInfoWrapper className='max-w-5xl'>
            <HeroInfoTitle className='mb-2'>
              {title} ({releaseYear})
            </HeroInfoTitle>
            {renderEaster ? <Light onClick={easterHandler} /> : null}
            <RtoR className='my-4'>
              <ReleaseDateWrapper>
                <Span className='font-medium'>{releaseDate}</Span>
              </ReleaseDateWrapper>
              {genres.length > 0 ? (
                <GenreWrap className='font-bold'>
                  <Divider />
                  {genres.map((item, i) => (
                    <Link
                      key={item.id}
                      href={`/genre/${
                        item.id.toString() + "-" + item.name.replaceAll(" ", "-")
                      }/movies`}
                      passHref
                      scroll={false}>
                      <a>
                        <Rounded className={genres.length == i + 1 ? "sep" : ""}>
                          {item.name}
                        </Rounded>
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
            {crewData?.length > 0 ? (
              <CreditsWrapper>
                {crewData.map((item) => (
                  <Credits key={item.credit_id}>
                    <Span className='block font-normal'>{item.job}</Span>
                    <Link href={`/person/${item.id}-${getCleanTitle(item.name)}`}>
                      <a>
                        <Span className='block font-bold credit'>{item.name}</Span>
                      </a>
                    </Link>
                  </Credits>
                ))}
              </CreditsWrapper>
            ) : null}
          </HeroInfoWrapper>
        </DetailsHeroWrap>
      </HeroDetailsContainer>

      {renderEaster ? (
        <Fragment>
          {!hasSeen ? (
            <EasterText className='text-xl md:text-2xl px-5' show={showEaster}>
              Congratulations, you have found the easter egg.
            </EasterText>
          ) : (
            <EasterText className='text-xl md:text-2xl' show={showEaster}>
              Aren&apos;t you scared?
            </EasterText>
          )}
          <LightsInOut show={showEaster} onClick={easterHandler} />
          <MovieEaster show={showEaster} />
        </Fragment>
      ) : null}

      <AnimatePresence exitBeforeEnter initial={false}>
        {isToastVisible ? (
          <Toast key='toast'>
            <Span className='toast-message'>{toastMessage}</Span>
          </Toast>
        ) : null}

        {isModalVisible ? (
          <RatingModal
            key='rating-modal'
            mediaType='movie'
            mediaId={id}
            posterPath={moviePoster}
            releaseDate={releaseDate}
            title={title}
            closeModal={closeModal}
            mediaName={`${title} (${releaseYear})`}
          />
        ) : null}
      </AnimatePresence>
    </Fragment>
  );
};

export default MovieDetails;
