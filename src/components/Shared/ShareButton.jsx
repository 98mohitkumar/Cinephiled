import { Share2 } from "lucide-react";
import { Fragment } from "react";

import { useModal } from "components/Modal/Modal";
import ShareModal from "components/ShareModal/ShareModal";
import Button from "components/UI/Button";

const ShareButton = ({ title, text, url, iconSize = 20, ...props }) => {
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
      <Button onClick={shareHandler} title='share button' {...props}>
        <Share2 size={iconSize} />
      </Button>

      {/* share modal (fallback for browsers that don't support navigator.share) */}
      <ShareModal isModalOpen={isModalVisible} closeModal={closeModal} />
    </Fragment>
  );
};

export default ShareButton;
