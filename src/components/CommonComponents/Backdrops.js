import Image from 'next/image';
import {
  NoDataText,
  BackdropsContainer,
  BackdropsImg,
  BackdropsImgContainer,
  BackdropsWrapper,
} from '../../styles/GlobalComponents';

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
                <BackdropsImg className='position-relative'>
                  <Image
                    src={`https://image.tmdb.org/t/p/w1280${item.file_path}`}
                    alt='backdrop'
                    layout='fill'
                    objectFit='cover'
                    quality='100'
                  />
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
