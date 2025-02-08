import Image from "next/image";
import { Fragment } from "react";

import PlaceholderText from "components/PlaceholderText";
import DownloadMediaButton from "components/Shared/DownloadMediaButton";
import { blurPlaceholder } from "data/global";

import { PostersImg, PostersWrapper } from "./PostersStyles";

// redundant
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
                fill
                style={{ objectFit: "cover" }}
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
