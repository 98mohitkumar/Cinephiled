import DownloadMediaButton from "components/DownloadMediaButton/DownloadMediaButton";
import { blurPlaceholder } from "globals/constants";
import Image from "next/image";
import { Fragment } from "react";
import { NoDataText } from "styles/GlobalComponents";
import { BackdropsImg, BackdropsImgContainer, BackdropsWrapper } from "./BackdropsStyles";

const Backdrops = ({ backdrops }) => {
  return (
    <Fragment>
      {backdrops?.length > 0 ? (
        <BackdropsWrapper>
          {backdrops.map((item, i) => (
            <BackdropsImgContainer key={i}>
              <BackdropsImg className='relative text-center'>
                <Image
                  src={`https://image.tmdb.org/t/p/w1280${item.file_path}`}
                  alt='backdrop'
                  layout='fill'
                  objectFit='cover'
                  quality='100'
                  className='media'
                  placeholder='blur'
                  blurDataURL={blurPlaceholder}
                />

                <DownloadMediaButton item={item.file_path} />
              </BackdropsImg>
            </BackdropsImgContainer>
          ))}
        </BackdropsWrapper>
      ) : (
        <NoDataText className='font-bold text-center my-5'>No Backdrops Yet</NoDataText>
      )}
    </Fragment>
  );
};

export default Backdrops;
