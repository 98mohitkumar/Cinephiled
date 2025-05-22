import Link from "next/link";
import { Fragment } from "react";

import Modal, { useModal } from "components/Modal/Modal";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import P from "components/UI/Typography/P";
import { getNiceName } from "utils/helper";

import { linkStyles } from "./GlobalComponents";

const DetailsBlock = ({ title, details, type, subtext }) => {
  return (
    <div>
      <div className='mb-10 border-b border-neutral-600 pb-10'>
        <P weight='semibold' size='large'>
          {title}
        </P>

        <P className='text-neutral-300' size='small'>
          {subtext}
        </P>
      </div>

      <FlexBox className='flex-wrap items-center gap-x-24 gap-y-16'>
        {details.map((item) => (
          <Link
            key={item.id}
            title={item.name}
            className='flex items-center gap-6'
            href={`/${type}/${getNiceName({ id: item?.id, name: item?.name })}`}>
            <P weight='semibold' className={linkStyles}>
              {item.name}
            </P>

            {item.origin_country && (
              <P className='flex aspect-square w-6 items-center justify-center whitespace-nowrap rounded-sm bg-neutral-600' weight='bold' size='tiny'>
                {item.origin_country}
              </P>
            )}
          </Link>
        ))}
      </FlexBox>
    </div>
  );
};

const ProductionDetails = ({ productionCompanies, networks }) => {
  const { isModalVisible, openModal, closeModal } = useModal();

  return (
    <Fragment>
      <P tag='button' weight='medium' className={linkStyles} onClick={openModal}>
        View Details
      </P>

      <Modal isOpen={isModalVisible} closeModal={closeModal}>
        <div className='mb-40 space-y-10'>
          {productionCompanies?.length > 0 && (
            <DetailsBlock
              title='Production Companies'
              details={productionCompanies}
              type='companies'
              subtext='Companies involved in producing and distributing this content'
            />
          )}

          {networks?.length > 0 && (
            <DetailsBlock
              title='Networks'
              details={networks}
              type='networks'
              subtext='TV channels or streaming platforms that distribute this content'
            />
          )}

          {productionCompanies?.length === 0 && networks?.length === 0 && (
            <FlexBox className='mt-24 items-center justify-center'>
              <P className='text-neutral-400' weight='semibold' size='large'>
                No production details available.
              </P>
            </FlexBox>
          )}
        </div>

        <Button onClick={closeModal} fullWidth>
          Close
        </Button>
      </Modal>
    </Fragment>
  );
};

export default ProductionDetails;
