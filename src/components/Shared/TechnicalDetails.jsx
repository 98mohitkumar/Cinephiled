import { Fragment } from "react";

import Modal, { useModal } from "components/Modal/Modal";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import P from "components/UI/Typography/P";
import getFormattedTechnicalDetails from "utils/getFormattedTechnicalDetails";
import { matches } from "utils/helper";

import { linkStyles } from "./GlobalComponents";

const TechnicalDetails = ({ technicalDetails }) => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const tableItems = getFormattedTechnicalDetails(technicalDetails);

  const noDataAvailable = matches(tableItems.length, 0);

  return (
    <Fragment>
      <P tag='button' weight='medium' className={linkStyles} onClick={openModal}>
        View Details
      </P>

      <Modal isOpen={isModalVisible} closeModal={closeModal} className='max-w-2xl'>
        <FlexBox className='flex flex-col gap-24'>
          {noDataAvailable ? (
            <FlexBox className='min-h-24 items-center justify-center'>
              <P className='text-neutral-400' weight='semibold' size='large'>
                Technical details are not available.
              </P>
            </FlexBox>
          ) : (
            <div className='overflow-clip'>
              {tableItems.map((item) => (
                <FlexBox
                  className='mb-12 flex-wrap items-center gap-x-16 gap-y-4 border-b border-neutral-600 pb-12 last:m-0 last:border-none last:p-0'
                  key={item.id}>
                  <div>
                    <P tag='span' weight='bold' className='shrink-0 text-neutral-400'>
                      {item?.rowTitle}
                    </P>
                  </div>

                  {item?.listContent && item.listContent?.length > 0 ? (
                    <div>
                      {item.listContent.map(({ text, subText }, index) => (
                        <Fragment key={`${text}-${index}`}>
                          <P tag='span' className='text-white'>
                            {text}
                          </P>{" "}
                          {subText && <P tag='span' key={subText} className='text-neutral-400' weight='medium'>{` ${subText}`}</P>}
                          {index < item.listContent.length - 1 && <span className='inline-block whitespace-pre text-white'>{` • `}</span>}
                        </Fragment>
                      ))}
                    </div>
                  ) : (
                    <P tag='span' className='text-white'>
                      TBA
                    </P>
                  )}
                </FlexBox>
              ))}
            </div>
          )}

          <Button onClick={closeModal} fullWidth>
            Close
          </Button>
        </FlexBox>
      </Modal>
    </Fragment>
  );
};

export default TechnicalDetails;
