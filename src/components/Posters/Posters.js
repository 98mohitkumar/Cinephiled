import DownloadMediaButton from "components/DownloadMediaButton/DownloadMediaButton";
import { blurPlaceholder } from "globals/constants";
import Image from "next/image";
import { Fragment } from "react";
import { NoDataText } from "styles/GlobalComponents";
import { PostersImg, PostersWrapper } from "./PostersStyles";

const Posters = ({ posters }) => {
  return (
    <Fragment>
      {posters?.length > 0 ? (
        <PostersWrapper>
          {posters.map((item, i) => (
            <PostersImg key={i} className='relative text-center'>
              <Image
                src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
                alt='poster'
                layout='fill'
                objectFit='cover'
                quality='100'
                placeholder='blur'
                blurDataURL={blurPlaceholder}
              />

              <DownloadMediaButton item={item.file_path} />
            </PostersImg>
          ))}
        </PostersWrapper>
      ) : (
        <NoDataText className='font-bold text-center my-5'>No Posters Yet</NoDataText>
      )}
    </Fragment>
  );
};

export default Posters;
