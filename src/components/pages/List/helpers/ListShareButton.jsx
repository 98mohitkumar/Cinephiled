import { Share2 } from "lucide-react";
import { Fragment } from "react";

import { useModal } from "components/Modal/Modal";
import ShareModal from "components/ShareModal/ShareModal";
import Button from "components/UI/Button";

const ListShareButton = ({ list }) => {
  const { openModal, isModalVisible, closeModal } = useModal();

  const shareHandler = (e) => {
    e.preventDefault();

    if (navigator.share) {
      navigator
        .share({
          title: list.name,
          text: list.description,
          url: window.location.href
        })
        .catch(() => openModal());
    } else {
      openModal();
    }
  };

  return (
    <Fragment>
      <Button onClick={shareHandler} title='Share List'>
        <Share2 size={20} />
      </Button>

      {/* share modal (fallback for browsers that don't support navigator.share) */}
      <ShareModal title={list?.name} isModalOpen={isModalVisible} closeModal={closeModal} />
    </Fragment>
  );
};

export default ListShareButton;
