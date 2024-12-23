import { motion } from "motion/react";
import { Fragment } from "react";
import { FaChevronRight } from "react-icons/fa6";

import Modal, { useModal } from "components/Modal/Modal";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import useGetTechncialDetails from "hooks/useGetTechnicalDetails";
import { Button } from "styles/GlobalComponents";
import { matches } from "utils/helper";

const TechnicalDetails = ({ imdbId }) => {
  const { technicalDetails } = useGetTechncialDetails(imdbId);
  const { isModalVisible, openModal, closeModal } = useModal();
  const tableItems = technicalDetails?.items || [];
  const noDataAvailable = matches(tableItems.length, 0);

  return (
    <Fragment>
      <Button className='mb-3 w-full gap-2' as={motion.button} whileTap={{ scale: 0.95 }} onClick={openModal}>
        <Span className='font-semibold'>Techincal Details</Span>
        <FaChevronRight className='text-2xl text-black' size='16' />
      </Button>

      <Modal isOpen={isModalVisible} closeModal={closeModal} align={noDataAvailable ? "items-center" : "items-start"} width='max-w-2xl'>
        <div className='flex flex-col gap-6'>
          {noDataAvailable ? (
            <div className='grid min-h-24 place-items-center px-6'>
              <p className='text-xl font-medium text-neutral-400'>Technical details are not available.</p>
            </div>
          ) : (
            <div className='overflow-clip'>
              {tableItems.map((item) => (
                <div
                  className='pb-3 mb-3 gap-y-1 flex flex-wrap items-center gap-x-4 border-b border-neutral-600 last:m-0 last:border-none last:p-0'
                  key={item.id}>
                  <div>
                    <span className='text-base shrink-0 font-semibold text-neutral-400'>{item?.rowTitle}</span>
                  </div>

                  {item?.listContent && item.listContent?.length > 0 ? (
                    <div>
                      {item.listContent.map(({ text, subText }, index) => (
                        <Fragment key={`${text}-${index}`}>
                          <span className='text-base inline text-white'>{text}</span>{" "}
                          {subText && <span key={subText} className='text-base inline text-neutral-400'>{` ${subText}`}</span>}
                          {index < item.listContent.length - 1 && <span className='inline-block whitespace-pre text-white'>{` • `}</span>}
                        </Fragment>
                      ))}
                    </div>
                  ) : (
                    <span className='text-base text-white'>TBA</span>
                  )}
                </div>
              ))}
            </div>
          )}

          <Button onClick={closeModal} as={motion.button} whileTap={{ scale: 0.95 }} className='w-full'>
            Close
          </Button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default TechnicalDetails;
