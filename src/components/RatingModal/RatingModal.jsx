import { Star } from "lucide-react";
import { useState, Fragment } from "react";

import Modal, { useModal } from "components/Modal/Modal";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import H4 from "components/UI/Typography/H4";
import H5 from "components/UI/Typography/H5";
import P from "components/UI/Typography/P";
import { theme } from "theme/theme";
import { cn, getReleaseYear, matches } from "utils/helper";

/**
 * @param {object} props
 * @param {string} props.mediaType — `"movie"` | `"tv"` | `"episode"`
 * @param {() => Promise<void>} props.onSubmitRating — called with `{ rating }` (1–10)
 * @param {() => Promise<void>} props.onDeleteRating
 */
const RatingModal = ({
  mediaType,
  closeModal,
  releaseDate,
  isOpen,
  title,
  rating: savedRating = 0,
  onSubmitRating,
  onDeleteRating
}) => {
  const [rating, updateRating] = useState(0);
  const [isUpdatingRating, setIsUpdatingRating] = useState(false);

  const {
    isModalVisible: isDeleteConfirmationModalVisible,
    openModal: openDeleteConfirmationModal,
    closeModal: closeDeleteConfirmationModal
  } = useModal();

  const cancelButtonHandler = () => {
    closeModal();
    updateRating(0);
    setIsUpdatingRating(false);
  };

  const ratingSubmissionHandler = async () => {
    if (matches(rating, 0)) return;

    await onSubmitRating({ rating });
    cancelButtonHandler();
  };

  const deleteRatingHandler = async () => {
    await onDeleteRating();
    closeDeleteConfirmationModal();
  };

  const deleteButtonHandler = () => {
    closeModal();
    openDeleteConfirmationModal();
  };

  const hasSavedRating = Boolean(savedRating);

  return (
    <Fragment>
      <Modal isOpen={isOpen} closeModal={cancelButtonHandler} className='max-w-lg'>
        <H5 weight='semibold'>{matches(mediaType, "episode") ? title : `${title} (${getReleaseYear(releaseDate)})`}</H5>

        <div className='my-16'>
          {hasSavedRating && !isUpdatingRating ? (
            <FlexBox className='items-center justify-between gap-16'>
              <P size='large'>
                Your rating: <span className='font-montserrat font-medium'>{savedRating}</span>
              </P>

              <FlexBox className='items-center gap-16'>
                <P role='button' weight='medium' className='text-cyan-400 can-hover:underline' onClick={() => setIsUpdatingRating(true)}>
                  Update
                </P>
                <P role='button' weight='medium' onClick={deleteButtonHandler} className='text-red-500 can-hover:underline'>
                  Delete
                </P>
              </FlexBox>
            </FlexBox>
          ) : (
            <div className='py-8'>
              {rating > 0 ? (
                <P size='large' className='mb-10'>
                  Your rating: <span className='font-montserrat font-medium'>{rating}</span>
                </P>
              ) : null}

              <FlexBox className='items-center gap-8'>
                <P size='large'>Rating:</P>

                <FlexBox className='gap-4 text-white'>
                  {[...Array(10).keys()].map((i) => (
                    <Star
                      key={i}
                      className='cursor-pointer'
                      onClick={() => updateRating(i + 1)}
                      fill={rating > i ? "gold" : "none"}
                      stroke={rating > i ? "gold" : theme.colors.neutral[400]}
                    />
                  ))}
                </FlexBox>
              </FlexBox>
            </div>
          )}
        </div>

        <FlexBox className='gap-16'>
          <Button
            onClick={cancelButtonHandler}
            className={cn("w-1/2", {
              "w-full": hasSavedRating && !isUpdatingRating
            })}
            variant='outline'>
            Close
          </Button>

          <Button
            disabled={matches(rating, 0)}
            className={cn("w-1/2", {
              hidden: hasSavedRating && !isUpdatingRating
            })}
            onClick={ratingSubmissionHandler}>
            Submit
          </Button>
        </FlexBox>
      </Modal>

      <Modal isOpen={isDeleteConfirmationModalVisible} closeModal={closeDeleteConfirmationModal} className='max-w-lg'>
        <H4 weight='semibold' className='mb-16'>
          Delete Rating
        </H4>

        <P className='my-16'>Are you sure you want to delete the rating? This action cannot be undone.</P>

        <FlexBox className='gap-16'>
          <Button onClick={closeDeleteConfirmationModal} className='w-1/2' variant='outline'>
            Close
          </Button>
          <Button variant='danger' onClick={deleteRatingHandler} className='w-1/2'>
            Delete
          </Button>
        </FlexBox>
      </Modal>
    </Fragment>
  );
};

export default RatingModal;
