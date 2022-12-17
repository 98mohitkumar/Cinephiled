import Image from 'next/image';
import { Fragment } from 'react';
import { NoDataText } from '../../styles/GlobalComponents';
import DownloadButton from '../DownloadMediaButton/DownloadMediaButton';
import {
  BackdropsContainer,
  BackdropsImg,
  BackdropsImgContainer,
  BackdropsWrapper
} from './BackdropsStyles';

const Backdrops = ({ backdrops }) => {
  return (
    <Fragment>
      <BackdropsContainer>
        {backdrops.length === 0 ? (
          <NoDataText className='fw-bold text-center my-5'>
            No Backdrops Yet
          </NoDataText>
        ) : (
          <BackdropsWrapper>
            {backdrops.map((item, i) => (
              <BackdropsImgContainer key={i}>
                <BackdropsImg className='position-relative text-center'>
                  <Image
                    src={`https://image.tmdb.org/t/p/w1280${item.file_path}`}
                    alt='backdrop'
                    layout='fill'
                    objectFit='cover'
                    quality='100'
                    className='media'
                  />

                  <DownloadButton item={item.file_path} />
                </BackdropsImg>
              </BackdropsImgContainer>
            ))}
          </BackdropsWrapper>
        )}
      </BackdropsContainer>
    </Fragment>
  );
};

export default Backdrops;
