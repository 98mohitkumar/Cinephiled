import Image from "next/image";
import { Fragment } from "react";

// import { BackdropsImg, BackdropsImgContainer, BackdropsWrapper } from "./BackdropsStyles";
import DownloadMediaButton from "components/DownloadMediaButton/DownloadMediaButton";
import PlaceholderText from "components/PlaceholderText";
import { Grid, GridCol } from "components/UI/Grid";
import { blurPlaceholder } from "data/global";
import { cn, matches } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const MediaImageTemplateGrid = ({ items, type = "backdrops" }) => {
  const gridConfig = matches(type, "backdrops") ? { xxs: 1, md: 2, lg: 3, "3xl": 4 } : { xxs: 2, md: 3, lg: 4, "2xl": 5, "3xl": 6 };
  const size = matches(type, "backdrops") ? "w1280" : "w500";

  return (
    <Fragment>
      {items?.length > 0 ? (
        <Grid colConfig={gridConfig}>
          {items.map((item) => (
            <GridCol
              key={item.file_path}
              className={cn("relative", {
                "aspect-poster": matches(type, "posters"),
                "aspect-backdrop": matches(type, "backdrops")
              })}>
              <Image
                src={getTMDBImage({ path: item.file_path, type, size })}
                alt={type}
                fill
                className='rounded-xl object-cover shadow-xl'
                placeholder='blur'
                blurDataURL={blurPlaceholder}
              />

              <DownloadMediaButton item={item.file_path} />
            </GridCol>
          ))}
        </Grid>
      ) : (
        <PlaceholderText>No {type} available Yet</PlaceholderText>
      )}
    </Fragment>
  );
};

export default MediaImageTemplateGrid;
