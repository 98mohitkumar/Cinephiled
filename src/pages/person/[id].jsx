import { Fragment } from "react";

import PersonDetails from "components/pages/Person/PersonDetails";
import MetaWrapper from "components/Shared/MetaWrapper";
import { apiEndpoints } from "data/apiEndpoints";
import { fetchOptions, getCleanTitle, removeDuplicates } from "utils/helper";

const Person = ({ personDetails }) => {
  return (
    <Fragment>
      <MetaWrapper
        title={`${personDetails.name} - Cinephiled`}
        image={`https://image.tmdb.org/t/p/w780${personDetails?.profile_path}`}
        description={personDetails?.biography}
        url={`https://cinephiled.vercel.app/person/${personDetails?.id}-${getCleanTitle(personDetails?.name)}`}
      />

      <PersonDetails personDetails={personDetails} />
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

    const totalCredits = removeDuplicates(Object.values(personDetails?.combined_credits).flat()).cleanedItems.length || 0;

    personDetails.totalCredits = totalCredits;
    delete personDetails.combined_credits;

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
