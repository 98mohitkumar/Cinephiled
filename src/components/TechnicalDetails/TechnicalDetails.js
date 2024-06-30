import Modal, { useModal } from "components/Modal/Modal";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import { motion } from "framer-motion";
import { Fragment } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { Button } from "styles/GlobalComponents";

const TechnicalDetails = ({ data }) => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const tableItems = data?.items || [];

  if (tableItems.length < 1) {
    return null;
  }

  return (
    <Fragment>
      <Button
        className='w-full gap-2 mb-3'
        as={motion.button}
        whileTap={{ scale: 0.95 }}
        onClick={openModal}>
        <Span className='font-semibold'>Techincal Details</Span>
        <FaChevronRight className='text-black text-2xl' size='16' />
      </Button>

      <Modal isOpen={isModalVisible} closeModal={closeModal} align='items-start'>
        <div className='flex flex-col gap-6'>
          <div className='overflow-clip'>
            {tableItems.map((item) => (
              <div
                className='flex items-center pb-3 mb-3 gap-x-4 gap-y-2 border-b border-neutral-600 last:border-none last:p-0 last:m-0 flex-wrap'
                key={item.id}>
                <span className='text-base font-semibold text-neutral-400 shrink-0'>
                  {item?.rowTitle}
                </span>

                {item?.listContent && item.listContent?.length > 0 ? (
                  <div>
                    {item.listContent.map(({ text, subText }, index, arr) => (
                      <span
                        key={index}
                        className='text-white text-base whitespace-normal inline-block'>
                        {text} {subText || ""}
                        {arr.length - 1 > index && <span className='mx-2 text-xl'>&middot;</span>}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className='text-white text-base'>TBA</span>
                )}
              </div>
            ))}
          </div>

          <Button
            onClick={closeModal}
            as={motion.button}
            whileTap={{ scale: 0.95 }}
            className='w-full'>
            Close
          </Button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default TechnicalDetails;
