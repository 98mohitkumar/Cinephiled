import { useModal } from "components/Modal/Modal";
import ShareModal from "components/ShareModal/ShareModal";
import { motion } from "framer-motion";
import { Fragment } from "react";
import { MdShare } from "react-icons/md";
import { Button } from "styles/GlobalComponents";

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
      <Button as={motion.button} whileTap={{ scale: 0.95 }} onClick={shareHandler}>
        <MdShare size={20} />
      </Button>

      <ShareModal title={list?.name} isModalOpen={isModalVisible} closeModal={closeModal} />
    </Fragment>
  );
};

export default ListShareButton;
