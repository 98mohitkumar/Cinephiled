import MetaWrapper from 'components/MetaWrapper';
import PersonDetails from 'components/PersonDetails/PersonDetails';
import { apiEndpoints } from 'globals/constants';
import { Fragment } from 'react';
import { Error404 } from 'styles/GlobalComponents';

const Person = ({ error, personDetails }) => {
  return (
    <Fragment>
      <MetaWrapper
        title={
          !error
            ? `${personDetails.name} - Cinephiled`
            : 'Not Found - Cinephiled'
        }
        image={`https://image.tmdb.org/t/p/w780${personDetails?.profile_path}`}
        description={personDetails?.biography}
        url={`https://cinephiled.vercel.app/person/${
          personDetails?.id
        }-${personDetails.name.replace(/[' ']/g, '-')}`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <PersonDetails details={personDetails} />
      )}
    </Fragment>
  );
};

Person.getInitialProps = async (ctx) => {
  try {
    const response = await fetch(
      apiEndpoints.person.personDetails(ctx.query.id)
    );

    const error = response.ok ? false : true;

    if (error) {
      throw new Error();
    } else {
      const personDetails = await response.json();

      return {
        personDetails,
        error
      };
    }
  } catch {
    return { error: true };
  }
};

export default Person;
