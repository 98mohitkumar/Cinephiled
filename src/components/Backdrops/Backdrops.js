import Image from 'next/image';
import { NoDataText } from '../../styles/GlobalComponents';
import {
  BackdropsContainer,
  BackdropsImg,
  BackdropsImgContainer,
  BackdropsWrapper,
} from './BackdropsStyles';
import DownloadButton from '../DownloadMediaButton/DownloadMediaButton';

const Backdrops = ({ backdrops }) => {
  return (
    <>
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
    </>
  );
};

export default Backdrops;
