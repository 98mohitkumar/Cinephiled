import { RatingButton } from "components/RatingModal/RatingStyles";
import WatchProvidersImage from "images/watch-providers.webp";
import Image from "next/image";
import Link from "next/link";

const StreamingProvides = () => {
  return (
    <div className='rounded-xl flex max-lg:flex-col outline outline-1 outline-neutral-700 group overflow-hidden bg-neutral-900'>
      <div className='relative min-w-[70%] min-h-[200px] lg:min-h-[320px] overflow-hidden'>
        <Image
          src={WatchProvidersImage}
          alt='Watch Providers'
          layout='fill'
          loading='eager'
          className='object-cover object-left-top group-hover:scale-105 transition-transform'
        />
      </div>

      <div className='max-md:p-6 p-8 rounded-lg my-auto'>
        <p className='text-base md:text-lg max-w-lg'>
          Explore a comprehensive list of OTT/streaming providers, both locally and globally, to
          elevate your entertainment experience. Discover a diverse range of options available in
          your country and around the world.
        </p>

        <Link href='/watch-providers'>
          <a className='inline-block mt-6'>
            <RatingButton className='text-black max-sm:'>Explore Providers</RatingButton>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default StreamingProvides;
