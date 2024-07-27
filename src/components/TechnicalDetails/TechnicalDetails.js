import Modal, { useModal } from "components/Modal/Modal";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import { motion } from "framer-motion";
import useGetTechncialDetails from "hooks/useGetTechnicalDetails";
import { Fragment } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { matcher } from "src/utils/helper";
import { Button } from "styles/GlobalComponents";

const TechnicalDetails = ({ imdbId }) => {
  const { technicalDetails } = useGetTechncialDetails(imdbId);
  const { isModalVisible, openModal, closeModal } = useModal();
  const tableItems = technicalDetails?.items || [];
  const noDataAvailable = matcher(tableItems.length, 0);

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

      <Modal
        isOpen={isModalVisible}
        closeModal={closeModal}
        align={noDataAvailable ? "items-center" : "items-start"}
        width='max-w-2xl'>
        <div className='flex flex-col gap-6'>
          {noDataAvailable ? (
            <div className='min-h-24 px-6 grid place-items-center'>
              <p className='text-neutral-400 text-xl font-medium'>
                Technical details are not available.
              </p>
            </div>
          ) : (
            <div className='overflow-clip'>
              {tableItems.map((item) => (
                <div
                  className='flex items-center pb-3 mb-3 gap-x-4 gap-y-1 border-b border-neutral-600 last:border-none last:p-0 last:m-0 flex-wrap'
                  key={item.id}>
                  <div>
                    <span className='text-base font-semibold text-neutral-400 shrink-0'>
                      {item?.rowTitle}
                    </span>
                  </div>

                  {item?.listContent && item.listContent?.length > 0 ? (
                    <div>
                      {item.listContent.map(({ text, subText }, index) => (
                        <Fragment key={`${text}-${index}`}>
                          <span className='text-white text-base inline'>{text}</span>{" "}
                          {subText && (
                            <span
                              key={subText}
                              className='text-neutral-400 text-base inline'>{` ${subText}`}</span>
                          )}
                          {index < item.listContent.length - 1 && (
                            <span className='whitespace-pre inline-block text-white'>{` • `}</span>
                          )}
                        </Fragment>
                      ))}
                    </div>
                  ) : (
                    <span className='text-white text-base'>TBA</span>
                  )}
                </div>
              ))}
            </div>
          )}

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
