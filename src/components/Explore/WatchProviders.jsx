import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import Button from "components/UI/Button";
import { Grid, GridCol } from "components/UI/Grid";
import H2 from "components/UI/Typography/H2";
import P from "components/UI/Typography/P";
import WatchProvidersImage from "images/watch-providers.webp";

const WatchProviders = () => {
  return (
    <Fragment>
      <H2 className='mb-2432 text-center text-white'>Watch Providers</H2>

      <Grid className='items-center gap-0 overflow-hidden rounded-xl border border-neutral-700' colConfig={{ xs: 1, lg: 12 }}>
        <GridCol colSizeConfig={{ xs: 1, lg: 7, xl: 8 }} className='h-full'>
          <Image src={WatchProvidersImage} alt='Watch Providers' className='h-full min-h-48 w-full object-cover object-left' />
        </GridCol>

        <GridCol colSizeConfig={{ xs: 1, lg: 5, xl: 4 }} className='p-2032'>
          <P size='large'>
            Explore a comprehensive list of OTT/streaming providers, both locally and globally, to elevate your entertainment experience. Discover a
            diverse range of options available in your country and around the world.
          </P>

          <Link href='/watch-providers' className='mt-1620 inline-block'>
            <Button weight='medium'>Explore Providers</Button>
          </Link>
        </GridCol>
      </Grid>
    </Fragment>
  );
};

export default WatchProviders;
