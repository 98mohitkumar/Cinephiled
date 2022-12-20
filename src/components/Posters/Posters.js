import DownloadMediaButton from 'components/DownloadMediaButton/DownloadMediaButton';
import Image from 'next/image';
import { NoDataText } from 'styles/GlobalComponents';
import { PostersContainer, PostersImg, PostersWrapper } from './PostersStyles';

const Posters = ({ posters }) => {
  return (
    <PostersContainer>
      {posters.length === 0 ? (
        <NoDataText className='fw-bold text-center my-5'>
          No Posters Yet
        </NoDataText>
      ) : (
        <PostersWrapper>
          {posters.map((item, i) => (
            <PostersImg key={i} className='position-relative text-center'>
              <Image
                src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
                alt='poster'
                layout='fill'
                objectFit='cover'
                quality='100'
              />

              <DownloadMediaButton item={item.file_path} />
            </PostersImg>
          ))}
        </PostersWrapper>
      )}
    </PostersContainer>
  );
};

export default Posters;
