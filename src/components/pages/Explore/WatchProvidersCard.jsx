import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Button from "components/UI/Button";
import { Grid } from "components/UI/Grid";
import H2 from "components/UI/Typography/H2";
import P from "components/UI/Typography/P";
import { blurPlaceholder, ROUTES } from "data/global";
import WatchProvidersImage from "images/watch-providers.webp";

import { watchProvidersCard } from "./ExploreStyles";

const WatchProviders = () => {
  return (
    <Link href={ROUTES.watchProviders} className='block'>
      <div className='h-full overflow-hidden rounded-xl border border-neutral-700 bg-black' css={watchProvidersCard}>
        <Grid className='image-wrapper items-center justify-center' colConfig={{ xxs: 2 }}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Image
              key={index}
              src={WatchProvidersImage}
              alt='Watch Providers'
              className='image object-cover'
              placeholder='blur'
              blurDataURL={blurPlaceholder}
            />
          ))}
        </Grid>

        <div className='CTA-wrapper max-w-lg'>
          <H2 className='text-h3Static sm:text-h2Static'>Watch Providers</H2>
          <P className='text-pretty text-neutral-200' size='p-to-large'>
            Explore a comprehensive list of OTT/streaming providers to enhance your entertainment experience, with options available both locally and
            globally.
          </P>

          <Button className='group mt-2432 flex items-center gap-8' variant='secondary' size='large'>
            Explore Providers
            <MoveRight size={28} className='transition-transform duration-300 ease-ease-out-quint group-hover:translate-x-2' />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default WatchProviders;
