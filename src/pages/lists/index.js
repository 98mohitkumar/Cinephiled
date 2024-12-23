import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { Fragment } from "react";

import CreateList from "components/List/CreateList";
import { InfoTitle } from "components/MediaTemplate/TemplateStyles";
import PlaceholderText from "components/PlaceholderText";
import { RecommendationsGrid, RecommendedImg, RecommendedWrapper } from "components/Recommendations/RecommendationsStyles";
import DominantColor from "components/Shared/DominantColor/DominantColor";
import MetaWrapper from "components/Shared/MetaWrapper";
import { apiEndpoints } from "data/apiEndpoints";
import { blurPlaceholder } from "data/global";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import { useUserContext } from "Store/UserContext";
import { Button, LayoutContainer } from "styles/GlobalComponents";
import { fetchOptions, framerTabVariants, getCleanTitle } from "utils/helper";

const Lists = ({ lists }) => {
  const router = useRouter();
  const create = router.query.create === "true";
  const {
    userInfo: { accountId }
  } = useUserContext();

  const createListHandler = () => {
    router.push(
      {
        pathname: "lists",
        query: {
          create: true
        }
      },
      null,
      { shallow: true }
    );
  };

  const { list: infiniteQueryLists } = useInfiniteQuery({
    initialPage: 2,
    useUserToken: true,
    getEndpoint: ({ page }) => apiEndpoints.lists.getLists({ pageQuery: page, accountId })
  });

  const renderList = lists.concat(infiniteQueryLists);

  return (
    <Fragment>
      <MetaWrapper title={`${create ? "Create List" : "My Lists"} - Cinephiled`} description='Create and manage your lists.' />

      <LayoutContainer className='list-wrapper relative grow'>
        <DominantColor flip tint />

        <div className='relative z-20'>
          <AnimatePresence mode='wait'>
            {create ? (
              <motion.div key={create} variants={framerTabVariants} initial='hidden' animate='visible' exit={false}>
                <CreateList />
              </motion.div>
            ) : (
              <motion.div key={`isCreateMode-${create}`} variants={framerTabVariants} initial={false} animate='visible' exit='hidden'>
                <div className='mb-8 flex items-center justify-between'>
                  <h1 className='text-[calc(1.35rem_+_.9vw)] font-semibold leading-snug lg:text-[2rem]'>My Lists</h1>

                  <Button as={motion.button} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={createListHandler}>
                    Create List
                  </Button>
                </div>

                {lists?.length > 0 ? (
                  <RecommendationsGrid>
                    {renderList?.map(({ id, backdrop_path, name }) => (
                      <RecommendedWrapper key={id}>
                        <motion.div
                          whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 }
                          }}
                          whileTap={{ scale: 0.95 }}>
                          <Link href={`lists/${id}-${getCleanTitle(name)}`} passHref>
                            <RecommendedImg className='relative text-center'>
                              <Image
                                src={backdrop_path ? `https://image.tmdb.org/t/p/w780${backdrop_path}` : "/Images/DefaultBackdrop.png"}
                                alt='backdrop'
                                fill
                                style={{ objectFit: "cover" }}
                                placeholder='blur'
                                blurDataURL={blurPlaceholder}
                              />
                            </RecommendedImg>
                          </Link>
                        </motion.div>
                        <InfoTitle className='mt-3 mb-0 text-center'>{name}</InfoTitle>
                      </RecommendedWrapper>
                    ))}
                  </RecommendationsGrid>
                ) : (
                  <PlaceholderText height='large'>
                    You don&apos;t have any lists yet. <br /> Click on the button above to create one.
                  </PlaceholderText>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </LayoutContainer>
    </Fragment>
  );
};

export const getServerSideProps = async (ctx) => {
  const data = await getSession(ctx);

  if (!data) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    };
  }

  try {
    const {
      user: { accessToken, accountId }
    } = data;
    const listsRes = await fetch(apiEndpoints.lists.getLists({ accountId }), fetchOptions({ token: accessToken }));

    if (!listsRes.ok) throw new Error("Failed to fetch lists");

    const lists = await listsRes.json();

    return {
      props: {
        lists: lists?.results || []
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

export default Lists;
