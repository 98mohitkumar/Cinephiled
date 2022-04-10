import {
  HeroInfoTitle,
  HeroInfoWrapper,
  Span,
} from "../../components/MovieInfo/MovieDetailsStyles";
import {
  DetailsHeroWrap,
  HeroImg,
  HeroImgWrapper,
  HeroInfo,
  RecommendationsContainer,
  RecommendationsGrid,
  RecommendedImg,
  RecommendedWrapper,
} from "../../styles/GlobalComponents";
import { Bio, Details } from "./PersonDetails.styles";
import { motion } from "framer-motion";
import Link from "next/link";
import { MoviesInfoTitle } from "../Popular/PopularStyles";

const PersonDetails = ({ details }) => {
  const getGender = (g) => {
    switch (g) {
      case 0:
        return "-";
      case 1:
        return "Female";
      case 2:
        return "Male";
      case 3:
        return "Non Binary";
    }
  };

  const works = [...details.combined_credits.cast];
  works.sort((a, z) => z.vote_count - a.vote_count);
  works.length > 100 && works.splice(100);

  const cleaned = works.filter((w, i) => {
    if (i !== works.length - 1) {
      return w.backdrop_path !== works[i + 1].backdrop_path;
    }
  });

  cleaned.length > 80 && cleaned.splice(80);

  const getAge = (b, alive) => {
    if (alive) {
      const today = new Date();
      const birthYear = b.slice(0, 4);
      const age = today.getFullYear() - birthYear;
      return age;
    } else {
      const deathYear = b.slice(0, 4);
      const birthYear = details.birthday.slice(0, 4);

      const diedAt = deathYear - birthYear;
      return diedAt;
    }
  };
  return (
    <div style={{ marginBottom: "auto" }}>
      <DetailsHeroWrap style={{ minHeight: "auto" }} className="pb-0">
        <HeroImgWrapper>
          <HeroImg className="no-shadow" data={details.profile_path} />
        </HeroImgWrapper>

        <HeroInfo className="d-flex">
          <HeroInfoWrapper className="w-100">
            <HeroInfoTitle>{details.name}</HeroInfoTitle>

            <Details className="py-4">
              <div>
                <Span className="d-block fw-bold">Gender</Span>
                <Span className="d-block fw-normal">
                  {getGender(details.gender)}
                </Span>
              </div>

              {!details.deathday && details.birthday && (
                <div>
                  <Span className="d-block fw-bold">Age</Span>
                  <Span className="d-block fw-normal">
                    {getAge(details.birthday, true)} years old
                  </Span>
                </div>
              )}

              {details.birthday && (
                <div>
                  <Span className="d-block fw-bold">Birthday</Span>
                  <Span className="d-block fw-normal">{details.birthday}</Span>
                </div>
              )}

              {details.deathday && (
                <div>
                  <Span className="d-block fw-bold">Death Day</Span>
                  <Span className="d-block fw-normal">{details.deathday}</Span>
                </div>
              )}

              {details.deathday && (
                <div>
                  <Span className="d-block fw-bold">Died at</Span>
                  <Span className="d-block fw-normal">
                    {getAge(details.deathday, false)} years old
                  </Span>
                </div>
              )}

              <div>
                <Span className="d-block fw-bold">Known For</Span>
                <Span className="d-block fw-normal">
                  {details.known_for_department}
                </Span>
              </div>

              <div>
                <Span className="d-block fw-bold">Known Credits</Span>
                <Span className="d-block fw-normal">
                  {details.combined_credits.cast.length}
                </Span>
              </div>
            </Details>

            {details.also_known_as.length !== 0 && (
              <div className="pt-5">
                <Span className="d-block fw-bold">Also Known as :</Span>
                <Details className="py-3">
                  {details.also_known_as.map((k, i) => (
                    <Span className="d-block fw-normal" key={i}>
                      {k}
                    </Span>
                  ))}
                </Details>
              </div>
            )}
          </HeroInfoWrapper>
        </HeroInfo>
      </DetailsHeroWrap>

      {details.biography && (
        <DetailsHeroWrap className="no-grid pt-5">
          {details.biography && (
            <div>
              <Span className="d-block fw-bold">Biography</Span>
              <Bio>{details.biography}</Bio>
            </div>
          )}
        </DetailsHeroWrap>
      )}

      {cleaned.length !== 0 && (
        <RecommendationsContainer className="py-4">
          <h1 className="display-6 fw-bold text-white text-center">
            Filmography
          </h1>

          <RecommendationsGrid>
            {cleaned.map((item, i) =>
              item.media_type === "movie" ? (
                <RecommendedWrapper key={i}>
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href={"/movies/" + item.id} passHref scroll={false}>
                      <RecommendedImg backdrop={item.backdrop_path} />
                    </Link>
                  </motion.div>
                  <MoviesInfoTitle className="my-3 text-center">
                    {item.title}
                  </MoviesInfoTitle>
                </RecommendedWrapper>
              ) : (
                <RecommendedWrapper key={i}>
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href={"/tv/" + item.id} passHref scroll={false}>
                      <RecommendedImg backdrop={item.backdrop_path} />
                    </Link>
                  </motion.div>
                  <MoviesInfoTitle className="my-3 text-center">
                    {item.name}
                  </MoviesInfoTitle>
                </RecommendedWrapper>
              )
            )}
          </RecommendationsGrid>
        </RecommendationsContainer>
      )}
    </div>
  );
};

export default PersonDetails;
