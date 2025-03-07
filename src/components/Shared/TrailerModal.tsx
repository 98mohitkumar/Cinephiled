import { Play, X } from "lucide-react";
import { Fragment } from "react";

import Modal, { useModal } from "components/Modal/Modal";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import H4 from "components/UI/Typography/H4";

import "keen-slider/keen-slider.min.css";

type trailer = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
} | null;

const TrailerModal = ({ trailer }: { trailer: trailer }) => {
  const { openModal, isModalVisible, closeModal } = useModal();

  if (!trailer) return null;

  return (
    <Fragment>
      <Button
        shape='pill'
        variant='primary'
        className='flex items-center gap-6'
        size='small'
        weight='semibold'
        onClick={openModal}
        title='Play Trailer'>
        <Play size={14} fill='currentColor' />
        Trailer
      </Button>

      <Modal isOpen={isModalVisible} closeModal={closeModal} className='max-w-screen-lg p-6'>
        <FlexBox className='items-center justify-between p-16'>
          <H4 weight='semibold'>Trailer</H4>

          <X size={24} onClick={closeModal} role='button' />
        </FlexBox>

        <div key={trailer.id} className='aspect-video overflow-hidden rounded-lg'>
          <iframe
            width='100%'
            height='100%'
            src={`https://www.youtube-nocookie.com/embed/${trailer.key}?rel=0&autoplay=1`}
            title={trailer.name}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>
      </Modal>
    </Fragment>
  );
};

export default TrailerModal;
