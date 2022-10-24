import MetaWrapper from '../../components/MetaWrapper';
import PersonDetails from '../../components/PersonDetails/PersonDetails';
import { Error404 } from '../../styles/GlobalComponents';

const Person = ({ error, personDetails }) => {
  return (
    <>
      <MetaWrapper
        title={
          !error
            ? `${personDetails.name} - Cinephiled`
            : 'Not Found - Cinephiled'
        }
        image={`https://image.tmdb.org/t/p/w780${personDetails?.profile_path}`}
        description={personDetails?.biography}
        url={`https://cinephiled.vercel.app/person/${personDetails?.id}`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <PersonDetails details={personDetails} />
      )}
    </>
  );
};

Person.getInitialProps = async (ctx) => {
  try {
    const api_key = process.env.NEXT_PUBLIC_API_KEY;
    const personId = ctx.query.id;
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${personId}?api_key=${api_key}&language=en-US&append_to_response=combined_credits`
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
