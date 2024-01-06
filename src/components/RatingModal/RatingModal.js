import { deleteRating, setRating } from "api/user";
import Modal, { useModal } from "components/Modal/Modal";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import Toast, { useToast } from "components/Toast/Toast";
import { motion } from "framer-motion";
import { useState, Fragment } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { framerTabVariants } from "src/utils/helper";
import { useMediaContext } from "Store/MediaContext";
import { Button } from "styles/GlobalComponents";
import { RatingStarsContainer } from "./RatingStyles";

const RatingModal = ({
  mediaType,
  mediaId,
  mediaName,
  closeModal,
  posterPath,
  releaseDate,
  isOpen,
  title
}) => {
  const [rating, updateRating] = useState(0);
  const { ratedMovies, ratedTvShows, validateRatedMovies, validateRatedTvShows } =
    useMediaContext();
  const { showToast, isToastVisible, toastMessage } = useToast();

  const {
    isModalVisible: isDeleteConfirmationModalVisible,
    openModal: openDeleteConfirmationModal,
    closeModal: closeDeleteConfirmationModal
  } = useModal();

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

        showToast({ message: "Rating submitted successfully" });
      } else {
        showToast({ message: "Something went wrong, please try again later" });
      }
    }
    closeModal();
    updateRating(0);
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
    closeDeleteConfirmationModal();
  };

  const cancelButtonHandler = () => {
    closeModal();
    updateRating(0);
  };

  const deleteButtonHandler = () => {
    closeModal();
    openDeleteConfirmationModal();
  };

  return (
    <Fragment>
      <Modal isOpen={isOpen} closeModal={cancelButtonHandler} align='items-center' width='max-w-lg'>
        <div>
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
                    onClick={deleteButtonHandler}>
                    Delete
                  </Span>
                </div>
              </div>
              <Button
                className='secondary w-full'
                onClick={closeModal}
                as={motion.button}
                whileTap={{ scale: 0.95 }}>
                Close
              </Button>
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
                <Button
                  className='secondary w-full'
                  onClick={cancelButtonHandler}
                  as={motion.button}
                  whileTap={{ scale: 0.95 }}>
                  Cancel
                </Button>
                <Button
                  onClick={ratingSubmissionHandler}
                  as={motion.button}
                  whileTap={{ scale: 0.95 }}
                  className='w-full'>
                  Submit
                </Button>
              </div>
            </Fragment>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteConfirmationModalVisible}
        closeModal={closeDeleteConfirmationModal}
        align='items-center'
        width='max-w-lg'>
        <div>
          <h5 className='mb-4'>
            Are you sure you want to delete <span className='inline font-bold'>{mediaName}</span>{" "}
            rating
          </h5>

          <div className='flex justify-between items-center gap-4'>
            <Button
              className='secondary w-full'
              onClick={closeDeleteConfirmationModal}
              as={motion.button}
              whileTap={{ scale: 0.95 }}>
              Keep it
            </Button>
            <Button
              onClick={deleteRatingHandler}
              as={motion.button}
              whileTap={{ scale: 0.95 }}
              className='danger w-full'>
              Remove it
            </Button>
          </div>
        </div>
      </Modal>

      <Toast isToastVisible={isToastVisible}>
        <Span className='toast-message'>{toastMessage}</Span>
      </Toast>
    </Fragment>
  );
};

export default RatingModal;
