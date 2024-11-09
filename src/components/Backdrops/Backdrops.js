import Image from "next/image";
import { Fragment } from "react";
import { BackdropsImg, BackdropsImgContainer, BackdropsWrapper } from "./BackdropsStyles";
import DownloadMediaButton from "components/DownloadMediaButton/DownloadMediaButton";
import PlaceholderText from "components/PlaceholderText";
import { blurPlaceholder } from "globals/constants";

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
                  fill
                  style={{
                    objectFit: "cover"
                  }}
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
        <PlaceholderText>No Backdrops Yet</PlaceholderText>
      )}
    </Fragment>
  );
};

export default Backdrops;
