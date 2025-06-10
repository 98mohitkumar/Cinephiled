import { Share2 } from "lucide-react";
import { Fragment } from "react";

import { useModal } from "components/Modal/Modal";
import ShareModal from "components/ShareModal/ShareModal";
import Button from "components/UI/Button";
import { matches } from "utils/helper";

const ShareButton = ({ title, text, url, iconSize = 20, variant = "", ...props }) => {
  const { openModal, isModalVisible, closeModal } = useModal();

  const shareHandler = (e) => {
    e.preventDefault();

    if (navigator.share) {
      navigator
        .share({
          title,
          text,
          url: url || window.location.href
        })
        .catch(() => openModal());
    } else {
      openModal();
    }
  };

  return (
    <Fragment>
      {matches(variant, "icon") ? (
        <Share2
          size={iconSize}
          onClick={shareHandler}
          title='Share link'
          role='button'
          className='transition-colors can-hover:text-cyan-300'
          {...props}
        />
      ) : (
        <Button onClick={shareHandler} title='Share link' {...props}>
          <Share2 size={iconSize} color='currentColor' />
        </Button>
      )}

      {/* share modal (fallback for browsers that don't support navigator.share) */}
      <ShareModal isModalOpen={isModalVisible} closeModal={closeModal} />
    </Fragment>
  );
};

export default ShareButton;
