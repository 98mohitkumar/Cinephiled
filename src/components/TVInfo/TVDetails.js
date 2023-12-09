import { revalidationWrapper, useAddToWatchlist, useSetFavorite } from "api/user";
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
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiListPlus, BiListCheck } from "react-icons/bi";
import { BsStarHalf } from "react-icons/bs";
import { FaYoutube, FaHeart, FaRegHeart } from "react-icons/fa";
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
    crewData
  },
  year
}) => {
  genres.length > 3 && genres.splice(3);

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
  const { isToastVisible, showToast, removeToast, toastMessage, setToastMessage } = useToast();

  const savedRating = useMemo(
    () => ratedTvShows?.find((item) => item?.id === id)?.rating ?? false,

    [ratedTvShows, id]
  );

  const { isModalVisible, openModal, closeModal } = useModal();
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const isAddedToFavorites = favoriteTvShows?.map((item) => item.id)?.includes(id);

    if (favoriteTvShows.length > 0) {
      setIsFavorite(isAddedToFavorites);
    }
  }, [favoriteTvShows, id]);

  useEffect(() => {
    const isAddedToWatchlist = tvShowsWatchlist?.map((item) => item.id)?.includes(id);

    if (tvShowsWatchlist.length > 0) {
      setAddedToWatchlist(isAddedToWatchlist);
    }
  }, [id, tvShowsWatchlist]);

  const runtimeFormatted = useMemo(() => {
    const getH = Math.floor(runtime / 60);
    const getM = Math.ceil((runtime / 60 - getH) * 60);
    return { getH, getM };
  }, [runtime]);

  const favoriteHandler = async () => {
    if (status === "authenticated") {
      const response = await setFavorite({
        mediaType: "tv",
        mediaId: id,
        favoriteState: !isFavorite
      });

      if (response.success) {
        setIsFavorite((prev) => !prev);
        setToastMessage(isFavorite ? "Removed from favorites" : "Added to favorites");
        showToast();
        removeToast();
        revalidationWrapper(() => revalidateFavorites("favoriteTvShows"));
      }
    } else if (!isToastVisible) {
      setToastMessage("Login first to use this feature");
      showToast();
      removeToast();
    }
  };

  const watchlistHandler = async () => {
    if (status === "authenticated") {
      const response = await addToWatchlist({
        mediaType: "tv",
        mediaId: id,
        watchlistState: !addedToWatchlist
      });

      if (response.success) {
        setAddedToWatchlist((prev) => !prev);
        setToastMessage(addedToWatchlist ? "Removed from watchlist" : "Added to watchlist");
        showToast();
        removeToast();
        revalidationWrapper(() => revalidateWatchlist("tvShowsWatchlist"));
      }
    } else if (!isToastVisible) {
      setToastMessage("Login first to use this feature");
      showToast();
      removeToast();
    }
  };

  const ratingModalHandler = () => {
    if (status === "authenticated") {
      openModal();
    } else {
      setToastMessage("Login first to use this feature");
      showToast();
      removeToast();
    }
  };

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
            mediaId={id}
            closeModal={closeModal}
            mediaName={`${title} (${year})`}
          />
        )}
      </AnimatePresence>

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
                blurDataURL='data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA=='
              />
            </HeroImg>

            <div className='w-full'>
              {trailerLink && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailerLink}`}
                  target='_blank'
                  rel='noreferrer'
                  aria-label='trailer'
                  className='block mb-3'>
                  <FeatureButton>
                    <FaYoutube size='1.5rem' />
                    <Span>Play Trailer</Span>
                  </FeatureButton>
                </a>
              )}

              <AnimatePresence exitBeforeEnter initial={false}>
                <div className='flex justify-start' style={{ gap: "1rem" }}>
                  <FeatureButton
                    className='watchlist'
                    role='button'
                    aria-label='watchlist button'
                    as={motion.div}
                    whileTap={{ scale: 0.95 }}
                    onClick={watchlistHandler}>
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
                        className='watchlist-inner'>
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
                        className='watchlist-inner'>
                        <BiListPlus size='22px' />
                      </motion.div>
                    )}
                  </FeatureButton>
                  <FeatureButton
                    className='fav'
                    role='button'
                    aria-label='favorite button'
                    onClick={favoriteHandler}
                    as={motion.div}
                    whileTap={{ scale: 0.95 }}>
                    <Fragment>
                      {isFavorite ? (
                        <motion.div
                          className='flex justify-center items-center w-full h-full'
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
                          }}>
                          <FaHeart size='20px' />
                        </motion.div>
                      ) : (
                        <motion.div
                          className='flex justify-center items-center w-full h-full'
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
                          }}>
                          <FaRegHeart size='20px' />
                        </motion.div>
                      )}
                    </Fragment>
                  </FeatureButton>

                  <FeatureButton
                    className='fav'
                    role='button'
                    aria-label='rating button'
                    as={motion.div}
                    whileTap={{ scale: 0.95 }}
                    onClick={ratingModalHandler}>
                    <Fragment>
                      {savedRating ? (
                        <motion.div
                          className='flex justify-center items-center w-full h-full'
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
                          }}>
                          <RatingOverlay className='media-page'>
                            <AiFillStar size='16px' />
                            <p className='m-0 font-semibold text'>{savedRating}</p>
                          </RatingOverlay>
                        </motion.div>
                      ) : (
                        <motion.div
                          className='flex justify-center items-center w-full h-full'
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
                          }}>
                          <BsStarHalf size='20px' />
                        </motion.div>
                      )}
                    </Fragment>
                  </FeatureButton>
                </div>
              </AnimatePresence>
            </div>
            <SocialMediaLinks links={socialIds} homepage={homepage} />
          </HeroImgWrapper>

          <Gradient />

          <HeroInfoWrapper>
            <HeroInfoTitle className='mb-2'>
              {title} ({year})
            </HeroInfoTitle>

            <RtoR className='my-4'>
              {genres.length > 0 && (
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
                </GenreWrap>
              )}

              {!isNaN(runtimeFormatted.getH) ? (
                <Span className='font-medium'>
                  {genres?.length > 0 && <Divider className='tvSpan' />}
                  {runtimeFormatted.getH === 1 && runtimeFormatted.getM === 0
                    ? "60m"
                    : runtimeFormatted.getH > 0 && runtimeFormatted.getH + "h "}
                  {runtimeFormatted.getM > 0 && runtimeFormatted.getM + "m"}
                </Span>
              ) : (
                <Span className='font-medium'>
                  {genres?.length > 0 && <Divider className='tvSpan' />}
                  TBA
                </Span>
              )}
            </RtoR>

            {tagline && (
              <i>
                <Tagline className='my-4 block'>{tagline}</Tagline>
              </i>
            )}

            <Overview className='font-normal'>{overview}</Overview>

            <RatingWrapper>
              {rating !== 0 ? (
                <Fragment>
                  <Span className='text-[calc(1.525rem_+_3.3vw)] xl:text-6xl font-bold'>
                    {rating.toFixed(1)}
                  </Span>
                  <span> / 10</span>
                </Fragment>
              ) : (
                <Span className='text-[calc(1.525rem_+_3.3vw)] xl:text-6xl font-bold'>NR</Span>
              )}
            </RatingWrapper>

            {crewData.length > 0 && (
              <CreditsWrapper>
                {crewData.map((item) => (
                  <Credits key={item.credit_id}>
                    <Span className='block font-normal'>{item.job ?? "Creator"}</Span>
                    <Link href={`/person/${item.id}-${item.name.replace(/[' ', '/']/g, "-")}`}>
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
    </Fragment>
  );
};

export default TVDetails;
