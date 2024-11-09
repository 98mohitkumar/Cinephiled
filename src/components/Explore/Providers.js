import Image from "next/image";
import Link from "next/link";
import WatchProvidersImage from "images/watch-providers.webp";
import { Button } from "styles/GlobalComponents";

const StreamingProvides = () => {
  return (
    <div className='group flex overflow-hidden rounded-xl bg-neutral-900 outline outline-1 outline-neutral-700 max-lg:flex-col'>
      <div className='relative aspect-[3.52/1] min-h-[200px] min-w-[70%] overflow-hidden lg:min-h-[320px]'>
        <Image
          src={WatchProvidersImage}
          alt='Watch Providers'
          fill
          className='object-cover object-left-top transition-transform group-hover:scale-105'
        />
      </div>

      <div className='my-auto rounded-lg p-8 max-md:p-6'>
        <p className='text-base md:text-lg max-w-lg'>
          Explore a comprehensive list of OTT/streaming providers, both locally and globally, to elevate your entertainment experience. Discover a
          diverse range of options available in your country and around the world.
        </p>

        <Link href='/watch-providers'>
          <Button className='mt-6 inline-block'>Explore Providers</Button>
        </Link>
      </div>
    </div>
  );
};

export default StreamingProvides;
