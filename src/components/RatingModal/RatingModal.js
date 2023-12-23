import { useDeleteRating, useSetRating } from "api/user";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import { motion } from "framer-motion";
import { useState, useContext, Fragment } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { framerTabVariants } from "src/utils/helper";
import { MediaContext } from "Store/MediaContext";
import {
  RatingButton,
  RatingCard,
  RatingModalContainer,
  RatingStarsContainer
} from "./RatingStyles";

export const useModal = () => {
  const [isModalVisible, setShowModal] = useState(false);

  const openModal = () => {
    document.body.style.overflow = "hidden";
    setShowModal(true);
  };

  const closeModal = () => {
    document.body.style.overflow = "auto";
    setShowModal(false);
  };

  return { isModalVisible, openModal, closeModal };
};

const RatingModal = ({
  mediaType,
  mediaId,
  mediaName,
  closeModal,
  posterPath,
  releaseDate,
  title
}) => {
  const [rating, updateRating] = useState(0);
  const { setRating } = useSetRating();
  const { deleteRating } = useDeleteRating();
  const { ratedMovies, ratedTvShows, validateRatedMovies, validateRatedTvShows } =
    useContext(MediaContext);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const savedRating =
    mediaType === "movie"
      ? ratedMovies?.find((item) => item?.id === mediaId)?.rating || false
      : ratedTvShows?.find((item) => item?.id === mediaId)?.rating || false;

  const ratingSubmissionHandler = async () => {
    if (rating) {
      const res = await setRating({ mediaType, mediaId, rating });

      if (res?.success) {
        if (mediaType === "movie") {
          let updatedRatedMovies = [...ratedMovies];
          const index = updatedRatedMovies.findIndex((item) => item?.id === mediaId);

          if (index > -1) {
            updatedRatedMovies[index].rating = rating;
          } else {
            updatedRatedMovies.unshift({
              id: mediaId,
              rating,
              poster_path: posterPath,
              release_date: releaseDate,
              title
            });
          }
          validateRatedMovies({
            state: "added",
            id: mediaId,
            media: updatedRatedMovies
          });
        } else {
          let updatedRatedTvShows = [...ratedTvShows];
          const index = updatedRatedTvShows.findIndex((item) => item?.id === mediaId);

          if (index > -1) {
            updatedRatedTvShows[index].rating = rating;
          } else {
            updatedRatedTvShows.unshift({
              id: mediaId,
              rating,
              poster_path: posterPath,
              release_date: releaseDate,
              title
            });
          }
          validateRatedTvShows({
            state: "added",
            id: mediaId,
            media: updatedRatedTvShows
          });
        }
      }
    }
    closeModal();
  };

  const deleteRatingHandler = async () => {
    const res = await deleteRating({ mediaType, mediaId });

    if (res?.success) {
      if (mediaType === "movie") {
        validateRatedMovies({
          state: "removed",
          id: mediaId
        });
      } else {
        validateRatedTvShows({
          state: "removed",
          id: mediaId
        });
      }
    }
    closeModal();
  };

  return (
    <RatingModalContainer
      as={motion.div}
      variants={framerTabVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
      transition={{ duration: 0.5 }}>
      {!showConfirmation ? (
        <RatingCard>
          <Span className='block mb-4 font-semibold'>{mediaName}</Span>

          {savedRating && rating === 0 ? (
            <Fragment>
              <div className='flex justify-between items-center my-4'>
                <div>
                  <Span className='font-normal'>Your rating : </Span>
                  <Span className='tetx-xl md:text-2xl font-medium'>{savedRating}/10</Span>
                </div>
                <div>
                  <Span
                    style={{ color: "#01b4e4" }}
                    className='text-base font-semibold rating-option me-3'
                    onClick={() => updateRating(savedRating)}>
                    Update
                  </Span>
                  <Span
                    className='text-base font-semibold rating-option text-red-600'
                    onClick={() => setShowConfirmation(true)}>
                    Delete
                  </Span>
                </div>
              </div>
              <RatingButton
                className='secondary full-width'
                onClick={closeModal}
                as={motion.button}
                whileTap={{ scale: 0.95 }}>
                Close
              </RatingButton>
            </Fragment>
          ) : (
            <Fragment>
              {rating > 0 && (
                <Span
                  as={motion.span}
                  className='font-normal'
                  variants={framerTabVariants}
                  initial='hidden'
                  animate='visible'
                  transition={{ duration: 0.5 }}>
                  Your rating : <strong>{rating}/10</strong>
                </Span>
              )}
              <div className='flex items-center my-4 gap-2'>
                <Span className='font-normal'>Rate :</Span>
                <RatingStarsContainer>
                  {[...Array(10).keys()].map((i) =>
                    rating <= i ? (
                      <AiOutlineStar key={i} className='star' onClick={() => updateRating(i + 1)} />
                    ) : (
                      <AiFillStar key={i} className='star' onClick={() => updateRating(i + 1)} />
                    )
                  )}
                </RatingStarsContainer>
              </div>

              <div className='flex justify-between items-center gap-4'>
                <RatingButton
                  className='secondary'
                  onClick={closeModal}
                  as={motion.button}
                  whileTap={{ scale: 0.95 }}>
                  Cancel
                </RatingButton>
                <RatingButton
                  onClick={ratingSubmissionHandler}
                  as={motion.button}
                  whileTap={{ scale: 0.95 }}
                  className='text-gray-950'>
                  Submit
                </RatingButton>
              </div>
            </Fragment>
          )}
        </RatingCard>
      ) : (
        <RatingCard
          key='rating-delete-confirmation'
          as={motion.div}
          variants={framerTabVariants}
          initial='hidden'
          animate='visible'
          transition={{ duration: 0.5 }}>
          <h5 className='mb-4'>
            Are you sure you want to delete <span className='inline font-bold'>{mediaName}</span>{" "}
            rating
          </h5>

          <div className='flex justify-between items-center gap-4'>
            <RatingButton
              className='secondary'
              onClick={closeModal}
              as={motion.button}
              whileTap={{ scale: 0.95 }}>
              Keep it
            </RatingButton>
            <RatingButton
              onClick={deleteRatingHandler}
              as={motion.button}
              whileTap={{ scale: 0.95 }}
              className='text-gray-950'>
              Remove it
            </RatingButton>
          </div>
        </RatingCard>
      )}
    </RatingModalContainer>
  );
};

export default RatingModal;
