import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import FlexBox from "components/UI/FlexBox";
import P from "components/UI/Typography/P";
import { ROUTES, blurPlaceholder } from "data/global";
import { cn, getNiceName } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const CollectionCard = ({ collection, className }) => {
  return (
    <div className={cn("relative w-full max-w-full overflow-hidden rounded-xl border border-neutral-700 shadow-md xs:max-w-96", className)}>
      <Link href={`/${ROUTES.collections}/${getNiceName({ id: collection?.id, name: collection?.name })}`} className='group'>
        <div className='relative aspect-backdrop'>
          <Image
            src={getTMDBImage({ path: collection.backdrop_path, type: "backdrop", size: "w500" })}
            alt='collection-poster'
            fill
            placeholder='blur'
            blurDataURL={blurPlaceholder}
            className='object-cover shadow-xl transition-all group-hover:saturate-150'
          />
        </div>

        <FlexBox className='absolute bottom-0 left-0 right-0  w-full items-center justify-center gap-10 bg-neutral-100 py-8'>
          <P weight='semibold' className='text-black'>
            View Collection
          </P>

          <MoveRight size={24} className='text-black transition-all group-hover:translate-x-1' strokeWidth={1.5} />
        </FlexBox>

        <P
          weight='semibold'
          className='absolute left-2 top-2 flex items-center gap-2 rounded-3xl bg-neutral-100 px-10 py-4 text-black'
          size='micro-to-tiny'>
          <span className='text-neutral-500'>&bull;</span>
          {collection.name}
        </P>
      </Link>
    </div>
  );
};

export default CollectionCard;
