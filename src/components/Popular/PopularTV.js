import {
  TVSection,
  Cards,
  CardImg,
  Rating,
  TVInfo,
  TVInfoTitle,
  ReleaseDate,
} from "./PopularStyles";

import Link from "next/link";
import { motion } from "framer-motion";

const PopularTV = (props) => {
  const TVData = props.TV;

  TVData.forEach((item) => {
    if (item.vote_average === 0) item.vote_average = "NR";
  });

  let arr = [];

  function releaseDates() {
    TVData.forEach((item) =>
      arr.push(new Date(item.first_air_date.toString()).toDateString().slice(4))
    );
  }
  releaseDates();

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 0.992, opacity: 1 }}
    >
      <TVSection className="p-5">
        {TVData.length > 0 &&
          TVData.map((TV, i) => (
            <Cards key={TV.id}>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.1 },
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href={"/tv/" + TV.id} passHref>
                  <CardImg
                    data={TV.poster_path}
                    className="d-flex justify-content-end"
                  >
                    <Rating className="d-flex justify-content-center align-items-center me-3">
                      {TV.vote_average}
                    </Rating>
                  </CardImg>
                </Link>
              </motion.div>
              <TVInfo>
                <TVInfoTitle>{TV.name}</TVInfoTitle>
                <ReleaseDate>{arr[i]}</ReleaseDate>
              </TVInfo>
            </Cards>
          ))}
      </TVSection>
    </motion.div>
  );
};

export default PopularTV;
