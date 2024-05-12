import Modal, { useModal } from "components/Modal/Modal";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import Toast, { useToast } from "components/Toast/Toast";
import { BiLink } from "react-icons/bi";
import { FiTwitter, FiInstagram } from "react-icons/fi";
import { IoCopy } from "react-icons/io5";
import { MdShare } from "react-icons/md";
import { copyToClipboard } from "src/utils/helper";
import { Button, SocialMediaLinksWrapper } from "styles/GlobalComponents";

const SocialMediaLinks = ({ links, homepage, mediaDetails }) => {
  const { openModal, isModalVisible, closeModal } = useModal();
  const { isToastVisible, showToast, toastMessage } = useToast();

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

  const copyButtonHandler = () => {
    copyToClipboard({ nodeId: "media-URL" })
      .then(() => {
        closeModal();
        showToast({ message: "Copied to clipboard!" });
      })
      .catch(() => {
        closeModal();
        showToast({ message: "Copying to clipboard is not supported." });
      });
  };

  return (
    <SocialMediaLinksWrapper>
      {links?.instagram_id && (
        <a
          href={`https://instagram.com/${links?.instagram_id}`}
          target='_blank'
          className='link'
          rel='noreferrer'
          aria-label='instagram'>
          <FiInstagram size='1.65rem' />
        </a>
      )}

      {links?.twitter_id && (
        <a
          href={`https://twitter.com/${links?.twitter_id}`}
          target='_blank'
          className='link'
          rel='noreferrer'
          aria-label='twitter'>
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

      <Modal closeModal={closeModal} isOpen={isModalVisible} align='items-center' width='max-w-lg'>
        <div>
          <h4 className='text-xl mb-4 font-semibold'>Share {mediaDetails.title}</h4>

          <div className='mt-6'>
            <div>
              <label
                htmlFor='media-URL'
                className='block mb-2 text-base font-medium text-neutral-200'>
                URL
              </label>
              <div className='flex gap-3'>
                <input
                  type='text'
                  name='URL'
                  id='media-URL'
                  defaultValue={typeof window !== "undefined" ? window.location.href : ""}
                  className='border text-base rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-500 placeholder-neutral-400 text-white focus:border'
                />

                <Button className='mediaCTA w-[50px] shrink-0' onClick={copyButtonHandler}>
                  <IoCopy size={20} />
                </Button>
              </div>
            </div>
          </div>

          <Button className='secondary w-full mt-3' onClick={closeModal}>
            Close
          </Button>
        </div>
      </Modal>

      <Toast isToastVisible={isToastVisible}>
        <Span className='toast-message'>{toastMessage}</Span>
      </Toast>
    </SocialMediaLinksWrapper>
  );
};

export default SocialMediaLinks;
