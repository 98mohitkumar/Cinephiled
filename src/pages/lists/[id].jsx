import { getServerSession } from "next-auth";
import { Fragment } from "react";

import { authOptions } from "api/auth/[...nextauth]";
import AddListItems from "components/pages/Lists/helpers/AddListItems";
import DeleteListModal from "components/pages/Lists/helpers/DeleteListModal";
import EditListModal from "components/pages/Lists/helpers/EditListModal";
import ListItems from "components/pages/Lists/helpers/ListItems";
import ListShareButton from "components/pages/Lists/helpers/ListShareButton";
import PlaceholderText from "components/PlaceholderText";
import MediaHeroBackground from "components/Shared/MediaHeroBackground/MediaHeroBackground";
import MetaWrapper from "components/Shared/MetaWrapper";
import FlexBox from "components/UI/FlexBox";
import { Grid } from "components/UI/Grid";
import LayoutContainer from "components/UI/LayoutContainer";
import H1 from "components/UI/Typography/H1";
import P from "components/UI/Typography/P";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES, siteInfo } from "data/global";
import { cn, fetchOptions, getNiceName, getRuntime } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const ListDetails = ({ title, copy }) => {
  return (
    <Fragment>
      {copy ? (
        <div className='flex items-center gap-4'>
          <P className='text-neutral-400'>{title}:</P>
          <P weight='bold'>{copy}</P>
        </div>
      ) : null}
    </Fragment>
  );
};

const List = ({ list, isListAccessible, userCanEditList }) => {
  if (!isListAccessible) {
    return (
      <PlaceholderText height='large' className='grow'>
        This list is private.
      </PlaceholderText>
    );
  }

  const listHasItems = list?.results?.length > 0;

  return (
    <Fragment>
      <MetaWrapper
        title={`${list.name} - Cinephiled`}
        description={list?.description || ""}
        image={getTMDBImage({ path: list?.backdrop_path, type: "backdrop", size: "w1280" })}
        url={`${siteInfo.url}/${ROUTES.lists}/${getNiceName({ id: list?.id, name: list?.name })}`}
      />

      <section>
        <div className='relative'>
          <MediaHeroBackground backdropPath={list?.backdrop_path} posterPath={list?.backdrop_path} alt='list-backdrop' />

          <LayoutContainer
            className={cn("relative z-5 flex items-center py-2448", {
              "max-lg:-mt-3248 max-lg:py-0 lg:min-h-[560px]": Boolean(list?.backdrop_path)
            })}>
            <div className='w-full md:max-w-2xl'>
              <div className='mb-1624'>
                <H1 className='text-pretty'>{list.name}</H1>
                {list?.description && (
                  <P size='large' className='mt-12'>
                    {list?.description}
                  </P>
                )}
              </div>

              <Grid className='w-fit grid-cols-1 gap-x-32 gap-y-8 whitespace-nowrap xs:grid-cols-2'>
                <ListDetails title='Created by' copy={list?.created_by?.name || list?.created_by?.username} />
                <ListDetails title='Total Items' copy={list?.total_results} />
                {Boolean(list?.runtime) ? <ListDetails title='Runtime' copy={getRuntime(list?.runtime)} /> : null}
                <ListDetails title='Visibility' copy={list?.public ? "Public" : "Private"} />
              </Grid>

              <div className='mt-1624 w-fit'>
                <FlexBox className='w-full flex-wrap gap-10'>
                  {/* list controls, only visible to list owner */}
                  {userCanEditList ? (
                    <Fragment>
                      <AddListItems id={list.id} />
                      <EditListModal list={list} />
                      <DeleteListModal list={{ name: list.name, id: list.id }} />
                    </Fragment>
                  ) : null}

                  {list.public && (
                    <ListShareButton
                      list={{
                        name: list?.name,
                        description: list?.description
                      }}
                    />
                  )}
                </FlexBox>
              </div>
            </div>
          </LayoutContainer>
        </div>

        <LayoutContainer className='py-4048'>
          {listHasItems ? (
            <ListItems listItems={list?.results} id={list.id} userCanEditList={userCanEditList} />
          ) : (
            <PlaceholderText>Your list is currently empty. Add items to get started!</PlaceholderText>
          )}
        </LayoutContainer>
      </section>
    </Fragment>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const { id } = ctx.query;
    const data = await getServerSession(ctx.req, ctx.res, authOptions);

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
