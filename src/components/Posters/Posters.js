import DownloadMediaButton from "components/DownloadMediaButton/DownloadMediaButton";
import PlaceholderText from "components/PlaceholderText";
import { blurPlaceholder } from "globals/constants";
import Image from "next/image";
import { Fragment } from "react";
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
        <PlaceholderText>No Posters Yet</PlaceholderText>
      )}
    </Fragment>
  );
};

export default Posters;
