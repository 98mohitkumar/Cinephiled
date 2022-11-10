import {
  HeroInfoTitle,
  HeroInfoWrapper,
  Span
} from '../../components/MovieInfo/MovieDetailsStyles';
import {
  DetailsHeroWrap,
  HeroDetailsContainer,
  HeroImg,
  HeroImgWrapper,
  HeroInfo
} from '../../styles/GlobalComponents';
import { Bio, Details } from './PersonDetails.styles';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  RecommendationsContainer,
  RecommendationsGrid,
  RecommendedImg,
  RecommendedWrapper,
  InfoTitle
} from '../Recommendations/RecommendationsStyles';
import Image from 'next/image';

const PersonDetails = ({ details }) => {
  const getGender = (g) => {
    switch (g) {
      case 0:
        return '-';
      case 1:
        return 'Female';
      case 2:
        return 'Male';
      case 3:
        return 'Non Binary';
    }
  };

  const works = [...details.combined_credits.cast]; // copy the works array
  works.sort((a, z) => z.vote_count - a.vote_count); // sort works array
  works.length > 100 && works.splice(100); // splice if bigger than 100 for filtering

  const cleaned = works.filter((w, i) => {
    if (i !== works.length - 1) {
      return w.backdrop_path !== works[i + 1].backdrop_path;
    }
  });

  cleaned.length > 80 && cleaned.splice(80); // cleaned for mapping

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
    <div style={{ marginBottom: 'auto' }}>
      <HeroDetailsContainer className='position-relative mb-auto person-details'>
        <DetailsHeroWrap style={{ minHeight: 'auto' }} className='pb-0'>
          <HeroImgWrapper>
            <HeroImg className='no-shadow position-relative text-center'>
              <Image
                src={
                  details.profile_path
                    ? `https://image.tmdb.org/t/p/w500${details.profile_path}`
                    : '/Images/DefaultImage.png'
                }
                alt='cast-image'
                layout='fill'
                objectFit='cover'
              />
            </HeroImg>
          </HeroImgWrapper>

          <HeroInfo className='d-flex'>
            <HeroInfoWrapper className='w-100' style={{ maxWidth: '700px' }}>
              <HeroInfoTitle>{details.name}</HeroInfoTitle>

              <Details className='py-4'>
                <div>
                  <Span className='d-block fw-bold'>Gender</Span>
                  <Span className='d-block fw-normal'>
                    {getGender(details.gender)}
                  </Span>
                </div>

                {!details.deathday && details.birthday && (
                  <div>
                    <Span className='d-block fw-bold'>Age</Span>
                    <Span className='d-block fw-normal'>
                      {getAge(details.birthday, true)} years old
                    </Span>
                  </div>
                )}

                {details.birthday && (
                  <div>
                    <Span className='d-block fw-bold'>Birthday</Span>
                    <Span className='d-block fw-normal'>
                      {details.birthday}
                    </Span>
                  </div>
                )}

                {details.deathday && (
                  <div>
                    <Span className='d-block fw-bold'>Death Day</Span>
                    <Span className='d-block fw-normal'>
                      {details.deathday}
                    </Span>
                  </div>
                )}

                {details.deathday && (
                  <div>
                    <Span className='d-block fw-bold'>Died at</Span>
                    <Span className='d-block fw-normal'>
                      {getAge(details.deathday, false)} years old
                    </Span>
                  </div>
                )}

                <div>
                  <Span className='d-block fw-bold'>Known For</Span>
                  <Span className='d-block fw-normal'>
                    {details.known_for_department}
                  </Span>
                </div>

                <div>
                  <Span className='d-block fw-bold'>Known Credits</Span>
                  <Span className='d-block fw-normal'>
                    {details.combined_credits.cast.length}
                  </Span>
                </div>
              </Details>
            </HeroInfoWrapper>
          </HeroInfo>
        </DetailsHeroWrap>

        {details.biography && (
          <DetailsHeroWrap className='no-grid bio'>
            {details.biography && (
              <>
                <Span className='d-block fw-bold'>Biography</Span>
                <Bio>{details.biography}</Bio>
              </>
            )}
          </DetailsHeroWrap>
        )}
      </HeroDetailsContainer>

      {cleaned.length !== 0 && (
        <RecommendationsContainer className='py-4'>
          <Span className='d-block display-5 text-center genre'>
            Filmography
          </Span>

          <RecommendationsGrid>
            {cleaned.map((item, i) =>
              item.media_type === 'movie' ? (
                <RecommendedWrapper key={i}>
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.1 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={`/movies/${item.id}-${item.title.replace(
                        /[' ']/g,
                        '-'
                      )}`}
                      passHref
                      scroll={false}
                    >
                      <a>
                        <RecommendedImg className='position-relative text-center'>
                          <Image
                            src={
                              item.backdrop_path
                                ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                                : '/Images/DefaultBackdrop.png'
                            }
                            alt='movie-backdrop'
                            layout='fill'
                            objectFit='cover'
                          />
                        </RecommendedImg>
                      </a>
                    </Link>
                  </motion.div>
                  <InfoTitle className='my-3 text-center'>
                    {item.title}
                  </InfoTitle>
                </RecommendedWrapper>
              ) : (
                <RecommendedWrapper key={i}>
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.1 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={`/tv/${item.id}-${item.name.replace(
                        /[' ']/g,
                        '-'
                      )}`}
                      passHref
                      scroll={false}
                    >
                      <a>
                        <RecommendedImg className='position-relative text-center'>
                          <Image
                            src={
                              item.backdrop_path
                                ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                                : '/Images/DefaultBackdrop.png'
                            }
                            alt='TV-backdrop'
                            layout='fill'
                            objectFit='cover'
                          />
                        </RecommendedImg>
                      </a>
                    </Link>
                  </motion.div>
                  <InfoTitle className='my-3 text-center'>
                    {item.name}
                  </InfoTitle>
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
