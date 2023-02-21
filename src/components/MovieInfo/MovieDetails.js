import {
  revalidationWrapper,
  useAddToWatchlist,
  useSetFavorite
} from 'api/user';
import DominantColor from 'components/DominantColor/DominantColor';
import { RatingOverlay } from 'components/ProfilePage/ProfilePageStyles';
import RatingModal, { useModal } from 'components/RatingModal/RatingModal';
import SocialMediaLinks from 'components/SocialMediaLinks/SocialMediaLinks';
import Toast, { useToast } from 'components/Toast/Toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BiListPlus, BiListCheck } from 'react-icons/bi';
import { BsStarHalf } from 'react-icons/bs';
import { FaYoutube, FaHeart, FaRegHeart } from 'react-icons/fa';
import { MediaContext } from 'Store/MediaContext';
import {
  DetailsHeroWrap,
  HeroBg,
  HeroBgContainer,
  HeroDetailsContainer,
  HeroImg,
  HeroImgWrapper
} from 'styles/GlobalComponents';
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
} from './MovieDetailsStyles';

const MovieDetails = ({
  movieDetails: {
    id,
    title,
    overview,
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
  year,
  easter
}) => {
  const { status } = useSession();
  const { setFavorite } = useSetFavorite();
  const { addToWatchlist } = useAddToWatchlist();
  const { renderEaster, hasSeen, showEaster, easterHandler } = easter;
  const {
    favoriteMovies,
    moviesWatchlist,
    revalidateFavorites,
    revalidateWatchlist,
    ratedMovies
  } = useContext(MediaContext);
  const {
    isToastVisible,
    showToast,
    removeToast,
    toastMessage,
    setToastMessage
  } = useToast();

  const savedRating = useMemo(
    () => ratedMovies?.find((item) => item?.id === id)?.rating ?? false,

    [id, ratedMovies]
  );

  const { isModalVisible, openModal, closeModal } = useModal();
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const isAddedToFavorites = favoriteMovies
      ?.map((item) => item.id)
      ?.includes(id);

    if (favoriteMovies.length > 0) {
      setIsFavorite(isAddedToFavorites);
    }
  }, [favoriteMovies, id]);

  useEffect(() => {
    const isAddedToWatchlist = moviesWatchlist
      ?.map((item) => item.id)
      ?.includes(id);

    if (moviesWatchlist.length > 0) {
      setAddedToWatchlist(isAddedToWatchlist);
    }
  }, [id, moviesWatchlist]);

  const releaseDateFormatted = !releaseDate
    ? 'TBA'
    : new Date(releaseDate.toString()).toDateString().slice(4, -5) +
      ', ' +
      year;

  const runtimeFormatted = useMemo(() => {
    const getH = Math.floor(runtime / 60);
    const getM = Math.ceil((runtime / 60 - getH) * 60);
    return { getH, getM };
  }, [runtime]);

  genres.length > 3 && genres.splice(3);

  const favoriteHandler = useCallback(async () => {
    if (status === 'authenticated') {
      const response = await setFavorite({
        mediaType: 'movie',
        mediaId: id,
        favoriteState: !isFavorite
      });

      if (response?.success) {
        setIsFavorite((prev) => !prev);
        revalidationWrapper(() => revalidateFavorites('favoriteMovies'));
      }
    } else if (!isToastVisible) {
      setToastMessage('Login first to use this feature');
      showToast();
      removeToast();
    }
  }, [
    isFavorite,
    isToastVisible,
    id,
    removeToast,
    revalidateFavorites,
    setFavorite,
    setToastMessage,
    showToast,
    status
  ]);

  const watchlistHandler = useCallback(async () => {
    if (status === 'authenticated') {
      const response = await addToWatchlist({
        mediaType: 'movie',
        mediaId: id,
        watchlistState: !addedToWatchlist
      });

      if (response?.success) {
        setAddedToWatchlist((prev) => !prev);
        revalidationWrapper(() => revalidateWatchlist('moviesWatchlist'));
      }
    } else if (!isToastVisible) {
      setToastMessage('Login first to use this feature');
      showToast();
      removeToast();
    }
  }, [
    addToWatchlist,
    addedToWatchlist,
    isToastVisible,
    id,
    removeToast,
    revalidateWatchlist,
    setToastMessage,
    showToast,
    status
  ]);

  const ratingModalHandler = useCallback(() => {
    if (status === 'authenticated') {
      openModal();
    } else {
      setToastMessage('Login first to use this feature');
      showToast();
      removeToast();
    }
  }, [openModal, removeToast, setToastMessage, showToast, status]);

  return (
    <Fragment>
      {renderEaster && (
        <Fragment>
          {/* easter egg */}
          {!hasSeen ? (
            <EasterText className='fs-4' show={showEaster}>
              Congratulations, you have found the easter egg.
            </EasterText>
          ) : (
            <EasterText className='fs-4' show={showEaster}>
              Aren&apos;t you scared?
            </EasterText>
          )}
          <LightsInOut show={showEaster} onClick={easterHandler} />
          <MovieEaster show={showEaster} />
        </Fragment>
      )}

      <AnimatePresence exitBeforeEnter initial={false}>
        {isToastVisible && (
          <Toast key='toast'>
            <Span className='toast-message'>{toastMessage}</Span>
          </Toast>
        )}

        {isModalVisible && (
          <RatingModal
            key='rating-modal'
            mediaType='movie'
            mediaId={id}
            closeModal={closeModal}
            mediaName={`${title} (${year})`}
          />
        )}
      </AnimatePresence>

      <HeroDetailsContainer className='position-relative mb-auto'>
        <HeroBgContainer className='position-absolute'>
          <HeroBg className='position-absolute text-center'>
            <Image
              src={
                backdropPath
                  ? `https://image.tmdb.org/t/p/w1280${backdropPath}`
                  : '/Images/Hex.webp'
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
            <HeroImg className='position-relative text-center'>
              <Image
                src={
                  moviePoster
                    ? `https://image.tmdb.org/t/p/w500${moviePoster}`
                    : '/Images/DefaultImage.png'
                }
                alt='movie-poster'
                layout='fill'
                objectFit='cover'
                priority
                placeholder='blur'
                blurDataURL='data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA=='
              />
            </HeroImg>

            <div className='w-100'>
              {trailerLink && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailerLink}`}
                  target='_blank'
                  rel='noreferrer'
                  aria-label='trailer'
                  className='mb-3 d-block'
                >
                  <FeatureButton role='button'>
                    <FaYoutube size='1.5rem' />
                    <Span>Play Trailer</Span>
                  </FeatureButton>
                </a>
              )}

              <AnimatePresence exitBeforeEnter initial={false}>
                <div
                  className='d-flex justify-content-start'
                  style={{ gap: '1rem' }}
                >
                  <FeatureButton
                    className='watchlist'
                    role='button'
                    as={motion.div}
                    whileTap={{ scale: 0.95 }}
                    onClick={watchlistHandler}
                  >
                    {addedToWatchlist ? (
                      <motion.div
                        key='watchlist'
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          transition: {
                            delay: 0.5,
                            duration: 0.5
                          }
                        }}
                        exit={{
                          opacity: 0,
                          transition: {
                            duration: 2
                          }
                        }}
                      >
                        <BiListCheck size='22px' />
                      </motion.div>
                    ) : (
                      <motion.div
                        key='add-to-watchlist'
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          transition: {
                            delay: 0.5,
                            duration: 0.5
                          }
                        }}
                        exit={{
                          opacity: 0,
                          transition: {
                            duration: 0.5
                          }
                        }}
                        className='watchlist-inner'
                      >
                        <BiListPlus size='22px' />
                      </motion.div>
                    )}
                  </FeatureButton>

                  <FeatureButton
                    className='fav'
                    role='button'
                    onClick={favoriteHandler}
                    as={motion.div}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Fragment>
                      {isFavorite ? (
                        <motion.div
                          className='d-flex justify-content-center align-items-center w-100 h-100'
                          key='fav'
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: {
                              delay: 0.5,
                              duration: 0.5
                            }
                          }}
                          exit={{
                            opacity: 0,
                            transition: {
                              duration: 0.5
                            }
                          }}
                        >
                          <FaHeart size='20px' />
                        </motion.div>
                      ) : (
                        <motion.div
                          className='d-flex justify-content-center align-items-center w-100 h-100'
                          key='add-to-fav'
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: {
                              duration: 0.5,
                              delay: 0.5
                            }
                          }}
                          exit={{
                            opacity: 0,
                            transition: {
                              duration: 0.5
                            }
                          }}
                        >
                          <FaRegHeart size='20px' />
                        </motion.div>
                      )}
                    </Fragment>
                  </FeatureButton>

                  <FeatureButton
                    className='fav'
                    role='button'
                    as={motion.div}
                    whileTap={{ scale: 0.95 }}
                    onClick={ratingModalHandler}
                  >
                    <Fragment>
                      {savedRating ? (
                        <motion.div
                          className='d-flex justify-content-center align-items-center w-100 h-100'
                          key='saved-rating'
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: {
                              delay: 0.5,
                              duration: 0.5
                            }
                          }}
                          exit={{
                            opacity: 0,
                            transition: {
                              duration: 0.5
                            }
                          }}
                        >
                          <RatingOverlay className='media-page'>
                            <AiFillStar size='16px' />
                            <p className='m-0 fw-semibold text'>
                              {savedRating}
                            </p>
                          </RatingOverlay>
                        </motion.div>
                      ) : (
                        <motion.div
                          className='d-flex justify-content-center align-items-center w-100 h-100'
                          key='rate'
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: {
                              duration: 0.5,
                              delay: 0.5
                            }
                          }}
                          exit={{
                            opacity: 0,
                            transition: {
                              duration: 0.5
                            }
                          }}
                        >
                          <BsStarHalf size='20px' />
                        </motion.div>
                      )}
                    </Fragment>
                  </FeatureButton>
                </div>
              </AnimatePresence>
            </div>

            {/* social media links */}
            <SocialMediaLinks links={socialIds} homepage={homepage} />
          </HeroImgWrapper>
          <Gradient />

          {/* right side info */}
          <HeroInfoWrapper>
            <HeroInfoTitle className='mb-2'>
              {title} ({year})
            </HeroInfoTitle>
            {renderEaster && <Light onClick={easterHandler} />}
            <RtoR className='my-3'>
              <ReleaseDateWrapper>
                <Span>{releaseDateFormatted}</Span>
              </ReleaseDateWrapper>
              {genres.length > 0 && (
                <GenreWrap className='fw-bold'>
                  <Divider />
                  {genres.map((item, i) => (
                    <Link
                      key={item.id}
                      href={`/genre/${
                        item.id.toString() + '-' + item.name
                      }/movies`}
                      passHref
                      scroll={false}
                    >
                      <a>
                        <Rounded className={genres.length == i + 1 && 'sep'}>
                          {item.name}
                        </Rounded>
                      </a>
                    </Link>
                  ))}
                  <Divider />
                </GenreWrap>
              )}
              {runtimeFormatted.getH === 0 && runtimeFormatted.getM === 0 ? (
                <Span>TBA</Span>
              ) : (
                <Span>
                  {runtimeFormatted.getH === 1 && runtimeFormatted.getM === 0
                    ? '60m'
                    : runtimeFormatted.getH > 0 && runtimeFormatted.getH + 'h '}
                  {runtimeFormatted.getM > 0 && runtimeFormatted.getM + 'm'}
                </Span>
              )}
            </RtoR>
            {tagline !== '' && (
              <i>
                <Tagline className='my-4 d-block'>{tagline}</Tagline>
              </i>
            )}
            <Overview className='fw-normal'>
              {!overview ? '-' : overview}
            </Overview>
            <RatingWrapper>
              {rating !== 0 ? (
                <Fragment>
                  <Span className='display-3 fw-bolder'>
                    {rating.toFixed(1)}
                  </Span>
                  <span> / 10</span>
                </Fragment>
              ) : (
                <Span className='display-3 fw-bolder'>NR</Span>
              )}
            </RatingWrapper>
            {crewData.length > 0 && (
              <CreditsWrapper>
                {crewData.map((item) => (
                  <Credits key={item.credit_id}>
                    <Span className='d-block fw-normal'>{item.job}</Span>
                    <Link
                      href={`/person/${item.id}-${item.name.replace(
                        /[' ']/g,
                        '-'
                      )}`}
                    >
                      <a>
                        <Span className='d-block fw-bold credit'>
                          {item.name}
                        </Span>
                      </a>
                    </Link>
                  </Credits>
                ))}
              </CreditsWrapper>
            )}
          </HeroInfoWrapper>
        </DetailsHeroWrap>
      </HeroDetailsContainer>
    </Fragment>
  );
};

export default MovieDetails;
