import { BiLink } from "react-icons/bi";
import { FiTwitter, FiInstagram } from "react-icons/fi";
import { MdShare } from "react-icons/md";

import { useModal } from "components/Modal/Modal";
import ShareModal from "components/ShareModal/ShareModal";
import { SocialMediaLinksWrapper } from "styles/GlobalComponents";

const SocialMediaLinks = ({ links, homepage, mediaDetails, ...props }) => {
  const { openModal, isModalVisible, closeModal } = useModal();

  const shareHandler = (e) => {
    e.preventDefault();

    if (navigator.share) {
      navigator
        .share({
          title: mediaDetails.title,
          text: mediaDetails.description,
          url: window.location.href
        })
        .catch(() => openModal());
    } else {
      openModal();
    }
  };

  return (
    <SocialMediaLinksWrapper {...props}>
      {links?.instagram_id && (
        <a href={`https://instagram.com/${links?.instagram_id}`} target='_blank' className='link' rel='noreferrer' aria-label='instagram'>
          <FiInstagram size='1.65rem' />
        </a>
      )}

      {links?.twitter_id && (
        <a href={`https://twitter.com/${links?.twitter_id}`} target='_blank' className='link' rel='noreferrer' aria-label='twitter'>
          <FiTwitter size='1.65rem' />
        </a>
      )}

      {homepage && (
        <a href={homepage} target='_blank' className='link' rel='noreferrer' aria-label='homepage'>
          <BiLink size='1.8rem' />
        </a>
      )}

      <a role='button' aria-label='share-icon' className='link' onClick={shareHandler}>
        <MdShare size='1.65rem' />
      </a>

      <ShareModal title={mediaDetails.title} isModalOpen={isModalVisible} closeModal={closeModal} />
    </SocialMediaLinksWrapper>
  );
};

export default SocialMediaLinks;
