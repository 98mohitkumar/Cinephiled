import DominantColor from "components/DominantColor/DominantColor";
import DeleteListModal from "components/List/DeleteListModal";
import EditListModal from "components/List/EditListModal";
import ListItems from "components/List/ListItems";
import ListShareButton from "components/List/ListShareButton";
import ManageList from "components/List/ManageList";
import MetaWrapper from "components/MetaWrapper";
import { Gradient } from "components/MovieInfo/MovieDetailsStyles";
import { AnimatePresence, motion } from "framer-motion";
import { apiEndpoints, blurPlaceholder, read_access_token } from "globals/constants";
import Image from "next/image";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { Fragment } from "react";
import { fetchOptions, framerTabVariants, getCleanTitle, getRuntime } from "src/utils/helper";
import { useUserContext } from "Store/UserContext";
import { Button, Error404, LayoutContainer } from "styles/GlobalComponents";

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

const List = ({ list, error }) => {
  const router = useRouter();
  const { userInfo } = useUserContext();
  const userCanEdit = userInfo?.accountId === list?.created_by?.id;
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

      {error ? (
        <Error404>404</Error404>
      ) : (
        <LayoutContainer className='relative list-wrapper grow'>
          <DominantColor flip tint isUsingBackdrop image={list.backdrop_path} />

          {list?.backdrop_path && (
            <div className='absolute inset-0 max-h-80'>
              <Image
                src={`https://image.tmdb.org/t/p/w1920_and_h318_multi_faces${list.backdrop_path}`}
                alt={list.name}
                layout='fill'
                objectFit='cover'
                quality={100}
                placeholder='blur'
                blurDataURL={blurPlaceholder}
                className='-z-10'
                loading='eager'
              />
              <Gradient className='list backdrop-brightness-50' />
            </div>
          )}

          <AnimatePresence exitBeforeEnter>
            {manageList ? (
              <motion.div
                key={`isAddItemsMode-${manageList}`}
                variants={framerTabVariants}
                initial='hidden'
                animate='visible'
                exit={false}
                className='z-20 relative'>
                <ManageList id={list.id} />
              </motion.div>
            ) : (
              <motion.div
                key={`isAddItemsMode-${manageList}`}
                variants={framerTabVariants}
                initial={false}
                animate='visible'
                exit='hidden'>
                <div className='relative z-20'>
                  <div className='py-4'>
                    <div className='sm:text-center max-w-xl sm:m-auto'>
                      <h1 className='text-[calc(1.7rem_+_1.2vw)] lg:text-[2.5rem] font-semibold leading-snug'>
                        {list.name}
                      </h1>
                      {list?.description && (
                        <div className='mb-5'>
                          <span className='text-lg font-medium'>{list?.description}</span>
                        </div>
                      )}
                    </div>

                    <div className='flex max-sm:gap-x-4 gap-x-8 gap-y-2 max-sm:justify-start justify-center flex-wrap whitespace-nowrap mt-3'>
                      <ListDetails
                        title='Created by'
                        copy={list?.created_by?.name || list?.created_by?.username}
                      />
                      <ListDetails title='Total Items' copy={list?.total_results} />
                      <ListDetails title='Runtime' copy={getRuntime(list?.runtime)} />
                      <ListDetails title='Visibility' copy={list?.public ? "Public" : "Private"} />
                    </div>
                  </div>

                  <div className='mt-8'>
                    <div className='flex gap-3 w-full flex-wrap justify-end'>
                      {userCanEdit && (
                        <Button
                          as={motion.button}
                          whileTap={{ scale: 0.95 }}
                          onClick={addItemsHandler}>
                          Manage List
                        </Button>
                      )}

                      {userCanEdit && <EditListModal list={list} />}

                      {userCanEdit && (
                        <DeleteListModal
                          list={{
                            name: list.name,
                            id: list.id
                          }}
                        />
                      )}

                      {list.public && <ListShareButton listName={list?.name} />}
                    </div>
                  </div>

                  <section className='my-6'>
                    <ListItems listItems={list?.results} id={list.id} />
                  </section>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutContainer>
      )}
    </Fragment>
  );
};

List.getInitialProps = async (ctx) => {
  try {
    const { id } = ctx.query;
    const data = await getSession(ctx);

    const res = await fetch(
      apiEndpoints.lists.getListDetails({ id }),
      fetchOptions({ token: data?.user?.accessToken || read_access_token })
    );

    if (!res.ok) throw new Error("Failed to fetch list details");

    const list = await res.json();

    return {
      error: false,
      list
    };
  } catch {
    return {
      error: true,
      list: {}
    };
  }
};

export default List;
