import {
  PopularTVSection,
  Cards,
  PopularImg,
  Rating,
  PopularTVInfo,
  PopularTVInfoTitle,
  ReleaseDate,
} from "./PopularStyles";

import Link from "next/link";

const PopularTV = (props) => {
  const TVData = props.TV;

  TVData.forEach((item, i) => {
    if (item.vote_average === 0) TVData[i].vote_average = "NR";
  });

  let arr = [];

  function releaseDates() {
    TVData.forEach((item) =>
      arr.push(new Date(item.first_air_date.toString()).toDateString().slice(4))
    );
  }
  releaseDates();

  return (
    <PopularTVSection className="p-5">
      {TVData.length > 0 &&
        TVData.map((TV, i) => (
          <Cards key={TV.id}>
            <Link href={"/tv/" + TV.id} passHref>
              <PopularImg
                data={TV.poster_path}
                className="d-flex justify-content-end"
              >
                <Rating className="d-flex justify-content-center align-items-center me-3">
                  {TV.vote_average}
                </Rating>
              </PopularImg>
            </Link>
            <PopularTVInfo>
              <PopularTVInfoTitle>{TV.name}</PopularTVInfoTitle>
              <ReleaseDate>{arr[i]}</ReleaseDate>
            </PopularTVInfo>
          </Cards>
        ))}
    </PopularTVSection>
  );
};

export default PopularTV;
