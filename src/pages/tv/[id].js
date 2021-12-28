import Head from "next/head";
import Footer from "../../components/Footer/Footer";
import DominantColor from "../../components/DominantColor/DominantColor";
import { Gradient } from "../../styles/GlobalComponents";
import Navigation from "../../components/Navigation/Navigation";
import TVDetails from "../../components/TVInfo/TVDetails";
import {
  DetailsHeroWrap,
  DetailsWrapper,
  Error404,
  HeroBg,
  HeroBgContainer,
  HeroDetailsContainer,
  HeroImg,
  HeroInfo,
  Wrapper,
} from "../../styles/GlobalComponents";
import TVTab from "../../components/TVInfo/TVTab";
import TVFacts from "../../components/TVInfo/TVFacts";

const tvShow = ({ tvData, error, languages }) => {
  let creators = [];
  let characters = [];
  let cast = [];
  let creditsDetails = [];
  let reviewDetails = [];
  let backdrops = [];
  let posters = [];

  let getyear = "";
  let endyear = "";
  let epRuntime = {};
  let tvFacts = {};

  if (error === false) {
    creditsDetails = tvData.credits;
    creditsDetails.crew.forEach((item, i) => {
      if (item.job === "Characters") characters.push(creditsDetails.crew[i]);
    });
    tvData.created_by.length > 0 &&
      tvData.created_by.forEach((item) => creators.push(item));

    cast = creditsDetails.cast;

    cast.splice(15);

    reviewDetails = tvData.reviews;
    backdrops = tvData.images.backdrops;
    posters = tvData.images.posters;

    getyear = new Date(tvData.first_air_date).getFullYear();
    endyear =
      tvData.status === "Ended"
        ? "-" + new Date(tvData.last_air_date).getFullYear()
        : "- ";

    const getH = Math.floor(tvData.episode_run_time[0] / 60);
    const getM = Math.ceil((tvData.episode_run_time[0] / 60 - getH) * 60);
    epRuntime = { getH, getM };

    tvFacts = {
      status: tvData.status,
      language: tvData.original_language,
      network: tvData.networks[0].name,
      type: tvData.type,
    };
  }

  if (characters.length > 2) {
    characters.splice(2);
  }

  if (creators.length > 3) {
    creators.splice(3);
  }

  let crew = [...creators, ...characters];

  return (
    <>
      <Head>
        <title>
          {error === false
            ? `${tvData.name} (TV Series ${getyear}
          ${endyear})`
            : "Not Found"}
        </title>
      </Head>
      <Wrapper>
        <DetailsWrapper className="d-flex flex-column justify-content-between">
          <Navigation />
          {error ? (
            <Error404>404</Error404>
          ) : (
            <>
              <HeroDetailsContainer className="position-relative mb-auto">
                <HeroBgContainer className="position-absolute">
                  <HeroBg
                    backdrop={tvData.backdrop_path}
                    className="position-absolute"
                  ></HeroBg>
                  <DominantColor image={tvData.poster_path} />
                </HeroBgContainer>
                <DetailsHeroWrap>
                  <HeroImg data={tvData.poster_path} className="mx-5" />
                  <Gradient />
                  <HeroInfo className="d-flex align-items-center">
                    <TVDetails
                      tvData={tvData}
                      date={getyear}
                      runtime={epRuntime}
                      crew={crew}
                    />
                  </HeroInfo>
                </DetailsHeroWrap>
              </HeroDetailsContainer>
              <TVFacts facts={tvFacts} languages={languages} />
              <TVTab
                cast={cast}
                seasons={tvData.seasons}
                reviews={reviewDetails.results}
                backdrops={backdrops}
                posters={posters}
              />
            </>
          )}
          <Footer />
        </DetailsWrapper>
      </Wrapper>
    </>
  );
};

tvShow.getInitialProps = async (ctx) => {
  const api_key = process.env.NEXT_PUBLIC_API_KEY;
  const tv_id = ctx.query.id;

  const tvResponse = await fetch(
    `https://api.themoviedb.org/3/tv/${tv_id}?api_key=${api_key}&language=en-US&append_to_response=images,credits,reviews&include_image_language=en,null`
  );

  const languagesResponse = await fetch(
    `https://api.themoviedb.org/3/configuration/languages?api_key=${api_key}`
  );

  const error = tvResponse.ok ? false : true;

  if (error === true) {
    return { error };
  } else {
    const tvData = await tvResponse.json();

    const languages = await languagesResponse.json();

    return {
      tvData,
      error,
      languages,
    };
  }
};

export default tvShow;
