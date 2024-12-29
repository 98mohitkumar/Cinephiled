import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import PlaceholderText from "components/PlaceholderText";
import {
  QueryContainer,
  QueryImg,
  QueryInfoWrapper,
  QueryTitle,
  QueryReleaseDate,
  QueryDescription,
  SearchResultsContainer
} from "components/SearchTab/SearchTabStyles";
import MetaWrapper from "components/Shared/MetaWrapper";
import { apiEndpoints } from "data/apiEndpoints";
import { blurPlaceholder } from "data/global";
import { ModulesWrapper } from "styles/GlobalComponents";
import { fetchOptions, getCleanTitle, getReleaseDate } from "utils/helper";

const Keyword = ({ results, name, id }) => {
  return (
    <Fragment>
      <MetaWrapper
        title={`${name} - Movies`}
        description={`Movies matching the keyword : ${name}`}
        url={`https://cinephiled.vercel.app/keywords/${id}`}
      />

      <ModulesWrapper className='mt-6'>
        <SearchResultsContainer>
          {results?.length > 0 ? (
            <Fragment>
              <p className='text-xl md:text-2xl font-medium'>Results Matching : {name}</p>
              {results.map(({ id, title, poster_path, overview, release_date }) => (
                <motion.div whileTap={{ scale: 0.98 }} key={id}>
                  <Link href={`/movie/${id}-${getCleanTitle(title)}`} passHref>
                    <QueryContainer>
                      <QueryImg className='relative text-center'>
                        <Image
                          src={poster_path ? `https://image.tmdb.org/t/p/w185${poster_path}` : "/images/DefaultImage.png"}
                          alt='movie-poster'
                          fill
                          style={{ objectFit: "cover" }}
                          placeholder='blur'
                          blurDataURL={blurPlaceholder}
                        />
                      </QueryImg>
                      <QueryInfoWrapper>
                        <div>
                          <QueryTitle>{title}</QueryTitle>
                          <QueryReleaseDate>{getReleaseDate(release_date)}</QueryReleaseDate>
                        </div>
                        <QueryDescription>{overview}</QueryDescription>
                      </QueryInfoWrapper>
                    </QueryContainer>
                  </Link>
                </motion.div>
              ))}
            </Fragment>
          ) : (
            <PlaceholderText height='large'>No Movie results for this keyword.</PlaceholderText>
          )}
        </SearchResultsContainer>
      </ModulesWrapper>
    </Fragment>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const keyword = ctx.query.id;
    const keywordRes = await fetch(apiEndpoints.keywords.keywordDetails(keyword), fetchOptions());
    const error = keywordRes.ok ? false : true;

    if (error) {
      throw new Error("error fetch data");
    }

    const keywordData = await keywordRes.json();

    return {
      props: {
        results: keywordData.results,
        name: keyword.split("-").slice(1).join(" "),
        id: keyword
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};
export default Keyword;
