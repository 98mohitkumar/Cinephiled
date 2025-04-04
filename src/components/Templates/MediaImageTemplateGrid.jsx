import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment } from "react";

import DownloadMediaButton from "components/Shared/DownloadMediaButton";
import PlaceholderText from "components/Shared/PlaceholderText";
import { Grid, GridCol } from "components/UI/Grid";
import { blurPlaceholder } from "data/global";
import { cn, matches } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const MediaImageTemplateGrid = ({ items, type = "backdrops" }) => {
  const gridConfig = matches(type, "backdrops") ? { xxs: 1, sm: 2, lg: 3, "3xl": 4 } : { xxs: 2, md: 3, lg: 4, "2xl": 5, "3xl": 6, "5xl": 7 };
  const size = matches(type, "backdrops") ? "w780" : "w500";
  const router = useRouter();
  const name = router.asPath.replace(/^\/+/g, "").replace(/\//g, "-");

  return (
    <Fragment>
      {items?.length > 0 ? (
        <Grid colConfig={gridConfig}>
          {items.map((item, index) => (
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

              <DownloadMediaButton item={{ path: item.file_path, id: index + 1, name: `${name}-${type}` }} />
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
