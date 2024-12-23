import Image from "next/image";
import Link from "next/link";

import { blurPlaceholder } from "data/global";
import { getCleanTitle } from "utils/helper";

const CollectionCard = ({ collection }) => {
  return (
    <div className='p-1 group mt-6 max-w-full rounded-xl bg-neutral-300 drop-shadow-xl lg:mt-8 lg:max-w-max'>
      <Link href={`/collection/${collection.id}-${getCleanTitle(collection.name)}`} legacyBehavior>
        <a className='gap-3 flex min-h-32 overflow-hidden rounded-lg rounded-r-none'>
          <div className='relative aspect-[300/169] min-w-44 md:min-w-52 lg:min-w-72'>
            <div className='absolute -inset-1 z-10 bg-gradient-to-l from-neutral-300 to-transparent' />
            <Image
              src={collection.backdrop_path ? `https://image.tmdb.org/t/p/w500${collection.backdrop_path}` : "/Images/DefaultBackdrop.png"}
              alt='collection-poster'
              fill
              style={{ objectFit: "cover", zIndex: 1 }}
              placeholder='blur'
              blurDataURL={blurPlaceholder}
              className='transition-all group-[:hover]:saturate-[2.5]'
            />
          </div>
          <div className='gap-3 flex flex-col justify-center py-4 pe-2 lg:pe-4'>
            <p className='text-lg sm:text-xl font-bold leading-6 text-neutral-800'>
              Part of the <br /> {collection.name}
            </p>
            <p className='text-xs sm:text-sm w-max rounded-full bg-neutral-800 px-4 py-2 transition-colors hover:bg-neutral-950'>View Collection</p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default CollectionCard;
