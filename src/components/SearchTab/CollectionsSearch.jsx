import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import PlaceholderText from "components/PlaceholderText";
import { Grid, GridCol } from "components/UI/Grid";
import H6 from "components/UI/Typography/H6";
import { apiEndpoints } from "data/apiEndpoints";
import { blurPlaceholder } from "data/global";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import { getCleanTitle } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const CollectionsSearch = ({ collections, searchQuery }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    getEndpoint: ({ page }) =>
      apiEndpoints.search.collectionSearch({
        query: searchQuery,
        pageQuery: page
      })
  });

  const renderList = collections?.results.concat(list);

  return (
    <Fragment>
      {renderList?.length > 0 ? (
        <Grid
          colConfig={{
            xxs: 2,
            md: 3,
            lg: 4,
            "2xl": 5,
            "4xl": 6
          }}>
          {renderList.map((collection) => (
            <Link href={`/collection/${collection.id}-${getCleanTitle(collection.name)}`} passHref key={collection.id}>
              <GridCol>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1 }
                  }}
                  whileTap={{ scale: 0.95 }}>
                  <div className='relative aspect-backdrop'>
                    <Image
                      src={getTMDBImage({ path: collection.backdrop_path, type: "backdrop" })}
                      alt={collection.name}
                      fill
                      className='rounded-xl object-cover shadow-xl'
                      placeholder='blur'
                      blurDataURL={blurPlaceholder}
                    />
                  </div>
                </motion.div>

                <H6 weight='medium' className='mt-12'>
                  {collection.name}
                </H6>
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

export default CollectionsSearch;
