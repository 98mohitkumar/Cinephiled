import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { Fragment } from "react";

import DeleteListModal from "components/List/DeleteListModal";
import EditListModal from "components/List/EditListModal";
import ListItems from "components/List/ListItems";
import ListShareButton from "components/List/ListShareButton";
import ManageList from "components/List/ManageList";
import { Gradient } from "components/MovieInfo/MovieDetailsStyles";
import PlaceholderText from "components/PlaceholderText";
import DominantColor from "components/Shared/DominantColor/DominantColor";
import MetaWrapper from "components/Shared/MetaWrapper";
import { apiEndpoints } from "data/apiEndpoints";
import { blurPlaceholder } from "data/global";
import { Button, LayoutContainer } from "styles/GlobalComponents";
import { fetchOptions, framerTabVariants, getCleanTitle, getRuntime } from "utils/helper";

const ListDetails = ({ title, copy }) => {
  return (
    <Fragment>
      {copy ? (
        <div>
          <p className='text-lg'>
            {title}: <span className='font-bold'>{copy}</span>
          </p>
        </div>
      ) : null}
    </Fragment>
  );
};

const List = ({ list, isListAccessible, userCanEditList }) => {
  const router = useRouter();
  const {
    query: { manageList = false }
  } = router;

  const addItemsHandler = () => {
    router.push(router.asPath + "?manageList=true", null, { shallow: true });
  };

  return (
    <Fragment>
      <MetaWrapper
        title={`${list.name} - Cinephiled`}
        description={list?.description || ""}
        image={`https://image.tmdb.org/t/p/w1280${list?.backdrop_path}`}
        url={`https://cinephiled.vercel.app/lists/${list?.id}-${getCleanTitle(list?.name)}`}
      />

      <LayoutContainer className='list-wrapper relative grow'>
        <DominantColor flip tint isUsingBackdrop image={list.backdrop_path} />

        {list?.backdrop_path && (
          <div className='absolute inset-0 max-h-72'>
            <Image
              src={`https://image.tmdb.org/t/p/w1920_and_h318_multi_faces${list.backdrop_path}`}
              alt={list.name}
              fill
              style={{ objectFit: "cover" }}
              placeholder='blur'
              blurDataURL={blurPlaceholder}
              className='-z-10'
              loading='eager'
            />
            <Gradient className='z-[-1] backdrop-brightness-50' />
          </div>
        )}

        {isListAccessible ? (
          <AnimatePresence mode='wait'>
            {manageList ? (
              <motion.div
                key={`isAddItemsMode-${manageList}`}
                variants={framerTabVariants}
                initial='hidden'
                animate='visible'
                exit={false}
                className='relative z-20'>
                <ManageList id={list.id} />
              </motion.div>
            ) : (
              <motion.div key={`isAddItemsMode-${manageList}`} variants={framerTabVariants} initial={false} animate='visible' exit='hidden'>
                <div className='relative z-20'>
                  <div className='py-4'>
                    <div className='max-w-xl sm:m-auto sm:text-center'>
                      <h1 className='text-[calc(1.7rem_+_1.2vw)] font-semibold leading-snug lg:text-[2.5rem]'>{list.name}</h1>
                      {list?.description && (
                        <div className='mb-5'>
                          <span className='text-lg font-medium'>{list?.description}</span>
                        </div>
                      )}
                    </div>

                    <div className='mt-3 flex flex-wrap justify-center gap-x-8 gap-y-2 whitespace-nowrap max-sm:justify-start max-sm:gap-x-4'>
                      <ListDetails title='Created by' copy={list?.created_by?.name || list?.created_by?.username} />
                      <ListDetails title='Total Items' copy={list?.total_results} />
                      <ListDetails title='Runtime' copy={getRuntime(list?.runtime)} />
                      <ListDetails title='Visibility' copy={list?.public ? "Public" : "Private"} />
                    </div>
                  </div>

                  <div className='mt-8'>
                    <div className='gap-3 flex w-full flex-wrap justify-end'>
                      {userCanEditList && (
                        <Button as={motion.button} whileTap={{ scale: 0.95 }} onClick={addItemsHandler}>
                          Manage List
                        </Button>
                      )}

                      {userCanEditList && <EditListModal list={list} />}

                      {userCanEditList && (
                        <DeleteListModal
                          list={{
                            name: list.name,
                            id: list.id
                          }}
                        />
                      )}

                      {list.public && (
                        <ListShareButton
                          list={{
                            name: list?.name,
                            description: list?.description
                          }}
                        />
                      )}
                    </div>
                  </div>

                  <section className='my-6'>
                    <ListItems listItems={list?.results} id={list.id} />
                  </section>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <PlaceholderText height='large' className='relative z-10'>
            This list is private.
          </PlaceholderText>
        )}
      </LayoutContainer>
    </Fragment>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const { id } = ctx.query;
    const data = await getSession(ctx);

    const res = await fetch(apiEndpoints.lists.getListDetails({ id }), fetchOptions());
    if (!res.ok) throw new Error("Failed to fetch list details");

    const list = await res.json();
    const userCanEditList = data?.user?.accountId === list?.created_by?.id;
    const isListAccessible = list?.public || userCanEditList;

    return {
      props: {
        userCanEditList,
        isListAccessible,
        list
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

export default List;
