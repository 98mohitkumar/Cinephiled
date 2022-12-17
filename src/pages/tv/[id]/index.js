import { Fragment, useMemo } from 'react';
import MetaWrapper from '../../../components/MetaWrapper';
import Recommendations from '../../../components/Recommendations/Recommendations';
import TVDetails from '../../../components/TVInfo/TVDetails';
import TVFacts from '../../../components/TVInfo/TVFacts';
import TVTab from '../../../components/TVInfo/TVTab';
import { apiEndpoints } from '../../../constants';
import { Error404 } from '../../../styles/GlobalComponents';

const TvShow = ({ tvData, error, language }) => {
  const cast = useMemo(
    () => (!error ? tvData?.credits?.cast.slice(0, 15) : []),
    [error, tvData?.credits?.cast]
  );

  const tvStatus = useMemo(
    () => (!error ? (!tvData.status ? 'TBA' : tvData?.status) : ''),
    [error, tvData?.status]
  );

  const network = useMemo(
    () =>
      !error ? (!tvData.networks[0] ? 'TBA' : tvData?.networks[0]?.name) : '',
    [error, tvData?.networks]
  );

  const type = useMemo(
    () => (!error ? (!tvData.type ? 'TBA' : tvData?.type) : ''),
    [error, tvData?.type]
  );

  const tvFacts = useMemo(
    () => (!error ? { status: tvStatus, network, type, language } : {}),
    [error, language, network, tvStatus, type]
  );

  const getYear = useMemo(
    () =>
      !error
        ? tvData?.first_air_date
          ? new Date(tvData?.first_air_date).getFullYear()
          : 'TBA'
        : '',
    [error, tvData?.first_air_date]
  );

  const endYear = useMemo(
    () =>
      !error
        ? tvData?.status === 'Ended' || tvData.status === 'Canceled'
          ? new Date(tvData?.last_air_date).getFullYear()
          : ''
        : '',
    [error, tvData?.last_air_date, tvData?.status]
  );

  return (
    <Fragment>
      <MetaWrapper
        title={
          !error
            ? `${tvData?.name} (${getYear} - ${endYear}) - Cinephiled`
            : 'Not Found - Cinephiled'
        }
        description={tvData?.overview}
        image={`https://image.tmdb.org/t/p/w780${tvData?.backdrop_path}`}
        url={`https://cinephiled.vercel.app/tv/${
          tvData?.id
        }-${tvData.name.replace(/[' ']/g, '-')}`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <div className='pb-5'>
          {/* tv info hero section */}
          <TVDetails tvData={tvData} year={getYear} />

          {/* tv facts */}
          <TVFacts facts={tvFacts} />

          {/* tv tabs */}
          <TVTab
            id={tvData.id}
            cast={cast}
            seasons={tvData?.seasons}
            reviews={tvData?.reviews?.results ?? []}
            backdrops={tvData?.images?.backdrops ?? []}
            posters={tvData?.images?.posters ?? []}
          />

          {/* recommendations */}
          {tvData?.recommendations?.results?.length > 0 && (
            <Recommendations
              data={tvData?.recommendations?.results}
              type='tv'
            />
          )}
        </div>
      )}
    </Fragment>
  );
};

TvShow.getInitialProps = async (ctx) => {
  try {
    const tvResponse = await fetch(apiEndpoints.tv.tvDetails(ctx.query.id));
    const languagesResponse = await fetch(apiEndpoints.language);

    const error = tvResponse.ok ? false : true;

    if (error) {
      throw new Error();
    } else {
      const tvData = await tvResponse.json();
      const languages = await languagesResponse.json();

      const language = languages.filter(
        (item) => item.iso_639_1 === tvData.original_language
      );

      return {
        tvData,
        error,
        language: language?.[0]?.english_name
      };
    }
  } catch {
    return { error: true };
  }
};

export default TvShow;
