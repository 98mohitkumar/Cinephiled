import Image from "next/image";
import Link from "next/link";

import Button from "components/UI/Button";
import { Grid, GridCol } from "components/UI/Grid";
import P from "components/UI/Typography/P";
import { blurPlaceholder } from "data/global";
import WatchProvidersImage from "images/watch-providers.webp";

import { watchProvidersCard } from "./ExploreStyles";

const WatchProviders = () => {
  return (
    <Grid className='h-full items-center gap-0 overflow-hidden rounded-xl border border-neutral-700 bg-black' css={watchProvidersCard}>
      <GridCol colSizeConfig={{ xxs: 12 }} className='image-wrapper h-full'>
        <Image
          src={WatchProvidersImage}
          alt='Watch Providers'
          className='h-full w-full object-cover object-left'
          placeholder='blur'
          blurDataURL={blurPlaceholder}
        />
      </GridCol>

      <GridCol colSizeConfig={{ xxs: 12 }} className='p-2032'>
        <P size='large' className='max-w-3xl text-pretty'>
          Explore a comprehensive list of OTT/streaming providers to enhance your entertainment experience, with options available both locally and
          globally.
        </P>

        <Link href='/watch-providers' className='mt-1620 inline-block'>
          <Button weight='medium'>Explore Providers</Button>
        </Link>
      </GridCol>
    </Grid>
  );
};

export default WatchProviders;
