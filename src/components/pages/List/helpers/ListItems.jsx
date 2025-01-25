import { EllipsisVertical } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { updateList, updateListItems } from "apiEndpoints/user";
import RatingTag from "components/RatingTag/RatingTag";
import FlexBox from "components/UI/FlexBox";
import { Grid, GridCol } from "components/UI/Grid";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "components/UI/Popover";
import H6 from "components/UI/Typography/H6";
import P from "components/UI/Typography/P";
import { apiEndpoints } from "data/apiEndpoints";
import { blurPlaceholder } from "data/global";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import useRefreshData from "hooks/useRefreshData";
import { useUserContext } from "Store/UserContext";
import { getCleanTitle, getReleaseDate } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const ListItems = ({ listItems, id, userCanEditList }) => {
  const { revalidateData } = useRefreshData();

  const {
    userInfo: { accountId }
  } = useUserContext();
  const { list: infiniteQueryListMedia, resetQueryState } = useInfiniteQuery({
    initialPage: 2,
    useUserToken: true,
    getEndpoint: ({ page }) =>
      apiEndpoints.lists.getListDetails({
        id,
        accountId,
        pageQuery: page
      })
  });

  const refreshData = () => {
    setTimeout(() => {
      resetQueryState();
      revalidateData();
    }, 500);
  };

  // remove item from list request handler
  const removeItemHandler = async (item) => {
    const { success } = await updateListItems({
      id,
      method: "DELETE",
      itemsData: {
        items: [{ media_type: item.media_type, media_id: item.id }]
      }
    });

    if (success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.success("Success!", { description: "Item removed from the list." });
      refreshData();
    } else {
      toast.error("An error occured", { description: "Error removing item from the list, please try again later." });
    }
  };

  // update backdrops handler
  const updateBackdropsHandler = async (backdrop) => {
    const { success } = await updateList({ id, listData: { backdrop_path: backdrop } });

    if (success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.success("Success!", { description: "List cover added successfully." });
      refreshData();
    } else {
      toast.error("An error occured", { description: "Error updating the list details, please try again later." });
    }
  };

  const renderList = listItems.concat(infiniteQueryListMedia);

  return (
    <Grid
      colConfig={{
        xxs: 2,
        sm: 3,
        lg: 4,
        xl: 5,
        "2xl": "desktopAutoFillMedia"
      }}
      className='items-start'>
      {renderList.map(({ id, title, name, poster_path, vote_average, release_date, first_air_date, media_type, backdrop_path }) => (
        <GridCol title={title || name} key={id}>
          <Link href={`/${media_type}/${id}-${getCleanTitle(title || name)}`} passHref>
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.1 }
              }}
              whileTap={{ scale: 0.95 }}>
              <div className='relative aspect-poster'>
                <Image
                  src={getTMDBImage({ path: poster_path, type: "poster" })}
                  alt={title || name}
                  fill
                  className='rounded-xl object-cover shadow-xl'
                  placeholder='blur'
                  blurDataURL={blurPlaceholder}
                />
                <RatingTag rating={vote_average} />
              </div>
            </motion.div>
          </Link>

          <div className='mt-32'>
            <FlexBox className='items-start justify-between gap-16'>
              <H6 weight='medium'>{title || name}</H6>

              {userCanEditList ? (
                <Popover>
                  <PopoverTrigger className='grid-center mt-2 aspect-square w-8 shrink-0 rounded-full border border-transparent bg-neutral-700 transition-colors aria-expanded:border-neutral-100 can-hover:bg-neutral-600'>
                    <EllipsisVertical size={16} />
                  </PopoverTrigger>

                  <PopoverContent align='end' className='text-center'>
                    <PopoverClose className='block w-full' onClick={() => removeItemHandler({ id, media_type })}>
                      <P className='border-b border-neutral-600 px-12 py-8 text-red-500 transition-colors can-hover:bg-red-950/75' weight='medium'>
                        Remove from list
                      </P>
                    </PopoverClose>

                    <PopoverClose className='block w-full' onClick={() => updateBackdropsHandler(backdrop_path)}>
                      <P className='px-12 py-8 text-neutral-200 transition-colors can-hover:bg-neutral-700' weight='medium'>
                        Use as cover image
                      </P>
                    </PopoverClose>
                  </PopoverContent>
                </Popover>
              ) : null}
            </FlexBox>
            <P className='text-neutral-400' weight='medium' size='small-to-p'>
              {getReleaseDate(release_date || first_air_date)}
            </P>
          </div>
        </GridCol>
      ))}
    </Grid>
  );
};

export default ListItems;
