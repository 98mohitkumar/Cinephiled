import { blurPlaceholder } from "globals/constants";
import Image from "next/image";
import Link from "next/link";
import { getCleanTitle } from "src/utils/helper";

const CollectionCard = ({ collection }) => {
  return (
    <div className='rounded-xl p-1 max-w-full lg:max-w-max bg-neutral-300 mt-6 lg:mt-8 drop-shadow-xl group'>
      <Link href={`/collection/${collection.id}-${getCleanTitle(collection.name)}`} legacyBehavior>
        <a className='flex gap-3 min-h-32 rounded-lg rounded-r-none overflow-hidden'>
          <div className='relative min-w-44 md:min-w-52 lg:min-w-72 aspect-[300/169]'>
            <div className='absolute -inset-1 bg-gradient-to-l from-neutral-300 to-transparent z-10' />
            <Image
              src={
                collection.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${collection.backdrop_path}`
                  : "/Images/DefaultBackdrop.png"
              }
              alt='collection-poster'
              fill
              style={{ objectFit: "cover", zIndex: 1 }}
              placeholder='blur'
              blurDataURL={blurPlaceholder}
              className='group-[:hover]:saturate-[2.5] transition-all'
            />
          </div>
          <div className='pe-2 lg:pe-4 py-4 flex flex-col gap-3 justify-center'>
            <p className='font-bold text-lg sm:text-xl text-neutral-800 leading-6'>
              Part of the <br /> {collection.name}
            </p>
            <p className='text-xs sm:text-sm py-2 px-4 bg-neutral-800 w-max rounded-full hover:bg-neutral-950 transition-colors'>
              View Collection
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default CollectionCard;
