import Head from "next/head";
import PersonDetails from "../../components/PersonDetails/PersonDetails";
import { Error404 } from "../../styles/GlobalComponents";

const Person = ({ error, personDetails }) => {
  return (
    <>
      <Head>
        <title>
          {!error
            ? `${personDetails.name} - Cinephiled`
            : "Not Found - Cinephiled"}
        </title>
        {!error && (
          <>
            <meta
              property="og:image"
              content={`https://image.tmdb.org/t/p/w1280${personDetails.profile_path}`}
            />
            <meta
              property="og:title"
              content={`${personDetails.name} - Cinephiled`}
            ></meta>
          </>
        )}
      </Head>

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
        error,
      };
    }
  } catch {
    return { error: true };
  }
};

export default Person;
