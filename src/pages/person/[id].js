import { Fragment } from "react";

import PersonDetails from "components/PersonDetails/PersonDetails";
import MetaWrapper from "components/Shared/MetaWrapper";
import { apiEndpoints } from "data/apiEndpoints";
import { fetchOptions, getCleanTitle } from "utils/helper";

const Person = ({ personDetails }) => {
  return (
    <Fragment>
      <MetaWrapper
        title={`${personDetails.name} - Cinephiled`}
        image={`https://image.tmdb.org/t/p/w780${personDetails?.profile_path}`}
        description={personDetails?.biography}
        url={`https://cinephiled.vercel.app/person/${personDetails?.id}-${getCleanTitle(personDetails?.name)}`}
      />

      <PersonDetails details={personDetails} />
    </Fragment>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const response = await fetch(apiEndpoints.person.personDetails(ctx.query.id), fetchOptions());
    const error = response.ok ? false : true;

    if (error) {
      throw new Error("cannot fetch details");
    }

    const personDetails = await response.json();
    return {
      props: {
        personDetails
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

export default Person;
