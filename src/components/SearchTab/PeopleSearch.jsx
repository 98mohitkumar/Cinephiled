import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import PlaceholderText from "components/PlaceholderText";
import { Grid, GridCol } from "components/UI/Grid";
import P from "components/UI/Typography/P";
import { apiEndpoints } from "data/apiEndpoints";
import { blurPlaceholder } from "data/global";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import { getCleanTitle, removeDuplicates } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const PeopleSearch = ({ searchQuery, people }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    getEndpoint: ({ page }) =>
      apiEndpoints.search.personSearch({
        query: searchQuery,
        pageQuery: page
      })
  });
  const { cleanedItems } = removeDuplicates(people.results.concat(list));

  return (
    <Fragment>
      {cleanedItems?.length > 0 ? (
        <Grid
          colConfig={{
            xxs: 2,
            xs: 3,
            sm: "peopleGrid"
          }}>
          {cleanedItems.map((person) => (
            <Link href={`/person/${person.id}-${getCleanTitle(person.name)}`} passHref key={person.id}>
              <GridCol>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1 }
                  }}
                  whileTap={{ scale: 0.95 }}>
                  <div className='relative aspect-profile'>
                    <Image
                      src={getTMDBImage({ path: person.profile_path, type: "profile", size: "w342" })}
                      alt={person.name}
                      fill
                      className='rounded-xl object-cover object-top shadow-xl'
                      placeholder='blur'
                      blurDataURL={blurPlaceholder}
                    />
                  </div>
                </motion.div>

                <div className='mt-12'>
                  <P tag='h6' weight='medium'>
                    {person.name}
                  </P>
                  <P className='text-neutral-400' weight='medium' size='small'>
                    {person.known_for_department}
                  </P>
                </div>
              </GridCol>
            </Link>
          ))}
        </Grid>
      ) : (
        <PlaceholderText height='large'>No results found for this query.</PlaceholderText>
      )}
    </Fragment>
  );
};

export default PeopleSearch;
