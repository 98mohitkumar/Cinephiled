import {
  revalidationWrapper,
  useAddToWatchlist,
  useSetFavorite
} from 'api/user';
import DominantColor from 'components/DominantColor/DominantColor';
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
} from 'components/MovieInfo/MovieDetailsStyles';
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

const TVDetails = ({ tvData, year }) => {
  tvData.genres.length > 3 && tvData.genres.splice(3);
  const { status } = useSession();
  const { setFavorite } = useSetFavorite();
  const { addToWatchlist } = useAddToWatchlist();
  const {
    favoriteTvShows,
    tvShowsWatchlist,
    revalidateFavorites,
    revalidateWatchlist,
    ratedTvShows
  } = useContext(MediaContext);
  const {
    isToastVisible,
    showToast,
    removeToast,
    toastMessage,
    setToastMessage
  } = useToast();

  const savedRating = useMemo(
    () => ratedTvShows?.find((item) => item?.id === tvData.id)?.rating ?? false,

    [ratedTvShows, tvData.id]
  );

  const { isModalVisible, openModal, closeModal } = useModal();
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const isAddedToFavorites = favoriteTvShows
      ?.map((item) => item.id)
      ?.includes(tvData?.id);

    if (favoriteTvShows.length > 0) {
      setIsFavorite(isAddedToFavorites);
    }
  }, [favoriteTvShows, tvData?.id]);

  useEffect(() => {
    const isAddedToWatchlist = tvShowsWatchlist
      ?.map((item) => item.id)
      ?.includes(tvData?.id);

    if (tvShowsWatchlist.length > 0) {
      setAddedToWatchlist(isAddedToWatchlist);
    }
  }, [tvData?.id, tvShowsWatchlist]);

  const socialIds = useMemo(() => tvData?.external_ids, [tvData?.external_ids]);

  const runtime = useMemo(() => {
    const getH = Math.floor(tvData?.episode_run_time[0] / 60);
    const getM = Math.ceil((tvData?.episode_run_time[0] / 60 - getH) * 60);
    return { getH, getM };
  }, [tvData?.episode_run_time]);

  const videos = useMemo(
    () =>
      tvData?.videos?.results?.filter(
        (item) => item?.site === 'YouTube' && item?.type === 'Trailer'
      ),
    [tvData?.videos?.results]
  );

  const crew = useMemo(() => tvData?.credits?.crew, [tvData?.credits?.crew]);

  const crewData = useMemo(
    () => [
      ...tvData?.created_by?.slice(0, 2),
      ...crew?.filter((credit) => credit.job === 'Characters').slice(0, 2)
    ],
    [crew, tvData?.created_by]
  );

  const favoriteHandler = useCallback(async () => {
    if (status === 'authenticated') {
      const response = await setFavorite({
        mediaType: 'tv',
        mediaId: tvData?.id,
        favoriteState: !isFavorite
      });

      if (response.success) {
        setIsFavorite((prev) => !prev);

        revalidationWrapper(() => revalidateFavorites('favoriteTvShows'));
      }
    } else if (!isToastVisible) {
      setToastMessage('Login first to use this feature');
      showToast();
      removeToast();
    }
  }, [
    isFavorite,
    isToastVisible,
    removeToast,
    revalidateFavorites,
    setFavorite,
    setToastMessage,
    showToast,
    status,
    tvData?.id
  ]);

  const watchlistHandler = useCallback(async () => {
    if (status === 'authenticated') {
      const response = await addToWatchlist({
        mediaType: 'tv',
        mediaId: tvData?.id,
        watchlistState: !addedToWatchlist
      });

      if (response.success) {
        setAddedToWatchlist((prev) => !prev);

        revalidationWrapper(() => revalidateWatchlist('tvShowsWatchlist'));
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
    removeToast,
    revalidateWatchlist,
    setToastMessage,
    showToast,
    status,
    tvData?.id
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
      <AnimatePresence exitBeforeEnter initial={false}>
        {isToastVisible && (
          <Toast key='toast'>
            <Span className='movieCastHead'>{toastMessage}</Span>
          </Toast>
        )}

        {isModalVisible && (
          <RatingModal
            key='rating-modal'
            mediaType='tv'
            mediaId={tvData?.id}
            closeModal={closeModal}
            mediaName={`${tvData?.name} (${year})`}
          />
        )}
      </AnimatePresence>

      <HeroDetailsContainer className='position-relative mb-auto'>
        <HeroBgContainer className='position-absolute'>
          <HeroBg className='position-absolute text-center'>
            <Image
              src={
                tvData.backdrop_path
                  ? `https://image.tmdb.org/t/p/w1280${tvData?.backdrop_path}`
                  : '/Images/Hex.png'
              }
              alt='tv-backdrop'
              layout='fill'
              objectFit='cover'
              priority
            />
          </HeroBg>
          <DominantColor image={tvData?.poster_path} />
        </HeroBgContainer>
        <DetailsHeroWrap>
          <HeroImgWrapper>
            <HeroImg className='position-relative text-center'>
              <Image
                src={
                  tvData.poster_path
                    ? `https://image.tmdb.org/t/p/w500${tvData?.poster_path}`
                    : '/Images/DefaultImage.png'
                }
                alt='tv-poster'
                layout='fill'
                objectFit='cover'
                priority
              />
            </HeroImg>

            <div className='w-100'>
              {videos.length !== 0 && (
                <a
                  href={`https://www.youtube.com/watch?v=${videos[0].key}`}
                  target='_blank'
                  rel='noreferrer'
                  aria-label='trailer'
                  className='d-block mb-3'
                >
                  <FeatureButton>
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
                            duration: 0.5
                          }
                        }}
                        className='watchlist-inner'
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
            <SocialMediaLinks links={socialIds} homepage={tvData.homepage} />
          </HeroImgWrapper>

          <Gradient />

          <HeroInfoWrapper>
            <HeroInfoTitle className='mb-2'>
              {tvData.name} ({year})
            </HeroInfoTitle>

            <RtoR className='my-3'>
              {tvData.genres.length > 0 && (
                <GenreWrap className='fw-bold'>
                  {tvData.genres.map((item, i) => (
                    <Link
                      key={item.id}
                      href={`/genre/${
                        item.id.toString() + '-' + item.name.split(' ').join('')
                      }/tv`}
                      passHref
                      scroll={false}
                    >
                      <a>
                        <Rounded
                          className={tvData.genres.length == i + 1 && 'sep'}
                        >
                          {item.name}
                        </Rounded>
                      </a>
                    </Link>
                  ))}
                </GenreWrap>
              )}
              {!isNaN(runtime.getH) ? (
                <Span>
                  <Divider className='tvSpan' />
                  {runtime.getH === 1 && runtime.getM === 0
                    ? '60m'
                    : runtime.getH > 0 && runtime.getH + 'h '}
                  {runtime.getM > 0 && runtime.getM + 'm'}
                </Span>
              ) : (
                <Span>
                  <Divider className='tvSpan' />
                  TBA
                </Span>
              )}
            </RtoR>
            {tvData?.tagline.length > 0 && (
              <i>
                <Tagline className='my-4 d-block'>{tvData.tagline}</Tagline>
              </i>
            )}
            <Overview className='fw-normal'>{tvData.overview}</Overview>
            <RatingWrapper>
              {tvData.vote_average !== 0 ? (
                <Fragment>
                  <Span className='display-3 fw-bolder'>
                    {tvData.vote_average.toFixed(1)}
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
                    <Span className='d-block fw-normal'>
                      {item.job ?? 'Creator'}
                    </Span>
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

export default TVDetails;
