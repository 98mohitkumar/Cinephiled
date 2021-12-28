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
    <TVSection className="p-5">
      {TVData.length > 0 &&
        TVData.map((TV, i) => (
          <Cards key={TV.id}>
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
            <TVInfo>
              <TVInfoTitle>{TV.name}</TVInfoTitle>
              <ReleaseDate>{arr[i]}</ReleaseDate>
            </TVInfo>
          </Cards>
        ))}
    </TVSection>
  );
};

export default PopularTV;
