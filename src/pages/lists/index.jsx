import { getServerSession } from "next-auth";
import { Fragment } from "react";

import { authOptions } from "api/auth/[...nextauth]";
import { CreateList } from "components/pages/Lists/CreateList";
import DominantColor from "components/Shared/DominantColor/DominantColor";
import MetaWrapper from "components/Shared/MetaWrapper";
import PlaceholderText from "components/Shared/PlaceholderText";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import FlexBox from "components/UI/FlexBox";
import LayoutContainer from "components/UI/LayoutContainer";
import H3 from "components/UI/Typography/H3";
import P from "components/UI/Typography/P";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES } from "data/global";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import { useUserContext } from "Store/UserContext";
import { fetchOptions, getReleaseDate } from "utils/helper";

const Lists = ({ lists }) => {
  const {
    userInfo: { accountId }
  } = useUserContext();

  const { list: infiniteQueryLists, isLoading } = useInfiniteQuery({
    initialPage: 2,
    useUserToken: true,
    getEndpoint: ({ page }) => apiEndpoints.lists.getLists({ pageQuery: page, accountId })
  });

  const renderList = lists.concat(infiniteQueryLists);

  return (
    <Fragment>
      <MetaWrapper title='My Lists - Cinephiled' description='Create and manage your lists.' />

      <section className='relative grow'>
        <DominantColor tint />

        <LayoutContainer className='relative z-5 py-2448'>
          <FlexBox className='mb-20 items-center justify-between'>
            <H3 weight='semibold'>My Lists</H3>
            <CreateList />
          </FlexBox>

          {renderList?.length > 0 ? (
            <MediaTemplateGrid media={renderList} gridType='backdrop' showRating={false} mediaType={ROUTES.lists} isLoadingNewItems={isLoading}>
              {(list) => (
                <div className='mt-8'>
                  <P size='large' weight='semibold'>
                    {list.name}
                  </P>
                  <P size='small' weight='medium' className='mt-2 text-neutral-400'>
                    Last updated on {getReleaseDate(list.updated_at)}
                  </P>
                </div>
              )}
            </MediaTemplateGrid>
          ) : (
            <PlaceholderText height='large'>
              It looks like you haven&apos;t created any lists yet. Start by clicking &quot;Create List&quot; above!
            </PlaceholderText>
          )}
        </LayoutContainer>
      </section>
    </Fragment>
  );
};

export const getServerSideProps = async (ctx) => {
  const data = await getServerSession(ctx.req, ctx.res, authOptions);

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
    const listsRes = await fetch(apiEndpoints.lists.getLists({ accountId }), fetchOptions({ token: accessToken, cache: "no-store" }));

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
