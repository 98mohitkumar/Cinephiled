import {
  CardImg,
  CardInfo,
  Cards,
  CardsContainerGrid,
  InfoTitle,
  ReleaseDate
} from "components/MediaTemplate/TemplateStyles";
import PlaceholderText from "components/PlaceholderText";
import RatingTag from "components/RatingTag/RatingTag";
import { motion } from "framer-motion";
import { blurPlaceholder, apiEndpoints } from "globals/constants";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { getCleanTitle, getReleaseDate } from "src/utils/helper";
import { useUserContext } from "Store/UserContext";

const ListItems = ({ listItems, id }) => {
  const {
    userInfo: { accountId }
  } = useUserContext();
  const { list: infiniteQueryListMedia } = useInfiniteQuery({
    initialPage: 2,
    useUserToken: true,
    getEndpoint: ({ page }) =>
      apiEndpoints.lists.getListDetails({
        id,
        accountId,
        pageQuery: page
      })
  });

  const renderList = listItems.concat(infiniteQueryListMedia);

  return (
    <Fragment>
      {listItems?.length > 0 ? (
        <CardsContainerGrid>
          {renderList.map(
            ({
              id,
              title,
              name,
              poster_path,
              vote_average,
              release_date,
              media_type,
              first_air_date
            }) => (
              <Cards key={id}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1 }
                  }}
                  whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/${media_type === "tv" ? "tv" : "movies"}/${id}-${getCleanTitle(
                      title || name
                    )}`}
                    passHref>
                    <div className='relative'>
                      <CardImg>
                        <Image
                          src={
                            poster_path
                              ? `https://image.tmdb.org/t/p/w500${poster_path}`
                              : "/Images/DefaultImage.png"
                          }
                          alt='movie-poster'
                          fill
                          style={{ objectFit: "cover" }}
                          className='poster'
                          placeholder='blur'
                          blurDataURL={blurPlaceholder}
                        />
                      </CardImg>
                      <RatingTag rating={vote_average} />
                    </div>
                  </Link>
                </motion.div>
                <CardInfo>
                  <InfoTitle>{title || name}</InfoTitle>
                  <ReleaseDate>{getReleaseDate(release_date || first_air_date)}</ReleaseDate>
                </CardInfo>
              </Cards>
            )
          )}
        </CardsContainerGrid>
      ) : (
        <PlaceholderText>No Item has been added to this list yet.</PlaceholderText>
      )}
    </Fragment>
  );
};

export default ListItems;
