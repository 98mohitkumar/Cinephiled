import {
  Credits,
  CreditsWrapper,
  Divider,
  GenreWrap,
  HeroInfoTitle,
  HeroInfoWrapper,
  Overview,
  RatingWrapper,
  Rounded,
  RtoR,
  Span,
  Tagline
} from '../MovieInfo/MovieDetailsStyles';
import Link from 'next/link';

const TVDetails = ({ tvData, date, runtime, crew }) => {
  tvData.genres.length > 3 && tvData.genres.splice(3);

  return (
    <>
      <HeroInfoWrapper>
        <HeroInfoTitle className='mb-2'>
          {tvData.name} ({date})
        </HeroInfoTitle>

        <RtoR className='my-3'>
          {tvData.genres.length > 0 && (
            <GenreWrap className='fw-bold'>
              {tvData.genres.map((item, i) => (
                <Link
                  key={item.id}
                  href={`/genre/${
                    item.id.toString() + '-' + item.name.split(' ').join('')
                  }/tv`}
                  passHref
                  scroll={false}
                >
                  <a>
                    <Rounded className={tvData.genres.length == i + 1 && 'sep'}>
                      {item.name}
                    </Rounded>
                  </a>
                </Link>
              ))}
            </GenreWrap>
          )}
          {!isNaN(runtime.getH) ? (
            <Span>
              <Divider className='tvSpan' />
              {runtime.getH === 1 && runtime.getM === 0
                ? '60m'
                : runtime.getH > 0 && runtime.getH + 'h '}
              {runtime.getM > 0 && runtime.getM + 'm'}
            </Span>
          ) : (
            <Span>
              <Divider className='tvSpan' />
              TBA
            </Span>
          )}
        </RtoR>
        {tvData.tagline !== '' && (
          <i>
            <Tagline className='my-4 d-block'>{tvData.tagline}</Tagline>
          </i>
        )}
        <Overview className='fw-normal'>{tvData.overview}</Overview>
        <RatingWrapper>
          {tvData.vote_average !== 0 ? (
            <>
              <Span className='display-3 fw-bolder'>
                {tvData.vote_average.toFixed(1)}
              </Span>
              <span> / 10</span>
            </>
          ) : (
            <Span className='display-3 fw-bolder'>NR</Span>
          )}
        </RatingWrapper>
        {crew.length > 0 && (
          <CreditsWrapper>
            {crew.map((item) => (
              <Credits key={item.credit_id}>
                <Span className='d-block fw-normal'>
                  {item.job ?? 'Creator'}
                </Span>
                <Link
                  href={`/person/${item.id}-${item.name.replace(
                    /[' ']/g,
                    '-'
                  )}`}
                >
                  <a>
                    <Span className='d-block fw-bold credit'>{item.name}</Span>
                  </a>
                </Link>
              </Credits>
            ))}
          </CreditsWrapper>
        )}
      </HeroInfoWrapper>
    </>
  );
};

export default TVDetails;
