import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { blurPlaceholder } from "data/global";
import { getCleanTitle } from "utils/helper";

import { RecommendationsGrid, RecommendedImg, RecommendedWrapper, InfoTitle } from "./RecommendationsStyles";

// redundant
const Recommendations = ({ data, type }) => {
  data.splice(20);

  return (
    <RecommendationsGrid>
      {data.map((item) => (
        <RecommendedWrapper key={item.id}>
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.1 }
            }}
            whileTap={{ scale: 0.95 }}>
            <Link href={`/${type}/${item.id}-${getCleanTitle(item?.title || item?.name)}`} passHref>
              <RecommendedImg className='relative text-center'>
                <Image
                  src={item.backdrop_path ? `https://image.tmdb.org/t/p/w780${item.backdrop_path}` : "/images/DefaultBackdrop.png"}
                  alt={`${type}-poster`}
                  fill
                  style={{ objectFit: "cover" }}
                  placeholder='blur'
                  blurDataURL={blurPlaceholder}
                />
              </RecommendedImg>
            </Link>
          </motion.div>
          <InfoTitle className='mt-3 mb-0 text-center'>{item?.title || item?.name}</InfoTitle>
        </RecommendedWrapper>
      ))}
    </RecommendationsGrid>
  );
};

export default Recommendations;
