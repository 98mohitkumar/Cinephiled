import {
  TVSection,
  Cards,
  CardImg,
  Rating,
  TVInfo,
  TVInfoTitle,
  ReleaseDate,
} from "../Popular/PopularStyles";

import Link from "next/link";

import { motion } from "framer-motion";

const TrendingTv = ({ Tv }) => {
  Tv.splice(15);
  Tv.forEach((item) => {
    if (item.vote_average === 0) item.vote_average = "NR";
  });

  let arr = [];

  function releaseDates() {
    Tv.forEach((item) =>
      arr.push(
        new Date(item.first_air_date.toString()).toDateString().slice(4, -5) +
          ", " +
          new Date(item.first_air_date.toString()).getFullYear()
      )
    );
  }
  releaseDates();
  return (
    <>
      <TVSection className="p-5">
        {Tv.length > 0 &&
          Tv.map((TV, i) => (
            <Cards key={TV.id}>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.1 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={"/tv/" + TV.id} passHref scroll={false}>
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
    </>
  );
};

export default TrendingTv;
